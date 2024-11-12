import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias : true });
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adjust the camera position and field of view to capture the smaller room
camera.position.set(0, 3, 4.5); 
camera.lookAt(0, 0, 0);

scene.background = new THREE.Color(0xF5F5DC); // Light yellow background

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

const lavaLumen = new THREE.PointLight( 0xff4500, 1.2, 10 );
lavaLumen.position.set( 0, 1.1, 0 );
scene.add( lavaLumen );

const cheeseGlow = new THREE.PointLight(0xffff99, 0.8, 15);
cheeseGlow.position.set(0, 2, 0);
scene.add(cheeseGlow);

const mirrorGlow = new THREE.SpotLight(0x0000FF, 1, 100, Math.PI / 4, 0.5, 2);
mirrorGlow.position.set(0, 2, 0);
mirrorGlow.target.position.set(0, 0, 0);
mirrorGlow.castShadow = true;
scene.add(mirrorGlow);

const spotlightTarget = new THREE.Object3D();
spotlightTarget.position.set(0, 0, 0); // Position the target at the center
scene.add(spotlightTarget);
mirrorGlow.target = spotlightTarget; // Set spotlight's target to the created object


// Load Textures
const textureLoader = new THREE.TextureLoader();
const lava = textureLoader.load('myAssets/textures/lavussy.jpg');
const bricks = textureLoader.load('myAssets/textures/brickedup.jpg');
const cheese = textureLoader.load('myAssets/textures/cheeseit.jpg');
const pizza = textureLoader.load('myAssets/textures/petcha.jpg');

function createLivingRoom() {
    // Floor
    const floorGeometry = new THREE.BoxGeometry(5, 0.125, 4);
    const floorMaterial = new THREE.MeshStandardMaterial({ map: lava, emissive: 0xff4500, emissiveIntensity: 0.2 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // Left Wall
    const leftWallGeometry = new THREE.BoxGeometry(0.1, 3, 4);
    const leftWallMaterial = new THREE.MeshLambertMaterial({ map: cheese, emissive: 0xf4d942, emissiveIntensity: 0.1});
    const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
    leftWall.position.set(-2.45, 1.5, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right Wall
    const rightWallGeometry = new THREE.BoxGeometry(0.1, 3, 4);
    const rightWallMaterial = new THREE.MeshLambertMaterial({ map: cheese, emissive: 0xf4d942, emissiveIntensity: 0.1 });
    const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
    rightWall.position.set(2.45, 1.5, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Back Wall
    const backWallGeometry = new THREE.BoxGeometry(5, 3, 0.1);
    const backWallMaterial = new THREE.MeshLambertMaterial({ map: bricks });
    const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWall.position.set(0, 1.5, -2);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Ceiling Peeza
    const ceilingGeometry = new THREE.BoxGeometry(5, 0.125, 4);
    const ceilingMaterial = new THREE.MeshPhongMaterial({ map: pizza });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.set(0, 3, 0);
    ceiling.receiveShadow = true;
    scene.add(ceiling);

    // Couch Creation (Made with multiple BoxGeometries)
    const couchBaseGeometry = new THREE.BoxGeometry(2.5, 0.5, 1);
    const couchBaseMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });  // Brown color for couch base
    const couchBase = new THREE.Mesh(couchBaseGeometry, couchBaseMaterial);
    couchBase.position.set(-0.2, 0.25, -1);  // Positioned on the floor
    scene.add(couchBase);

    // Backrest of the Couch
    const backrestGeometry = new THREE.BoxGeometry(2.5, 1, 0.3);
    const backrestMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });  // Same material as the base
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.set(-0.2, 0.5, -1.23);  // Positioned above the base
    scene.add(backrest);

    // Left Armrest
    const leftArmrestGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.6);
    const leftArmrestMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const leftArmrest = new THREE.Mesh(leftArmrestGeometry, leftArmrestMaterial);
    leftArmrest.position.set(-1.35, 0.5, -0.95);  // Positioned to the left of the couch
    scene.add(leftArmrest);

    // Right Armrest
    const rightArmrestGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.6);
    const rightArmrestMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
    const rightArmrest = new THREE.Mesh(rightArmrestGeometry, rightArmrestMaterial);
    rightArmrest.position.set(0.95, 0.5, -0.95);  // Positioned to the right of the couch
    scene.add(rightArmrest);

    // Desk Lamp (Green Shade and Light)
    const lampBaseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
    const lampBaseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
    lampBase.position.set(1.8, 1, -1); 

    const lampShadeGeometry = new THREE.ConeGeometry(0.5, 1, 32);
    const lampShadeMaterial = new THREE.MeshPhongMaterial({ color: 0x32cd32 });
    const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
    lampShade.position.set(1.8, 1.5, -1);
    lampShade.rotation.y = Math.PI / 2;

    // Nightstand
    const nightStandGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const nightStandMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const nightStand = new THREE.Mesh(nightStandGeometry, nightStandMaterial);
    nightStand.position.set(1.8, 0.32, -1);
    nightStand.castShadow = true;
    scene.add(nightStand);

    const pointLight = new THREE.PointLight(0x32cd32, 1, 10);
    pointLight.position.set(1.8, 1.8, -1);

    scene.add(lampBase);
    scene.add(lampShade);
    scene.add(pointLight);

}
createLivingRoom();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Start the animation
animate();