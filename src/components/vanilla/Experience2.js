
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ARButton } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';


class ARExperience {
    constructor(modelDetails) {
        this.container = document.createElement("div");
        // Crea la escena 
        this.scene = new THREE.Scene();

        // Configura la camara
        this.camera = new THREE.PerspectiveCamera(
            60, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            100  // Far clipping plane
        );
        this.camera.position.set(5, 5, 5);
        this.scene.add(this.camera);
        // Renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true,} );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        // Controles para mover en la compu
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.isRightTriggerPressed = false;  // Add this line to track trigger state
        this.isLeftTriggerPressed = false;
        // Controles del beam de luz 
        this.initControllers();
        this.gripPressTime = 0;
        this.pressThreshold = 500; // Milliseconds to differentiate single from continuous press
        //Configuración de las luces 
        const drLight = new THREE.DirectionalLight(0xffffff, 1.5)
        drLight.position.set(5,5,5)
        this.scene.add(drLight)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
        drLight.position.set(5,5,5)
        this.scene.add(ambientLight)
        // Resize event
        window.addEventListener('resize', this.resize.bind(this));

        this.models = []; // Array to store multiple objects
        this.modelDetails = modelDetails;
        this.activeObject = null; // Currently selected object

    }

    createButton(text, index, position, scene, models) {
        const geometry = new THREE.BoxGeometry(0.3, 0.1, 0.05); // Button size
        const material = new THREE.MeshBasicMaterial({ color: 0x45C2FF        }); // Button color
        const button = new THREE.Mesh(geometry, material);
    
        button.position.copy(position);
        button.userData.index = index; // Store model index in userData for reference
    
        const loader = new FontLoader();
        loader.load('./helvetiker_regular.typeface.json', function(font) {
            const textGeo = new TextGeometry(text, {font: font, size: 0.05, height: 0.01,});
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeo, textMaterial);
            textMesh.position.set(-0.14, -0.025, 0.03);
            button.add(textMesh);
        });
        console.log("Se creo un boton");
        scene.add(button);
        return button;
    }
    
    initButtons(scene, models) {
        const buttonY = 0; // Y-coordinate for all buttons to align horizontally
        const buttonZ = -1; // Z-coordinate to position the buttons in front of the camera
        const buttonSpacing = 0.35; // Space between buttons
        const totalWidth = (models.length - 1) * buttonSpacing; // Total width all buttons will occupy
        const startX = -totalWidth / 2; // Starting X-coordinate to center buttons
    
        models.forEach((model, idx) => {
            const posX = startX + idx * buttonSpacing; // Calculate X-coordinate for each button
            const pos = new THREE.Vector3(posX, buttonY, buttonZ);
            this.createButton(`Object ${idx + 1}`, idx, pos, scene, model);
        });
    }
    initVRControls(controllers, scene, camera, models) {
        controllers.forEach(controller => {
            this.setupController(controller, scene, camera, models, this.setActiveObject.bind(this));
        }); 
    }

    setupController(controller, scene, camera, models, setActiveObject) {
        const tempMatrix = new THREE.Matrix4();
        const raycaster = new THREE.Raycaster();
        let selectedButton = null; // Track the currently selected button
        let hoveredButton = null;  // Track the currently hovered button
    
        controller.addEventListener('selectstart', () => {
            
            tempMatrix.identity().extractRotation(controller.matrixWorld);
            raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
            raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    
            const intersects = raycaster.intersectObjects(scene.children, true);
    
            if (intersects.length > 0) {
                const intersected = intersects[0].object;
                if (intersected.userData.index !== undefined) {
                    if (selectedButton && selectedButton !== intersected) {
                        // Reset the previous active button color to default
                        selectedButton.material.color.set(0x45C2FF); // Light blue for default
                    }
                    // Set the new active button and change its color
                    selectedButton = intersected;
                    selectedButton.material.color.set(0x2E0CFF); // Dark blue for active
                    setActiveObject(intersected.userData.index);
                }
            }
        });
    }
    
    setActiveObject(index) {
        if (index >= 0 && index < this.models.length) {
            this.activeObject = this.models[index];
            console.log(`Active object changed to index: ${index}`);
        }
    }
    
    setupARExperience() {
        this.renderer.xr.enabled = true;
        const controller = this.renderer.xr.getController(1);
        this.scene.add(controller);
        // Event to start moving the object
        controller.addEventListener('selectstart', () => {
            this.isTriggerPressed = true;  // Track that the button is pressed
        });
        // Event to stop moving the object
        controller.addEventListener('selectend', () => {
            this.isTriggerPressed = false;  // Reset the button press status
        });
        this.container.appendChild(ARButton.createButton(this.renderer));

        this.initVRControls(this.controllers, this.scene, this.camera, this.models);
        
        const loadPromises = this.modelDetails.map(detail => this.loadModel(detail.objPath, detail.mtlPath));
        Promise.all(loadPromises).then(() => {
            this.initButtons(this.scene, this.models); // Initialize buttons after all models are loaded
        }).catch(error => console.error("Failed to load one or more models:", error));
        this.models.forEach(model => this.scene.add(model)); // Add all models to the scene
        
        this.animate();  // Ensure animate is called to continuously update the scene

    }



    placeObject(controller) {
        const beamLength = 2.5; //length of the beam
        const beamDirection = new THREE.Vector3(0, 0, -1); //The beam extends in the negative z-axis
        //Gets the position from the controller's world matrix
        const position = new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
        //Transforms the direction of the beam by the controller's world rotation
        beamDirection.transformDirection(controller.matrixWorld);
        //Calculates the end position of the beam
        const endPosition = position.add(beamDirection.multiplyScalar(beamLength));
        if (this.activeObject) {
            this.activeObject.position.copy(endPosition);
        }
    }
    initControllers() {
        // Inicializar los dos controles 
        this.controllers = [this.renderer.xr.getController(0), this.renderer.xr.getController(1)];
        this.controllers.forEach((controller, index) => {
            this.scene.add(controller);

            // Crear un beam para cada control
            const beamGeometry = new THREE.CylinderGeometry(0.01, 0.01, 2.5, 32);
            const beamMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
            const beam = new THREE.Mesh(beamGeometry, beamMaterial);

            beam.position.set(0, 0, -1.25);
            beam.rotation.x = -Math.PI / 2;
            controller.add(beam);

            if (index === 0) {
                this.setupController(controller, this.scene, this.camera, this.models, this.setActiveObject.bind(this));
            }
    
            controller.addEventListener('selectstart', () => {
                this.onSelectStart(beam);  // Optional: Handle visual feedback or other responses
                if (index==0) {
                    this.isLeftTriggerPressed = true;  // Set the flag to true when the trigger is pressed
                }
                else {
                    this.isRightTriggerPressed = true;
                }
            });
            controller.addEventListener('selectend', () => {
                this.onSelectEnd(beam);  // Optional: Handle the end of dragging
                if (index==0) {
                    this.isLeftTriggerPressed = false;  // Set the flag to true when the trigger is pressed
                }
                else {
                    this.isRightTriggerPressed = false;
                }
            });
            

            //controller.addEventListener('squeezestart', () => this.scaleModel(index === 0 ? 1.1 : 0.9)); // Index 0 increases size, index 1 decreases
            //controller.addEventListener('squeezeend', () => this.onSqueezeEnd());

            controller.addEventListener('squeezestart', () => {
                this.gripPressTime = performance.now();  // Record time when grip is pressed
                if (index === 0) {
                    this.isGripPressedLeft = true;
                } else {
                    this.isGripPressedRight = true;
                }
            });
    
            controller.addEventListener('squeezeend', () => {
                const pressDuration = performance.now() - this.gripPressTime;
                if (pressDuration < this.pressThreshold) {
                    // It was a short press, trigger scaling
                    this.scaleModel(controller === this.controllers[0] ? 1.1 : 0.9);
                }
                // Reset grip press states
                if (index === 0) {
                    this.isGripPressedLeft = false;
                } else {
                    this.isGripPressedRight = false;
                }
            });
        });
    }

    scaleModel(scaleFactor) {
        if (this.activeObject) {
            this.activeObject.scale.multiplyScalar(scaleFactor);
        }
    }
    
    rotateObject(controller) {
        const rotationSpeed = 0.03; // Adjust for sensitivity
        this.activeObject.rotation.y += (controller === this.controllers[0] ? -1 : 1) * rotationSpeed;
        
    }
    onSelectStart(beam) {
        beam.material.color.set(0x00008B); // Azul oscuro cuando se presiona el botón 
    }

    onSelectEnd(beam) {
        beam.material.color.set(0xADD8E6); // Azul claro de otra forma
    }


    animate() {
        this.renderer.setAnimationLoop(() => {
            if (this.isRightTriggerPressed && this.activeObject) {
                const controller = this.renderer.xr.getController(1);
                this.placeObject(controller);
            }
            const now = performance.now();
            this.controllers.forEach((controller, index) => {
                const isPressed = (index === 0) ? this.isGripPressedLeft : this.isGripPressedRight;
                if (isPressed && (now - this.gripPressTime > this.pressThreshold)) {
                    // Apply continuous rotation after the threshold has passed
                    this.rotateObject(controller);
                }
            });
            this.render();
        });
    }
    

    render() {
        this.renderer.render(this.scene, this.camera);
    }
    loadModel(modelPath, mtlPath) {
        return new Promise((resolve, reject) => {
            if (!modelPath || !mtlPath) {
                console.error("Model path or material path is undefined.");
                reject("Model or material path is undefined.");
                return;
            }
            const mtlLoader = new MTLLoader();
            mtlLoader.load(mtlPath, (materials) => {
                materials.preload();
                const objLoader = new OBJLoader().setMaterials(materials);
                objLoader.load(modelPath, (obj) => {
                    obj.scale.set(0.001, 0.001, 0.001);
                    this.scene.add(obj);
                    this.models.push(obj);
                    resolve(obj);
                }, undefined, error => reject(error));
            });
        });
    }
    
    initScene() {
        document.querySelector(".container3D").appendChild(this.container);
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    resize() {
        const { clientWidth: width, clientHeight: height } = document.querySelector(".container3D");
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    cleanUp() {
        this.scene.dispose()
        const container = document.querySelector(".container3D")
        let child = container.lastElementChild
        while (child) {
            container.removeChild(child)
            child = container.lastElementChild
        }
    }
    
}

export { ARExperience };

