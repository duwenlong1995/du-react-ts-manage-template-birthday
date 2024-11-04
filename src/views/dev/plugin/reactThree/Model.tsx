import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import * as THREE from 'three'

extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass })

type Position = [number, number, number]
interface DefinedProps {
  url: string
  shape?: {
    position?: Position
    scale?: Position
    rotation?: Position
  }
  onClick?: (val: any) => void
}

function Model({
  url,
  shape = {
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
  },
  onClick,
}: DefinedProps) {
  const { scene } = useGLTF(url, true)

  useEffect(() => {}, [onClick])
  const handleClick = (event: any) => {
    if (onClick) {
      onClick(event.object)
    }
  }

  return (
    <primitive
      receiveShadow
      castShadow
      object={scene}
      position={shape.position}
      rotation={shape.rotation}
      scale={shape.scale}
      onClick={handleClick}
    />
  )
}

export default Model
