import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer, dog;
const clock = new THREE.Clock();

function init() {
  // Scene setup
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const light1 = new THREE.DirectionalLight(0xffffff, 3);
  light1.position.set(3, 4, 5);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0xffffff, 3);
  light2.position.set(-3, 4, 5);
  scene.add(light2);

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Load GLTF model (relative path works with Live Server)
  const loader = new GLTFLoader();
  const dogUrl = 'assets/dog_shiny_noModifiers.gltf';

  loader.load(dogUrl, function (gltf) {
    dog = gltf.scene;
    scene.add(dog);
    dog.scale.set(2, 2, 2);
    dog.position.y = -2;

    // Animation mixer setup
    mixer = new THREE.AnimationMixer(dog);

    // Load animation clip (make sure "pose" is the correct name from Blender)
    const clip = THREE.AnimationClip.findByName(gltf.animations, 'pose');
    const action = mixer.clipAction(clip);

    // Mouse events
    document.body.addEventListener("mouseenter", () => {
      action.reset();
      action.play();
    });

    document.body.addEventListener("mouseleave", () => {
      action.stop();
    });
  });
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

init();
animate();
