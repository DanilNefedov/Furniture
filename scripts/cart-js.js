const containerShopCart = document.querySelector('.shop-cart__container')
let counterBuildElem = 0;
let storageELem;
let countItems;





if (localStorage.getItem('objElem') && JSON.parse(localStorage.getItem('objElem')).length > 0) {
    storageELem = JSON.parse(localStorage.getItem('objElem'))
    counterProduct()
    buildElem(storageELem)
}
else {
    storageELem = [];
}


function counterProduct() {
    const arr = [];
    for (let i = 0; i < storageELem.length; i++) {
        arr.push(storageELem[i].id)
        countItems = arr.reduce((acc, item) => {
            acc[item] = acc[item] ? acc[item] + 1 : 1;
            return acc;
        }, {});

    }
}


window.addEventListener('storage', function () {
    storageELem = JSON.parse(localStorage.getItem('objElem'))
    counterProduct()
    buildElem(storageELem)
    console.log('www')
})



function buildElem(elem) {
    let keyCount = 0;
    let countIter = 0;
    let countProduct = 0;
    if (localStorage.getItem('objElem') && JSON.parse(localStorage.getItem('objElem')).length > 0 && elem.length > 0) {
        for (let key in countItems) {
            keyCount = key;
            countProduct = countItems[key];
            countIter++
        }

        unique = elem.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));//change name value 


        counterBuildElem = 0;

        for (let i = counterBuildElem; i < unique.length; i++) {

            counterBuildElem++
            let caountProduct = unique[i].id

            containerShopCart.insertAdjacentHTML("beforeend",
                `<div class="shop-cart__element">
                <img src="${unique[i].image}" alt="#">
                <div class="shop-cart__about">
                    <p class="shop-cart__name">${unique[i].header}</p>
                    <p class="shop-cart__price">${unique[i].subtitle}</p>
                </div>
                <div class="shop-cart__calc"> 
                    <span class="shop-cart__plus">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>                
                    </span>
                    <span class="shop-cart__amount">
                        ${countItems[caountProduct]}
                    </span>
                    <span class="shop-cart__minus">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"/></svg>                
                    </span>
                </div>
            </div>
            `)
        }

    } else {
        counterBuildElem = 0;
    }
}
