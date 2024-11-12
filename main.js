import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Set the background color of the scene
scene.background = new THREE.Color(0xF5F5DC); // Light blue background

// Wood color material
const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

// Function to create the smaller room
function createRoom() {
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d3d3 }); // Light gray walls

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(4, 3);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 1.5, -2);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall (with window)
    const leftWallGeometry = new THREE.PlaneGeometry(4, 3);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-2, 1.5, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(4, 4);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    scene.add(floor);
}

// Function to create the bed and add a pillow
function createBed() {
    const bedWidth = 1.0;
    const bedLength = 2.0;  
    const bedHeight = 0.2;

    // Bed frame
    const bedFrameGeometry = new THREE.BoxGeometry(bedWidth, bedHeight, bedLength);
    const bedFrame = new THREE.Mesh(bedFrameGeometry, woodMaterial);
    bedFrame.position.set(-1.55, bedHeight / 2, -1.6);
    bedFrame.castShadow = true;
    scene.add(bedFrame);

    // Mattress
    const mattressGeometry = new THREE.BoxGeometry(bedWidth - 0.1, 0.05, bedLength - 0.1);
    const mattressMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.set(-1.55, bedHeight + 0.03, -1.6);
    mattress.receiveShadow = true;
    mattress.castShadow = true;
    scene.add(mattress);

    // Pillow
    const pillowGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.3);
    const pillowMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.position.set(-1.55, bedHeight + 0.1, -1.8);
    pillow.receiveShadow = true;
    pillow.castShadow = true;
    scene.add(pillow);
}

// Function to create a study area (table, laptop, and chair with legs)
function createStudyArea() {
    const tableWidth = 1.0;
    const tableDepth = 0.5;
    const tableHeight = 0.7;

    // Tabletop
    const tableGeometry = new THREE.BoxGeometry(tableWidth, 0.05, tableDepth);
    const table = new THREE.Mesh(tableGeometry, woodMaterial);
    table.position.set(1.0, tableHeight, -1.2);
    table.castShadow = true;
    scene.add(table);

    // Table legs (4 legs)
    const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, tableHeight, 32);
    const legPositions = [
        [1.5, tableHeight / 2, -1.45], [0.5, tableHeight / 2, -1.45],  // Back legs
        [1.5, tableHeight / 2, -0.95], [0.5, tableHeight / 2, -0.95]   // Front legs
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, woodMaterial);
        leg.position.set(...pos);
        scene.add(leg);
        leg.castShadow = true;
    });

    // Laptop (open)
    const laptopBaseGeometry = new THREE.BoxGeometry(0.6, 0.03, 0.4);
    const laptopBase = new THREE.Mesh(laptopBaseGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
    laptopBase.position.set(1.0, tableHeight + 0.03, -1.15);
    laptopBase.castShadow = true;
    scene.add(laptopBase);

    const laptopScreenGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.02);
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
    laptopScreen.position.set(1.0, tableHeight + 0.23, -1.);
    laptopScreen.rotation.x = Math.PI / 10;
    laptopScreen.castShadow = true;
    scene.add(laptopScreen);

    // Chair seat
    const chairSeatGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.5);
    const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
    chairSeat.position.set(1.0, 0.45, -1.7);
    chairSeat.castShadow = true;
    scene.add(chairSeat);

    // Chair legs (4 legs)
    const chairLegPositions = [
        [1.25, 0.2, -1.9], [0.75, 0.2, -1.9],
        [1.25, 0.2, -1.5], [0.75, 0.2, -1.5]
    ];

    chairLegPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, chairMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        scene.add(leg);
    });

    // Chair backrest
    const chairBackGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.05);
    const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
    chairBack.position.set(1.0, 0.8, -1.95);
    chairBack.castShadow = true;
    scene.add(chairBack);
}

