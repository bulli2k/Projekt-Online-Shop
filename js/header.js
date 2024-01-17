import {displayItems} from "./main.js";
import {products} from "./products.js";


export const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
<style>
header {
  border-bottom: 2px dotted #ffe600;
   background-color: #212121;
 
}

header .icon-cart {
  position: relative;
}
select {
  border-radius: 10px;
  background-color: #212121;
  border: none;
  font-size: large;
  color: #fff;
}

select:focus {
  border: none;
}
#caterogize {
height: 50px;
width: 43%;
grid-template-columns: repeat(3, 200px);
  display: grid;
  flex-direction: row;
  align-items: baseline;
  border: 2px dotted #ffe600;
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
  display: grid;
  grid-template-columns: repeat(5, 100px);
  align-items: center;
  border-radius: 50px;
  border-bottom: none;

  .button-links {
    font-size: 1.2rem;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #212121;
    
  }
  & a:link {
    text-decoration: none;
    color: #fff;
  }
  & a:visited {
    text-decoration: none;
    color: #fff;
  }
  & a:hover {
    text-decoration: none;
  }
  & a:active {
    text-decoration: none;
  color: #fff;
  }
}


.price-ranges {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  align-items: baseline;
  padding: 0 150px;
  color: #fff;
  & p {
    font-size: large;
  }
  .price-value {
    font-size: large;
  }
}

.product-title {
margin-top: 0;
  width: fit-content;
  font-size: x-large;
  font-weight: 800;
  color: #fff;
  padding: 5px;
}
.header-links {
  width: fit-content;
  margin-bottom: 5px;
}

.button-links[aria-current="page"] {
  background-color: #ffe600;
  a {
  color: #212121;
  }
}
#brand-logo {
position:absolute;
width: 200px;
top: -15px;
right: 0;
}
input[type="range"] {
  -webkit-appearance: none; 
  appearance: none;
  height: 4px; 
  background-color: #ffe600; 
  border-radius: 2px; 
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; 
  appearance: none;
  width: 16px; 
  height: 16px; 
  background-color: #ffe600; 
  border: 2px solid #fff; 
  border-radius: 50%; 
  margin-top: -2px; 
  cursor: pointer; 
}

#open_cart_btn {
  border: none;
  margin: 0 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
}

#open_cart_btn img {
  width: 30px;
}

@media only screen and (max-width: 600px) {

body {
width: 480px;
}
.header-info {
width: fit-content;
}

  header {
  height: 150px;
  width: 480px;
  }
  .product-title {
}
 
 #brand-logo {
 height: 70px;
 width: 70px;
 right: 0;
}
.links {
  width: 0;
  .button-links {
    font-size: 1.2rem;
    border: none;
    padding: 0;
    border-radius: 5px;
    cursor: pointer;
  }
}
 #open_cart_btn {
  display: none;
}
.price-ranges {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  align-items: baseline;
  padding: 0;
  color: #fff;
  & p {
    font-size: large;
  }
  .price-value {
    font-size: large;
  }
}

 #caterogize {
    height: 50px;
    width: 100%;
    grid-template-columns: repeat(3, 150px);
    display: grid;
    flex-direction: row;
    align-items: baseline;
    border: 2px dotted #ffe600;
    border-radius: 5px;
    border-bottom: none;
    
    select {
    display: flex;
    
    }
}
#search-bar {
       width: 80px;
   
}
#close-btn {
    margin: 0 50px;
    cursor: pointer;
}
}


</style>

