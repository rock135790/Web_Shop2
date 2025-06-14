//pri otvaranju prozora prikazi trenutnu kategoriju (default je 0)
window.addEventListener("load", function () {
        switchCategory(parseInt(localStorage.getItem("currentCategory")) || 0);
      });
      
      //funkcija za prikazivanje kategorije oznacene indeksom
      function switchCategory(index) {
        localStorage.setItem("currentCategory", index); //spremi trenutnu kategoriju u memoriju
      
        let text = ""; //inicijalizacija teksta koji ce se spremiti kao html kod
      
        const productFigures = data.categories[index].products; //imena i slike proizvoda te kategorije
        let categoryName = data.categories[index].name; //ime kategorije
      
        document.querySelector(".current-category h1").innerHTML = categoryName; //ispis trenutne kategorije
      
        let cart = new Map(JSON.parse(localStorage.getItem("cart"))) || {}; //uzimamo cart iz memorije
        // (ili praznu mapu)
      
        let id = 0; //brojac koji ce biti id za kolicinu pojedinog proizvoda
        for (let product of productFigures) {
          text += `
            <figure>
              <div class="product-cart-amount-wrapper">
                <img src="images/${product.image}" alt="${product.name}" />
                <button onclick="addProductToCart('${product.name}', ${id})">
                  <img src="images/zuta_kosarica.jpg" alt="Košarica" />
                </button>
                <p class='product-amount' id='${id}'>
                  ${cart.get(product.name) ? cart.get(product.name) : 0}
                </p>
              </div>
              <figcaption>
                PROIZVOD: ${product.name}<br />
                KATEGORIJA: ${categoryName}
              </figcaption>
            </figure>
          `;
          id++; //povecavannje brojaca
        }
        document.querySelector(".products-wrapper").innerHTML = text; //spremanje teksta u klasu products
        updateAmount(); //poziv funkcije
      }
      
      //funkcija za obnavljanje ukupnog broja proizvoda u kosarici
      //i skrivanje svih brojaca proizvoda koji su jednaki nuli
      function updateAmount() {
        let sum = 0; //inicijalizacija sume
      
        let cart = new Map(JSON.parse(localStorage.getItem("cart"))) || {}; //uzimamo cart iz memorije
        // (ili praznu mapu)
      
        for (let product of cart.keys()) {
          sum += cart.get(product); //dodajemo kolicinu svakog proizvoda u sumu
        }
      
        document.querySelector(".amount").innerHTML = sum; //stavljamo sumu u klasu cart-amount
      
        //skrivamo cart-amount ili product-amount ako je jednak nuli
        if (sum == 0) document.querySelector(".amount").style.visibility = "hidden";
        else document.querySelector(".amount").style.visibility = "visible";
      
        for (let id = 0; id < 5; id++) {
          if (parseInt(document.getElementById(id).innerHTML) == 0)
            document.getElementById(id).style.visibility = "hidden";
          else document.getElementById(id).style.visibility = "visible";
        }
      }
      
      //funkcija za dodavanje proizvoda u kosaricu
      function addProductToCart(productName, id) {
        let cart;
        if (localStorage.getItem("cart")) {
          cart = new Map(JSON.parse(localStorage.getItem("cart")));
          if (!cart.get(productName)) {
            cart.set(productName, 1); //ako kosarica nema taj proizvod stavljamo mu kolicinu 1
          } else {
            cart.set(productName, cart.get(productName) + 1); //inace mu povecavamo kolicinu za 1
          }
        } else {
          cart = new Map();
          cart.set(productName, 1); //stvaramo kosaricu ako nije postojala
        }
        localStorage.setItem("cart", JSON.stringify([...cart])); //spremamo kosaricu u memoriju
      
        document.getElementById(id).innerHTML = cart.get(productName); //obnova kolicine na stranici
        updateAmount(); //poziv funkcije
      }
      
      //funkcija za brisanje proizvoda s kolicinom jednkom nuli
      // prije nego sto se vratimo na podstranicu kosarice
      function beforeNavigating() {
        let cart = new Map(JSON.parse(localStorage.getItem("cart")));
        for (let product of cart.keys()) {
          if (cart.get(product) === 0) cart.delete(product);
        }
        localStorage.setItem("cart", JSON.stringify([...cart]));
      
        window.location.href = "cart.html"; //odlazak na podstranicu
      }
      