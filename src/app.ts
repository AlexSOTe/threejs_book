import * as THREE from 'three'
import mainScene from './scenes/main'
import InitStats from './modules/stats'

function App() {
  let stats: any = InitStats()

  // 相机
  const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(103, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(100, 20, 100)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  mainScene.add(camera)
  // 渲染器
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  // 坐标轴
  const axes: THREE.AxesHelper = new THREE.AxesHelper(1000)
  mainScene.add(axes)
  // 光照
  const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
  light.position.set(500, 500, 500)
  mainScene.add(light)

  let cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(50, 50, 50, 50, 50, 50)
  let cubeMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  })
  let cube: THREE.Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
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

  // 添加window 的resize事件监听
  window.addEventListener('resize', function () {
    // 重新设置相机宽高比例
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
    // 重新设置渲染器渲染范围
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

export default App
