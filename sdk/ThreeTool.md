### 使用方法

1. 下载 ThreeTool.js 文件，将其放置在项目目录中
2. 在 HTML 文件中引入 ThreeTool.js 文件
3. 在 JavaScript 代码中创建 ThreeTool 对象，并传入 canvas 元素
4. 调用 ThreeTool 对象的 init 方法初始化 Three.js 环境
5. 调用 ThreeTool 对象的 addObject 方法添加对象到场景中
6. 调用 ThreeTool 对象的 animate 方法开始动画循环

### 示例代码

```javascript
  import * as THREE from 'three'
  1.创建一个div容器，用于存放渲染的Three.js场景
  const containerRef = useRef<HTMLDivElement>(null)
  2.创建 ThreeTool 实例
  const instance = new ThreeTool()
  3.初始化相机位置和朝向
  instance.camera.position.set(15, 12, 8)
  instance.camera.lookAt(0, 0, 0)
  4.添加坐标系
  instance.initAxisHelper()
  5.地表格
  instance.initGridHelper(50, 50, 0xffffff, 0xffffff)
  5.设置hdr背景图
  instance.initSky('/3dModel/index.hdr')
  6.导入gltf模型
  支持.glb和.gltf格式
  instance.initGltfLoader('/3dModel/NETQuidwayS5700-28CSI/', 'default.gltf')
  支持.obj格式
  instance.initOBJLoader('/3dModel/', 'robot.obj')
```
