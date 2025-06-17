window.addEventListener("load", function () {
    let cartAmount = document.getElementById("amount");
    if (parseInt(cartAmount.innerHTML) > 0)
        cartAmount.style.visibility = "visible";
});

function removeProduct(productName, event) {
    event.preventDefault();
    fetch(`/cart/remove/${productName}`, {
        method: "DELETE",
    }).then((response) => {
        if (response.ok) {
            location.reload();
        }
    });
}

function addProduct(productName, event) {
    event.preventDefault();
    fetch(`/cart/add/${productName}`, {
        method: "POST",
    }).then((response) => {
        if (response.ok) {
            location.reload();
        }
    });
}

function dumpProducts(event) {
    event.preventDefault();
    fetch("/cart/removeAll", {
        method: "DELETE",
    }).then((response) => {
        if (response.ok) {
            location.reload();
        }
    });
}
