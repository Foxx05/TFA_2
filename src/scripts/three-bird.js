"use strict";

//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Préparer le container
const container = document.getElementById("container3D");
const width = container.clientWidth;
const height = container.clientHeight;

// Créer la caméra avec le bon aspect
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

// Créer le renderer et l'attacher au container
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xA0B8D1);
renderer.setSize(width, height);

container.appendChild(renderer.domElement);

// Gérer le resize du container
window.addEventListener("resize", function () {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

//Create a Three.JS Scene
const scene = new THREE.Scene();

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'falcon8';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

let bird = null;

//Load the file
loader.load(
  `./models/${objToRender}/falcon8.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    // bird = object.children[0];
    console.log(bird);
    object.traverse((child) => {
  if (child.isMesh) {
    child.rotation.y = Math.PI / 2.1; // 90° en radians
  }
});

    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Set how far the camera will be from the 3D model
camera.position.z = 5;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333,1.2);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "falcon8") {
  controls = new OrbitControls(camera, renderer.domElement);
}

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

// Make the bird "look" at the mouse
if (object && objToRender === "falcon8") {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const maxRotationY = Math.PI / 2;   // Max Y rotation (left/right), tweak this
  const maxRotationX = Math.PI / 2;  // Max X rotation (up/down), tweak this

  object.rotation.y = (mouseX - centerX) / centerX * maxRotationY - Math.PI/1.37;
  object.rotation.x = (mouseY - centerY) / centerY * maxRotationX;
  }
  renderer.render(scene, camera);
}

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();