import { Scene, WebGLRenderer, PerspectiveCamera, Vector3, MeshBasicMaterial, Mesh, CubeGeometry, DirectionalLight, MeshPhongMaterial, AxesHelper, SphereGeometry, MeshLambertMaterial, ImageUtils, Texture, DoubleSide, TextureLoader, Sphere, PointLight, Color, AmbientLight, Fog, SpotLight } from 'three'
import { AppConfig } from './app.config'
import { mainScene } from './scenes/index'
import InitStats from './modules/stats'

function App() {
  AppConfig()
  let stats: any = InitStats()

  // 相机
  const camera: PerspectiveCamera = new PerspectiveCamera(103, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(100, 20, 100)
  camera.lookAt(new Vector3(0, 0, 0))
  mainScene.add(camera)
  // 渲染器
  const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  // 坐标轴
  const axes: AxesHelper = new AxesHelper(1000)
  mainScene.add(axes)
  // 光照
  const light: DirectionalLight = new DirectionalLight(0xffffff, 1.5)
  light.position.set(500, 500, 500)
  mainScene.add(light)

  let cubeGeometry: CubeGeometry = new CubeGeometry(50, 50, 50, 50, 50, 50)
  let cubeMaterial: MeshLambertMaterial = new MeshLambertMaterial({
    color: 0xffffff
  })
  let cube: Mesh = new Mesh(cubeGeometry, cubeMaterial)
  mainScene.add(cube)

  // 动起来，让世界为你喝彩
  function EveryBodyMove() {
    stats.update()
    renderer.render(mainScene, camera)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    requestAnimationFrame(EveryBodyMove)
  }
  EveryBodyMove()

}

export default App
