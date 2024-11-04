import * as THREE from 'three' // 引入Three.js库
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js' // 引入性能监控库
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { AmbientLight, DirectionalLight, DoubleSide } from 'three'
// 后期处理描边
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

interface glbTypeProps {
  key: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale?: { x: number; y: number; z: number }
  zip?: string
  name: string
  path: string
}
interface DOMProps {
  position: { x: number; y: number; z: number }
  dom: string
}
export class ThreeTool {
  public camera: THREE.PerspectiveCamera // 相机对象
  public scene: THREE.Scene // 场景对象
  public renderer: THREE.WebGLRenderer // 渲染器对象
  // 描边
  public composer: EffectComposer
  public renderPass: RenderPass
  public outlinePass: OutlinePass
  public selectedMesh: Object3D[] = []

  public rayCaster: THREE.Raycaster // 射线投射器
  public mouse: THREE.Vector2 // 鼠标坐标

  public labelRenderer: CSS3DRenderer // CSS3D 渲染器
  // private container: HTMLElement // 存储容器
  // 构造函数，初始化Three.js工具
  constructor() {
    this.renderer = this.initRenderer() // 初始化渲染器
    this.scene = this.initScene() // 初始化场景
    this.camera = this.initCamera() // 初始化相机
    this.initOrbitControls()

    // 初始化鼠标和射线投射器
    this.rayCaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector3()

    // 描边
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    // 创建 OutlinePass
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera,
      this.selectedMesh,
    )
    this.setupOutlinePass() // 设置描边效果
    this.setupPostProcessing() // 设置后期处理
    // 监听窗口调整事件
    window.addEventListener('resize', this.onWindowResize.bind(this), true)

