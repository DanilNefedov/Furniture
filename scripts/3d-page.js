import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';
import { AmbientLight, DirectionalLight, Light } from 'three';



let linkProduct = new URLSearchParams(window.location.search)
let idProduct = linkProduct.get('idProduct')
//const model = document.getElementById('model')
//console.log(typeof idProduct)
let wrapper = document.querySelector('.model__container');


// window.onload = function (){
// 	let preloader = document.getElementById('preloader');
// 	preloader.style.display = 'none';
// }

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

        const sphereSize = 1;
        const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
        scene.add( pointLightHelper );
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


//     
//     let height = window.innerHeight;

//     window.addEventListener('resize', function(){
//         height = window.innerHeight

//         if(window.innerWidth <= 870){
//             height = 300;

//         }
//     })
//     //Scene
//     const scene = new THREE.Scene()
//     scene.background = new THREE.Color("#656565"); //



//     //Camera
//     const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);


//     //render
//     const renderer = new THREE.WebGLRenderer({antialias: true})
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     renderer.shadowMap.enabled = true;
//     wrapper.appendChild(renderer.domElement)


//     const loader = new GLTFLoader();
//     loader.load(`../models/model-${idProduct}/scene.gltf`, gltf => {
//         const model = gltf.scene;
//         scene.add(model);
//         model.traverse(function(node){
//             if(model.isMesh){
//             node.castShadow = true;
//             }
//         })

//     }, 
//         function (error) {
//             console.log('Error: ' + error)
//         }
//     )



//     //Resize
//     window.addEventListener('resize', onWindowResize, false)

//     function onWindowResize() {
//         camera.aspect = window.innerWidth / height;
//         camera.updateProjectionMatrix();

//         renderer.setSize(window.innerWidth, height)
//     }




//     switch(idProduct){
//         case '0':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 20;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 35;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 35;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 20;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })

//             decrtLight(scene, 0xffffff, 2)
//             light1 (scene)
//             light2(scene)
//             light3(scene)
//             light4(scene, 10)
//             const light9 = new THREE.HemisphereLight( 0x000000, 0x4B4F56, 1 );//light down
//             scene.add(light9)
//             camera.position.set(-10, 3, 10)
//             break;
//         case '1':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 60;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 60;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             decrtLight(scene, 0x000000, 10 )
//             light1(scene)
//             light2(scene)
//             light3(scene)
//             light4(scene, 4)
//             rectLight(scene, 0xB2956E, 2)
//             const light23 = new THREE.HemisphereLight( 0x000000, 0x4B4F56, 1 );//light down
//             scene.add(light23)
//             camera.position.set(2, 2, 2)
//             break;
//         case '2':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 50;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 50;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             decrtLight(scene, 0xE4C8A2, 0.1)
//             //light1 (scene)
//             // light2(scene)
//             // light3(scene)
//             //light4(scene, 10)
//             rectLight(scene)
//             const light = new THREE.HemisphereLight( 0x000000, 0x4B4F56, 1 );//light down
//             scene.add(light)
//             camera.position.set(40, 60, 60)
//             break;  
//         case '4':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 40;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 40;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             camera.position.set(2, 2, 2)
//             break;
//         case '5':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 60;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 60;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             camera.position.set(2, 2, 2)
//             break;
//         case '6':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 45;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()    
//                 }else{
//                     height = 300; 
//                     camera.fov = 45;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             camera.position.set(1, 1, 1)
//             break;
//         case '3':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 70;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 70;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             camera.position.set(1, 1, 1)
//             break;
//         case '7':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 35;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 35;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             camera.position.set(1, 1, 3)
//             break;
//         case '8':
//             if(window.innerWidth <= 870){
//                 height = 300;
//                 camera.fov = 40;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }else{
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 onWindowResize()
//             }
//             window.addEventListener('resize', function(){
//                 if(window.innerWidth > 870){
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }else{
//                     height = 300; 
//                     camera.fov = 40;
//                     camera.updateProjectionMatrix();
//                     onWindowResize()
//                 }
//             })
//             camera.position.set(400, 400, 400)
//             break;      
//     }



//     // const decrLight = new THREE.DirectionalLight(0xffffff, 10)
//     // decrLight.position.set(0,1,0);
//     // decrLight.castShadow = true;
//     // scene.add(decrLight)

//     //OrbitControls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.autoRotate = true;
//     controls.autoRotateSpeed = 5;
//     controls.enableDamping = true;


//     function animate() {
//         requestAnimationFrame(animate)
//         //controls.update();
//         renderer.render(scene, camera)
//     }
//     animate()
// }

// init()
//  switch (idProduct) {
//         case '0':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 20;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 35;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 35;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 20;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(-10, 3, 10)
//             break;
//         case '1':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 60;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 60;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(2, 2, 2)
//             break;
//         case '2':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 50;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 50;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(40, 60, 60)
//             break;
//         case '4':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 40;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 40;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(2, 2, 2)
//             break;
//         case '5':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 60;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 60;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(2, 2, 2)
//             break;
//         case '6':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 45;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 45;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(1, 1, 1)
//             break;
//         case '3':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 70;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 70;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(1, 1, 1)
//             break;
//         case '7':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 35;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 35;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(1, 1, 3)
//             break;
//         case '8':
//             if (window.innerWidth <= 870) {
//                 height = 300;
//                 camera.fov = 40;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             } else {
//                 height = window.innerHeight;
//                 camera.fov = 75;
//                 camera.updateProjectionMatrix();
//                 //onWindowResize()
//             }
//             window.addEventListener('resize', function () {
//                 if (window.innerWidth > 870) {
//                     height = window.innerHeight;
//                     camera.fov = 75;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 } else {
//                     height = 300;
//                     camera.fov = 40;
//                     camera.updateProjectionMatrix();
//                     //onWindowResize()
//                 }
//             })
//             camera.position.set(400, 400, 400)
//             break;
//     }




