import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';



let linkProduct = new URLSearchParams(window.location.search)
let idProduct = linkProduct.get('idProduct')
const containerProduct = document.getElementById('container-prod-about')
console.log(containerProduct)





function init() {
    let wrapper = document.querySelector('.model-container');
    
   
    //Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#656565"); //
    


    //Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 1000);
    camera.position.set(400, 400, 400)
    //for 0 (4, 2.5, 2)
    //for 1 (2.5, 2.5, 3)
    //for 2 (50, 50, 50)
    //for 3 (1, 1, 1)
    //for 4 (2, 2, 2)
    //for 5 (2, 2, 2)
    //for 6 (1, 1, 1)
    //for 7 (1, 1, 3)
    //for 8 (400, 400, 400)


    //render
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    wrapper.appendChild(renderer.domElement)

    // let plain;
    // {
    //     plain = new THREE.Mesh(
    //         new THREE.PlaneGeometry(1000, 1000),
    //         new THREE.MeshBasicMaterial({color: "#E2DFE1"})
    //     )
    //     plain.reciveShadow = true;
    //     plain.position.set(0, -1, 0)
    //     plain.rotateX(-Math.PI / 2);
    //     scene.add(plain)
    // }

    // // Model
    loadModel(scene);
    shadowLight(scene)
    // shadowLightSec (scene)
    // shadowTherd(scene)
    lightSun(scene)
   

    {
        const light = new THREE.DirectionalLight( 0xffffff , 0.5 );
        light.position.set( 0, 1, 0 ); //default; light shining from top
        light.castShadow = true; // default false
        scene.add( light );
    }

    RectAreaLightUniformsLib.init();
    {
        const rectLight = new THREE.RectAreaLight(0xffffff, 2, 25, 25);
        rectLight.position.set(-1,0,-5)
        rectLight.rotation.y = Math.PI + Math.PI/4;
        scene.add(rectLight)

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
    }

    {
        const rectLight = new THREE.RectAreaLight(0xffffff, 1, 100, 100);
        rectLight.position.set(10,0,0)
        rectLight.rotation.y = Math.PI - Math.PI/4;
        scene.add(rectLight)
        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
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
        //controls.update();
        renderer.render(scene, camera)
    }
    animate()

}

init()




// function shadowLightSec (scene){
//     const renderer = new THREE.WebGLRenderer();
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//     //Create a DirectionalLight and turn on shadows for the light
//     const light = new THREE.DirectionalLight( 0xffffff, 1 );
//     light.position.set( 0, 1, 0 ); //default; light shining from top
//     light.castShadow = true; // default false
//     scene.add( light );

//     //Set up shadow properties for the light
//     light.shadow.mapSize.width = 512; // default
//     light.shadow.mapSize.height = 512; // default
//     light.shadow.camera.near = 0.5; // default
//     light.shadow.camera.far = 500; // default
// }


function shadowLight(scene){
    //Create a WebGLRenderer and turn on shadows in the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    //Create a PointLight and turn on shadows for the light
    const light = new THREE.PointLight( 0x777777, 0.2, 100 );
    light.position.set( 0, 10, 4 );
    light.castShadow = true; // default false
    scene.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default


}


function loadModel(scene){
    const loader = new GLTFLoader();
    loader.load(`../models/model-${idProduct}/scene.gltf`, gltf => {
    scene.add(gltf.scene);
    }, 
        function (error) {
            console.log('Error: ' + error)
        }
    )

}

function lightSun(scene){
    const light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(-5, 3, 5)
    light.lookAt(0, -1, 0)
    scene.add(light)

    //Helper
    // const helper = new THREE.DirectionalLightHelper(light, 5)
    // scene.add(helper)
}




function buildMainBlock (){
    containerProduct.insertAdjacentHTML("beforeend", 
    `<h1 class='about-product__header '>Product ${idProduct}</h1>
    <p class='about-product__subtitle'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
    <button class='about-product__button'>Buy now</button> 
    `
    )
}
buildMainBlock ()