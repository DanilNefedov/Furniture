import * as THREE from '../node_modules/three/build/three.module.js'; 

import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// import { RectAreaLightHelper } from '../node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js'
import { RectAreaLightUniformsLib } from '../node_modules/three/examples/jsm/lights/RectAreaLightUniformsLib.js';

function init() {
	let wrapper = document.querySelector('.wrapper');

	//Scene
	const scene = new THREE.Scene()
	scene.background = new THREE.Color("#E2DFE1");

	//Camera
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
	camera.position.set(0, 0.5, 1)

	//render
	const renderer = new THREE.WebGLRenderer({antialias: true})
	renderer.setSize(window.innerWidth, window.innerHeight)
	wrapper.appendChild(renderer.domElement)

	let plain;
	{
		plain = new THREE.Mesh(
			new THREE.PlaneGeometry(1000, 1000),
			new THREE.MeshBasicMaterial({color: "#E2DFE1"})
		)
		plain.reciveShadow = true;
		plain.position.set(0, -1, 0)
		plain.rotateX(-Math.PI / 2);
		scene.add(plain)
	}

	// Model
	{
		const loader = new GLTFLoader();
		loader.load('../model/scene.gltf', gltf => {
		scene.add(gltf.scene);
		}, 
			function (error) {
				console.log('Error: ' + error)
			}
		)
	}
	
	{
		const light = new THREE.DirectionalLight(0xffffff, 1)
		light.position.set(-2, 0, 10)
		light.lookAt(0, -1, 0)
		scene.add(light)

		// Helper
		// const helper = new THREE.DirectionalLightHelper(light, 5)
		// scene.add(helper)
	}

	{
		const light = new THREE.DirectionalLight(0xffffff, 1)
		light.position.set(2, 0, 5)
		light.lookAt(0, 1, 0)
		scene.add(light)

		// Helper
		// const helper = new THREE.DirectionalLightHelper(light, 5)
		// scene.add(helper)
	}

	RectAreaLightUniformsLib.init();
	{
		const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
		rectLight.position.set(-10,0,0)
		rectLight.rotation.y = Math.PI + Math.PI/4;
		scene.add(rectLight)
	}

	{
		const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
		rectLight.position.set(10,0,0)
		rectLight.rotation.y = Math.PI - Math.PI/4;
		scene.add(rectLight)
	}
	
	//OrbitControls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.autoRotate = true;
	controls.autoRotateSpeed = 5;
	controls.enableDamping = true;

	//Resize
	window.addEventListener('resize', onWindowResize, false)
	
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	// Animate
	function animate() {
		requestAnimationFrame(animate)
		controls.update();
		renderer.render(scene, camera)
	}
	animate()

}

init()