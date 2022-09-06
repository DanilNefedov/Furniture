const containerShopCart = document.querySelector('.shop-cart__container')
let counterBuildElem = 0;
let storageELem;


// --------------- burger -------------- //
const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
const rotate = document.getElementById('rotate')
// --------------- burger -------------- //

// ------------ cart header ----------- //

const cartCountHeader = document.querySelector('.cart__calc')

// ------------ cart header ----------- //

let sum;



const account = document.getElementById('account');
const heart = document.getElementById('heart');
const cart = document.getElementById('cart');


let openAcc = false;


let promoDiscount ;


window.onload = function () {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}





function loadPage() {
    if (localStorage.getItem('objElem') && JSON.parse(localStorage.getItem('objElem')).length > 0) {
        storageELem = JSON.parse(localStorage.getItem('objElem'))
        buildElem(storageELem)
        subtotalCalc()
        calcClick()
        cartCuont()
    }
    else {
        storageELem = [];
    }
}
loadPage();



window.addEventListener('storage', function () {
    storageELem = JSON.parse(localStorage.getItem('objElem'))
    let persent = 0;
    buildElem(storageELem)
    calcClick()
    cartCuont()
    subtotalCalc(persent)

    if(this.sessionStorage.getItem('discount')){
        let persent = 20;
        subtotalCalc(persent)
    }
})


function loadDiscount() {
    if (sessionStorage.getItem('discount')) {
        const discBlock = document.getElementById('discountCart')
        let persent = 20;
        promoDiscount = JSON.parse(sessionStorage.getItem('discount'))
        discBlock.value = promoDiscount
        //checkPromo()
        subtotalCalc(persent)
    } else {
        let persent = 0;
        subtotalCalc(persent)
    }
}
loadDiscount()





function buildElem(elem) {

    if (localStorage.getItem('objElem') && JSON.parse(localStorage.getItem('objElem')).length > 0 && elem.length > 0) {

        for (let i = counterBuildElem; i < storageELem.length; i++) {
            counterBuildElem++
            containerShopCart.insertAdjacentHTML("beforeend",
                `<div class="shop-cart__element" data-id="${storageELem[i].id}">
                <img src="${storageELem[i].image}" alt="#">
                <div class="shop-cart__about">
                    <p class="shop-cart__name">${storageELem[i].header}</p>
                    <p class="shop-cart__price">Rp ${storageELem[i].price}</p>
                </div>
                <div class="shop-cart__calc"> 
                    <span class="shop-cart__plus" >
                    </span>
                    <span class="shop-cart__amount">
                    1
                    </span>
                    <span class="shop-cart__minus" >
                    </span>
                </div>
            </div>
            `)
        }

    } else {
        counterBuildElem = 0;
    }
}


function subtotalCalc(persent) {
    const subtotal = document.querySelector('.shop-cart__subtotal--amount');
    const shipping = document.querySelector('.shop-cart__shipping--amount');
    const total = document.querySelector('.shop-cart__total--amount');
    const count = document.getElementsByClassName('shop-cart__amount');
    const parsentBlock = document.querySelector('.shop-cart__parsent--amount')
    let countSum = 0;
    let sumTop = 0;


    if (!count[0]) {
        subtotal.innerHTML = 0;
        total.innerHTML = 0;
        parsentBlock.classList.remove('disc-amount')
        parsentBlock.innerHTML = 0;
        if (document.querySelector('.old-price')) {
            let oldPrice = document.querySelector('.old-price')
            oldPrice.remove();
        }
    }

    for (let i = 0; i < storageELem.length; i++) {
        let priceELem = +storageELem[i].price.replace(/[\s.,%]/g, '');//0.1
        let countAmount = +count[i].innerHTML.replace(/[\s.,%]/g, '');//0.2

        countSum = priceELem * countAmount;
        sumTop += countSum;
        subtotal.innerHTML = sumTop;

    }

    if (shipping.innerHTML !== '0') {
        sumTop += +shipping.innerHTML.replace(/[\s.,%]/g, '');
        if (!count[0]) {
            total.innerHTML = 0;
        } else {
            if(persent > 0 ){
                buildOldPriceDisc(sumTop)
                let persentRes = sumTop / 100 * persent;
                sumTop = sumTop - persentRes; 
                parsentBlock.classList.add('disc-amount')
                parsentBlock.innerHTML = `${persent}%`;
                total.innerHTML = sumTop;
            }else{
                parsentBlock.classList.remove('disc-amount')
                parsentBlock.innerHTML = 0;
            }
            total.innerHTML = sumTop;
        }
    }
}




