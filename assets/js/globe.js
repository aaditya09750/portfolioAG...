import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const vertex = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;
  uniform float u_maxExtrusion;
  attribute float a_offset;
  varying float v_offset;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    v_offset = a_offset;
    vec3 newPosition = position;
    
    // Pass transformed normal for rim lighting
    vNormal = normalize(normalMatrix * (instanceMatrix * vec4(normal, 0.0)).xyz);
    
    // Apply extrusion and twinkling motion
    float time = u_time + a_offset;
    if(u_maxExtrusion > 1.0) {
        newPosition.xyz = newPosition.xyz * u_maxExtrusion + sin(time) * 0.05;
    } else {
        newPosition.xyz = newPosition.xyz * u_maxExtrusion;
    }

    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4( newPosition, 1.0 );
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragment = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;
  varying float v_offset;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Refined muted teal-cyan palette
  vec3 colorA = vec3(0.11, 0.28, 0.32);
  vec3 colorB = vec3(0.18, 0.42, 0.45);

  void main() {
    float time = u_time + v_offset;
    float pct = abs(sin(time));
    vec3 baseColor = mix(colorA, colorB, pct);
    
    // Fresnel effect for soft rim lighting
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    vec3 rimColor = vec3(0.5, 0.8, 0.8) * fresnel * 0.4;
    
    gl_FragColor = vec4(baseColor + rimColor, 1.0);
  }
