

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