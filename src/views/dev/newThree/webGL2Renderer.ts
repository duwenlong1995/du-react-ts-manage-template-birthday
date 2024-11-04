import * as THREE from 'three'
import { DoubleSide } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 后期处理描边
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
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

export class webGL2Renderer {
  private container: HTMLElement
  public renderer: THREE.WebGLRenderer
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  private controls: OrbitControls // Add controls as a class property

  // 描边
  public composer: EffectComposer
  public renderPass: RenderPass
  public outlinePass: OutlinePass
  public selectedMesh: THREE.Object3D[] = []

  public rayCaster: THREE.Raycaster // 射线投射器
  public mouse: THREE.Vector2 // 鼠标坐标

  constructor(container: HTMLElement) {
    this.container = container
    this.initRenderer()
    this.initScene()
    this.initCamera()
    this.initLight()
    this.initOrbitControls() // Initialize controls here
    // 初始化鼠标和射线投射器
    this.rayCaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

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
  }
  // 窗口调整处理函数
  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private initScene(): void {
    this.scene = new THREE.Scene()
  }

  private initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5
  }

  private initLight(): void {
    const straightLight = new THREE.DirectionalLight(0xffffff, 6)
    straightLight.position.set(20, 8, 15)
    straightLight.castShadow = true // 如果需要，启用阴影
    straightLight.shadow.mapSize.set(512, 512) //阴影贴图的宽度、阴影贴图的高度
    straightLight.shadow.camera.near = 0.5 // 阴影相机的近剪切面
    straightLight.shadow.camera.far = 500 // 阴影相机的远剪切面
    straightLight.shadow.camera.left = -50
    straightLight.shadow.camera.right = 50
    straightLight.shadow.camera.top = 50
    straightLight.shadow.camera.bottom = -50
    // 调整光源的阴影属性
    straightLight.shadow.mapSize.width = 512 // 设置阴影贴图宽度
    straightLight.shadow.mapSize.height = 512 // 设置阴影贴图高度
    this.scene.add(straightLight)
  }
  private initRenderer(): void {
    const context = this.container.getContext('webgl2') as WebGL2RenderingContext
    this.renderer = new THREE.WebGLRenderer({ canvas: this.container, context, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // 抗锯齿设置
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    // 设置 autoClear 属性
    this.renderer.autoClear = true
    this.renderer.sortObjects = true
    /**
     *  给模型加实时阴影
     *  增加性能开销
     */
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // 阴影类型
    // renderer.depthWrite: false;//透明物体深度问题
    // 获取 WebGL 上下文并启用深度测试
    // const gl = this.renderer.getContext()
    // gl.enable(gl.DEPTH_TEST)
    // gl.depthFunc(gl.LEQUAL)
  }
  private initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.autoRotate = false // Disable auto-rotate
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
    this.outlinePass.edgeStrength = 10 // 边缘的强度，值越高边框范围越大
    this.outlinePass.edgeThickness = 4 // 边框宽度
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
    window.addEventListener('resize', () => {
      effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
    })
    this.composer.addPass(effectFXAA)

    // 创建伽马校正通道
    const gammaPass = new ShaderPass(GammaCorrectionShader)
    this.composer.addPass(gammaPass)
  }
  /**
   * 加载glb模型
   */
  public initGltfLoader(
    urls: glbTypeProps[],
    onProgress?: (process: number) => void,
    onerror?: (error: string) => void,
  ) {
    urls.forEach((item) => {
      const { name, path, position, rotation, zip, scale } = item
      const loader = new GLTFLoader().setPath(path)
      const _this = this
      if (zip) {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath(zip)
        dracoLoader.setDecoderConfig({ type: 'js' })
        dracoLoader.preload()
        loader.setDRACOLoader(dracoLoader)
      }
      loader.load(
        name,
        function (gltf: any) {
          gltf.scene.traverse((child: any) => {
            if (child.isMesh) {
              child.renderOrder = 20
              child.material.side = DoubleSide
              child.castShadow = true
              child.receiveShadow = true
              // child.frustumCulled = false
              // child.material.anisotropy = 16
              // child.material.depthWrite = true

              // 假设我们想对所有的材质设置透明度
              // child.material.transparent = true // 启用透明
              // child.material.opacity = 0.5 // 设置透明度
              // if (child.material instanceof THREE.MeshStandardMaterial) {
              //   child.material.transparent = true // 使材质透明
              //   child.material.opacity = 0.5 // 设置透明度
              // }
            }
          })
          gltf.scene.position.set(position.x, position.y, position.z)
          gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z)
          if (scale) {
            gltf.scene.scale.set(scale.x, scale.y, scale.z)
          }
          _this.scene.add(gltf.scene)
        },
        function (xhr: any) {
          const process = ((xhr.loaded / xhr.total) * 100).toFixed(2)
          const value = parseFloat(process)
          if (onProgress) {
            onProgress(value)
          }
        },
        function (error: any) {
          const errorData = error.message
          if (onerror) {
            onerror(errorData)
          }
        },
      )
    })
  }
  /**
   * 模型的点击事件
   */
  public getIntersects = (event: MouseEvent) => {
    //通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1 //这里为什么是-号，没有就无法点中
    this.rayCaster.setFromCamera(this.mouse, this.camera)
    const selectableObjects = this.scene.children
    return this.rayCaster.intersectObjects(selectableObjects, true)
  }
  /**
   * 加载hdr天空盒
   */
  public initHdrSky(url: string = '') {
    const loader = new RGBELoader()
    const _this = this
    loader.load(
      url,
      function (texture: any) {
        texture.mapping = THREE.EquirectangularReflectionMapping
        // _this.scene.environment = texture
        _this.scene.background = texture
        // texture.minFilter = THREE.LinearFilter
        // texture.magFilter = THREE.LinearFilter
      },
      undefined,
      (error: any) => {
        console.error('Failed to load HDR texture:', error)
      },
    )
  }
  /**
   * 加载图片天空盒
   * */
  public initImgSky(url: string = '') {
    const _this = this
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    const environmentMapTexture = cubeTextureLoader.setPath(url).load(
      ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
      () => {
        _this.scene.background = environmentMapTexture
        _this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        _this.renderer.toneMappingExposure = 1.5
      },
      undefined,
      (e: any) => {
        console.log(e)
      },
    )
  }
  /**
   * 创建模型
   */
  public createMesh(geometry: THREE.BufferGeometry, material: THREE.Material, receiveShadow: boolean, location: any) {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.receiveShadow = receiveShadow
    mesh.position.set(location.position?.x, location.position?.y, location.position?.z)
    mesh.rotation.set(location.rotation?.x, location.rotation?.y, location.rotation?.z)
    if (location.scale) {
      mesh.scale.set(location.scale.x, location.scale.y, location.scale.z)
    }
    this.scene.add(mesh)
  }
  /**
   * 释放资源和清理事件监听器
   */
  public dispose() {
    // 清理控制器
    this.controls.dispose()

    // 清理场景中的每个对象的几何体和材质
    this.scene.traverse((object: any) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) {
          object.geometry.dispose()
        }
        if (Array.isArray(object.material)) {
          object.material.forEach((material: any) => material.dispose())
        } else if (object.material) {
          object.material.dispose()
        }
      }
    })

    // 清理 HDR 材质
    if (this.scene.environment) {
      this.scene.environment.dispose()
      this.scene.environment = null
    }
    if (this.scene.background) {
      this.scene.background.dispose()
      this.scene.background = null
    }

    // 清理后期处理
    this.composer.passes.forEach((pass) => {
      if (pass.dispose) {
        pass.dispose()
      }
    })

    // 释放 WebGL 渲染器
    this.renderer.dispose()

    // 移除窗口调整事件监听器
    window.removeEventListener('resize', this.onWindowResize.bind(this))
  }
}