function buildOldPriceDisc(sumTop) {
    if (document.querySelector('.old-price')) {
        let oldPrice = document.querySelector('.old-price')
        oldPrice.innerText = sumTop;
        return false
    } else {
        const addDiscount = document.querySelector('.shop-cart__total')
        addDiscount.insertAdjacentHTML("beforeend",
            `<span class="old-price">${sumTop}</span>`
        )
    }
}



function calcClick() {
    const cartElem = document.getElementsByClassName('shop-cart__element');

    for (let i = 0; i < cartElem.length; i++) {
        cartElem[i].onclick = function (event) {
            let target = event.target;
            if (target.classList.contains('shop-cart__plus')) {
                plus(cartElem[i]);
            } else if (target.classList.contains('shop-cart__minus')) {
                minus(cartElem[i]);
            }
        }
    }
}



function plus(elem) {
    const count = +elem.children[2].children[1].innerHTML.replace(/[\s.,%]/g, '');
    sum = elem.children[2].children[1].innerHTML = count + 1;
    loadPage();
    loadDiscount()
    //subtotalCalc()
}


function minus(elem) {
    const reloadElem = document.getElementsByClassName('shop-cart__element');
    const count = +elem.children[2].children[1].innerHTML.replace(/[\s.,%]/g, '');
    if (count === 1 && elem) {
        let idProduct = elem.dataset.id
        for (let i = 0; i < storageELem.length; i++) {
            if (storageELem[i].id === idProduct) {
                storageELem.splice(i, 1);
                let localELem = JSON.parse(localStorage.getItem('objElem'));
                localELem.splice(i, 1);
                localStorage.setItem('objElem', JSON.stringify(storageELem));
                reloadElem[i].remove();
                counterBuildElem -= 1;
                loadPage();
                loadDiscount()
                //subtotalCalc()
            }
        }
    } else {
        sum = elem.children[2].children[1].innerHTML = count - 1;
        loadDiscount()
        //subtotalCalc()
    }
}





// ------------- burger ------------ //

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

// ------------- burger ------------ //




// ------------- account ---------- //





account.addEventListener('click', () => {
    let width = this.innerWidth;
    if (openAcc && width <= 580) {
        heart.style.cssText = `transform: translate(0, 0);
		transition: .3s;`;
        cart.style.cssText = `transform: translate(0, 0);
		transition: .3s;`;
        openAcc = false;
    } else if (width <= 580) {
        heart.style.cssText = `transform: translate(-35px, 40px);
		transition: .3s`;
        cart.style.cssText = `transform: translate(35px, 40px);
		transition: .3s;
		top:-2px`;
        openAcc = true;
    }
})

// ------------- account ---------- //


// ----------- cart header --------- //


function cartCuont() {
    let amount = storageELem.length;
    cartCountHeader.innerHTML = amount;
}
cartCuont();

// ----------- cart header --------- //




function checkPromo() {
    const promo = document.getElementById('discountCart')
    let valuePromo = promo.value;
    const reg = /^[A-Z0-9]{3,5}$/;
    const res = valuePromo.match(reg)

    
    if (res === null ){
        let present = 0;
        promo.style.cssText = 'border: 2px solid red; color: red'
        valuePromo = 'Wrong promo code';
        promoDiscount = '';
        if(sessionStorage.getItem('discount')){
            sessionStorage.clear('discount')
        }
        subtotalCalc(present)
        
    } else {
        promo.style.cssText = 'border-color: transparent; color: $black'
        promoDiscount = valuePromo;
        sessionStorage.setItem('discount', JSON.stringify(promoDiscount))
        loadDiscount()
    }
    console.log(promoDiscount)
}



