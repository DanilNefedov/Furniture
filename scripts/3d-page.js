import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';
import { AmbientLight } from 'three';



let linkProduct = new URLSearchParams(window.location.search)
let idProduct = linkProduct.get('idProduct')
const model = document.getElementById('model')
//console.log(typeof idProduct)



// window.onload = function (){
// 	let preloader = document.getElementById('preloader');
// 	preloader.style.display = 'none';
// }




function init() {
    let wrapper = document.querySelector('.model__container');
    let height = window.innerHeight;
   
    window.addEventListener('resize', function(){
        height = window.innerHeight

        if(window.innerWidth <= 870){
            height = 300;

        }
    })
    //Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#656565"); //
    


    //Camera
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

    
    //render
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    wrapper.appendChild(renderer.domElement)

    // const helper = new THREE.CameraHelper( camera );
    // scene.add( helper );
    // Model
    const loader = new GLTFLoader();
    loader.load(`../models/model-${idProduct}/scene.gltf`, gltf => {
    scene.add(gltf.scene);
    }, 
        function (error) {
            console.log('Error: ' + error)
        }
    )
    
    //shadowLight(scene)
    // shadowLightSec (scene)
    // shadowTherd(scene)
    //lightSun(scene)



    //Resize
    window.addEventListener('resize', onWindowResize, false)
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / height;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, height)
    }



    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshBasicMaterial({color: "#E2DFE1"})
    )
    mesh.reciveShadow = true;
    mesh.position.set(0, -2, 0)
    mesh.rotateX(-Math.PI / 2);
    scene.add(mesh)



    const sphere = new THREE.SphereGeometry();
    const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) );
    const box = new THREE.BoxHelper( object, 0xffff00 );
    scene.add( box );







    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap

    
    switch(idProduct){
        case '0':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 20;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 35;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 35;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 20;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(-10, 3, 10)
            lightSun(scene, 6)
            shadowLight(scene, renderer)
            rectLight (scene, 2, 10, 0, 0)
            rectLight (scene, 2,5, 5, 0, -50)
            break;
        case '1':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 60;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 60;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(2, 2, 2)
            break;
        case '2':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 50;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 50;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(40, 60, 60)
            break;  
        case '4':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 40;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 40;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(2, 2, 2)
            break;
        case '5':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 60;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 60;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(2, 2, 2)
            break;
        case '6':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 45;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()    
                }else{
                    height = 300; 
                    camera.fov = 45;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(1, 1, 1)
            break;
        case '3':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 70;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 70;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(1, 1, 1)
            break;
        case '7':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 35;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 35;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(1, 1, 3)
            break;
        case '8':
            if(window.innerWidth <= 870){
                height = 300;
                camera.fov = 40;
                camera.updateProjectionMatrix();
                onWindowResize()
            }else{
                height = window.innerHeight;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                onWindowResize()
            }
            window.addEventListener('resize', function(){
                if(window.innerWidth > 870){
                    height = window.innerHeight;
                    camera.fov = 75;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }else{
                    height = 300; 
                    camera.fov = 40;
                    camera.updateProjectionMatrix();
                    onWindowResize()
                }
            })
            camera.position.set(400, 400, 400)
            break;      
    }
    

    // {
    //     const light = new THREE.DirectionalLight( 0xffffff , 0.5 );
    //     light.position.set( 0, 1, 0 ); //default; light shining from top
    //     light.castShadow = true; // default false
    //     scene.add( light );
    // }

    RectAreaLightUniformsLib.init();
    function rectLight (scene, intensi, x, y, z){
        const rectLight = new THREE.RectAreaLight(0xffffff, intensi, 25, 25);
        rectLight.position.set(x, y, z)
        rectLight.rotation.y = Math.PI/2;
        scene.add(rectLight)
        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
    }
    
    function rectLight (scene, intensi, x, y, z){
        const rectLight = new THREE.RectAreaLight(0xffffff, intensi, 100, 100);
        rectLight.position.set(x, y, z)
        rectLight.rotation.y = Math.PI/1.5;
        scene.add(rectLight)
        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
    }
   

    //OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.enableDamping = true;


    function animate() {
        requestAnimationFrame(animate)
        //controls.update();
        renderer.render(scene, camera)
    }
    animate()
}

init()




function shadowLight(scene, renderer){
    //const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap

    //Create a PointLight and turn on shadows for the light
    const light = new THREE.PointLight( 0x000000, 1, 100 );
    light.position.set( -5, 3, 5);
    light.castShadow = true; // default false
    scene.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
}




function lightSun(scene, intensi){
    const light = new THREE.DirectionalLight(0xffffff, intensi) 
    light.position.set(-5, 3, 5)
    light.lookAt(0, -1, 0)
    scene.add(light)

    //Helper
    // const helper = new THREE.DirectionalLightHelper(light, 5)
    // scene.add(helper)
}

const prodName = document.querySelector('.product-name')
const aboutProduct = document.querySelector('.about-product-3d')


function buildAboutProd (){
    aboutProduct.insertAdjacentHTML("beforeend", 
    `<p class='about-product__subtitle '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>`
    )
}
buildAboutProd ()


function buildMainBlock (){
    prodName.insertAdjacentHTML("beforeend", 
    `<h1 class='about-product__header '>Product ${idProduct}</h1>`
    )
}
buildMainBlock ()