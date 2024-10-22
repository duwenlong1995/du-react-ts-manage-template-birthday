import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { ThreeTool } from '../../../../sdk/ThreeTool'
const ThreePractice = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<Stats>() // 创建用于引用统计信息的 ref
  // 创建 ThreeTool 实例
  const instance = new ThreeTool()
  instance.camera.position.set(15, 12, 8)
  instance.camera.lookAt(0, 0, 0)
  instance.initAxisHelper()
  instance.initGridHelper(50, 50, 0xffffff, 0xffffff)
  instance.initSky('/3dModel/index.hdr')
  // 创建并设置方向光
  const straightLight = new THREE.DirectionalLight(0xffffff, 5)
  straightLight.position.set(20, 20, 20)
  instance.scene.add(straightLight)
  // 加载场景
  instance.initScene('lineFog')
  // 解压模型
  instance.initGltfLoader('/3dModel/', 'city.glb', '/draco/')
  // instance.initOBJLoader('/3dModel/', 'robot.obj')
  // instance.initFbxLoader('/3dModel/gan/', 'Lower_Receiver_low.fbx')
  // instance.initOBJLoader('/3dModel/', 'house.obj', [
  //   '/marters/house/Palit_House.mtl',
  //   '/marters/house/Palit_House_Concrete.jpg',
  //   '/marters/house/Palit_House_Stone_Brushed_Khaki.jpg',
  //   '/marters/house/Palit_House_Wood_Cherry_Original.jpg',
  //   '/marters/house/Palit_House_Wood_Floor.jpg',
  // ])
  // const onProgress = (val: string) => {
  //   console.log('val::: ', val)
  // }
  // const onerror = (val: string) => {
  //   console.log('val::: ', val)
  // }
  // instance.initOBJLoader('/3dModel/', 'house.obj', 'Palit_House.mtl', onProgress, onerror)

  // 物体坐标轴
  // instance.initAxesHelper(500)
  // const sphereGeometry = new THREE.SphereGeometry(1, 320, 302)
  // const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  // instance.createMesh(sphereGeometry, sphereMaterial)

  const animate = () => {
    requestAnimationFrame(animate)
    // 更新控制器
    instance.renderer.render(instance.scene, instance.camera)
    statsRef.current && statsRef.current.update() // 更新统计信息
  }
  // 监听组件挂载和卸载
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.appendChild(instance.renderer.domElement)
      instance.renderer.render(instance.scene, instance.camera)
      statsRef.current = instance.initStats(containerRef.current) // 初始化统计信息
      // 启动动画循环
      animate()
    }
  }, [containerRef])
  return (
    <>
      <div ref={containerRef} style={{ width: '100px', height: '40px' }}></div>
    </>
  )
}

export default ThreePractice
