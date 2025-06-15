window.addEventListener('load', function () {
    let cartAmount = document.getElementById('amount');
    if(parseInt(cartAmount.innerHTML) > 0) cartAmount.style.visibility = 'visible';
    for(const productAmount of document.getElementsByClassName('product-amount')) {
        if(parseInt(productAmount.innerHTML) > 0) productAmount.style.visibility = 'visible';
    }
});

let cart = {};
function addToCart(productName) {
    let cartAmount = document.getElementById('amount');
    if(parseInt(cartAmount.innerHTML) == 0) {
        cart.total = 1;
        cartAmount.style.visibility = 'visible';
        cartAmount.innerHTML = 1;
    }
    else {
        cart.total = parseInt(cartAmount.innerHTML) + 1;
        cartAmount.innerHTML = cart.total;
    }
    let productAmount = document.getElementById(productName);
    if (parseInt(productAmount.innerHTML) == 0) {
        cart[productName] = 1;
        productAmount.style.visibility = 'visible';
    } else {
        cart[productName] = parseInt(productAmount.innerHTML) + 1;
    }
    productAmount.innerHTML = cart[productName];
    console.log(cart);   
}

window.addEventListener('beforeunload', function () {
    console.log('/cart/save');
    const data = JSON.stringify(cart);
    const blob = new Blob([data], { type: 'application/json' });
    navigator.sendBeacon('/cart/save', blob);
});