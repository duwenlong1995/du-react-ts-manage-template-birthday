import { useEffect, useRef } from 'react'
import { useThree, extend, useFrame } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import * as THREE from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

extend({ OutlinePass, EffectComposer, RenderPass })
interface definedProps {
  url: string
}

export function HDRIEnvironment(props: definedProps) {
  const { url } = props
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl)
    pmremGenerator.compileEquirectangularShader()

    new RGBELoader().load(url, (texture: any) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture
      scene.environment = envMap
      scene.background = envMap
      texture.dispose()
      pmremGenerator.dispose()
    })
  }, [gl, scene, url])

  return null
}

export function LightHelpers() {
  const { scene } = useThree()
  useEffect(() => {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(20, 8, 15)
    light.castShadow = true
    light.renderOrder = 1
    scene.add(light)

    const lightHelper = new THREE.DirectionalLightHelper(light)
    scene.add(lightHelper)

    const shadowHelper = new THREE.CameraHelper(light.shadow.camera)
    scene.add(shadowHelper)
  }, [scene])

  return null
}

export function Ground(props: any) {
  return (
    <mesh {...props}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  )
}
export function CameraHelper() {
  const cameraRef = useRef()

  useEffect(() => {
    const helper = new THREE.CameraHelper(cameraRef.current)
    // 添加辅助对象到场景中
    cameraRef.current.add(helper)

    return () => {
      // 在组件卸载时移除辅助对象
      cameraRef.current.remove(helper)
    }
  }, [])

  return <perspectiveCamera ref={cameraRef} position={[0, 5, 10]} fov={75} />
}
