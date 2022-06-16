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





let slider = document.getElementById('slider');
let slide = document.getElementById('cont-slide');
let widthImg = document.getElementById('width-img');
let count = 0;


slider.onclick = function (event) {
	let target = event.target;
	let widthElem = widthImg.offsetWidth;

	console.log(widthElem)
	if (target.classList.contains('arrow') || (target.tagName = 'SVG') || (target.tagName = 'PATH')) {


		if (target.classList.contains('left') && count > widthElem * (-5)) {
			count -= widthElem;

			slide.style.cssText = `transform: translate3d(${count}px, 0px, 0px);
		transition-duration: 1195ms;`;



		} else if (target.classList.contains('right') && count < widthElem * 2) {
			count += widthElem;
			slide.style.cssText = `transform: translate3d(${count}px, 0px, 0px);
		transition-duration: 1195ms;`;


		} else {

			return
		}
	}
}
