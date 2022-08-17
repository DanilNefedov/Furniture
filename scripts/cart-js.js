const containerShopCart = document.querySelector('.shop-cart__container')
let counterBuildElem = 0;
let storageELem;


function loadPage(){
    if (localStorage.getItem('objElem') && JSON.parse(localStorage.getItem('objElem')).length > 0) {
        storageELem = JSON.parse(localStorage.getItem('objElem'))
        buildElem(storageELem)
        subtotalCalc()
        calcClick()
    }
    else {
        storageELem = [];
    }
}
loadPage();



window.addEventListener('storage', function () {
    storageELem = JSON.parse(localStorage.getItem('objElem'))
    buildElem(storageELem)
    subtotalCalc()
    calcClick()
})


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


function subtotalCalc() {
    const subtotal = document.querySelector('.shop-cart__subtotal--amount');
    const shipping = document.querySelector('.shop-cart__shipping--amount');
    const total = document.querySelector('.shop-cart__total--amount');
    const count = document.getElementsByClassName('shop-cart__amount');
    let countSum = 0;
    let sumTop = 0;


    if(!count[0]){
        subtotal.innerHTML = 0;
        total.innerHTML = 0;
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
        if(!count[0]){
            total.innerHTML = 0;
        }else{
            total.innerHTML = sumTop;
        }
        
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

let sum;

function plus(elem) {
    const priceElem = +elem.children[1].children[1].innerHTML.slice(2).replace(/[\s.,%]/g, '');
    const count = +elem.children[2].children[1].innerHTML.replace(/[\s.,%]/g, '');
    sum = elem.children[2].children[1].innerHTML = count + 1;
    loadPage();
    subtotalCalc();
}


function minus(elem) {
    const reloadElem = document.getElementsByClassName('shop-cart__element');
    //const priceElem = +elem.children[1].children[1].innerHTML.slice(2).replace(/[\s.,%]/g, '');
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
                subtotalCalc();
            }
        }
    } else {
        sum = elem.children[2].children[1].innerHTML = count - 1;
        subtotalCalc();
    }
}