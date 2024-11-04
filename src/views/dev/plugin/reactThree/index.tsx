import { Suspense, useState, useRef } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { HDRIEnvironment, LightHelpers, Ground, CameraHelper } from './utils'
import Model from './Model'
import Loading from './loading.js'
import { configData } from './configData'
import { DirectionalLight, PCFSoftShadowMap } from 'three'
import { Perf } from 'r3f-perf'
import Effects from './Effects'
import * as THREE from 'three'

// Extend Three.js's DirectionalLight into Fiber
extend({ DirectionalLight })

export default function Index() {
  const cameraRef = useRef<THREE.Camera | null>(null)
  const [selectedModel, setSelectedModel] = useState<THREE.Mesh | null>(null)

  const directionalLightProps = {
    castShadow: true,
    position: [20, 8, 15],
    intensity: 0.5,
    'shadow-mapSize-width': 2048,
    'shadow-mapSize-height': 2048,
    'shadow-camera-near': 0.5,
    'shadow-camera-far': 100,
    'shadow-camera-left': -10,
    'shadow-camera-right': 10,
    'shadow-camera-top': 10,
    'shadow-camera-bottom': -10,
  }
  const meshClick = (val: any) => {
    // console.log('click', val.object)
  }
  const configData = [
    {
      key: '4',
      url: '/3dModel/glb/city.glb',
      shape: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
      onClick: (val: any) => {
        console.log('Clicked:', val)
        setOutlineVisible(true) // 点击时设置为可见
      },
    },
  ]
  const [outlineVisible, setOutlineVisible] = useState(true)
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Suspense fallback={<Loading id="jinDu-text" display="jinDu-text-con" none="container_none" />}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 1000,
            position: [15, 10, 10],
          }}
          onCreated={({ gl, camera }) => {
            cameraRef.current = camera
            gl.shadowMap.enabled = true
            gl.shadowMap.type = PCFSoftShadowMap // 使用软阴影
            // return <Effects outlineVisible={outlineVisible} camera={cameraRef.current} gl={gl} />
          }}>
          {/* <Perf position="top-left" /> */}
          <directionalLight {...directionalLightProps} />
          <CameraHelper />
          <HDRIEnvironment url="/3dModel/HDR/pureSky4k.hdr" />
          <LightHelpers />
          <Effects outlineVisible={!!selectedModel} camera={cameraRef.current} selectedModel={selectedModel} />
          <group dispose={null}>
            {configData.map((item: any) => {
              return (
                <Model
                  key={item.key}
                  onClick={(val) => {
                    console.log('val::: ', val)
                  }}
                  url={item.url}
                  shape={item.shape}

                  // onProgress={item.onProgress}
                />
              )
            })}
          </group>
          {/* <Ground
            onClick={meshClick}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow={true}
            castShadow={true}
          /> */}
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  )
}
