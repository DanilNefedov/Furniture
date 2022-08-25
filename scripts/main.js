const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
const rotate = document.getElementById('rotate')
const widthWind = window.screen.width;





menu.addEventListener('click', open);

function open(e) {
	e.preventDefault();
	menu.classList.toggle('active');
	nav.classList.toggle('act-nav');
	rotate.classList.toggle('rotate-active');
	document.body.classList.toggle('scroll');
}

window.addEventListener('resize', function () {

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
	let widthElem = widthImg.offsetWidth + 32;
	let num = target.dataset.slide;



	if (target.classList.contains('main-swiper__dot')) {

		for (let i = 0; i < dot.length; i++) {
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

			for (let i = 0; i < dot.length; i++) {
				if (dot[i].classList.contains('active-pag')) {
					dot[i - 1].classList.add('active-pag')
				}
				dot[i].classList.remove('active-pag');
			}


			slide.style.cssText = `transform: translate3d(${position}px, 0px, 0px);
			transition-duration: 1195ms;`;


		} else if (target.classList.contains('right') && position > widthElem * (-2)) {
			position -= widthElem;

			slide.style.cssText = `transform: translate3d(${position}px, 0px, 0px);
			transition-duration: 1195ms;`;



			for (let i = 0; i < dot.length; i++) {


				if (dot[i].classList.contains('active-pag')) {

					dot[i].classList.remove('active-pag');
					dot[i + 1].classList.add('active-pag');
					return;
				}
			}

		} else {
			return
		}
	}

}





const sliderRoom = document.getElementById('slider-room');
const slideRoom = document.getElementsByClassName('rooms-swiper__elem');
const dotRoom = document.getElementsByClassName('dot-room');
const roomSwiperImg = document.getElementById('room-swiper-img');
let positionRoom = 0;


sliderRoom.onclick = function (event) {
	let target = event.target;
	let num = target.dataset.room;
	let widthElem = roomSwiperImg.offsetWidth + 25;
	

	if (target.classList.contains('dot-room')) {

		for (let i = 0; i < dotRoom.length; i++) {
			dotRoom[i].classList.remove('active-pag');
		}
		target.classList.add('active-pag');

		transformElement();

		if (num > 0) {
			positionRoom = widthElem * (-num);

			for (let i = 0; i < slideRoom.length; i++) {
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}

		} else if (num === '0') {
			positionRoom = 0;
			for (let i = 0; i < slideRoom.length; i++) {
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}
		}
	}







	if (target.classList.contains('arrow') || (target.tagName = 'SVG') || (target.tagName = 'PATH')) {

		
	
	
	if (target.classList.contains('left') && (Math.floor(-positionRoom) >= Math.floor(widthElem))) {
			positionRoom += widthElem;

			for (let i = 0; i < slideRoom.length; i++) {
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}
			
			for (let i = dotRoom.length-1; i >= 0; i--) {
				if (dotRoom[i].classList.contains('active-pag') && i > 0) {
					dotRoom[i - 1].classList.add('active-pag');
					dotRoom[i].classList.remove('active-pag');
					transformElement();
					return
				}	
			}
	

		} else if (target.classList.contains('right') && (Math.floor(positionRoom) >= Math.floor(widthElem * -2)) ){
			positionRoom -= widthElem;

			for (let i = 0; i < slideRoom.length; i++) {
				slideRoom[i].style.cssText = `transform: translate3d(${positionRoom}px, 0px, 0px);
				transition-duration: 1195ms;`;
			}

			for (let i = 0; i < dotRoom.length; i++) {

				if (dotRoom[i].classList.contains('active-pag') && i < 3) {
					dotRoom[i].classList.remove('active-pag');
					dotRoom[i + 1].classList.add('active-pag');
					transformElement();
					return;
				}
			}

		} else {
			return
		}
	}
}

function transformElement() {
	for (let i = 0; i < dotRoom.length; i++) {
		slideRoom[i].classList.remove('active-elem-room')
		if (dotRoom[i].classList.contains('active-pag')) {
			slideRoom[i].classList.add('active-elem-room');
		}
	}
}









const carouselSlide = document.getElementById('wrapper-slider');
const carouselElem = document.querySelectorAll('.tip-trik-swiper__slide');
const dotTipTrik = document.getElementsByClassName('dot-tip-trik');


const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


let counter = 1;
let widthElemTipTrik = carouselElem[0].offsetWidth;


carouselSlide.style.cssText = `transform: translate3d(${-widthElemTipTrik * counter}px, 0px, 0px);`;


nextBtn.addEventListener('click', () => {
	if (counter >= carouselElem.length - 1) return;
	counter++;
	carouselSlide.style.cssText = `transform: translate3d(${-widthElemTipTrik * counter}px, 0px, 0px);
	transition-duration: 695ms;`;

	for (let i = 0; i < dotTipTrik.length; i++) {
		let length = dotTipTrik.length;
		if (dotTipTrik[i].classList.contains('active-pag')) {
			if (dotTipTrik[length - 1].classList.contains('active-pag')) {
				dotTipTrik[i].classList.remove('active-pag')
				dotTipTrik[0].classList.add('active-pag')
			} else {
				dotTipTrik[i].classList.remove('active-pag')
				dotTipTrik[i + 1].classList.add('active-pag')
				return
			}
		}
	}
});


prevBtn.addEventListener('click', () => {
	if (counter <= 0) return;
	counter--;
	carouselSlide.style.cssText = `transform: translate3d(${-widthElemTipTrik * counter}px, 0px, 0px);
	transition-duration: 695ms;`

	for (let i = dotTipTrik.length - 1; i >= 0; i--) {
		let length = dotTipTrik.length;
		if (dotTipTrik[i].classList.contains('active-pag')) {
			if (dotTipTrik[0].classList.contains('active-pag')) {
				dotTipTrik[i].classList.remove('active-pag')
				dotTipTrik[length - 1].classList.add('active-pag')
			} else {
				dotTipTrik[i - 1].classList.add('active-pag')
				dotTipTrik[i].classList.remove('active-pag')
				return
			}
		}
	}
});


carouselSlide.addEventListener('transitionend', () => {
	if (carouselElem[counter].id === 'last-clone') {
		carouselSlide.style.transitionDelay = 'none';
		counter = carouselElem.length - 2;
		carouselSlide.style.cssText = `transform: translate3d(${-widthElemTipTrik * counter}px, 0px, 0px);`;
	}
	if (carouselElem[counter].id === 'first-clone') {
		carouselSlide.style.transitionDelay = 'none';
		counter = carouselElem.length - counter;
		carouselSlide.style.cssText = `transform: translate3d(${-widthElemTipTrik * counter}px, 0px, 0px);`;
	}
});


function tipTrikPagination(event) {
	let target = event.target;
	let dataSet = target.dataset.dotTipTrik;
	counter = Number(dataSet) + 1;
	for (let i = 0; i < dotTipTrik.length; i++) {
		dotTipTrik[i].classList.remove('active-pag')
		dotTipTrik[dataSet].classList.add('active-pag')
		carouselSlide.style.cssText = `transform: translate3d(${-widthElemTipTrik * counter}px, 0px, 0px);
		transition-duration: 695ms;`
	}

}













const furnituraImg = document.getElementById('furnitura-img');
const svg = document.getElementById('svg')




furnituraImg.addEventListener('mouseover', (e) => {
	if (e.target.dataset.index && e.target.id != 'furnitura-img' && e.target.id != 'svg' ) {//&& e.target.id != 'asd'
		let index = e.target.dataset.index;
		let elemTop = e.target.getBoundingClientRect().top - furnituraImg.getBoundingClientRect().top;
		let elemRight = furnituraImg.getBoundingClientRect().right - e.target.getBoundingClientRect().right;
		let elemWidth = e.target.getBoundingClientRect().width;
		let elemHeight = e.target.getBoundingClientRect().height;

		furnituraImg.insertAdjacentHTML('afterbegin', addHoverImg(index, elemTop, elemRight, elemWidth, elemHeight))
	} else {

		return
	}
})




function addHoverImg(index, elemTop, elemRight, elemWidth, elemHeight) {
	furnituraImg.removeChild(furnituraImg.firstChild)
	return (
		`<img src="img/fur-${index}.jpg" alt="furnitura" id="asd" class="furnitura-hover-img" 
		style = "top:${Math.floor(elemTop)}px; right:${Math.floor(elemRight)}px; 
		width:${Math.floor(elemWidth)}px; height:${Math.floor(elemHeight)}px;"
		/>`
	)
}








const account = document.getElementById('account');
const heart = document.getElementById('heart');
const cart = document.getElementById('cart');


let openAcc = false;
account.addEventListener('click', () => {
	let width = this.innerWidth;
	if (openAcc && width <= 580) {
		heart.style.cssText = `transform: translate(0, 0);
		transition: .3s;`;
		cart.style.cssText = `transform: translate(0, 0);
		transition: .3s;`;
		openAcc = false;
	} else if(width <= 580) {
		heart.style.cssText = `transform: translate(-35px, 40px);
		transition: .3s`;
		cart.style.cssText = `transform: translate(35px, 40px);
		transition: .3s;
		top:-2px`;
		openAcc = true;
	}
})








