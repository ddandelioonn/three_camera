import * as THREE from 'three';

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Нежно-пастельный фон

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

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

// Свет
const light1 = new THREE.PointLight(0xffc0cb, 1, 50);  // Мягкий розовый свет
light1.position.set(20, 20, 20);
scene.add(light1);

const light2 = new THREE.PointLight(0xadd8e6, 1, 50);  // Светлый голубой
light2.position.set(-20, -20, -20);
scene.add(light2);

// Абстрактные геометрии: перекрученные цилиндры и многоугольники
const geometry1 = new THREE.CylinderGeometry(2, 2, 5, 8); // Перекрученный цилиндр
const geometry2 = new THREE.ConeGeometry(2, 5, 5); // Многоугольный конус

// Материалы с мягкими цветами
const pastelColors = [
  new THREE.MeshStandardMaterial({ color: 0xffb6c1 }), // Розовый
  new THREE.MeshStandardMaterial({ color: 0x87cefa }), // Голубой
  new THREE.MeshStandardMaterial({ color: 0xfafad2 }), // Светло-желтый
  new THREE.MeshStandardMaterial({ color: 0x98fb98 })  // Светло-зеленый
];

// Добавление абстрактных объектов в сцену
for (let i = 0; i < 100; i++) {
  const geometry = i % 2 === 0 ? geometry1 : geometry2;
  const material = pastelColors[Math.floor(Math.random() * pastelColors.length)];

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    Math.random() * 60 - 30,
    Math.random() * 60 - 30,
    Math.random() * 60 - 30
  );
  mesh.scale.set(Math.random() * 3 + 1, Math.random() * 3 + 1, Math.random() * 3 + 1);

  scene.add(mesh);
}

// Анимация
function animate() {
  requestAnimationFrame(animate);

  // Плавное изменение формы объектов (перекручиваем их)
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
      child.position.y += Math.sin(child.rotation.x * 2) * 0.05;
    }
  });

  controls.update(); // Обновление управления камерой
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