    this.labelRenderer = this.createCss3DRender() // 初始化
  }
  /**
   *
   * @param type 初始化dom
   * @returns
   */
  public createCss3DRender() {
    const labelRenderer = new CSS3DRenderer()
    labelRenderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top = '0px'
    // 设置 pointerEvents 为 none，解决 HTML 元素标签对 three.js canvas 画布鼠标事件的遮挡
    labelRenderer.domElement.style.pointerEvents = 'none'
    document.body.appendChild(labelRenderer.domElement)
    return labelRenderer
  }
  // 创建弹框 - 点击时调用
  public createDialogHtml(DOM: DOMProps) {
    // 创建一个新的 HTML 元素并将 HTML 内容赋值给它
    const labelDiv = document.createElement('div')
    labelDiv.innerHTML = DOM.dom
    // 调整字体大小
    labelDiv.style.fontSize = '0.2rem' // 根据需要设置

    // 设置最大宽高
    labelDiv.style.maxWidth = '30px' // 最大宽度
    labelDiv.style.maxHeight = '10px' // 最大高度
    labelDiv.style.overflow = 'hidden' // 超出内容隐藏
    labelDiv.style.textOverflow = 'ellipsis' // 超出部分用省略号表示

    // 创建CSS3DObject并设置其位置
    const boxObject = new CSS3DObject(labelDiv)
    boxObject.position.set(DOM.position.x, DOM.position.y, DOM.position.z)
    this.scene.add(boxObject)
  }
  // 初始化场景的方法
  public initScene(type?: string): THREE.Scene {
    const scene = new THREE.Scene()
    // scene.background = new THREE.Color(0xcccccc)
    // 创建雾效果
    switch (type) {
      case 'lineFog':
        // 线性雾
        scene.fog = new THREE.Fog(0xcccccc, 0.1, 60)
        // scene.background = new THREE.Color(0xcccccc);
        break
      case 'logFog':
        // 指数雾
        scene.fog = new THREE.FogExp2(0xcccccc, 0.02)
        break
      default:
        scene.fog = null // 清除雾效果
    }
    return scene
  }
  /**
   *  设置hdr背景图
   * @param url
   */
  public initHdrSky(url?: String) {
    const loader = new RGBELoader()
    const _this = this
    loader.load(
      url,
      function (texture: any) {
        // 设置环境映射并启用环境光照
        texture.mapping = THREE.EquirectangularReflectionMapping
        _this.scene.environment = texture
        _this.scene.background = texture
        // 设置纹理过滤
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
      },
      undefined,
      (error: any) => {
        console.error('Failed to load HDR texture:', error)
      },
    )
  }
  public initImgSky(url?: String) {
    const _this = this
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    const environmentMapTexture = cubeTextureLoader.setPath(url).load(
      ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
      () => {
        _this.scene.background = environmentMapTexture
      },
      undefined,
      (e: any) => {
        console.log(e)
      },
    )
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
    this.scene.add(axesHelper)
  }
  // 窗口调整处理函数
  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
  /**
   * 描边效果
   * 高亮显示模型（呼吸灯）
   */
  public setupOutlinePass() {
    this.composer.addPass(this.renderPass)
    // 设置选中的对象
    this.outlinePass.renderToScreen = true
    this.outlinePass.edgeStrength = 10.0 // 边框的亮度
    this.outlinePass.edgeGlow = 1 // 光晕[0,1]
    this.outlinePass.usePatternTexture = false // 是否使用父级的材质
    this.outlinePass.edgeStrength = 30 // 边缘的强度，值越高边框范围越大
    this.outlinePass.edgeThickness = 15 // 边框宽度
    this.outlinePass.downSampleRatio = 1 // 边框弯曲度
    this.outlinePass.pulsePeriod = 3 // 呼吸闪烁的速度
    this.outlinePass.visibleEdgeColor.set(0x00ff00) // 呼吸显示的颜色
    this.outlinePass.hiddenEdgeColor.set(0x000000) // 呼吸消失的颜色
    this.outlinePass.clear = true // 清除之前的渲染
  }
  private setupPostProcessing() {
    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.outlinePass)

    // 创建 FXAA 通道
    const effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
    effectFXAA.renderToScreen = true
    this.composer.addPass(effectFXAA)

    // 创建伽马校正通道
    const gammaPass = new ShaderPass(GammaCorrectionShader)
    this.composer.addPass(gammaPass)
  }

  /**
   * 加载Glb模型
   */
  public initGltfLoader(
    configModel: glbTypeProps[],
    onProgress?: (process: number) => void,
    onerror?: (error: string) => void,
  ) {
    //2、使用加载器导入模型文件，这里注意，需要用在scene创建后
    configModel.map((item) => {
      const { name, path, position, rotation, zip, scale } = item
      const loader = new GLTFLoader().setPath(path)
      const _this = this
      if (zip) {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath(zip)
        loader.setDRACOLoader(dracoLoader)
      }
      loader.load(
        name,
        function (gltf: any) {
          // 初始化环境光，环境光不能用来投射阴影，因为它没有方向。
          const ambientLight = new AmbientLight(0xffffff, 1) // 白光，强度为1
          // 环境光添加至场景中
          _this.scene.add(ambientLight)
          // 添加平行光，使物体看起来更加有效果
          const dirLight = new DirectionalLight(0xffffff, 5)
          // 根据需要自行调整位置
          dirLight.position.set(0, 1, 0)
          // 场景中添加平行光
          _this.scene.add(dirLight)

          gltf.scene.traverse((child: any) => {
            if (child.isMesh) {
              child.renderOrder = 20 // 设置较高的渲染顺序
              // 模型双面渲染
              child.material.side = DoubleSide
              // 光照是否有阴影
              child.castShadow = true
              // 是否接收阴影
              child.receiveShadow = true
              child.frustumCulled = false
            }
          })
          // 把模型放到场景中
          gltf.scene.position.set(position.x, position.y, position.z)
          gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z)
          if (scale) {
            gltf.scene.scale.set(scale.x, scale.y, scale.z) // 正常大小
          }
          _this.scene.add(gltf.scene)
        },
        function (xhr: any) {
          // 计算并返回加载进度
          const process = ((xhr.loaded / xhr.total) * 100).toFixed(2)
          const value = parseFloat(process)
          if (onProgress) {
            onProgress(value) // 回调传递加载进度
          }
        },
        function (error: any) {
          const errorData = error.message
          if (onerror) {
            onerror(errorData) // 回调传递加载进度
          }
        },
      )
    })
  }
  /**
   * 地表格
   * @param l
   * @param w
   * @param color
   * @param bgcolor
   */
  public initGridHelper(l: number, w: number, color: number, bgcolor: number) {
    const gridHelper = new THREE.GridHelper(l, w, color, bgcolor)
    gridHelper.material.opacity = 0.7
    gridHelper.material.depthWrite = false
    gridHelper.material.transparent = true
    this.scene.add(gridHelper)
  }
  /**
   * 初始化渲染器的方法
   * @returns
   */
  public initRenderer(): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 添加渲染器到 DOM
    document.body.appendChild(renderer.domElement)
    return renderer
  }

  /**
   * 初始化相机的方法
   * @returns
   */
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

  /**
   * 初始化性能监控的方法
   * @param container
   * @returns
   */
  public initStats(container: HTMLDivElement) {
    const stats = new Stats()
    stats.dom.style.position = 'absolute'
    stats.dom.style.left = '0'
    stats.dom.style.zIndex = '100'
    container.appendChild(stats.dom) // 将性能监控DOM元素添加到容器中
    return stats
  }

  /**
   * 初始化坐标系辅助
   * @param axesLength
   * @param showText
   */
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
  /**
   * 初始化文本
   * @param content
   * @param font
   * @returns
   */
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
  public cleanup() {
    // Dispose of all models and their associated resources
    this.scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        // Clean up textures
        if (child.material.map) {
          child.material.map.dispose()
        }
        if (child.material.lightMap) {
          child.material.lightMap.dispose()
        }
        if (child.material.emissiveMap) {
          child.material.emissiveMap.dispose()
        }

        // Dispose of geometry
        if (child.geometry) {
          child.geometry.dispose()
        }

        // Dispose of materials
        if (child.material) {
          child.material.dispose()
        }
      }
    })

    // Dispose of the composer and its passes
    this.composer.dispose()

    // Dispose of the renderer
    if (this.renderer) {
      this.renderer.dispose()
    }

    // Optionally, you can also remove event listeners if you added any
    window.removeEventListener('resize', this.onWindowResize.bind(this), true)
  }
}
