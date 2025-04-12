import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls (optional)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Load Font
const loader = new FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const material = new THREE.MeshStandardMaterial({ color: "#ff69b4" }); // pink

    const texts = "I LOVE YOU".split("");
    const angleStep = (Math.PI * 2) / texts.length;
    const radius = 20;

    texts.forEach((char, i) => {
      const geometry = new TextGeometry(char, {
        font: font,
        size: 4,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.3,
        bevelSegments: 5,
      });

      geometry.center();

      const mesh = new THREE.Mesh(geometry, material);

      // Susun huruf membentuk hati (pakai rumus jantung/hati sederhana)
      const t = (i / texts.length) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      mesh.position.set(x, y, 0);
      scene.add(mesh);
    });
  }
);

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
