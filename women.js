// Array von der Datei "products.js" importiert
import {productsW} from "./products.js";
//Localstorage Key "cart" wird der Variable "storageKey"  zugewiesen
const storageKey = 'Wcart';
//HTML id "product-container" wird der Variable "productsContainer" zugewiesen
const productsContainer = document.getElementById('product-container');
//HTML id "cart-header" wird der Variable cartHeader zugewiesen
const cartHeader = document.getElementById('cart-header');
//HTML id "cart-body" wird der Variable cartBody zugewiesen
const cartBody = document.getElementById('cart-body');
//HTML id "cart-bottom wird der Variable cartBottom zugewiesen
const cartBottom = document.getElementById('cart-bottom');
//HTML id "check-out" wird der Variable checkOut zugewiesen
const checkOut = document.getElementById('check-Out');
//Function "showCart();" wird aufgerufen
showCart();


//Function initializeProducts wird aufgerufen
showProducts();


/**
 * 1. Es wird durch das Array itiriert.
 *    - HTML Element "div" wird erstellt und der Variable "product" zugwiesen
 *    - CSS Klasse "product" wird product zugewiesen
 *    - Image, Name, Size, Quantity und Price werden dem innerHTML von product zugewiesen
 *    - ein EventListener mit dem event "click" wird dem product zugewiesen
 *        - if bedingung die überprüft ob der "click" auf dem BUTTON war
 *        - Wenn "click" auf BUTTON war dann wird die function "addToCart" aufgerufen
 *    - product wird als childElement dem productsContainer zugewiesen um die Produkte anzeigen zu lassen
 */
function showProducts() {

  productsW.forEach((item) => {
    let product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `

      <img src ="img/${item.images}" alt="bild">
      <div class="title">${item.name}</div>
      <div class="size">Size:${item.size}</div>
      <div class="price">${item.price}€</div>
      <button class="btn-action">Add to Cart</button>
      `;

    product.addEventListener("click", function (event) {
      if (event.target.tagName === 'BUTTON') {
        addItemToCart(item);
      }
    })

    productsContainer.appendChild(product);
  })
}

/**
 * Objekt "newEntry" mit den Properties "id, name, price, image, size, quantity" die vom Array Products gezogen werden
 */

function addItemToCart(product) {

  const newCartItem = {
    id: crypto.randomUUID(),
    name: product.name,
    price: product.price,
    image: product.images,
    size: `<select>
      <option>S</option>
      <option>M</option>
      <option>L</option>
      <option>XL</option>
      </select>`,
    quantity: product.quantity,

  }
  /**
   *  Function "saveCart" wird aufgerufen
   *  Function "showCart" wird aufgerufen
   */
  saveCart(newCartItem);
  showCart();
}


/**
 * ein EventListener mit dem event "click" wird dem cartBody zugewiesen
 *     - if  bedingung die überprüft ob der click auf einer CSS-Klasse war
 *     - Function "deleteItemFromCart" wird aufgerufen
 *     - Hier wird bei einem click das parentElement vom jeweiligen Element gelöscht
 */
cartBody.addEventListener("click", function (event) {
  if (event.target.classList.contains('btn-action')) {
    deleteItemFromCart();
    // readCartFromLocal()
    event.target.parentElement.remove();
  }
})


/**
 * 1. Wir holen uns die Daten aus dem Localstorage (string | null) und parsen diese zu einem Objekt.
 * 2. if bedingung überprüft ob etwas im Array schon gespeichert ist
 *      - Wenn das Array leer ist wird das Objekt als String im Array gespeichert
 *      - Wenn etwas im Array schon gespeichert ist, dann wird das neue Objekt dem Array hinzugefügt
 *      - Konvertiert das Array zu einem String und wird dem localstorage hinzugefügt.
 * @param newEntry
 */
function saveCart(newEntry) {
  const itemData = JSON.parse(localStorage.getItem(storageKey));
  if (!itemData) {
    localStorage.setItem(storageKey, JSON.stringify([newEntry]));
  } else {
    itemData.push(newEntry);
    localStorage.setItem(storageKey, JSON.stringify(itemData));
  }
}

