// Array von der Datei "products.js" importiert
import {products} from "./products.js";
//Localstorage Key "cart" wird der Variable "storageKey"  zugewiesen
const storageKey = 'Mcart';
//HTML id "product-container" wird der Variable "productsContainer" zugewiesen
const productsContainer = document.getElementById('product-container');
//HTML id "cart-header" wird der Variable cartHeader zugewiesen
const cartHeader = document.getElementById('cart-header');
//HTML id "cart-body" wird der Variable cartBody zugewiesen
const cartBody = document.getElementById('cart-body');
//HTML id "cart-bottom" wird der Variable cartBottom zugewiesen
const cartBottom = document.getElementById('cart-bottom');
//HTML id "search-bar" wird der Variable searchBar zugewiesen
const searchBar = document.getElementById('search-bar');
//HTML id "select-items" wird der Variable selectedCategorie zugewiesen
const selectedCategorie = document.getElementById('select-items');
//HTML id "ascending-descending" wird der Variable ascendingDescending zugewiesen
const ascendingDescending = document.getElementById("ascending-descending");
//HTML id "price-range" wird der Variable priceRange zugewiesen
const priceRange = document.querySelector("#price-range");
//HTML Klasse "price-value" wird der Variable priceValue zugewiesen
const priceValue = document.querySelector(".price-value");

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

  products.forEach((item) => {
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
 *  - HTML Element "div" wird erstellt und der Variable "product" zugwiesen
 *  - CSS Klasse "product" wird product zugewiesen
 *  - Image, Name, Size, Quantity, Size und Price werden dem innerHTML von product zugewiesen
 *  - product wird der funktion wiedergegeben
 **/

function createProductElement(item) {
  const product = document.createElement("div");
  product.classList.add("product");
  product.innerHTML = `
    <img src ="img/${item.images}" alt="bild">
    <div class="product-wrap">
      <span class="title">${item.name}</span>
      <div class="size">Size:
        <select class="size-options">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <span class="price">${item.price}€</span>
      <div class="wrap-button">
        <button class="btn-action">Add to Cart</button>
      </div>
    </div>
  `;
  return product;
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
        if (product.quantity <= 0) {
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
  // cartBody wird dem cartHeader als childElement zugewiesen
  // cartBottom wird dem cartBody als childElement zugewiesen


  cartHeader.classList.add('cart-header');

}


// - ein EventListener mit dem event "keyup" wird dem searchBar zugewiesen
// - vom Event das Ziel die Value wird auf einer Variable zugewiesen
// - Im Array wird gefiltert nach dem Item mit der property Namen die, die Value vom Event hat
// - Function displayItems wird aufgerufen

searchBar.addEventListener("keyup", e => {
  const searchString = e.target.value.toLowerCase();
  const filteredItems = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchString)
    );
  });
  displayItems(filteredItems);
});


/**
 *  Es wird durch das Array itiriert und konvertiert das Product Objekt in den folgenden String
 *  Und wird der Variable "valueString" zugewiesen
 *  Der Funktion wird der darauf folgende String wiedergegeben
 *  Entfernt nach ausführen der Funktion die Komma zwischen jedem Produkt
 *  ValueString wird dem innerHTML von productsContainer zugewiesen
 *
 *
 * @param products
 */

function displayItems(products) {
  const valueString = products.map((product) => {
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
  productsContainer.innerHTML = valueString;

}


// - ein EventListener mit dem event "change" wird dem selectedCategorie zugewiesen
// - vom Event das Ziel die Value wird auf einer Variable zugewiesen
// - eine leere Variable wird erstellt
// - if statement das überprüft ob "All Categories" ausgewählt wurde
// - Wenn, dann werden alle Produkte angezeigt
// - Falls eine andere Auswahl vorliegt, dann wird
// - Im Array wird gefiltert nach dem Item mit der property season die, die Value vom Event hat
// - Der Funktion wird vom Objekt die Property season mit den richtigen Items wiedergegeben
// - dann werden die Produkte mit der season die ausgewählt wurde angezeigt
// - Function displayItems wird aufgerufen

selectedCategorie.addEventListener('change', (e) => {
  const selected = e.target.value;
  let selectedItem;

  if (selected === 'All Categories') {

    selectedItem = products;
  } else {

    selectedItem = products.filter(product => {
      return product.season.includes(selected)
    });
  }
  displayItems(selectedItem);
  console.log(selectedItem);
});


// - ein EventListener mit dem event "change" wird dem ascendingDescending zugewiesen
// - vom Event das Ziel die Value wird auf einer Variable zugewiesen
// - eine leere Variable wird erstellt
// - if statement das überprüft ob "Min -> Max" ausgewählt wurde
// - Wenn, dann wird im Array von niedrigsten bis höchsten Preis sortiert
// - Falls eine andere Auswahl vorliegt, dann wird
// - Wird im Array vom höchsten bis niedrigsten Preis sortiert
// - Function displayItems wird aufgerufen

ascendingDescending.addEventListener('change', (e) => {
  const selected = e.target.value;
  let selectedItem;

  if (selected === 'Min -> Max') {
    selectedItem = products.sort((a, b) => a.price - b.price);
  } else {
    selectedItem = products.sort((a, b) => b.price - a.price);
  }
  displayItems(selectedItem);
});


//
//
//

function setPrices() {
  const priceList = products.map((product) => product.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);
  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceValue.textContent = minPrice + "€";

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = e.target.value + "€";
    displayItems(products.filter((product) => product.price <= e.target.value));
  });
}

// displayItems(products);
setPrices();


/**
 * ToDo: Code Dokumentation, Shopping Cart generell verschönern
 */


// function sortPrice(a, b) {
//   return a.price - b.price;
// }
//
// products.sort(sortPrice);
//
// console.log(products);


// const evenNumbers = products.filter(number => number > 90);
// console.log(evenNumbers);


// const Pullover = products.filter(function (product) {
//   return product.name === 'Pullover';
// });
// console.log(Pullover);

// const nonPants = products.filter(product => product.name !== "Pants");
// console.log(nonPants);


