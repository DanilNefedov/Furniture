import jsonConfig from "./data-main-swiper-about.json" assert {type:"json"};
console.log(jsonConfig)

export let a = jsonConfig
const mainSwiperAbout = document.querySelectorAll('.main-swiper__about');


for(let i = 0; i < mainSwiperAbout.length; i++){
    mainSwiperAbout[i].addEventListener('click', ()=>{
        console.log(i)
    })
}


