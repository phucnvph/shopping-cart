let cart = JSON.parse(localStorage.getItem('CART')) || []; // Lấy dữ liệu CART từ localStorage hoặc khởi tại Array
renderCart();
renderTotalOrder();

function renderCart() {
    cart.forEach(function (element, index) {
        let tr = document.createElement('tr');
        tr.setAttribute('data-index', index);
        tr.innerHTML = `
            <th scope="row">${cart[index].id}</th>
            <td>IPHONE 10</td>
            <td>
                <img width="100px" height="100px"
                    src="${cart[index].image}">
            </td>
            <td>
            ${cart[index].price}
            </td>
            <td>
                <input min="1" onchange="changeQuantity(this, ${index})" style="width: 100px;" type="number" class="form-control" value="${cart[index].quantity}">
            </td>
            <td>
                <button class="btn btn-danger" onclick="removeIndex(${index})">x</button>
            </td>
        `;
        document.getElementById('cart').appendChild(tr);
    });
}

function changeQuantity(e, index) {
    let quantity = e.value;
    cart[index].quantity = quantity;
    localStorage.setItem('CART', JSON.stringify(cart));
    renderTotalOrder();
}

function removeIndex(index) {
    if (!confirm('Remove item ?')) {
        return;
    }
    // Remove DOM
    const element = document.querySelector(`#cart tr[data-index="${index}"]`);
    element.remove();

    // Remove item in CART
    cart.splice(index, 1);
    localStorage.setItem('CART', JSON.stringify(cart));
    renderTotalOrder();
}

function clearCart() {
    if (!confirm('Remove all item ?')) {
        return;
    }
    cart = [];
    localStorage.removeItem('CART');
    document.getElementById('cart').innerHTML = '';
    renderTotalOrder();
}

function renderTotalOrder() {
    const sum = cart.reduce(function (total, item) {
        return total + (Number(item.price) * Number(item.quantity));
    }, 0);
    document.getElementById('total').innerHTML = sum;
}

