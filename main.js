import * as THREE from 'three';

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101020); // Тёмный фон

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 15;
camera.position.z = 50;

// Управление масштабом
const minZ = -3000;
const maxZ = 100;

window.addEventListener('wheel', (event) => {
  event.preventDefault();

  camera.position.z += event.deltaY * 0.05;
  camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z));
});

// Рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0x808080, 0.5); // Мягкий свет
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffddaa, 1, 500);
pointLight.position.set(20, 50, 50);
scene.add(pointLight);

// Геометрии и материалы
const geometries = [
  new THREE.TorusGeometry(5, 2, 16, 100), // Кольцо
  new THREE.BoxGeometry(5, 5, 5), // Куб
  new THREE.SphereGeometry(3, 32, 16) // Сфера
];

const materials = [
  new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.7 }),
  new THREE.MeshStandardMaterial({ color: 0x44ff44, metalness: 0.5 }),
  new THREE.MeshStandardMaterial({ color: 0x4444ff, emissive: 0x2222ff })
];

// Добавление фигур в сцену
for (let i = 0; i < 200; i++) {
  const geometry = geometries[Math.floor(Math.random() * geometries.length)];
  const material = materials[Math.floor(Math.random() * materials.length)];

  const mesh = new THREE.Mesh(geometry, material);

  // Расположение в форме спирали
  const angle = i * 0.1;
  const radius = 20 + i * 0.2;
  mesh.position.set(
    Math.cos(angle) * radius,
    Math.sin(angle) * 10 - 50,
    -i * 5
  );

  mesh.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );

  scene.add(mesh);
}

// Анимация
function animate() {
  requestAnimationFrame(animate);

  // Вращение фигур
  scene.traverse((object) => {
    if (object.isMesh) {
      object.rotation.x += 0.005;
      object.rotation.y += 0.01;
    }
  });

  renderer.render(scene, camera);
}

animate();
