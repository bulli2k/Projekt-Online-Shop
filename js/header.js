
export const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
<style>

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  flex-direction: column;
}
header {
  border-bottom: 1px solid #ccc;
}

header .icon-cart {
  position: relative;
}
select {
  border-radius: 10px;
  background-color: #eeeee6;
  border: none;
  font-size: large;
}

select:focus {
  border: none;
}
#caterogize {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  height: fit-content;
  width: fit-content;
  border: 1px solid #ccc;
  border-radius: 5px;
  border-bottom: none;
}
#search-bar {
  border: none;
  outline: none;
  background: lightgrey;
  border-radius: 50px;
  font-size: large;
  width: 300px;
  margin: 0 50px;
}


.links {
  width: 800px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50px;
  border-bottom: none;

  .button-links {
    font-size: 1.2rem;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  & a:link {
    text-decoration: none;
    color: black;
  }
  & a:visited {
    text-decoration: none;
    color: black;
  }
  & a:hover {
    text-decoration: none;
  }
  & a:active {
    text-decoration: none;
    color: black;
  }
}


.price-ranges {
  display: flex;
  align-items: baseline;
  padding: 0 150px;

  & p {
    font-size: large;
  }

  .price-value {
    font-size: large;
  }
}

.product-title {
  width: fit-content;
  font-size: x-large;
  font-weight: 800;

}
.header-links {
  width: fit-content;
}

.button-links[aria-current="page"] {
  background-color: #007BFF;
  color: #ffffff;
}

</style>

<header>
  <p class="product-title"> Product List</p>
<div class="header-links">
  <nav class="links">
    <button class="button-links" id="homepage"><a href="index.html">Homepage</a></button>
    <button class="button-links" id="filter-men"><a href="Men.html">Men</a></button>
    <button class="button-links" id="filter-women"><a href="women.html">Women</a></button>

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
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(headerTemplate.content);
    }

    connectedCallback() {

    }
}

customElements.define('header-component', Header);




