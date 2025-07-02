"use strict";

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { RoundedBoxGeometry } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/geometries/RoundedBoxGeometry.js';

// Pour faire le fond en 3D, j'ai d'abord essayé en lisant la doc de Three.js mais je n'ai pas réussi à avoir un 
// Scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x113022); // fond

// Caméra perspective inclinée
const camera = new THREE.PerspectiveCamera(
  40, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(13, 10, 15);
camera.lookAt(0, 0, 0);

// Rendu
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 30, 40);
scene.add(directionalLight);

// Matériau des cubes
const material = new THREE.MeshStandardMaterial({
  color: 0x32614E,
  roughness: 0.4,
  metalness: 0.3,
});

// Création de la grille de cubes
const cubes = [];
const gridSize = 27;
const spacing = 1.1;

const geometry = new RoundedBoxGeometry(1, 1, 1, 5, 0.1);

for (let x = -gridSize / 2; x < gridSize / 2; x++) {
  for (let y = -gridSize / 2; y < gridSize / 2; y++) {
    const cube = new THREE.Mesh(geometry, material.clone());
    cube.position.set(x * spacing, y * spacing, 0);
    scene.add(cube);
    cubes.push(cube);
  }
}

// Animation d’ondulation
function animate(time) {
  requestAnimationFrame(animate);
  const t = time * 0.000205;

  for (const cube of cubes) {
const wave = Math.sin(t + cube.position.x * 0.4 + cube.position.y * 0.4);
const height = 1 + Math.abs(wave) * 1.5; // toujours ≥ 1
cube.scale.z = height;
cube.position.z = height / 2;
  }

  renderer.render(scene, camera);
}

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();