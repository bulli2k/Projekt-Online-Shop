
export const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
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
`

export class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(headerTemplate.content);
    }
}

customElements.define('header-component', Header);





