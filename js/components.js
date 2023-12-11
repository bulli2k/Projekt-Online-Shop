//Localstorage Key "cart" wird der Variable "storageKey"  zugewiesen
export const storageKey = 'Mcart';

/**
 *
 *  - HTML Element "div" wird erstellt und der Variable "product" zugwiesen
 *  - CSS Klasse "product" wird product zugewiesen
 *  - Image, Name, Size, Quantity, Size und Price werden dem innerHTML von product zugewiesen
 *  - product wird der funktion wiedergegeben
 **/
export function createProductElement(item) {
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
 *  1. Wir holen uns die Daten aus dem Localstorage (string | null) und parsen diese zu einem Objekt.
 *  2. Im Array wird nach dem jeweiligen Objekt gesucht mit der selben id und auf einer variable zugewiesen
 *  3. Objekt wird aus dem Array gelöscht
 *  4. Verändertes Array wird als String im Localstorage gespeichert
 * @param id
 */
 export function deleteItemFromCart(id) {
    const itemData = JSON.parse(localStorage.getItem(storageKey));
    const index = itemData.findIndex((product) => product.id === id);
    itemData.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(itemData));
}
 export class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <nav>            
       <header>
  <p class="product-title"> Product List</p>
<div class="header-links">
  <nav class="links">
    <button class="button-links" id="homepage"><a href="index.html">Homepage</a></button>
    <button class="button-links" id="filter-men">Men<a href="Men.html"></a></button>
    <button class="button-links" id="filter-women">Women<a href="women.html"></a></button>

    <div class="searchItem">
      <input id="search-bar" placeholder="Search..." type="text">
  </div>
  </nav>
</div>

  <div id="caterogize">
    <select id="ascending-descending">
      <option>Sort by Price</option>
      <option>Ascending</option>
      <option>Descending</option>
    </select>
    <select id="select-items">
      <option>All Categories</option>
      <option>Summer</option>
      <option>Winter</option>
    </select>

    <div class="price-ranges">
      <p>Price Range</p>
      <input id="price-range" type="range"/>
      <span class="price-value">30</span>
    </div>
  </div>

</header>   
      </nav>
    `;
    }
}

