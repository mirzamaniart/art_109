const introCanvas = document.getElementById("introCanvas");
const introRenderer = new THREE.WebGLRenderer({ canvas: introCanvas, alpha: true });
introRenderer.setSize(window.innerWidth, window.innerHeight);
introRenderer.setPixelRatio(window.devicePixelRatio);

const bgCanvas = document.getElementById("backgroundCanvas");
const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true });
bgRenderer.setSize(window.innerWidth, window.innerHeight);
bgRenderer.setPixelRatio(window.devicePixelRatio);

const introScene = new THREE.Scene();
const bgScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 1500;

function create3DStars(scene) {
  const starGeometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 2000; i++) {
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
  }
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 12,
    sizeAttenuation: true,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  return stars;
}

const introStars = create3DStars(introScene);
const bgStars = create3DStars(bgScene);

let introOpacity = 1.0;
let isTransitioning = false;

function animateIntro() {
  introRenderer.render(introScene, camera);
  const positions = introStars.geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 2] += 0.2;
    if (positions[i + 2] > 1000) positions[i + 2] = -1000;
  }
  introStars.geometry.attributes.position.needsUpdate = true;

  if (isTransitioning) {
    introOpacity -= 0.01;
    introCanvas.style.opacity = introOpacity;
    document.getElementById("finalFontImage").style.opacity = introOpacity;
    if (introOpacity <= 0) {
      introCanvas.style.display = "none";
      document.getElementById("finalFontImage").style.display = "none";
      showProductsSequentially();
      return;
    }
  }
  requestAnimationFrame(animateIntro);
}

function animateBackground() {
  bgRenderer.render(bgScene, camera);
  const positions = bgStars.geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 2] += 0.2;
    if (positions[i + 2] > 1000) positions[i + 2] = -1000;
  }
  bgStars.geometry.attributes.position.needsUpdate = true;
  requestAnimationFrame(animateBackground);
}

function showProductsSequentially() {
  const products = document.querySelectorAll(".product");
  let index = 0;
  function showNext() {
    if (index > 0) {
      const prev = products[index - 1];
      prev.classList.remove("fade-in");
      prev.classList.add(index % 2 === 0 ? "fade-out-left" : "fade-out-right");
    }
    const current = products[index];
    current.classList.remove("fade-out-left", "fade-out-right");
    current.classList.add("fade-in");
    index = (index + 1) % products.length;
    setTimeout(showNext, 5000);
  }
  showNext();
}

const orbiting = [
  { id: "planet1", angle: 0, speed: 0.01, radius: 220 },
  { id: "planet2", angle: 1, speed: 0.012, radius: 240 },
  { id: "planet3", angle: 2, speed: 0.008, radius: 260 },
  { id: "planet4", angle: 3, speed: 0.013, radius: 280 },
  { id: "planet5", angle: 4, speed: 0.007, radius: 300 },
  { id: "planet6", angle: 5, speed: 0.009, radius: 260 },
  { id: "eyeball", angle: 6, speed: 0.01, radius: 320 }
];

function animateOrbiting() {
  orbiting.forEach((p) => {
    const el = document.getElementById(p.id);
    if (!el) return;
    p.angle += p.speed;
    const x = window.innerWidth / 2 + Math.cos(p.angle) * p.radius;
    const y = window.innerHeight / 2 + Math.sin(p.angle) * p.radius;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
  requestAnimationFrame(animateOrbiting);
}

document.body.style.overflow = "hidden";

window.onload = () => {
  animateIntro();
  animateBackground();
  animateOrbiting();
};

setTimeout(() => {
  isTransitioning = true;
}, 6000);

const music = document.getElementById("bgMusic");
window.addEventListener("click", () => {
  music.volume = 0.3;
  music.play().catch(() => {});
}, { once: true });
