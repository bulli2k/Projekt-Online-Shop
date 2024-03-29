// Array von der Datei "products.js" importiert
import {productsW} from "./products.js";
import {createProductElement, deleteItemFromCart, storageKey} from "./components.js";

//HTML id "product-container" wird der Variable "productsContainer" zugewiesen
const productsContainer = document.getElementById('product-container');
//HTML id "cart-header" wird der Variable cartHeader zugewiesen
const cartHeader = document.getElementById('cart-header');
//HTML id "cart-body" wird der Variable cartBody zugewiesen
const cartBody = document.getElementById('cart-body');
//HTML id "cart-bottom" wird der Variable cartBottom zugewiesen
const cartBottom = document.getElementById('cart-bottom');

//Funktion showCart wird aufgerufen
showCart();

//Funktion showProducts wird aufgerufen
showProducts();

/**
 * 1. Es wird durch das Array itiriert.
 *    - Es wird die Funktion createProductElement auf die Variable product zugewiesen
 *    - ein EventListener mit dem event "click" wird dem product zugewiesen
 *        - if bedingung die überprüft ob der "click" auf dem BUTTON war
 *        - Vom Product wird auf das Size-Options das erste Element die ausgewählte value zugegriffen
 *        - Wenn "click" auf BUTTON war dann wird die function "addItemToCart" aufgerufen
 *        - Beim Betätigen des Buttons wird die Checkout box von hidden zu visible
 *        - Beim initalisieren des Warenkorbs ist die Checkout box hidden
 *        - product wird als childElement dem productsContainer zugewiesen um die Produkte anzeigen zu lassen
 */
function showProducts() {

  productsW.forEach((item) => {
    const product = createProductElement(item);

    product.addEventListener("click", function (event) {
      if (event.target.tagName === 'BUTTON') {
        const selectedSize = product.querySelector('.size-options').value;
        addItemToCart(item, selectedSize);
      }
    })
    productsContainer.appendChild(product);

  })
}

/**
 *
 * Wir holen uns die Daten aus dem Localstorage (string | null) und parsen diese zu einem Objekt.
 * Im Array wird nach dem zum Parameter "name" und "size" passenden Objekt gesucht und der variable "existingProduct zugewiesen.
 * if bedingung die überprüft ob es schon ein item mit dem selben namen  gibt
 *      Wenn es sie gibt dann wird die quantity um 1 erhöht
 *      Sonst Objekt "newEntry" mit den Properties "id, name, price, image, size, quantity" die vom Array Products gezogen werden
 *      newCartItem wird in das Array gepusht
 *      Localstorage wird aktualisiert
 *      showCart funktion wird aufgerufen
 */

function addItemToCart(product, selectedSize) {
  const itemData = JSON.parse(localStorage.getItem(storageKey)) || [];

  const existingProduct = itemData.find((item) => item.name === product.name && item.size === selectedSize);

  if (existingProduct) {

    existingProduct.quantity += 1;
  } else {

    const newCartItem = {
      id: crypto.randomUUID(),
      name: product.name,
      price: product.price,
      image: product.images,
      size: selectedSize,
      quantity: 1,
      stateVisible: true,
    };
    itemData.push(newCartItem);
  }

  localStorage.setItem(storageKey, JSON.stringify(itemData));

  showCart();
}

//
// ein EventListener mit dem event "click" wird dem cartBody zugewiesen
//  - if  bedingung die überprüft ob der click auf einer CSS-Klasse war
//  - Function "deleteItemFromCart" wird aufgerufen
//  - Function "showCart" wird aufgerufen

cartBody.addEventListener("click", function (event) {
  if (event.target.classList.contains('btn-action')) {
    deleteItemFromCart();
    showCart();
  }
})


/**
 * 1. Wir holen uns die Daten aus dem Localstorage (string | null) und parsen diese zu einem Objekt.
 * 2. cartBody wird 0 gesetzt
 * 3. Variable TotalPrice die eine 0 Speichert
 * 4. Variable totalQuantity die eine 0 Speichert
 * 5. null-check
 * 6. Iteration der Daten (forEach)
 * 7.  - price multipliziert mit quantity vom Array werden mit totalPrice addiert
 *     - totalQuantity und quantity vom array werden zusammen addiert
 *     - HTML Element "div" wird erstellt und der Variable "cartItem" zugwiesen
 *     - CSS Klasse "cart-item" wird cartItem zugewiesen
 *     - Image, Name, Size,itemCount,Price action buttons werden dem innerHTML von cartItem zugewiesen
 *     - cartItem wird dem cart als childElement dem cartBody zugewiesen um die Elemente im Cart anzeigen zu lassen.
 */
