import * as THREE from 'three';

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x282828); // Темный фон

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Управление камерой (OrbitControls)
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Освещение
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5); // Мягкое белое освещение
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(0, 0, 10);
scene.add(pointLight);

// Геометрия и материалы для объектов
const geometry1 = new THREE.SphereGeometry(1, 32, 32); // Сфера
const geometry2 = new THREE.TorusGeometry(1, 0.4, 16, 100); // Тор

const materials = [
  new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
  new THREE.MeshStandardMaterial({ color: 0x0000ff }),
  new THREE.MeshStandardMaterial({ color: 0xffff00 }),
  new THREE.MeshStandardMaterial({ color: 0x00ffff })
];

// Добавление объектов в сцену
for (let i = 0; i < 200; i++) {
  const geometry = i % 2 === 0 ? geometry1 : geometry2; // Чередование геометрий
  const material = materials[Math.floor(Math.random() * materials.length)];

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
    Math.random() * 20 - 10
  );
  mesh.scale.set(Math.random() * 2 + 0.5, Math.random() * 2 + 0.5, Math.random() * 2 + 0.5);

  scene.add(mesh);
}

// Анимация
function animate() {
  requestAnimationFrame(animate);

  // Плавное вращение объектов
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    }
  });

  controls.update(); // Обновляем управление камерой
  renderer.render(scene, camera);
}

// Поддержка изменения размера окна
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Запуск анимации
animate();
