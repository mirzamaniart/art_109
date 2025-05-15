// Intro Canvas
const introCanvas = document.getElementById("introCanvas");
const introRenderer = new THREE.WebGLRenderer({
 canvas: introCanvas,
 alpha: true,
});
introRenderer.setSize(window.innerWidth, window.innerHeight);
introRenderer.setPixelRatio(window.devicePixelRatio);


// Background Canvas
const bgCanvas = document.getElementById("backgroundCanvas");
const bgRenderer = new THREE.WebGLRenderer({
 canvas: bgCanvas,
 alpha: true,
});
bgRenderer.setSize(window.innerWidth, window.innerHeight);
bgRenderer.setPixelRatio(window.devicePixelRatio);


const introScene = new THREE.Scene();
const bgScene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
 90,
 window.innerWidth / window.innerHeight,
 0.1,
 2000
);
camera.position.z = 1500;


// Skybox
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
 "skybox_texture.jpg",
 (texture) => {
   const geometry = new THREE.SphereGeometry(1000, 32, 32);
   const material = new THREE.MeshBasicMaterial({
     map: texture,
     side: THREE.BackSide,
   });


   const skyboxIntro = new THREE.Mesh(geometry, material);
   introScene.add(skyboxIntro);


   const skyboxBackground = new THREE.Mesh(geometry, material);
   bgScene.add(skyboxBackground);
 },
 undefined,
 (err) => console.error("Skybox texture failed to load:", err)
);


// Stars
function create3DStars(scene) {
 const starGeometry = new THREE.BufferGeometry();
 const positions = [];


 for (let i = 0; i < 2000; i++) {
   positions.push((Math.random() - 0.5) * 2000);
   positions.push((Math.random() - 0.5) * 2000);
   positions.push((Math.random() - 0.5) * 2000);
 }


 starGeometry.setAttribute(
   "position",
   new THREE.Float32BufferAttribute(positions, 3)
 );


 const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
 const stars = new THREE.Points(starGeometry, starMaterial);
 scene.add(stars);
 return stars;
}


const introStars = create3DStars(introScene);
const bgStars = create3DStars(bgScene);


// PNG Images
const imageLoader = new THREE.TextureLoader();
imageLoader.load(
 "final_font.png",
 (texture) => {
   const geometry = new THREE.PlaneGeometry(1200, 400); // Larger text
   const material = new THREE.MeshBasicMaterial({
     map: texture,
     transparent: true,
   });
   const textMesh = new THREE.Mesh(geometry, material);
   textMesh.position.set(0, 300, 0);
   introScene.add(textMesh);
 },
 undefined,
 (err) => console.error("Failed to load PNG:", err)
);


// Intro Animation and Transition Logic
let introOpacity = 1.0;
let isTransitioning = false;


function animateIntro() {
 introRenderer.render(introScene, camera);


 const positions = introStars.geometry.attributes.position.array;
 for (let i = 0; i < positions.length; i += 3) {
   positions[i + 2] += 0.2;
   if (positions[i + 2] > 1000) {
     positions[i + 2] = -1000;
   }
 }
 introStars.geometry.attributes.position.needsUpdate = true;


 if (isTransitioning) {
   introOpacity -= 0.01;
   introCanvas.style.opacity = introOpacity;


   if (introOpacity <= 0) {
     introCanvas.style.display = "none";
     document.querySelectorAll("header, .content, footer").forEach((el) => {
       el.style.display = "block";
       el.style.opacity = 1;
     });
     document.body.style.overflow = "visible";
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
   if (positions[i + 2] > 1000) {
     positions[i + 2] = -1000;
   }
 }
 bgStars.geometry.attributes.position.needsUpdate = true;


 requestAnimationFrame(animateBackground);
}


document.querySelectorAll("header, .content, footer").forEach((el) => {
 el.style.display = "none";
});
document.body.style.overflow = "hidden";


window.onload = () => {
 animateIntro();
 animateBackground();
};


// Trigger fade-out after 6 seconds
setTimeout(() => {
 isTransitioning = true;
}, 6000);