`;

const container = document.getElementById('globe-container');
const canvas = document.querySelector('.globe-canvas');

let
    sizes,
    scene,
    camera,
    renderer,
    controls,
    raycaster,
    mouse,
    isIntersecting,
    twinkleTime,
    material,
    instancedMesh,
    baseMesh,
    minMouseDownFlag,
    mouseDown,
    grabbing;

const setScene = () => {

    if (!container || !canvas) return;

    sizes = {
        width: container.offsetWidth,
        height: container.offsetHeight
    };

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        30,
        sizes.width / sizes.height,
        1,
        1000
    );
    camera.position.z = 100;

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const pointLight = new THREE.PointLight(0x081b26, 12, 200);
    pointLight.position.set(-50, 0, 60);
    scene.add(pointLight);
    scene.add(new THREE.HemisphereLight(0x88ccff, 0x050810, 0.8));

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    isIntersecting = false;
    minMouseDownFlag = false;
    mouseDown = false;
    grabbing = false;

    setControls();
    setBaseSphere();
    setShaderMaterial();
    setMap();
    resize();
    listenTo();
    render();

}

const setControls = () => {

    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = (Math.PI / 2) - 0.5;
    controls.maxPolarAngle = (Math.PI / 2) + 0.5;

};

const setBaseSphere = () => {

    const baseSphere = new THREE.SphereGeometry(22, 50, 50);
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x030a0d,
        transparent: true,
        opacity: 0.95
    });
    baseMesh = new THREE.Mesh(baseSphere, baseMaterial);
    scene.add(baseMesh);

}

const setShaderMaterial = () => {

    twinkleTime = 0.03;
    material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 1.0 },
            u_maxExtrusion: { value: 1.0 }
        },
        vertexShader: vertex,
        fragmentShader: fragment,
    });

}

const setMap = () => {

    const dotSphereRadius = 24;
    let mapData = null;

    const visibilityForCoordinate = (lon, lat) => {
        if (!mapData) return false;

        const x = Math.floor(((lon + 180) / 360) * mapData.width);
        const y = Math.floor(((90 - lat) / 180) * mapData.height);

        const clampedX = Math.max(0, Math.min(mapData.width - 1, x));
        const clampedY = Math.max(0, Math.min(mapData.height - 1, y));

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const sx = Math.max(0, Math.min(mapData.width - 1, clampedX + dx));
                const sy = Math.max(0, Math.min(mapData.height - 1, clampedY + dy));
                const index = (sy * mapData.width + sx) * 4;
                if (mapData.data[index] < 80) return true;
            }
        }
        return false;
    }

    const calcPosFromLatLonRad = (lon, lat) => {
        var phi = (90 - lat) * (Math.PI / 180);
        var theta = (lon + 180) * (Math.PI / 180);

        const x = -(dotSphereRadius * Math.sin(phi) * Math.cos(theta));
        const z = (dotSphereRadius * Math.sin(phi) * Math.sin(theta));
        const y = (dotSphereRadius * Math.cos(phi));

        return new THREE.Vector3(x, y, z);
    }

    const setDots = () => {

        const dotDensity = 2.5;
        const positions = [];
        const offsets = [];
        const dummy = new THREE.Object3D();

        for (let lat = 90; lat > -90; lat -= 1) {
            const radius = Math.cos(Math.abs(lat) * (Math.PI / 180)) * dotSphereRadius;
            const circumference = radius * Math.PI * 2;
            const dotsForLat = circumference * dotDensity;

            for (let x = 0; x < dotsForLat; x++) {
                const long = -180 + x * 360 / dotsForLat;
                if (!visibilityForCoordinate(long, lat)) continue;

                const pos = calcPosFromLatLonRad(long, lat);
                positions.push(pos);
                offsets.push(Math.random() * Math.PI * 2);
            }
        }

        const dotGeometry = new THREE.CircleGeometry(0.12, 5);
        const instancedDotMesh = new THREE.InstancedMesh(dotGeometry, material, positions.length);

        const offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(offsets), 1);
        dotGeometry.setAttribute('a_offset', offsetAttribute);

        positions.forEach((pos, i) => {
            dummy.position.copy(pos);
            dummy.lookAt(0, 0, 0);
            dummy.rotation.y += Math.PI;
            dummy.updateMatrix();
            instancedDotMesh.setMatrixAt(i, dummy.matrix);
        });

        instancedMesh = instancedDotMesh;
        scene.add(instancedMesh);

    }

    const image = new Image;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
        const imageCanvas = document.createElement('canvas');
        imageCanvas.width = image.width;
        imageCanvas.height = image.height;
        const context = imageCanvas.getContext('2d');
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);

        mapData = {
            data: imageData.data,
            width: imageCanvas.width,
            height: imageCanvas.height
        };

        setDots();
    }
    image.src = './assets/images/world_alpha_mini.jpg';

}

const resize = () => {

    if (!container) return;

    sizes = {
        width: container.offsetWidth,
        height: container.offsetHeight
    };

    if (window.innerWidth > 700) camera.position.z = 100;
    else camera.position.z = 140;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);

}

const mousemove = (event) => {
    isIntersecting = false;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(baseMesh);
    if (intersects[0]) {
        isIntersecting = true;
        if (!grabbing) document.body.style.cursor = 'pointer';
    }
    else {
        if (!grabbing) document.body.style.cursor = 'default';
    }
}

const mousedown = () => {
    if (!isIntersecting) return;

    gsap.to(material.uniforms.u_maxExtrusion, {
        value: 1.07
    });

    mouseDown = true;
    minMouseDownFlag = false;

    setTimeout(() => {
        minMouseDownFlag = true;
        if (!mouseDown) mouseup();
    }, 500);

    document.body.style.cursor = 'grabbing';
    grabbing = true;
}

const mouseup = () => {
    mouseDown = false;
    if (!minMouseDownFlag) return;

    gsap.to(material.uniforms.u_maxExtrusion, {
        value: 1.0,
        duration: 0.15
    });

    grabbing = false;
    if (isIntersecting) document.body.style.cursor = 'pointer';
    else document.body.style.cursor = 'default';
}

const listenTo = () => {
    window.addEventListener('resize', resize.bind(this));
    window.addEventListener('mousemove', mousemove.bind(this));
    window.addEventListener('mousedown', mousedown.bind(this));
    window.addEventListener('mouseup', mouseup.bind(this));
}

const render = () => {
    material.uniforms.u_time.value += twinkleTime;
    if (controls) controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render.bind(this))
}

setScene();