<header>
 <div class="header-info">
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
  <button id="open_cart_btn">
    <img src="/img/shopping-cart.png" id="shopping-cart-logo" alt="">
  </button>
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
        //HTML id "open_cart_btn" wird der Variable openBtn zugewiesen
        const openBtn = shadowRoot.getElementById('open_cart_btn');
        //HTML id "cart" wird der Variable cart zugewiesen
        const cart = document.getElementById('cart');

        //eventListener mit dem Event Click wird den button 'openBtn' zugewiesen
        openBtn.addEventListener('click', openCart);

        /**
         * Funktion die dem Cart beim betätigen des Icons die Klasse 'open' zuweist.
         */
        function openCart() {
            cart.classList.add('open');
        }


        // - ein EventListener mit dem event "keyup" wird dem searchBar zugewiesen
        // - vom Event das Ziel die Value wird auf einer Variable zugewiesen
        // - Bestimmung des Geschlechtsfilters anhand der URL
        // if bedingung die überprüft:
        //          - Überprüfung ob die aktuelle Seite 'products.html' ist
        //          - filter durch das "products" Array wird einer Variable zugewiesen
        //          - Es wird der Funktion das Produkt wiedergegeben wonach im Inputfield gesucht wird
        // - Function displayItems wird aufgerufen
        // - else bedingung für die anderen Seiten
        //          - filter durch das "products" Array wird einer Variable zugewiesen
        //          -  Es wird der Funktion das Produkt wiedergegeben wonach im Inputfield gesucht wird und das Geschlecht
        //          - vom Produkt wird der Variable genderFilter gleichgestellt um zu überprüfen ob es "Men" oder "Women" ist
        // - Function displayItems wird aufgerufen

        searchBar.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();
            const genderFilter = window.location.pathname.includes('Men') ? 'Men' : 'Women';

            if (window.location.pathname.includes('products.html')) {
                const filteredItems = products.filter(product => {
                    return product.name.toLowerCase().includes(searchString);

                });
                displayItems(filteredItems);
            } else {
                const filteredItems = products.filter(product => {
                    return product.name.toLowerCase().includes(searchString) && product.gender === genderFilter;

                });

                displayItems(filteredItems);
            }
        });

        // - ein EventListener mit dem event "change" wird dem selectedCategorie zugewiesen
        // - vom Event das Ziel die Value wird auf einer Variable zugewiesen
        // - eine leere Variable wird erstellt

        // - if statement das überprüft ob "All Categories" ausgewählt wurde
        // if bedingung die überprüft:
        //          - Überprüfung ob die aktuelle Seite 'products.html' ist
        // - Wenn, dann werden alle Produkte angezeigt
        // - Falls es nicht products.html ist

        // - if bedingung die überprüft:
        //           - Bestimmung des Geschlechtsfilters anhand der URL
        // - Im Array wird gefiltert nach dem Item mit der property gender die, selbe Value wie genderFilter hat
        // - Falls eine andere Auswahl vorliegt, dann wird

        // if bedingung die überprüft:
        //          - Überprüfung ob die aktuelle Seite 'products.html' ist
        //          - Durch das products Array wird gefiltert und der Leeren Variable "selectedItem" zugewiesen
        //          - Im Array wird gefiltert nach dem Item mit der property season  die, die selbe property haben wie die ausgewählte season
        //
        // - Falls es nicht products.html ist
        // - Von der Seite der Pfadname wird einer Variable zugewiesen
        // - Durch das products Array wird gefiltert und der Leeren Variable "selectedItem" zugewiesen
        //          - Im Array wird gefiltert nach dem Item mit der property season  die, die selbe property haben wie die ausgewählte season
        //          - Und vom Produkt wird der Variable genderFilter gleichgestellt um zu überprüfen ob es "Men" oder "Women" ist
        // - Function displayItems wird aufgerufen


        selectedCategorie.addEventListener('change', (e) => {
            const selected = e.target.value;
            let selectedItem;

            if (selected === 'All Categories') {

                if (window.location.pathname.includes('products.html')) {
                    selectedItem = products;
                } else {

                    const genderFilter = window.location.pathname.includes('Men') ? 'Men' : 'Women';
                    selectedItem = products.filter(product => product.gender === genderFilter);
                }
            } else {
                if (window.location.pathname.includes('products.html')) {
                    selectedItem = products.filter(product => {
                        return product.season.includes(selected);
                    });
                } else {
                    const genderFilter = window.location.pathname.includes('Men') ? 'Men' : 'Women';

                    selectedItem = products.filter(product => {
                        return product.season.includes(selected) && product.gender === genderFilter;
                    });
                }
            }

            displayItems(selectedItem);
        });


        // - ein EventListener mit dem event "change" wird dem ascendingDescending zugewiesen
        // - vom Event das Ziel die Value wird auf einer Variable zugewiesen
        // - Bestimmung des Geschlechtsfilters anhand der URL
        // - eine leere Variable wird erstellt
        // if bedingung die überprüft:
        //          -Überprüfung ob die aktuelle Seite 'products.html' ist
        // - if statement das überprüft ob "Min -> Max" ausgewählt wurde
        // - Wenn, dann wird im Array von niedrigsten bis höchsten Preis sortiert
        // - Falls eine andere Auswahl vorliegt, dann wird
        // - Wird im Array vom höchsten bis niedrigsten Preis sortiert
        // - Falls es nicht products.html ist sondern die Männer oder Frauen seite
        // - Filter der überprüft ob es Männer oder Frauenprodukt ist
        // - Function displayItems wird aufgerufen

        ascendingDescending.addEventListener('change', (e) => {
            const selected = e.target.value;
            const genderFilter = window.location.pathname.includes('Men') ? 'Men' : 'Women';
            let selectedItem;

            if (window.location.pathname.includes('products.html')) {
                if (selected === 'Ascending') {
                    selectedItem = products.sort((a, b) => a.price - b.price);
                } else {
                    selectedItem = products.sort((a, b) => b.price - a.price);
                }

            } else {

                if (selected === 'Ascending') {
                    selectedItem = products
                        .filter(product => product.gender === genderFilter)
                        .sort((a, b) => a.price - b.price);
                } else {
                    selectedItem = products
                        .filter(product => product.gender === genderFilter)
                        .sort((a, b) => b.price - a.price);
                }

            }
            displayItems(selectedItem);

        });

        /**
         * Bestimmung des Geschlechtsfilters anhand der URL
         * Bestimmung des maximalen Preises in der Preisliste:
         * Setzen der Preisspanne für das HTML-Element "priceRange":
         * Minimalster Preiswert ist 0.
         * if bedingung die überprüft:
         * Überprüfung ob die aktuelle Seite 'products.html' ist
         * eventListener wird auf priceRange mit dem event input für die Preisfilterung
         * Aktualisierung des Textinhalts von "priceValue" mit dem jeweiligen ausgewählten Preis und "€"
         * Aktualisierung der angezeigten Produkte basierend auf dem jeweiligen ausgewählten Preisbereich
         * Funktion DisplayItems wird aufgerufen
         * Falls es nicht products.html ist
         * Dann findet nur die Erweiterung statt das auch gefiltert wird nach dem Geschlecht.
         */

        function setPrices() {
            const genderFilter = window.location.pathname.includes('Men') ? 'Men' : 'Women';
            // const priceList = products
            //     .filter(product => product.gender === genderFilter)
            //     .map(product => product.price);
            // const minPrice = Math.min(...products.map(product => product.price));
            const maxPrice = Math.max(...products.map(product => product.price));

            priceRange.min = 0;
            priceRange.max = maxPrice;
            priceRange.value = 0;
            priceValue.textContent = 0 + "€";

            if (window.location.pathname.includes('products.html')) {
                priceRange.addEventListener("input", (e) => {
                    const filteredProducts = products.filter(product => product.price <= e.target.value);
                    priceValue.textContent = e.target.value + "€";
                    displayItems(filteredProducts);
                });

            } else {

                priceRange.addEventListener("input", (e) => {
                    const filteredProducts = products
                        .filter(product => product.gender === genderFilter && product.price <= e.target.value);
                    priceValue.textContent = e.target.value + "€";
                    displayItems(filteredProducts);
                });
            }
        }

        /**
         * Funktion setPrices wird aufgerufen
         */
        setPrices();

        //Auf alle Button Links wird eine forEach schleife gelegt
        //if bedingung die überprüft ob:
        //          - Der href des Links genau derselbe ist wie der auf der Seite
        //          - Wenn es der selbe ist wird dem Link ein Attribut-Klasse zugewiesen

        this.shadowRoot.querySelectorAll('.button-links').forEach(link => {
            if (link.querySelector('a').href === window.location.href) {
                link.setAttribute('aria-current', 'page');
            }
        });


        /**
         * Die Value der Searchbar wird einer Variable zugewiesen
         * Die Ausgewählte Kategorie von dem Select wird einer Variable zugewiesen
         * Die Ausgewählte reihenfolge (Ascending/Descending) wird einer Variable zugewiesen
         * Vom Preis schieberegler der Wert wird einer Variable zugewiesen
         * Bestimmung des Geschlechtsfilters anhand der URL
         * Überprüfung ob die aktuelle Seite 'products.html' ist
         * Über das 'products' Array wird gefiltert und der Variable filterItems zugewiesen
         * Es wird anhand des Ausgewählten Kategorie und Such ergebnis gefiltert
         * Der Funktion wird einmal das Suchergebnis und die Ausgewählte Kategorie wiedergegeben
         * if bedingung die überprüft ob die ausgewählte Reihenfolge 'Ascending' ist
         * Filter der anhand der Ausgewählten Reihenfolge die Produkte aufsteigend  sortiert
         * Wenn nicht dann:
         * Filter der anhand der Ausgewählten Reihenfolge die Produkte absteigend sortiert
         * Filtert die Produkte anhand des Preis Schieberegler
         * Funktion displayItems wird aufgerufen
         * Wenn es nicht products.html ist dann:
         * Werden die Produkte genau so weiter gefiltert nur mit der Suche nach dem Gender der Produkte
         */

        function applyAllFilters() {
            const searchString = searchBar.value.toLowerCase();
            const selectedCategory = selectedCategorie.value;
            const ascendingDescendingValue = ascendingDescending.value;
            const priceFilterValue = priceRange.value;
            const genderFilter = window.location.pathname.includes('Men') ? 'Men' : 'Women';

            if (window.location.pathname.includes('products.html')) {
                let filteredItems = products.filter(product => {
                    const searchFilter = product.name.toLowerCase().includes(searchString);
                    const categoryFilter = selectedCategory === 'All Categories' || product.season.includes(selectedCategory);

                    return searchFilter && categoryFilter;
                });

                console.log("Before Sorting:", filteredItems);

                if (ascendingDescendingValue === 'Ascending') {
                    filteredItems = filteredItems.sort((a, b) => a.price - b.price);
                } else {
                    filteredItems = filteredItems.sort((a, b) => b.price - a.price);
                }

                console.log("After Sorting:", filteredItems);

                console.log(priceFilterValue)
                console.log(typeof priceFilterValue)

                if (priceFilterValue !== '0') {
                    filteredItems = filteredItems.filter(product => product.price <= priceFilterValue);
                }

                console.log("Final Filtered Items:", filteredItems);
                displayItems(filteredItems);
            } else {
                    let filteredItems = products.filter(product => {
                        const searchFilter = product.name.toLowerCase().includes(searchString);
                        const categoryFilter = selectedCategory === 'All Categories' || product.season.includes(selectedCategory);
                        const genderFilterCondition = product.gender === genderFilter;


                        return searchFilter && categoryFilter && genderFilterCondition;
                    });

                    console.log("Before Sorting:", filteredItems);

                    if (ascendingDescendingValue === 'Ascending') {
                        filteredItems = filteredItems.sort((a, b) => a.price - b.price);
                    } else {
                        filteredItems = filteredItems.sort((a, b) => b.price - a.price);
                    }

                    console.log("After Sorting:", filteredItems);

                    console.log(priceFilterValue)
                    console.log(typeof priceFilterValue)

                    if (priceFilterValue !== '0') {
                        filteredItems = filteredItems.filter(product => product.price <= priceFilterValue);
                    }

                    console.log("Final Filtered Items:", filteredItems);
                    displayItems(filteredItems);


            }
        }


// Event listener Suchleiste, Kategorienauswahl, Preisreihenfolge auswahl, und der Preis schieberegler werden
// mit der Funktion applyAllFilters verbunden
        searchBar.addEventListener('keyup', applyAllFilters);
        selectedCategorie.addEventListener('change', applyAllFilters);
        ascendingDescending.addEventListener('change', applyAllFilters);
        priceRange.addEventListener('input', applyAllFilters);
        }

    connectedCallback() {
    }
}

//  Diese ermöglicht die Verwendung von "<header-component></header-component>" in den HTML Seiten
// Dies sorgt dafür das die Anwendung im der Header-Klasse verwendet wird und der platzierte Inhalt des Shadow DOMS

customElements.define('header-component', Header);


