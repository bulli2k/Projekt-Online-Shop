import {products} from "./products.js";

//Localstorage Key "cart" wird der Variable "storageKey"  zugewiesen
const storageKey = 'cart';
//HTML id "cart" wird der Variable "cart" zugewiesen
const cartItemContainer = document.getElementById('cart-container');
//HTML Klasse "total" wird der Variable "totalPrice" zugewiesen
const totalPriceEL = document.getElementById('total');
//HTML id "products" wird der Variable "productsContainer" zugewiesen
const productsContainer = document.getElementById('product-container');
//Function "readCartFromLocal" wird aufgerufen um die Elemente im Array auf dem DOM anzeigen zu lassen.
const cartHeader = document.getElementById('cart-header');
const cartBody = document.getElementById('cart-body');
const cartBottom = document.getElementById('cart-bottom');
const checkOut = document.getElementById('check-Out');
showCart();


//Function initializeProducts wird aufgerufen
showProducts();


/**
 * 1. Es wird durch das Array itiriert.
 *    - HTML Element "div" wird erstellt und der Variable "newDiv" zugwiesen
 *    - CSS Klasse "card" wird newDiv zugewiesen
 *    - Image, Name, Size, Quantity und Price werden dem innerHTML von newDiv zugewiesen
 *    - ein addEventListener mit dem event "click" wird dem newDiv zugewiesen
 *        - if bedingung die überprüft ob der "click" auf dem BUTTON war
 *        - Wenn "click" auf BUTTON war dann wird die function "addToCart" aufgerufen
 *    - newDiv wird als childElement dem productsContainer zugewiesen um die Produkte anzeigen zu lassen
 */
function showProducts() {

  products.forEach((item) => {
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

// Objekt "newEntry" mit den Properties "id, name, price, image" die vom Array Products gezogen werden
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

  saveCart(newCartItem);
  showCart();
}

cartBody.addEventListener("click", function (event) {
  if (event.target.classList.contains('btn-action')) {
    const id = event.target.parentElement.id
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
 * 2. null-check
 * 3. Iteration der Daten (forEach)
 * 4. - HTML Element "div" wird erstellt und der Variable "newDiv" zugwiesen
 //    - CSS Klasse "cart" wird newDiv zugewiesen
 //    - Image, Name, Size, Quantity und Price werden dem innerHTML von newDiv zugewiesen
 //    - newDiv wird dem cart als childElement zugewiesen um die Elemente im Cart anzeigen zu lassen.
 * 5. newDiv wird dem Cart als childElement zugewiesen um auf dem DOM zu Speichern.
 // 6. CSS Klasse "name" wird newDiv zugewiesen
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
      <div class="item-quantity">Quantity:${product.quantity}</div>
      <div class="price">Price:${product.price}€</div>
      <div>
        <button class="btn-quantity" id="increment" data-id='${product.id}'>+</button>
        <span class="item-count">0</span>
        <button class="btn-quantity" id="decrement" data-id='${product.id}'>-</button>
      </div>

      <button class="btn-action">Delete</button>
      `;

      cartBody.appendChild(cartItem);

      const incrementButton = cartItem.querySelector("#increment");
      const decrementButton = cartItem.querySelector("#decrement");
      const itemCount = cartItem.querySelector(".item-count");

      incrementButton.addEventListener("click", () => {
        product.quantity++;
        itemCount.textContent = product.quantity;
        totalQuantity++;
      });
      decrementButton.addEventListener("click", () => {
        if (product.quantity > 0) {
          product.quantity--;
          itemCount.textContent = product.quantity;
          totalQuantity--;
        }
      });
    });


    cartHeader.innerHTML = `
    <div class="cart-title">CART</div>
    <div id="cart-total">(${totalQuantity} items): ${totalPrice}€</div>
  `;
    cartBottom.innerHTML = `
    <hr>
   <span id="total-price">${totalPrice}€</span>
    <button class="check-out" id="check-Out"><a href="checkout.html">Check Out</a></button>
 `;

    cartHeader.classList.add('cart-header');
    cartHeader.appendChild(cartBody);
    cartBody.appendChild(cartBottom);


  }
}






