// Fake production
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        viewProduction(products);
    });

function viewProduction(products) {
    products.forEach(function (element) {
        let div = document.createElement('div');
        div.innerHTML = `<div class="col-4 pt-5">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" height="300px" loading="lazy" data-src="${element.image}"
                        src="${element.image}">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <b>${element.price}</b>$
                        <p class="card-text">Hàng Cũ</p>
                        <a
                            data-id="${element.id}"
                            data-title="${element.title}"
                            data-image="${element.image}"
                            data-price="${element.price}"
                            href="#"
                            onclick="addToCart(this);" class="btn btn-warning">
                            Add to cart
                        </a>
                    </div>
                </div>
            </div>`;
        document.getElementById('show-products').appendChild(div);
    });
}

function addToCart(e) {
    let cart = JSON.parse(localStorage.getItem('CART')) || []; // Lấy dữ liệu CART từ localStorage hoặc khởi tại Array
    let id = e.getAttribute('data-id');
    let title = e.getAttribute('data-title');
    let image = e.getAttribute('data-image');
    let price = e.getAttribute('data-price');
    let quantity = 1;
    let product = { id, quantity, title, image, price };

    // Check Product đã tồn tại trong mảng chưa
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity++;
            localStorage.setItem('CART', JSON.stringify(cart));
            return;
        }
    }

    // Push đối với lần đầu Add to cart
    cart.push(product);
    localStorage.setItem('CART', JSON.stringify(cart));
}
