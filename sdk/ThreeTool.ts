import * as THREE from 'three' // 引入Three.js库
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js' // 引入性能监控库
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

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
    this.scene.add(axesHelper)
  }
  /**
   *解压缩
   */
  public initDracoLoader(dracoPath: string): OBJLoader {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(dracoPath)
    return new OBJLoader().setDRACOLoader(dracoLoader)
  }
  /**
   * fbx创建STL加载器
   */
  public initFbxLoader(path: string, url: String) {
    const loader = new FBXLoader().setPath(path)
    const _this = this
    loader.load(
      url,
      function (obj: any) {
        // 遍历模型的所有子网格并应用材质
        obj.traverse(function (child: any) {
          if (child instanceof THREE.Mesh) {
            // 为子网格应用材质
            child.material = new THREE.MeshStandardMaterial({
              color: 0x808080, // 设置颜色
              metalness: 0.5, // 设置金属感
              roughness: 0.5, // 设置粗糙度
            })
          }
        })

        _this.scene.position.set(0, 0, 2)
        _this.scene.add(obj)
      },
      function (xhr: any) {
        // 可以添加进度日志以查看加载进度
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      function (res: any) {
        // console.log(res.total, res.loaded);
      },
    )
  }
  /**
   * 加载Gltf模型
   */
  public initGltfLoader(path: string, url: String, dracoPath?: string) {
    const loader = new GLTFLoader().setPath(path)
    const _this = this
    if (dracoPath) {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath(dracoPath)
      loader.setDRACOLoader(dracoLoader)
    }

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
  /**
   * 加载OBJ模型
   * @param path
   * @param objUrl
   * @param mtlUrl
   * @param onProgress
   * @param onerror
   */
  public initOBJLoader(
    path: string,
    objUrl: string,
    mtlUrl: string,
    onProgress?: (process: string) => void,
    onerror?: (error: string) => void,
  ) {
    const _this = this
    // 使用 MTLLoader 加载材质
    const mtlLoader = new MTLLoader()
    mtlLoader.setPath(path)
    mtlLoader.load(mtlUrl, function (materials: any) {
      materials.preload() // 预加载材质
      // 使用 OBJLoader 加载模型
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials) // 将材质传递给 OBJLoader
      objLoader.setPath(path)
      objLoader.load(
        objUrl,
        function (obj: any) {
          // 遍历模型的所有子网格并应用材质
          obj.traverse(function (child: any) {
            if (child instanceof THREE.Mesh) {
              // 使用加载的材质
              child.material = materials.materials[child.material.name] || child.material
            }
          })

          _this.scene.position.set(0, 0, 2)
          _this.scene.add(obj)
        },
        function (xhr: any) {
          // 计算并返回加载进度
          const process = ((xhr.loaded / xhr.total) * 100).toFixed(2) + '%'
          if (onProgress) {
            onProgress(process) // 回调传递加载进度
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
  // public initOBJLoader(path: string, url: string, textures: string[]) {
  //   const loader = new OBJLoader().setPath(path)
  //   const _this = this
  //   const textureLoader = new THREE.TextureLoader()

  //   // 加载材质和对应的纹理
  //   const materials = textures.map((texturePath) => {
  //     return new THREE.MeshStandardMaterial({
  //       map: textureLoader.load(texturePath),
  //       metalness: 0.5,
  //       roughness: 0.5,
  //     })
  //   })

  //   loader.load(
  //     url,
  //     function (obj: any) {
  //       // 遍历模型的所有子网格并应用材质
  //       obj.traverse(function (child: any) {
  //         if (child instanceof THREE.Mesh) {
  //           const materialIndex = Math.floor(Math.random() * materials.length) // 随机选择材质索引
  //           child.material = materials[materialIndex] // 为子网格应用随机材质
  //         }
  //       })

  //       _this.scene.position.set(0, 0, 2)
  //       _this.scene.add(obj)
  //     },
  //     function (xhr: any) {
  //       // 可以添加进度日志以查看加载进度
  //       console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  //     },
  //     function (error: any) {
  //       console.error('An error happened while loading the OBJ model:', error)
  //     },
  //   )
  // }

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
}
