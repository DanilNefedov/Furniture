const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
const widthWind = window.screen.width;


menu.addEventListener('click', open);

function open(e) {
	e.preventDefault();
	menu.classList.toggle('active');

	nav.classList.toggle('act-nav');

	document.body.classList.toggle('scroll');
}

window.addEventListener('resize', function (e) {

	if ((innerWidth >= 1000) && (nav.classList.contains('act-nav'))) {
		nav.classList.remove('act-nav');
		menu.classList.remove('active');
		document.body.classList.remove('scroll');
	} else {
		return false
	}
});





const slider = document.getElementById('slider');
const slide = document.getElementById('cont-slide');
const widthImg = document.getElementById('width-img');
const navs = document.querySelectorAll('.nav');
const slides = document.querySelectorAll('.main-swiper__elem');
let count = 0;


slider.onclick = function (event) {
	let target = event.target;
	let widthElem = widthImg.offsetWidth;

	//console.log(target)

	if(target.classList.contains('main-swiper__dot')){
		pagination(target);
	}


	if (target.classList.contains('arrow') || (target.tagName = 'SVG') || (target.tagName = 'PATH')) {


		if (target.classList.contains('left') && count < widthElem * 1) {
			count += widthElem;

			slide.style.cssText = `transform: translate3d(${count}px, 0px, 0px);
		transition-duration: 1195ms;`;



		} else if (target.classList.contains('right') && count > widthElem * (-2)) {
			count -= widthElem;
			slide.style.cssText = `transform: translate3d(${count}px, 0px, 0px);
		transition-duration: 1195ms;`;


		} else {

			return
		}
	} 
}


function pagination(target){
	let nav = target.dataset.slide;
	//console.log(nav);
	for(let i = 0; i < slides.length; i++){
		//console.log(i.toString())

		if(nav === i.toString()){
			console.log('sss');
			slide.style.cssText = `transform: translate3d(${count}px, 0px, 0px);
			transition-duration: 1195ms;`;
			//при нажатии на кнопки пагинации сделать гибкий переход между салйдами. Пока что все по 0
		}else{
			return
		}
	}
}

// for(let nav of navs){ // перебираем коллекцию точек и на каждую вешаем обработчик кликов
// 	nav.onclick = function(){
// 		//changeSlide(+nav.dataset['slide']);
// 		console.log(nav.dataset.slide) // берет data-slide из li, на который нажали
// 	}; 
// 	// аналог nav.dataset['slide'] - nav.getAttribute('data-slide');
// }
// function changeSlide(num){
// 	for(let i = 0; i < slides.length; i++){
// 		// slides[i].classList.remove('active-pag');
// 		// navs[i].classList.remove('active-pag');
// 		console.log(slides[i], num)
// 	}
// 	// currentSlide = num;
// 	// slides[currentSlide].classList.add('active-pag');
// 	// navs[currentSlide].classList.add('active-pag');

// 	// clearInterval(interval);
// 	// autoplay();
// }
