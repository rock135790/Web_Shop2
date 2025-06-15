window.addEventListener('load', function () {
    let cartAmount = document.getElementsByClassName('amount');
    if(parseInt(cartAmount.innerHTML) > 0) cartAmount.style.visibility = 'visible';
    for(const productAmount of document.getElementsByClassName('product-amount')) {
        if(parseInt(productAmount.innerHTML) > 0) productAmount.style.visibility = 'visible';
    }
});

let cart = {};
function addToCart(productName) {
    let element = document.getElementById(productName);
    if (parseInt(element.innerHTML) == 0) {
        cart[productName] = 1;
        document.getElementById(productName).style.visibility = 'visible';
    } else {
        cart[productName] = parseInt(element.innerHTML) + 1;
    }
    element.innerHTML = cart[productName];
    console.log(cart);   
}

window.addEventListener('beforeunload', function () {
    // Use navigator.sendBeacon for sending data asynchronously on unload
    console.log('/cart/save');
    const data = JSON.stringify(cart);
    const blob = new Blob([data], { type: 'application/json' });
    navigator.sendBeacon('/cart/save', blob);
});