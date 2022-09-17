import jsonConfig from "../data/data-main-swiper-about.json" assert {type:"json"};
console.log(jsonConfig)

const mainSwiperAbout = document.querySelectorAll('.main-swiper__about');
const addBlockMainSwiper = document.getElementById('main-hover-about');
const mainHoverContent = document.getElementById('main-hover-content');
console.log(mainSwiperAbout)


for(let i = 0; i < mainSwiperAbout.length; i++){
    console.log(mainSwiperAbout[i])
    mainSwiperAbout[i].addEventListener('click', ()=>{
        console.log('sas')
        mainHoverContent.insertAdjacentHTML('afterbegin', getCoord(jsonConfig, i))
        addBlockMainSwiper.style.top = '0px';
        addBlockMainSwiper.style.right = '0px';
        
    })
}

function getCoord(obj, index){
    while (mainHoverContent.firstChild) {
        mainHoverContent.removeChild(mainHoverContent.firstChild);
    }
    return(
        `<div class="main-swiper__header">
            ${obj[index].header}
        </div>

        <div class="main-swiper__img">
            <img src="${obj[index].img}" alt="${obj[index].header}">
            
        </div>
        <div class="main-swiper__price">
            <div class="main-swiper__price-new">
                ${(obj[index].price || "")}
            </div>

            <div class="main-swiper__price-old">
                ${(obj[index].oldPrice || "")}
            </div>
        </div>
        

        <div class="main-swiper__subtitle">
            ${obj[index].subtitle}
		</div>
        <div class="main-swiper__btn">
            <button class="main-swiper__btn-buy">Buy</button>
		    <button class="main-swiper__btn-add">Add to cart</button>
        </div>
        `
    );
}

addBlockMainSwiper.addEventListener('click', (e)=>{
    if(e.target.classList.contains("bg") || e.target.classList.contains("x-mark")){
        addBlockMainSwiper.style.top = '-100%';
        addBlockMainSwiper.style.right = '-100%';
    }
})