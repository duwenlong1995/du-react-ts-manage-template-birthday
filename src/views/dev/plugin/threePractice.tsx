import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { ThreeTool } from '../../../../sdk/ThreeTool'
import { Spin } from 'antd'

const ThreePractice = () => {
  const myDialogRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<Stats>() // 创建用于引用统计信息的 ref
  // 创建 ThreeTool 实例
  const instance = new ThreeTool()
  instance.camera.position.set(30, 24, 16)
  instance.camera.lookAt(0, 0, 0)
  instance.initAxisHelper()
  instance.initGridHelper(50, 50, 0xffffff, 0xffffff)
  // instance.initHdrSky('/3dModel/HDR/pureSky4k.hdr')
  instance.initImgSky('/3dModel/png/pureSky/4k/')

  // 创建并设置方向光
  const straightLight = new THREE.DirectionalLight(0xffffff, 5)
  straightLight.position.set(20, 20, 20)
  // 设置 renderOrder，确保它在其他对象之上
  straightLight.renderOrder = 1
  instance.scene.add(straightLight)
  // 加载场景
  instance.initScene('lineFog')
  // 解压模型
  const onProgress = (val: number) => {
    // console.log('模型加载进度 ', val)
  }
  /**
   * @description: 鼠标点击事件
   * @param {*} event 鼠标事件
   * @return {*}
   */
  const handleClick = (event: MouseEvent) => {
    instance.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    instance.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    const rayOrigin = instance.camera.position.clone()
    const rayDirection = new THREE.Vector3()
    instance.camera.getWorldDirection(rayDirection)
    instance.rayCaster.set(rayOrigin, rayDirection)

    const selectableObjects = instance.scene.children.filter(
      (child: any) => child.type === 'Group' || child.type === 'Mesh',
    )
    const intersects = instance.rayCaster.intersectObjects(selectableObjects, true)

    if (intersects.length > 0) {
      let selectedObject = intersects[0].object
      // 查找 `renderOrder` 的父级对象
      while (selectedObject.parent && selectedObject.renderOrder === 0) {
        selectedObject = selectedObject.parent
      }
      let selectedObjects = []
      if (selectedObject?.parent?.type === 'Group') {
        selectedObject.parent.traverse(function (obj: any) {
          if (obj.type === 'Mesh') {
            selectedObjects.push(obj)
          }
        })
      } else if (!selectedObject.parent) {
        selectedObject.children.forEach((obj: any) => {
          if (obj.type === 'Mesh') {
            selectedObjects.push(obj)
          }
        })
      } else {
        selectedObjects.push(selectedObject)
      }

      instance.selectedMesh = selectedObjects
      instance.outlinePass.selectedObjects = selectedObjects // 更新 OutlinePass 的选中对象

      const HtmlContent = {
        dom: `
        <style>
        .dialog-container {
            width: 200px;
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
        .box-container {
            color: #333;
            font-family: Arial, sans-serif;
        }
        .tip-green {
            background-color: #e0f7e0;
            padding: 10px;
            border-radius: 5px;
        }
        .line-green {
            height: 2px;
            background-color: #66bb6a;
            margin-top: 8px;
        }
        .label-value-green {
            color: #4caf50;
            font-weight: bold;
        }
        .title {
            font-size: 16px;
            margin-bottom: 8px;
            font-weight: bold;
        }
    </style>
    <div class="box-container">
    <div class='tip-green' >
          <div class="title">设备名称 :测试</div>
          <div class="label-text">
              温度 :
              <span class="mr5" class='label-value-green'>
        50
              </span>
              <span class='label-value-green'>
                  正常
              </span>
          </div>
          <div class="label-text">
              漏水 :
              <span class="mr5" class='label-value-green'>
      40
      </span>
              <span class='label-value-green'>
                  正常
              </span>
          </div>
      </div>
    <div class=line-green></div>`,
        position: { x: 10, y: 5, z: 3 },
      }
      instance.createDialogHtml(HtmlContent)
    } else {
      console.log('未点击到物体')
    }
  }
  const urls = [
    // {
    //   key: 'part1',
    //   path: '/3dModel/glb/',
    //   name: 'city.glb',
    //   zip: '/draco/',
    //   position: { x: 0, y: 0, z: 0 },
    //   rotation: { x: 0, y: 0, z: 0 },
    // },
    // {
    //   key: 'part2',
    //   path: '/3dModel/glb/',
    //   name: 'earth.glb',
    //   zip: '/draco/',
    //   position: { x: 0, y: 0, z: 0 },
    //   rotation: { x: 0, y: 0, z: 0 },
    //   scale: { x: 0, y: 0, z: 0 },
    // },
    {
      key: 'part1',
      path: '/3dModel/glb/',
      name: 'gymTrainer.glb',
      zip: '/draco/',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 0.08, y: 0.08, z: 0.08 },
    },
    // {
    //   key: 'part3',
    //   path: '/3dModel/glb/',
    //   name: 'sketch.glb',
    //   position: { x: 0, y: 0, z: 0 },
    //   rotation: { x: 0, y: 0, z: 0 },
    //   scale: { x: 4, y: 4, z: 4 },
    // },
    // {
    //   key: 'part4',
    //   path: '/3dModel/gltf/plane/',
    //   name: 'scene.gltf',
    //   position: { x: 0, y: 0, z: 0 },
    //   rotation: { x: 0, y: 0, z: 0 },
    // },
  ]
  // const rotation = { x: Math.PI / 2, y: 0, z: 0 }
  instance.initGltfLoader(urls, onProgress)

  const animate = () => {
    requestAnimationFrame(animate)
    // 更新控制器
    instance.renderer.render(instance.scene, instance.camera)
    statsRef.current && statsRef.current.update() // 更新统计信息
    instance.composer.render() // 使用 composer 渲染后期效果
  }
  // 监听组件挂载和卸载
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.appendChild(instance.renderer.domElement)
      instance.renderer.render(instance.scene, instance.camera)
      statsRef.current = instance.initStats(containerRef.current) // 初始化统计信息
      // 启动动画循环
      animate()
      // 渲染 CSS3DObject
      if (instance.labelRenderer) {
        instance.labelRenderer.render(instance.scene, instance.camera)
      }
      // 添加点击事件监听器
      containerRef.current.addEventListener('click', handleClick)
    }
    // 清除事件监听器
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick)
      }
    }
  }, [containerRef])
  return (
    <>
      <div ref={myDialogRef}></div>
      <div ref={containerRef} style={{ width: '100px', height: '40px' }}></div>
    </>
  )
}

export default ThreePractice
