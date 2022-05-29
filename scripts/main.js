const menu = document.getElementById('menu');
const nav = document.getElementById('nav').cloneNode(1);


menu.addEventListener('click', open);

function open(e){
	e.preventDefault();
	menu.classList.toggle('active');

	renderNav();
}

function renderNav(){
	menu.appendChild(nav);
}