function showCart() {

  const itemData = JSON.parse(localStorage.getItem(storageKey));

  cartBody.innerHTML = '';

  let totalPrice = 0;
  let totalQuantity = 0;

  if (itemData) {
    itemData.forEach((product) => {

      totalPrice += product.price * product.quantity;
      totalQuantity += product.quantity;

      let cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.id = product.id;
      cartItem.innerHTML = `

      <img id="cart-image" src ="img/${product.image}" alt="bild">
      <div class="item-div">
      <span class="item-title">${product.name}</span>
      <div  class="item-size">Size:      ${product.size}</div>
      <span class="price">Price:   ${product.price}€</span>
      <div class="amount">
        <button class="btn-quantity" id="decrement" data-id='${product.id}'>-</button>
        <span class="item-count">${product.quantity}</span>
        <button class="btn-quantity" id="increment" data-id='${product.id}'>+</button>
      </div>
      <button class="btn-action">Delete</button>

      </div>
      `;

      cartBody.appendChild(cartItem);

      /**
       * im innerHTML von cartItem wird die span elements "item-count" der Variable itemCount zugewiesen
       * im innerHTML von cartItem wird auf den button mit der id "increment" ein eventListener getan mit dem typ "click"
       *    Pro Klick:
       *     - Wird die quantity  um 1 addiert
       *     - Wird die quantity vom Array dem innerText vom itemCount zugewiesen
       *     - Wird totalQuantity um 1 Item addiert
       *     - Wird totalPrice mit dem product price addiert
       *     - Im Header des Warenkorbes werden jeweils die Quantity und Price von allen Items aktualisiert
       *     - Im Bottom des Warenkorbes wird nur der Gesamtpreis aktualisiert
       */

      const itemCount = cartItem.querySelector(".item-count")
      cartItem.querySelector("#increment").addEventListener("click", () => {
        product.quantity++;
        itemCount.innerText = product.quantity;
        totalQuantity++;
        totalPrice += product.price;
        document.getElementById('cart-total').innerText = `(${totalQuantity} items)`;
        document.getElementById('total-price').innerText = `${totalPrice}€`;
        localStorage.setItem(storageKey, JSON.stringify(itemData));
      });

      /**
       * im innerHTML von cartItem wird auf den button mit der id "decrement" ein eventListener getan mit dem typ "click"
       * if bedingung die überprüft ob quantity größer oder gleich 0 ist, wenn es größer null ist dann:
       *    Pro Klick:
       *     - Wird die quantity um 1 subtrahiert
       *     - Wird die quantity vom Array dem innerText vom itemCount zugewiesen
       *     - Wird totalQuantity um 1 Item subtrahiert
       *     - Wird totalPrice mit dem produkt price subtrahiert
       *     - Im Header des Warenkorbes werden jeweils die Quantity und Price von allen Items aktualisiert
       *     - Im Bottom des Warenkorbes wird nur der Gesamtpreis aktualisiert
       */

      cartItem.querySelector("#decrement").addEventListener("click", () => {
        if (product.quantity <= 0) {
          deleteItemFromCart(product.id);
          showCart();
          return;
        }
        product.quantity--;
        itemCount.innerText = product.quantity;
        totalQuantity--;
        totalPrice -= product.price;
        document.getElementById('cart-total').innerText = `(${totalQuantity} items)`;
        document.getElementById('total-price').innerText = `${totalPrice}€`;
        localStorage.setItem(storageKey, JSON.stringify(itemData));
      })
    })
  }

  // Hier wird dem innerHTML des cartHeader zugewiesen
  // - div klasse titel
  // - div id mit dem Gesamtpreis und Gesamtprodukten


  cartHeader.innerHTML = `
    <div class="cart-title">CART</div>
    <div id="cart-total">(${totalQuantity} items)</div>
  `;

  //  - Hier wird dem innerHTML des cartBottom zugewiesen
  //  - Linie für eine Visuelle trennung zum Body
  //  - span id mit dem Gesamtpreis
  //  - Button "checkout" der einen auf eine andere Seite bringt um zu Zahlen


  cartBottom.innerHTML = `

   <span id="total-price">${totalPrice}€</span>
    <button class="check-out" id="check-Out"><a href="checkout.html" target="_blank" >Check Out</a></button>

 `;

  // Hier wird eine CSS-Klasse dem cartHeader zugewiesen
  cartHeader.classList.add('cart-header');
}

/**
 *  Es wird durch das Array itiriert und konvertiert das Product Objekt in den folgenden String
 *  Und wird der Variable "valueString" zugewiesen
 *  Der Funktion wird der darauf folgende String wiedergegeben
 *  Entfernt nach ausführen der Funktion die Komma zwischen jedem Produkt
 *  ValueString wird dem innerHTML von productsContainer zugewiesen
 *  AddToCart funktion wird aufgerufen
 *
 *
 * @param products
 */


export function displayItems(products, shadowRoot) {
  productsContainer.innerHTML = products.map((product) => {
    return `
       <div class="product">
      <img src ="img/${product.images}" alt="bild">
      <div class="product-wrap">
      <span class="title">${product.name}</div>
      <div class="size">Size:
        <select class="size-options">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        </div>
      <span class="price">${product.price}€</span>
      <div class="wrap-button">
      <button class="btn-action">Add to Cart</button>
      </div>
      </div>
      `;

  })
      .join('');
  AddToCartListeners(shadowRoot);
}

//  * Die Klasse "btn action" wird auf jeden Button zugewiesen
//  * Fügt für jeden Button ein event listener hinzu mit dem event click
//  * Findet das Parent Element von dem geklickten Buttons
//  * Das gefundene Produkt Element von der ausgewählten Größe wird auf einer Variable zugewiesen
//  * Suche nach dem entspechenden Produkt im products array basierend auf dem Produktnamen
//  * Ruft die Funktion addItemToCart auf
//  * Ruft die FUnktion ShowCart auf

function AddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.btn-action');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      const productElement = event.target.closest('.product');
      const selectedSize = productElement.querySelector('.size-options').value;
      const selectedProduct = products.find((item) => item.name === productElement.querySelector('.title').textContent);
      addItemToCart(selectedProduct, selectedSize);
      showCart();
    });
  });
}


/**s
 * ToDo:
 * Nachdem man auf der Men oder Women seite ist sollen sich die Filterisierungen nur auf die jeweiligen Produkte dann beziehen
 *
 *
 * Wiederverwendbarer Code in anderen Dateien tuhen(reusable components), header wiederverwendbar machen    x
 * Kenntlich machung auf welcher seite man ist x
 */
