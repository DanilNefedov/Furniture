const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
const widthWind =  window.screen.width;

menu.addEventListener('click', open);

function open(e){
	e.preventDefault();
	menu.classList.toggle('active');

	nav.classList.toggle('act-nav');

	document.body.classList.toggle('scroll');
}

window.addEventListener('resize',function(e){

	if((innerWidth >= 1000) && (nav.classList.contains('act-nav'))){
		nav.classList.remove('act-nav');
		menu.classList.remove('active');
		document.body.classList.remove('scroll');
	}else{
		return false
	}
});



