import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'


// Initialize the scene
const scene = new THREE.Scene();

// add objectives to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)

scene.add(cubeMesh)

// initialized the camera
const camera = new THREE.PerspectiveCamera(
  75, // field of view
  window.innerWidth / window.innerHeight,
  0.1, // near clipping plane // should smaller than the distance to the surface object
  200 // far clipping plane
)

const aspectRatio = window.innerWidth / window.innerHeight

// const camera = new THREE.OrthographicCamera(
//   // left, right, top, bottom, near, far
//   -1 * aspectRatio,  // to define a viewing rectangle with the same shape as the screen
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// )

camera.position.z = 5
scene.add(camera)

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) 
// Set the pixel ratio for high-DPI displays.
// This determines how many physical pixels Three.js uses to render each CSS pixel.
// This makes the WebGL image much sharper.


// initialize the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})


// render the scene
const renderloop = () => {

  controls.update() // update the controls before rendering
  renderer.render(scene,camera)
  window.requestAnimationFrame(renderloop)

}

renderloop()

