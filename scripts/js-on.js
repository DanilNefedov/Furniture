const containerProduct = document.getElementById("container-product");
const more = document.getElementById("showMore");
let valueId = 8;
let start = 0;



async function getResponse() {
  let link = '../data/data-product.json';

  fetch(link).then(response => {
    return response.json();
  }).then(data => {
    buildElem(data);
    buildElemAddit(data);
    loadCart(data);
    more.addEventListener('click', (e) => {
      e.preventDefault();

      if (valueId < data.length) {
        start += 8;
        valueId += 8;
        buildElem(data);
        buildElemAddit(data);
      }
      // else{
      //   custom btn
      // }

    })
  }).catch(err => {
    console.error(err)

  });
}
getResponse()



function buildElem(values) {
  for (let i = start; i < values.length; i++) {
    if (i < valueId) {
      containerProduct.insertAdjacentHTML("beforeend",
        `<div class="products-list__elem" >
          <img src="${values[i].image}" alt="Syltherine" class="products-list__img">
          <div class="products-list__about">
            <h2 class="products-list__header">${values[i].header}</h2>
            <p class="products-list__subtitle">${values[i].subtitle}</p>
            <p class="products-list__price">${values[i].price}</p>
          </div>

          <div class="product-list-hover">
                <div class="product-list-hover__btn">
                  <button class="product-list-hover__add" data-id="${values[i].id}">Add to cart</button>
                </div>
                <div class="product-list-hover__link">
                  <a href="#" class="product-list-hover__share"><svg class="share" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 16C17.212 16 16.5 16.31 15.966 16.807L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.088 18.308C15.0317 18.5344 15.0022 18.7667 15 19C15 19.5933 15.1759 20.1734 15.5056 20.6667C15.8352 21.1601 16.3038 21.5446 16.8519 21.7716C17.4001 21.9987 18.0033 22.0581 18.5853 21.9424C19.1672 21.8266 19.7018 21.5409 20.1213 21.1213C20.5409 20.7018 20.8266 20.1672 20.9424 19.5853C21.0581 19.0033 20.9987 18.4001 20.7716 17.8519C20.5446 17.3038 20.1601 16.8352 19.6667 16.5056C19.1734 16.1759 18.5933 16 18 16Z"
                        fill="white" />
                    </svg>
                    Share</a>
                  <a href="#" class="product-list-hover__like"><svg class="like" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.9996 21.0541C-8 10 5.99999 -2 11.9996 5.58806C18 -2 32 10 11.9996 21.0541Z"
                        stroke="white" stroke-width="1.8" />
                    </svg>
                    Like</a>
                </div>
              </div>
        </div>
        `);

    }

  }

}


function buildElemAddit(values) {

  for (let i = start; i < values.length; i++) {
    const cont = document.querySelectorAll(".products-list__elem");
    const oldPrice = document.querySelectorAll(".products-list__price");
    if (i < valueId) {
      if (values[i].seasonOld) {
        oldPrice[i].insertAdjacentHTML("beforeend", `
          <span class="products-list__discount">${values[i].seasonOld.oldPrice}</span>
          `
        );
        cont[i].insertAdjacentHTML("afterbegin", `
          <div class="discount">${values[i].seasonOld.discount}</div>
          `
        );

      } else if (values[i].seasonNew) {
        cont[i].insertAdjacentHTML("afterbegin", `
          <div class="new">${values[i].seasonNew.new}</div>
          `
        );
      }
    }
  }

}


let arrElem =[];

if(localStorage.getItem('objElem') && JSON.parse(localStorage.getItem('objElem')).length > 0){
  arrElem = JSON.parse(localStorage.getItem('objElem'))
  loadCart(arrElem)
}else{
  arrElem = [];
}


function loadCart (data){

  containerProduct.onclick = function (event) {
    event.preventDefault();
    if(event.target.classList.contains('product-list-hover__add')){
      let idEleme = event.target.dataset.id;

      for(let i = 0; i < data.length; i++){
        if(data[i].id === idEleme){
          arrElem.push(data[i]);
          localStorage.setItem('objElem', JSON.stringify(arrElem))

        }
      }
    }
  }
}

