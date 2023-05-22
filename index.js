const getProducts = 'https://www.mamezi.pl/praca/front/products/data.json'
const selectInput = document.querySelector('#perPage')
const productWrapper = '#products'
const paginationWrapper = '#pagination'
const templateBuilder = (product) => {
    return `
    <li class="product">
    <a href="product_link" class="link">
      <article class="product-item">
        <div class="product_addons">
            <div class="product__count">
                <img class="img/basket.svg">
                <span class="item__count">Sztuk: 1</span>
            </div>

            <div class="product_yousave">
                Oszczędzasz <span class="yousave__text">${product.price.gross.base_float - product.price.gross.promo_float} zł </span>
            </div>
        </div>
        <div class="product_img">
            <img src="https://www.mamezi.pl/praca/front/products/upload/${product.main_image}.png" class="product__img" alt="product 1">
        </div>
        
        <div class="product__prices">
            <span class="price --discount">
                ${product.price.gross.promo_float} zł
            </span>
            <span class="price --high">
            ${product.price.gross.base_float} zł
            </span>
        </div>
        
        <h2 class="product__name">${product.name}</h2>
        
        <div class="product__comments">${product.producer.name}</div>
      </article>
    </a>
  </li>`
}
const paginationBuilder = (pageNumber) => {
    return `<a href="#" class="pagination_item" id="page-${pageNumber}" value="${pageNumber}">${pageNumber}</a>`
}

const getData = (url) => {
    return fetch(url).then((response) => {
        return response.json();
    }).catch((e) => console.log('error', e))
}

const buildProductGrid =  (selector, url, perPage = 8, page = 0) => {
    document.querySelector(productWrapper).innerHTML = ''
    getData(url).then((products) => {
        const pages = Math.ceil(products.list.length / perPage)
        let productsList = showLimitedProducts(page, perPage, products.list)
        let productsTemplate = ''
        productsList.forEach(product => {
            productsTemplate += templateBuilder(product)
        });
        document.querySelector(selector).insertAdjacentHTML('beforeend', productsTemplate)
        if (pages > 1) {
            buildPagination(pages);
        }
    })
}
buildProductGrid(productWrapper, getProducts);

const showLimitedProducts = (page, perPage, productsList) => {
    const start = perPage * page
    const end = perPage * (page + 1)
    return productsList.slice(start, end)
}

selectInput.addEventListener('change', (event) => {
    buildProductGrid(productWrapper, getProducts, event.target.value, 0)
})

const buildPagination = (pageCount) => {
    document.querySelector(paginationWrapper).innerHTML = ''
    for(let i = 1; i < pageCount+1; i++) {
        document.querySelector(paginationWrapper).insertAdjacentHTML('beforeend', paginationBuilder(i))
        document.querySelector(`#page-${i}`).addEventListener('click', (e) => {
            e.preventDefault()
            buildProductGrid(productWrapper, getProducts, selectInput.value, i - 1)
        })
    }
}

let endOfPromo = new Date('05/31/2023 11:17 PM');

    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
    let timer;

    function timerPromo() {
        let now = new Date();
        let diff = endOfPromo - now;
        if (diff < 0) {

            clearInterval(timer);
            document.getElementById('timer').innerHTML = 'KONIEC PROMOCJI!!';

            return;
        }
        let days = Math.floor(diff / _day);
        let hours = Math.floor((diff % _day) / _hour);
        let minutes = Math.floor((diff % _hour) / _minute);
        let seconds = Math.floor((diff % _minute) / _second);

        document.getElementById('timer_days').innerHTML = "<span class='timer_txt'>" + days +"</span>" + '<span> dni</span>';
        document.getElementById('timer_hours').innerHTML = "<span class='timer_txt'>" + hours +"</span>" + '<span> godz.</span>';
        document.getElementById('timer_minutes').innerHTML = "<span class='timer_txt'>" + minutes +"</span>" + '<span> min</span>';
        
        if(hours > 9){
            document.getElementById('timer_hours').innerHTML = "<span class='timer_txt'>" + hours +"</span>" +'<span> godz.</span>';
        }
        else{
            document.getElementById('timer_hours').innerHTML = "<span class='timer_txt'>" + 0 + hours +"</span>" +'<span> godz.</span>';
        }

        if(minutes > 10){
            document.getElementById('timer_minutes').innerHTML = "<span class='timer_txt'>" + minutes +"</span>" +'<span> min</span>';
        }
        else{
            document.getElementById('timer_minutes').innerHTML = "<span class='timer_txt'>" + 0 + minutes +"</span>" +'<span> min</span>';
        }


        if(seconds > 9){
            document.getElementById('timer_seconds').innerHTML = "<span class='timer_txt'>" + seconds +"</span>" +'<span> sek.</span>';
        }
        else{
            document.getElementById('timer_seconds').innerHTML = "<span class='timer_txt'>" + 0 + seconds +"</span>" +'<span> sek.</span>';
        }
    }

    timer = setInterval(timerPromo, 1000);