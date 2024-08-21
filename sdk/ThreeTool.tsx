import * as THREE from 'three' // 引入Three.js库
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Stats from 'three/examples/jsm/libs/stats.module.js' // 引入性能监控库
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GridHelper } from 'three/examples/jsm/loaders/GridHelper'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export class ThreeTool {
  public camera: THREE.PerspectiveCamera // 相机对象
  public scene: THREE.Scene // 场景对象
  public renderer: THREE.WebGLRenderer // 渲染器对象
  public hdrTextureLoader: THREE.TextureLoader
  // 构造函数，初始化Three.js工具
  constructor() {
    this.renderer = this.initRenderer() // 初始化渲染器
    this.scene = this.initScene() // 初始化场景
    this.camera = this.initCamera() // 初始化相机
    this.hdrTextureLoader = this.initSky()
    this.initOrbitControls()
  }
  public rendererContainer() {
    this.renderer.render(this.scene, this.camera) // 渲染场景和相机
  }
  // 初始化场景的方法
  public initScene(): THREE.Scene {
    const scene = new THREE.Scene()
    return scene
  }
  // 设置hdr背景图
  public initSky(url: String) {
    const loader = new RGBELoader()
    const _this = this
    loader.load(url, function (texture: any) {
      // 设置环境映射并启用环境光照
      texture.mapping = THREE.EquirectangularReflectionMapping
      _this.scene.environment = texture
      _this.scene.background = texture
      // 设置纹理过滤
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
    })
  }
  /**
   * 创建物体
   */
  public createMesh(cubeGeometry: any, cubeMaterial: any) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.scene.add(cube)
  }
  /**
   * 移动操作轴
   */
  public initAxesHelper(lg: number) {
    // 创建操作轴Helper
    const axesHelper = new THREE.AxesHelper(lg) // 轴的长度为5
    console.log('axesHelper::: ', axesHelper)
    this.scene.add(axesHelper)
  }
  /**
   * fbx创建STL加载器
   */
  public initFbxLoader(path: string, url: String) {
    let fbxLoader = new FBXLoader().setPath(path)
    const _this = this
    fbxLoader.load(url, function (res: any) {
      console.log('res::: ', res)
      let mesh = res.children[0].clone // 获取模型
      mesh.position.set(0, 0, 10)
      mesh.scale.setScalar(1)
      _this.scene.add(mesh)
    })
  }
  /**
   * 加载Gltf模型
   */
  public initGltfLoader(path: string, url: String) {
    const loader = new GLTFLoader().setPath(path)
    const _this = this
    //2、使用加载器导入模型文件，这里注意，需要用在scene创建后
    loader.load(
      url,
      function (gltf: any) {
        _this.scene.position.set(0, 0, 2)
        _this.scene.add(gltf.scene)
      },
      function (res: any) {
        // console.log(res.total, res.loaded);
      },
    )
  }
  // 地表格
  public initGridHelper(l: number, w: number, color: number, bgcolor: number) {
    const gridHelper = new THREE.GridHelper(l, w, color, bgcolor)
    gridHelper.material.opacity = 0.7
    gridHelper.material.depthWrite = false
    gridHelper.material.transparent = true
    this.scene.add(gridHelper)
  }
  // 初始化渲染器的方法
  public initRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    return renderer
  }

  // 初始化相机的方法
  public initCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    return camera
  }
  public initOrbitControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 设置带阻尼的惯性
    controls.enableDamping = true
    // 设置阻尼的大小
    controls.dampingFactor = 0.05
    // 设置自动旋转
    controls.autoRotate = true
    controls.update()
  }

  // 初始化性能监控的方法
  public initStats(container: HTMLDivElement) {
    const stats = new Stats()
    stats.dom.style.position = 'absolute'
    stats.dom.style.left = '0'
    stats.dom.style.zIndex = '100'
    container.appendChild(stats.dom) // 将性能监控DOM元素添加到容器中
    return stats
  }

  //初始化坐标系辅助
  public initAxisHelper(axesLength: number = 150, showText: boolean = true) {
    const helper = new THREE.AxesHelper(axesLength)
    if (showText) {
      const loader = new FontLoader()
      let meshX = new THREE.Mesh()
      let meshY = new THREE.Mesh()
      let meshZ = new THREE.Mesh()
      loader.load('fonts/optimer_regular.typeface.json', (font) => {
        meshX = this.createText('X', font)
        meshY = this.createText('Y', font)
        meshZ = this.createText('Z', font)
        meshX.position.x = 12
        meshY.position.y = 12
        meshZ.position.z = 12
        this.scene.add(meshX)
        this.scene.add(meshY)
        this.scene.add(meshZ)
      })
    }
    this.scene.add(helper)
  }
  // 初始化文本
  private createText(content: string, font: any) {
    const textGeometry = new TextGeometry(content, {
      font: font,
      size: 1,
      depth: 0.1,
      curveSegments: 1,
    })
    textGeometry.center()
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }) // front
    const mesh = new THREE.Mesh(textGeometry, textMaterial)
    return mesh
  }
}