// Function to create a window on the left wall
function createWindow() {
    const windowWidth = 1.5;
    const windowHeight = 1.0;

    // Window frame
    const windowFrameGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.1);
    const windowFrameMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const windowFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
    windowFrame.position.set(-1.96, 1.5, -1.0);
    windowFrame.rotation.y = Math.PI / 2;
    windowFrame.castShadow = true;
    scene.add(windowFrame);

    // Glass (transparent effect)
    const glassGeometry = new THREE.PlaneGeometry(windowWidth - 0.1, windowHeight - 0.1);
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.5
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(-1.90, 1.5, -1.0);
    glass.rotation.y = Math.PI / 2;
    scene.add(glass);

}

// Function to create a wardrobe
function createWardrobe() {
    const wardrobeGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.5);
    const wardrobeMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const wardrobe = new THREE.Mesh(wardrobeGeometry, wardrobeMaterial);
    wardrobe.position.set(-1.95, 1.5 / 2, 0.7);
    wardrobe.rotation.y = Math.PI / 2;
    wardrobe.castShadow = true;
    scene.add(wardrobe);

    const wardrobeDoorGeometry = new THREE.BoxGeometry(0.7, 1.1, 0.2);
    const wardrobeDoorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const wardrobeDoor = new THREE.Mesh(wardrobeDoorGeometry, wardrobeDoorMaterial);
    wardrobeDoor.position.set(-1.75, 1.8 / 2, 0.7);
    wardrobeDoor.rotation.y = Math.PI / 2;
    wardrobeDoor.castShadow = true;
    scene.add(wardrobeDoor);

    const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 32);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });

    const handle1 = new THREE.Mesh(handleGeometry, handleMaterial);
    handle1.position.set(-1.55, 0.73, 0.82);
    handle1.rotation.z = Math.PI / 2;
    handle1.castShadow = true;
    scene.add(handle1);

    const handle2 = new THREE.Mesh(handleGeometry, handleMaterial);
    handle2.position.set(-1.55, 0.73, 0.72);
    handle2.rotation.z = Math.PI / 2;
    handle2.castShadow = true;
    scene.add(handle2);

    // Create drawer geometry below the doors
    const drawerGeometry = new THREE.BoxGeometry(0.7, 0.3, 0.5);
    const drawerMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const drawer = new THREE.Mesh(drawerGeometry, drawerMaterial);
    drawer.position.set(-1.91, 0.15, 0.70);
    drawer.rotation.y = Math.PI / 2;
    drawer.castShadow = true;
    scene.add(drawer);

    // Drawer handles (2 smaller cylinders)
    const drawerHandleGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 32);

    const drawerHandle1 = new THREE.Mesh(drawerHandleGeometry, handleMaterial);
    drawerHandle1.position.set(-1.55, 0.2, 0.80);
    drawerHandle1.rotation.z = Math.PI / 2;
    drawerHandle1.castShadow = true;
    scene.add(drawerHandle1);

    const drawerHandle2 = new THREE.Mesh(drawerHandleGeometry, handleMaterial);
    drawerHandle2.position.set(-1.55, 0.2, 0.70);
    drawerHandle2.rotation.z = Math.PI / 2;
    drawerHandle2.castShadow = true;
    scene.add(drawerHandle2);
}

// Function to create a small bookshelf
function createBookshelf() {

    // Bookshelf structure
    const bookshelfGeometry = new THREE.BoxGeometry(0.6, 1.0, 0.3);
    const bookshelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Wood color
    const bookshelf = new THREE.Mesh(bookshelfGeometry, bookshelfMaterial);
    bookshelf.position.set(0.25, 1.0 / 2, -1.6); // Near the study table
    bookshelf.castShadow = true;
    scene.add(bookshelf);

    // Create books (just simple colored cubes)
    const bookGeometry = new THREE.BoxGeometry(0.09, 0.3, 0.2);
    const bookColors = [0xff0000, 0x0000ff, 0x00ff00, 0xffff00, 0xffa500];
    for (let i = 0; i < 5; i++) {
        const bookMaterial = new THREE.MeshStandardMaterial({ color: bookColors[i] });
        const book = new THREE.Mesh(bookGeometry, bookMaterial);
        book.position.set(0.01 + (i * 0.12), 0.75, -1.48);
        book.castShadow = true;
        scene.add(book);
    }
}

