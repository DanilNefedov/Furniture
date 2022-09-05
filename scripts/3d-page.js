import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
// import { RectAreaLightHelper } from 'RectAreaLightHelper'
// import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';
// import { AmbientLight, DirectionalLight, Light } from 'three';



let linkProduct = new URLSearchParams(window.location.search)
let idProduct = linkProduct.get('idProduct')
let wrapper = document.querySelector('.model__container');




let camera, scene, renderer, model, hemiLight, spotLight, controls;
let height = window.innerHeight;

window.addEventListener('resize', function () {
    height = window.innerHeight

    if (window.innerWidth <= 870) {
        height = 300;

    }
})



function init() {

    

    //scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color("#656565"); 

    //camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(5, 5, 5)

    //render
    renderer = new THREE.WebGLRenderer()
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight)
    wrapper.appendChild(renderer.domElement)

    
    function lightHem(color1, color2, intc){
        hemiLight = new THREE.HemisphereLight(color1, color2, intc)
        scene.add(hemiLight)
    }
    


    function lightSp(color, intc, bias){
        spotLight = new THREE.SpotLight(color, intc);
        spotLight.castShadow = true;
        spotLight.shadow.bias = bias
        spotLight.shadow.mapSize.width = 1024 * 4;
        spotLight.shadow.mapSize.height = 1024 * 4;
        scene.add(spotLight)
    }


    function lightP(scene, intc, x, y, z){
        const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, intc ); 
        light.position.set(x,y,z)
        scene.add(light)

       
    }


    //OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.enableDamping = true;


    const loader = new GLTFLoader();
    loader.load(`../models/model-${idProduct}/scene.gltf`, gltf => {
        model = gltf.scene.children[0];
        model.traverse(n => {
            if (n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                if (n.material.map) n.material.map.anisotropy = 16;
            }
        })
        scene.add(model);
        animate();
        let preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
    });


    //Resize
    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
        camera.aspect = window.innerWidth / height;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, height)
    }


    switch(idProduct){
        case '0':
            camera.position.set(4, 4, 4)
            lightSp(0xffa95c, 4, -0.00001)
            lightHem(0xffeeb1, 0x080820, 1)
            lightP(scene, 2, -5, 0, 0)
            break;
        case '1':
            camera.position.set(2, 2, 2)
            lightSp(0xFDEBC8, 4, -0.0001)
            lightHem(0xffeeb1, 0xBEBEBE, 0.1)
            lightP(scene, 0.1, 0, 0, -3)
            break;
        case '2':
            camera.position.set(50, 50, 50)
            lightSp(0xFDEBC8, 4, -0.0001)
            lightHem(0xffeeb1, 0xBEBEBE, 0.1)
            break;
        case '3':
            camera.position.set(1, 1, 1)
            lightSp(0xFFC694, 4, -0.0001)
            lightHem(0xB4FFEA, 0x2828A0, 1)
            break;
        case '4':
            camera.position.set(1.5, 1.5, 1.5)
            lightSp(0xFFC694, 4, -0.0001)
            lightHem(0xB4FFEA, 0x2828A0, 1)
            lightP(scene, 0.9, -5, 0, 0)
            break;
        case '5':
            camera.position.set(250, 250, 250)
            lightSp(0xFFC694, 4, -0.0001)
            lightHem(0xB4FFEA, 0x2828A0, 1)
            break;
        case '6':
            camera.position.set(1, 1, 1)
            lightSp(0xFFC694, 4, -0.0001)
            lightHem(0xB4FFEA, 0x2828A0, 1)
            break;
        case '7':
            camera.position.set(2, 2, 2)
            lightSp(0xFFC694, 4, -0.0001)
            lightHem(0xB4FFEA, 0x2828A0, 1)
            break;
        case '8':
            camera.position.set(350, 350, 350)
            lightSp(0xFFC694, 2, -0.0001)
            lightHem(0xB4FFEA, 0x2828A0, 1)
            break;
    }


}

function animate() {
    
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
    )
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

init()


const prodName = document.querySelector('.product-name')
const aboutProduct = document.querySelector('.about-product-3d')


function buildAboutProd() {
    aboutProduct.insertAdjacentHTML("beforeend",
        `<p class='about-product__subtitle '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>`
    )
}
buildAboutProd()


function buildMainBlock() {
    prodName.insertAdjacentHTML("beforeend",
        `<h1 class='about-product__header '>Product ${idProduct}</h1>`
    )
}
buildMainBlock()


