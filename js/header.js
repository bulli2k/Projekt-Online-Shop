import {displayItems} from "./main.js";
import {products} from "./products.js";


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
#brand-logo {
position:absolute;
width: 200px;
top: 0;
right: 0;
}

</style>

<header>
<div>
  <p class="product-title"> Product List</p>
  <a href="index.html">
<img src="/img/brand.png" alt="models" id="brand-logo">
 </a>
 </div>
<div class="header-links">
  <nav class="links">
    <button class="button-links" id="filter-products"><a href="products.html">Products</a></button>
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
    //constructor Methode ist dafür verantwortlich, den shadow DOM zu erstellen und das HTML-Template (headerTemplate)
    // in den Shadow DOM zu klonen
    constructor() {

        // Sorgt dafür das constructor notwendige initialisierungen der übergeordneten Klasse ordnungsgemäß durchgeführt
        // werden
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

        //HTML id "search-bar" wird der Variable searchBar zugewiesen
        const searchBar = shadowRoot.querySelector('#search-bar');
        //HTML id "select-items" wird der Variable selectedCategorie zugewiesen
        const selectedCategorie = shadowRoot.getElementById('select-items');
        //HTML id "ascending-descending" wird der Variable ascendingDescending zugewiesen
        const ascendingDescending = shadowRoot.getElementById("ascending-descending");
        //HTML id "price-range" wird der Variable priceRange zugewiesen
        const priceRange = shadowRoot.querySelector("#price-range");
        //HTML Klasse "price-value" wird der Variable priceValue zugewiesen
        const priceValue = shadowRoot.querySelector(".price-value");


        // - ein EventListener mit dem event "keyup" wird dem searchBar zugewiesen
// - vom Event das Ziel die Value wird auf einer Variable zugewiesen
// - Im Array wird gefiltert nach dem Item mit der property Namen die, die Value vom Event hat
// - Function displayItems wird aufgerufen
        searchBar.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();
            const filteredItems = products.filter(product => {
                return product.name.toLowerCase().includes(searchString);
            });

            displayItems(filteredItems);
            {
            }

        });

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

            if (selected === 'Ascending') {
                selectedItem = products.sort((a, b) => a.price - b.price);
            } else {
                selectedItem = products.sort((a, b) => b.price - a.price);
            }
            displayItems(selectedItem);

        });

//  * Erstellung der Preisliste aus den Produktdaten
//  * Bestimmung des minimalen und maximalen Preises in der Preisliste:
//  * Setzen der Preisspanne für das HTML-Element "priceRange":
//  * Initalisierung des Preiswertes "priceValue" mit den minimalsten Preis
//  * eventListener wird auf priceRange mit dem event input für die Preisfilterung
//  * Aktualisierung des Textinhalts von "priceValue" mit dem jeweiligen ausgewählten Preis und "€"
//  * Aktualisierung der angezeigten Produkte basierend auf dem jeweiligen ausgewählten Preisbereich
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

        setPrices();

        this.shadowRoot.querySelectorAll('.button-links').forEach(link => {
            if (link.querySelector('a').href === window.location.href) {
                link.setAttribute('aria-current', 'page');
            }
        });

    }

    connectedCallback() {
    }
}

//  Diese ermöglicht die Verwendung von "<header-component></header-component>" in den HTML Seiten
// Dies sorgt dafür das die Anwendung im der Header-Klasse verwendet wird und der platzierte Inhalt des Shadow DOMS

customElements.define('header-component', Header);


