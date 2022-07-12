import jsonConfig from "./data-main-swiper-about.json" assert {type:"json"};
console.log(jsonConfig)

const mainSwiperAbout = document.querySelectorAll('.main-swiper__about');
const addBlockMainSwiper = document.getElementById('main-hover-about')


for(let i = 0; i < mainSwiperAbout.length; i++){
    mainSwiperAbout[i].addEventListener('click', ()=>{
        console.log(i);
        console.log(jsonConfig[i]);

        document.body.classList.add('act-body')
        
        addBlockMainSwiper.insertAdjacentHTML('afterbegin', getCoord(jsonConfig, i))
        addBlockMainSwiper.style.top = '0';
        addBlockMainSwiper.style.right = '0';
        
    })
}

function getCoord(obj, index){
    return(
        `<div class="main-swiper__header">
            ${obj[index].header}
        </div>

        <div class="main-swiper__img">
            <img src="${obj[index].img}" alt="furnitura">
        </div>
        <div class="main-swiper__img-price">
            ${(obj[index].price || "")}
        </div>

        <div class="main-swiper__img-discount">
            ${(obj[index].discount || "")}
        </div>
        <div class="main-swiper__subtitle">
            ${obj[index].subtitle}
		</div>
        `
    );
}

