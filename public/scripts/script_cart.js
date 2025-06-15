window.addEventListener('load', function () {
    let cartAmount = document.getElementById('amount');
    if(parseInt(cartAmount.innerHTML) > 0) cartAmount.style.visibility = 'visible';
});