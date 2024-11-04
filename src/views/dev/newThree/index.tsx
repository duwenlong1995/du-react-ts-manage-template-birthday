import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { webGL2Renderer } from './webGL2Renderer'
import { configModel } from './configModel'
import Loading from './loading'
import Stats from 'stats.js'

const NewThreejs = () => {
  const containerRef = useRef<HTMLCanvasElement>(null)
  const statsRef = useRef<Stats | null>(null)
  const [instance, setInstance] = useState<webGL2Renderer | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      const rendererInstance = new webGL2Renderer(containerRef.current)
      setInstance(rendererInstance)
      initStats()
      const animate = () => {
        statsRef.current?.begin()
        rendererInstance.composer.render()
        rendererInstance.renderer.render(rendererInstance.scene, rendererInstance.camera)
        statsRef.current?.end()
        requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      cleanup() // 在组件卸载时调用清理函数
    }
  }, [containerRef])

  const initStats = () => {
    const stats = new Stats()
    stats.showPanel(0)
    document.body.appendChild(stats.dom)
    statsRef.current = stats
  }

  const cleanup = () => {
    // 清除性能监控统计
    statsRef.current && document.body.removeChild(statsRef.current.dom)
    instance?.dispose() // 组件卸载时调用清理函数
    setInstance(null) // 重置 instance
  }

  const handleClick = (event: MouseEvent) => {
    if (!instance) return
    const intersects = instance.getIntersects(event)
    if (intersects.length > 0) {
      let selectedObject = intersects[0].object.parent
      const selectedMesh = getSelectedMeshes(selectedObject)

      instance.selectedMesh = selectedMesh
      instance.outlinePass.selectedObjects = selectedMesh
    } else {
      console.log('没有点击到模型')

      instance.selectedMesh = []
      instance.outlinePass.selectedObjects = []
    }
  }

  const getSelectedMeshes = (object: THREE.Object3D) => {
    const selectedMeshes: THREE.Object3D[] = []
    if (object.type === 'Group') {
      selectedMeshes.push(object)
    } else {
      selectedMeshes.push(object)
    }
    return selectedMeshes
  }

  useEffect(() => {
    if (instance) {
      instance.initHdrSky('/3dModel/HDR/pureSky4k.hdr')
      const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
      const groundGeometry = new THREE.PlaneGeometry(100, 100)
      const groundLocation = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: -Math.PI / 2, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }
      // instance.createMesh(groundGeometry, groundMaterial, true, groundLocation)
      instance.initGltfLoader(configModel, updateProgress)
      if (containerRef.current) {
        containerRef.current.addEventListener('dblclick', handleClick)
      }
    }
    return () => {
      if (containerRef.current) {
        containerRef.current?.removeEventListener('dblclick', handleClick)
      }
    }
  }, [instance])

  let timeoutId: NodeJS.Timeout | undefined // 定义一个变量来存储定时器的 ID
  const updateProgress = (progress: number) => {
    const percentDiv = document.getElementById('jinDu-text')
    const displayContainer = document.getElementById('jinDu-text-con')
    const mainContainer = document.getElementById('container_none')

    if (percentDiv) {
      percentDiv.innerHTML = `${progress}%`
      percentDiv.style.animation = 'fillBar 2s forwards, pulse 2s infinite'
    }

    if (progress === 100 && displayContainer && mainContainer) {
      // 清除上一个定时器（如果有的话）
      clearTimeout(timeoutId)
      setTimeout(() => {
        displayContainer.style.display = 'none'
        mainContainer.style.display = 'none'
      }, 1000)
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Loading id="jinDu-text" display="jinDu-text-con" none="container_none" />
      <canvas ref={containerRef} id="webgl-container" style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default NewThreejs