// Function to create a nightstand with a lamp
function createNightstand() {
    // Nightstand
    const nightStandGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const nightStandMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const nightStand = new THREE.Mesh(nightStandGeometry, nightStandMaterial);
    nightStand.position.set(-0.6, 0.5 / 2, -1.6);
    nightStand.castShadow = true;
    scene.add(nightStand);

    // Lamp (simple cylinder for base and sphere for lampshade)
    const lampBaseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32);
    const lampBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
    lampBase.position.set(-0.6, 0.6, -1.6);
    lampBase.castShadow = true;
    scene.add(lampBase);

    const lampShadeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const lampShadeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFE0 });
    const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
    lampShade.position.set(-0.6, 0.8, -1.6);
    lampShade.castShadow = true;
    scene.add(lampShade);
}

function createCrest() {
    const crestGroup = new THREE.Group(); // Group to hold all crest elements

    // Outer circle (black)
    const outerCircleGeometry = new THREE.CircleGeometry(1, 64); // Large circle
    const outerCircleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const outerCircle = new THREE.Mesh(outerCircleGeometry, outerCircleMaterial);
    crestGroup.add(outerCircle);

    // Inner circle (white background within the outer circle)
    const innerCircleGeometry = new THREE.CircleGeometry(0.8, 64); // Slightly smaller circle
    const innerCircleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const innerCircle = new THREE.Mesh(innerCircleGeometry, innerCircleMaterial);
    innerCircle.position.set(0, 0.001, 0.01); // Slightly above to avoid z-fighting
    innerCircle
    crestGroup.add(innerCircle);

    // Top triangle (black)
    const topTriangleShape = new THREE.Shape();
    topTriangleShape.moveTo(0, 0.5);
    topTriangleShape.lineTo(-0.5, 0);
    topTriangleShape.lineTo(0.5, 0);
    topTriangleShape.lineTo(0, 0.5);

    const topTriangleGeometry = new THREE.ShapeGeometry(topTriangleShape);
    const topTriangleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const topTriangle = new THREE.Mesh(topTriangleGeometry, topTriangleMaterial);
    topTriangle.position.set(0, 0.02, 0.02);
    crestGroup.add(topTriangle);

    // Bottom triangle (black)
    const bottomTriangleShape = new THREE.Shape();
    bottomTriangleShape.moveTo(0, -0.5);
    bottomTriangleShape.lineTo(-0.5, 0);
    bottomTriangleShape.lineTo(0.5, 0);
    bottomTriangleShape.lineTo(0, -0.5);

    const bottomTriangleGeometry = new THREE.ShapeGeometry(bottomTriangleShape);
    const bottomTriangleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const bottomTriangle = new THREE.Mesh(bottomTriangleGeometry, bottomTriangleMaterial);
    bottomTriangle.material.side = THREE.DoubleSide;

    bottomTriangle.position.set(0, -0.32, 0.02);
    bottomTriangle.rotation.y = Math.PI;
    bottomTriangle.rotation.z = Math.PI;
    crestGroup.add(bottomTriangle);

    return crestGroup;
}

function createPosterCrest() {
    const crest = createCrest();
    crest.position.set(0, 2, -1.88);
    crest.scale.set(0.6, 0.6, 0.6);
    scene.add(crest);
}

// Add wardrobe, bookshelf, and nightstand with lamp to the room
createWardrobe();
createBookshelf();
createNightstand();
createPosterCrest();

// Create the smaller room, bed (with pillow), study area, and window
createRoom();
createBed();
createStudyArea();
createWindow();

// Adjust the camera position and field of view to capture the smaller room
camera.position.set(2, 2.5, 4); 
camera.lookAt(0, 1, 0);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add basic lighting
const spotLight = new THREE.SpotLight(0xffffff, 0.8);
spotLight.position.set(5, 10, 5);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

const lampLight = new THREE.PointLight(0xffd700, 0.6, 5);  // Lamp with a warm yellow glow
lampLight.position.set(-0.6, 0.9, -1.6);
lampLight.castShadow = true;
scene.add(lampLight);


// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start the animation
animate();
