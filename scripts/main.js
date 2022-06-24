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
const dot = document.getElementsByClassName('pag-main-swiper');
let position = 0;


slider.onclick = function (event) {
	

	let target = event.target;
	let widthElem = widthImg.offsetWidth;
	let num = target.dataset.slide;

	//let sliderContent = event.path[2].childNodes[3].children;

	
	

	if (target.classList.contains('main-swiper__dot')) {

		for(let i = 0; i < dot.length; i++){
			dot[i].classList.remove('active-pag');
		}
		target.classList.add('active-pag');
		
		if (num === '0') {
			position = widthElem;
			slide.style.cssText = `transform: translate3d(${position}px, 0px, 0px);
			transition-duration: 1195ms;`;
		} else if (num > 1) {
			position = widthElem * (-num + 1);
			slide.style.cssText = `transform: translate3d(${position}px, 0px, 0px);
			transition-duration: 1195ms;`;
		} else {
			position = 0;
			slide.style.cssText = `transform: translate3d(${position}px, 0px, 0px);
			transition-duration: 1195ms;`;
		}
	}


	if (target.classList.contains('arrow') || (target.tagName = 'SVG') || (target.tagName = 'PATH')) {


		if (target.classList.contains('left') && position < widthElem * 1) {
			position += widthElem;

			for(let i = 0; i < dot.length; i++){
				if(dot[i].classList.contains('active-pag')){
					dot[i-1].classList.add('active-pag')
				}
				dot[i].classList.remove('active-pag');
			}


			slide.style.cssText = `transform: translate3d(${position}px, 0px, 0px);
			transition-duration: 1195ms;`;


		} else if (target.classList.contains('right') && position > widthElem * (-2)) {
			position -= widthElem;
			
			slide.style.cssText = `transform: translate3d(${position}px, 0px, 0px);
			transition-duration: 1195ms;`;


			
			for(let i = 0; i < dot.length; i++){
				// console.log(dot[i]);
				
				if(dot[i].classList.contains('active-pag')){
					//console.log('sss')
					dot[i].classList.remove('active-pag');
					dot[i+1].classList.add('active-pag');
					break;
				}
			}

		} else {
			return
		}
	}


	

}


const sliderRoom = document.getElementById('slider-room');
const slideRoom = document.getElementsByClassName('rooms-swiper__elem');
const dotRoom = document.getElementsByClassName('main-swiper__dot');
const roomSwiperImg = document.getElementById('room-swiper-img');
let positionRoom = 0;

sliderRoom.onclick = function (event){
	let target = event.target;
	let num = target.dataset.room;
	let widthElem = roomSwiperImg.offsetWidth * 1.2;
	
	//console.log(widthElem)
	if (target.classList.contains('main-swiper__dot')) {

		for(let i = 0; i < dotRoom.length; i++){
			dotRoom[i].classList.remove('active-pag');
		}
		target.classList.add('active-pag');
		


		if (num > 0) {
			positionRoom = widthElem * (-num);
			console.log(positionRoom)
			for(let i = 0; i < slideRoom.length; i++){
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}
			
		}else if(num === '0'){
			positionRoom = 0;
			for(let i = 0; i < slideRoom.length; i++){
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}
		}	
	}




	if (target.classList.contains('arrow') || (target.tagName = 'SVG') || (target.tagName = 'PATH')) {

		console.log(positionRoom)
		if (target.classList.contains('left') && positionRoom > 0) {
			positionRoom += widthElem;

			// for(let i = 0; i < dot.length; i++){
			// 	if(dot[i].classList.contains('active-pag')){
			// 		dot[i-1].classList.add('active-pag')
			// 	}
			// 	dot[i].classList.remove('active-pag');
			// }

			for(let i = 0; i < slideRoom.length; i++){
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}
			


		} else if (target.classList.contains('right') && (positionRoom > widthElem * -3)) {
			console.log(positionRoom);
			console.log(widthElem * 3)
			positionRoom -= widthElem;

			for(let i = 0; i < slideRoom.length; i++){
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}
			
			// for(let i = 0; i < dot.length; i++){
			// 	// console.log(dot[i]);
				
			// 	if(dot[i].classList.contains('active-pag')){
			// 		//console.log('sss')
			// 		dot[i].classList.remove('active-pag');
			// 		dot[i+1].classList.add('active-pag');
			// 		break;
			// 	}
			// }

		} else {
			return
		}
	}
}