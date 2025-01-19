import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a2a2a); // Темный фон

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 40;
const minZ = -3000;
const maxZ = 100;

// Слушаем прокрутку колесика мыши
window.addEventListener('wheel', (event) => {
  event.preventDefault();  // Теперь это будет работать правильно

  if (event.deltaY < 0) {
    camera.position.z -= 5;
  } else {
    camera.position.z += 5;
  }

  camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z));
}, { passive: false });

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); 
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0x00ff00, 1); // Яркий зеленый свет
directionalLight.position.set(10, 20, 30);
scene.add(directionalLight);

// Фигуры
const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 10, 32);

// Цвета
const materials = [
  new THREE.MeshLambertMaterial({ color: 0xff6347 }),  // Томато
  new THREE.MeshLambertMaterial({ color: 0x00bfff }),  // Дельфиний синий
  new THREE.MeshLambertMaterial({ color: 0x32cd32 }),  // Лайм
  new THREE.MeshLambertMaterial({ color: 0xff1493 })   // Ярко-розовый
];

for (let i = 0; i < 300; i++) {
  const geometry = i % 2 === 0 ? sphereGeometry : cylinderGeometry;
  const material = materials[Math.floor(Math.random() * materials.length)];

  const object = new THREE.Mesh(geometry, material);
  object.position.set(
    Math.random() * 80 - 40, // random X from -40 to 40
    Math.random() * 80 - 40, // random Y from -40 to 40
    -i * 10 // Z position
  );
  scene.add(object);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
