// Effects.tsx
import { useEffect, useRef } from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'

const Effects = ({ outlineVisible, camera, selectedModel }) => {
  const composerRef = useRef(null)
  const outlinePassRef = useRef(null)

  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.setSize(window.innerWidth, window.innerHeight)
      composerRef.current.setPixelRatio(window.devicePixelRatio)
    }
  }, [composerRef])

  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.addPass(new RenderPass(scene, camera))

      outlinePassRef.current = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
      outlinePassRef.current.visibleEdgeColor.set('#00ff00') // 可见边缘颜色
      outlinePassRef.current.hiddenEdgeColor.set('#000000') // 隐藏边缘颜色

      composerRef.current.addPass(outlinePassRef.current)
    }

    return () => {
      if (composerRef.current) composerRef.current.dispose() // 清理
    }
  }, [scene, camera])

  useEffect(() => {
    if (outlinePassRef.current && selectedModel) {
      outlinePassRef.current.selectedObjects = [selectedModel] // 设置选中的模型
    } else if (outlinePassRef.current) {
      outlinePassRef.current.selectedObjects = [] // 清空选中的模型
    }
  }, [selectedModel])

  useFrame(() => {
    if (composerRef.current) composerRef.current.render()
  })

  return null
}

export default Effects
