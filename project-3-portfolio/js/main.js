import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

let scene, camera, renderer, star;

function init() {
  scene = new THREE.Scene();

  const sceneContainer = document.querySelector("#three-container");

  camera = new THREE.PerspectiveCamera(
    75,
    sceneContainer.clientWidth / sceneContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
  sceneContainer.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(0.5, 0);
  const material = new THREE.MeshBasicMaterial({ color: 0x800080 });
  star = new THREE.Mesh(geometry, material);
  scene.add(star);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  const sceneContainer = document.querySelector("#three-container");
  camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  star.rotation.x += 0.01;
  star.rotation.y += 0.01;

  renderer.render(scene, camera);
}

init();
animate();