/**
 *  1. Wir holen uns die Daten aus dem Localstorage (string | null) und parsen diese zu einem Objekt.
 *  2. Im Array wird nach dem jeweiligen Objekt gesucht mit der selben id und auf einer variable zugewiesen
 *  3. Objekt wird aus dem Array gelöscht
 *  4. Verändertes Array wird als String im Localstorage gespeichert
 * @param id
 */
function deleteItemFromCart(id) {
  const itemData = JSON.parse(localStorage.getItem(storageKey));
  const index = itemData.findIndex((product) => product.id === id);
  itemData.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(itemData));
}

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
      <img src ="img/${product.image}" alt="bild">
      <div class="item-title">${product.name}</div>
      <div class="item-size">Size:${product.size}</div>
      <div class="price">Price:${product.price}€</div>
      <div>
        <button class="btn-quantity" id="increment" data-id='${product.id}'>+</button>
        <span class="item-count">${product.quantity}</span>
        <button class="btn-quantity" id="decrement" data-id='${product.id}'>-</button>
      </div>

      <button class="btn-action">Delete</button>
      `;

      cartBody.appendChild(cartItem);

      /**
       * im innerHTML von cartItem wird die span klasse "item-count" der Variable itemCount zugewiesen
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
        document.getElementById('cart-total').innerText = `(${totalQuantity} items): ${totalPrice}€`;
        document.getElementById('total-price').innerText = `${totalPrice}€`;
      });

      /**
       * im innerHTML von cartItem wird auf den button mit der id "decrement" ein eventListener getan mit dem typ "click"
       * if bedingung die überprüft ob quantity größer 0 ist, wenn es größer null ist dann:
       *    Pro Klick:
       *     - Wird die quantity um 1 subtrahiert
       *     - Wird die quantity vom Array dem innerText vom itemCount zugewiesen
       *     - Wird totalQuantity um 1 Item subtrahiert
       *     - Wird totalPrice mit dem produkt price subtrahiert
       *     - Im Header des Warenkorbes werden jeweils die Quantity und Price von allen Items aktualisiert
       *     - Im Bottom des Warenkorbes wird nur der Gesamtpreis aktualisiert
       */

      cartItem.querySelector("#decrement").addEventListener("click", () => {
        if (product.quantity > 0) {
          product.quantity--;
          itemCount.innerText = product.quantity;
          totalQuantity--;
          totalPrice -= product.price;
          document.getElementById('cart-total').innerText = `(${totalQuantity} items): ${totalPrice}€`; // Update the cart total display
          document.getElementById('total-price').innerText = `${totalPrice}€`;
        }
      })
    })
  }

  /**
   * Hier wird dem innerHTML des cartHeader zugewiesen
   *      - div klasse titel
   *      - div id mit dem Gesamtpreis und Gesamtprodukten
   */

  cartHeader.innerHTML = `
    <div class="cart-title">CART</div>
    <div id="cart-total">(${totalQuantity} items): ${totalPrice}€</div>
  `;

  /**
   * Hier wird dem innerHTML des cartBottom zugewiesen
   *      - Linie für eine Visuelle trennung zum Body
   *      - span id mit dem Gesamtpreis
   *      - Button "checkout" der einen auf eine andere Seite bringt um zu Zahlen
   */

  cartBottom.innerHTML = `
    <hr>
   <span id="total-price">${totalPrice}€</span>
    <button class="check-out" id="check-Out"><a href="checkout.html" target="_blank" >Check Out</a></button>
 `;

  /**
   * Hier wird eine CSS-Klasse dem cartHeader zugewiesen
   * cartBody wird dem cartHeader als childElement zugewiesen
   * cartBottom wird dem cartBody als childElement zugewiesen
   */

  cartHeader.classList.add('cart-header');
  cartHeader.appendChild(cartBody);
  cartBody.appendChild(cartBottom);


}






