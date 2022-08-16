const containerShopCart = document.querySelector('.shop-cart__container')
let counterBuildElem = 0;
let storageELem;



if (localStorage.getItem('objElem') && JSON.parse(localStorage.getItem('objElem')).length > 0) {
    storageELem = JSON.parse(localStorage.getItem('objElem'))
    buildElem(storageELem)
    subtotalCalc()
    calcClick()
}
else {
    storageELem = [];
}


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
            `<div class="shop-cart__element">
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


function subtotalCalc(){
    const subtotal = document.querySelector('.shop-cart__subtotal--amount');
    const shipping = document.querySelector('.shop-cart__shipping--amount');
    const total = document.querySelector('.shop-cart__total--amount');
    const count = document.getElementsByClassName('shop-cart__amount');
    let sum = 0;
    let countSum = 0
    for(let i = 0; i < storageELem.length; i++){
        let str = +storageELem[i].price.replace(/[\s.,%]/g, '');//0.1
        let countAmount = +count[i].innerHTML.replace(/[\s.,%]/g, '');//0.2
        if((str === 0.1 && countAmount === 0.2) || (str === 0.2 && countAmount === 0.1)){
            sum = +(str + countAmount).toFixed(2);
        }else{
            countSum = str * countAmount;
            sum += countSum;
        }
    }
    subtotal.innerHTML = sum;
    if(shipping.innerHTML !== '0'){
        sum -= +shipping.innerHTML.replace(/[\s.,%]/g, '');
        total.innerHTML = sum;
    }
}




function calcClick(){
    const cartElem= document.getElementsByClassName('shop-cart__element');

    for(let i = 0; i < cartElem.length; i++){
        cartElem[i].onclick = function(event){
            let target = event.target;
            if(target.classList.contains('shop-cart__plus')){
                plus(cartElem[i]);
            }else if(target.classList.contains('shop-cart__minus')){
                minus(cartElem[i]);
            }
        }
    }
}

let sum;//при загрузке json и отрисовки вставить, чтобы не сбивалось при перезагрузке 

function plus(elem){
    const priceElem = +elem.children[1].children[1].innerHTML.slice(2).replace(/[\s.,%]/g, '');
    const count = +elem.children[2].children[1].innerHTML.replace(/[\s.,%]/g, '');
    sum = elem.children[2].children[1].innerHTML = count + 1;
    //вызвать гибку функцию пересчета чека
    console.log(priceElem, count, sum)
}


function minus(elem){
    console.log(elem)
}