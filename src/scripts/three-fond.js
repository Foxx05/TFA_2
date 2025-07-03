"use strict";

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { RoundedBoxGeometry } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/geometries/RoundedBoxGeometry.js";

// Fonction utilitaire pour comparer deux valeurs avec une tolérance
function isNear(a, b, eps = 0.2) {
  return Math.abs(a - b) < eps;
}

// Couleurs
const baseColor = 0x1e3a5f;        // Couleur cubes
const highlightColor = 0xd9822b;   // Couleur intersection

// Scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f1a20);  // Couleur fond

// Caméra
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(13, 10, 15);
camera.lookAt(0, 0, 0);

// Rendu
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumières
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 30, 40); // Position source lumière
scene.add(light);

// Grille de cubes
const cubes = [];
const gridSize = 27;
const spacing = 1.1;
const geometry = new RoundedBoxGeometry(1, 1, 1, 5, 0.1);

// Génération grille
for (let x = -gridSize / 2; x < gridSize / 2; x++) {
  for (let y = -gridSize / 2; y < gridSize / 2; y++) {
    const material = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.4,
      metalness: 0.3,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x * spacing, y * spacing, 0);
    scene.add(cube);
    cubes.push(cube);
  }
}

// Position cube référence (centre)
const defaultCube = cubes[Math.floor(cubes.length / 2)];

// Décalage
const defaultX = defaultCube.position.x + 10 * spacing;
const defaultY = defaultCube.position.y + 6 * spacing;

// Animation ondulation
function animate(time) {
  requestAnimationFrame(animate);
  const t = time * 0.000205;

  for (const cube of cubes) {
    const wave = Math.sin(t + cube.position.x * 0.4 + cube.position.y * 0.4);
    const height = 1 + Math.abs(wave) * 1.5; // Hauteur minimum = 1
    cube.scale.z = height;
    cube.position.z = height / 2;

    // Cube dans la croix
    const shouldHighlight =
      isNear(cube.position.x, defaultX) || isNear(cube.position.y, defaultY);

    // Couleur cube changement
    const targetColor = new THREE.Color(shouldHighlight ? highlightColor : baseColor);
    cube.material.color.lerp(targetColor, 0.1);
  }

  renderer.render(scene, camera);
}

animate();

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
