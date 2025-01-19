import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8f0); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 5;
const minZ = -3000;
const maxZ = 20;

// Измените обработчик события "wheel"
window.addEventListener('wheel', (event) => {
  event.preventDefault();  // Теперь это будет работать правильно

  if (event.deltaY < 0) {
    camera.position.z -= 5;
  } else {
    camera.position.z += 5;
  }

  camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z));
}, { passive: false });  // Добавлено { passive: false }

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 30);
scene.add(directionalLight);

const pyramidGeometry1 = new THREE.ConeGeometry(2.5, 10, 3); // Основание радиус = 2.5, высота = 10, треугольное основание
const pyramidGeometry2 = new THREE.ConeGeometry(2.5, 20, 3); // Основание радиус = 2.5, высота = 20, треугольное основание
const pyramidMaterials = [
  new THREE.MeshLambertMaterial({ color: 0xff5555 }),
  new THREE.MeshLambertMaterial({ color: 0x55ff55 }),
  new THREE.MeshLambertMaterial({ color: 0x5555ff })
];

for (let i = 0; i < 300; i++) {
  const geometry = i % 2 === 0 ? pyramidGeometry1 : pyramidGeometry2;
  const material = pyramidMaterials[Math.floor(Math.random() * pyramidMaterials.length)];

  const pyramidLeft = new THREE.Mesh(geometry, material);
  pyramidLeft.position.set(-20, geometry.parameters.height / 2, -i * 10);
  scene.add(pyramidLeft);

  const pyramidRight = new THREE.Mesh(geometry, material);
  pyramidRight.position.set(20, geometry.parameters.height / 2, -i * 10);
  scene.add(pyramidRight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
