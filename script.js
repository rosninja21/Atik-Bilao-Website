
window.addEventListener('DOMContentLoaded', () => { 
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = data;
                
                const currentPage = window.location.pathname.split("/").pop() || "index.html";
                const navLinks = navbarPlaceholder.querySelectorAll('.nav-links li a');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) link.classList.add('active'); 
                });
            }
        });

    fetch('footer.html')
        .then(response => response.ok ? response.text() : Promise.reject("Footer not found"))
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
                
                const path = window.location.pathname.split("/").pop();
                const currentPage = (path === "" || path === "/") ? "home.html" : path;
                footerPlaceholder.querySelectorAll('a').forEach(link => {
                    if (link.getAttribute('href') === currentPage) link.classList.add('active-footer-link');
                });
            }
        })
        .catch(error => console.error(error));

    displayMenu();
});


const dishes=[{
    name:"Fried Chicken",
    desc: "Crispy, golden-brown fried chicken perfect for sharing.",
    prices: {small: 300, medium: 400, large: 600},
    image: "images/friedchicken.png",
    category: "main"
}, {name: "Pancit Bam-I",
    desc: "A Cebuano noodle dish featuring a combination of pancit canton and sotanghon.",
    prices: {small: 300, medium: 400, large: 600},
    image: "images/pancit-bam-e.png",
    category: "main"
}, {
    name: "Pancit Sotanghon",
    desc: "Stir-fried cellophane noodles with meat and vegetables.",
    prices: {small: 300, medium: 450, large: 650},
    image: "images/pancit-sotanghon.png",
    category: "main"
},{
    name: "Pork Lollipop",
    desc: "Breaded and fried pork lollipops, a favorite for kids and adults alike.",
    prices: {medium: 400, large: 600},
    image: "images/pork-lollipop.png",
    category: "main"
}, {
    name: "Buttered Shrimp",
    desc: "Juicy shrimp cooked in rich butter and garlic sauce.",
    prices: {medium: 400, large:600},
    image: "images/buttered-shrimp.png",
    category: "main"
}, {
    name: "Pork Laroca",
    desc: "Savory pork dish cooked to perfection.",
    prices: {small: 300, medium: 400, large: 600},
    image: "images/laroca-img.png",
    category: "main"

},{
    name: "Fish Fillet",
    desc: "Breaded fish fillet, crispy on the outside and tender on the inside.",
    prices: {medium: 400, large:600},
    image: "images/fish-fillet.png",
    category: "main"
},{
    name: "Cordon Bleu",
    desc: "Breaded meat wrapped around cheese and ham, fried to perfection.",
    prices: {small: 300 , medium: 400, large:600},
    image: "images/cordon-bleu.png",
    category: "main"
}, {

     name: "Chicken Fillet",
    desc: "Crispy fried chicken fillet bites.",
    prices: {small: 300 , medium: 400, large:600},
    image: "images/chicken-fillet.png",
    category: "main"
},{
     name: "Lumpiang Shanghai",
    desc: "Filipino-style spring rolls with ground pork and vegetables.",
    prices: {small: 300 , medium: 400, large:600},
    image: "images/lumpiang-shanghai.png",
    category: "main"

},  {
     name: "Pork Humba",
    desc: "Braised pork belly with a sweet and savory sauce.",
    prices: {small: 300 , medium: 400, large:600},
    image: "images/pork-humba.png",
    category: "main"

}, {
    name: "Chicken Fillet",
    desc: "Fried spring rolls filled with fresh vegetables.",
    prices: {small: 300 , medium: 400, large:600},
    image: "images/chicken-fillet.png",
    category: "main"
},{
    name: "Pork Meatballs (Bola-bola)",
    desc: "Delicious fried pork meatballs.",
    prices: {small: 300 , medium: 400, large:600},
    image: "images/bola-img.png",
    category: "main"

},{
     name: "Spaghetti",
    desc: "Sweet-style Filipino spaghetti with hotdogs and ground meat.",
    prices: {medium: 300, large:500},
    image: "images/spaghetti.png",
    category: "main"

},{
     name: "Chopsuey",
    desc: "Stir-fried mixed vegetables with meat or seafood.",
    prices: {medium: 400, large:600},
    image: "images/chapsuey-img.png",
    category: "main"


}, {
    name: "3 in 1 Combo",
    desc: "Selection includes Laroca, Pancit, Cordon Bleu, Meatballs, Chicken Fillet, Vegetable Lumpia, Lumpiang Shanghai, or Fried Chicken.",
    contents: ["Laroca", "Pancit", "Cordon Bleu", "Meatballs", "Chicken Fillet","Vegetable Lumpia", "Lumpiang Shanghai", "Fried Chicken"],
    image: "images/3-in1-combo.png",
    category: "combos"

}, {name: "2 in 1 Combo",
    desc: "Selection includes Laroca, Pancit, Cordon Bleu, Meatballs, or Vegetable Lumpia.",
    contents:["Laroca", "Pancit", "Cordon Bleu", "Meatballs", "Vegetable Lumpia"],
    image:"images/2-in-1-combo.png",
    category: "combos"

},{
    name: "Puto Cheese",
    desc:"Soft steamed rice cakes topped with cheese.",
    prices:{piece: 5},
    image: "images/puto-cheese.png",
    category: "desserts"
},{
     name: "Pichi-Pichi ",
    desc:"Sticky cassava dessert coated in grated coconut or cheese.",
    prices:{piece: 5},
    image: "images/pichi.png",
    category: "desserts"
},{
     name: "Coconut Macaroons ",
    desc:"Sweet and chewy coconut treats.",
    prices:{pieces: 300},
    image: "images/macaroons.png",
    category: "desserts"

},{
     name: "Ube Jam ",
    desc:"Rich and creamy purple yam jam.",
    prices:{tub: 100},
    image: "images/ube-jam.png",
    category: "desserts"
    
},{ name: "Maja Blanca ",
    desc:"Coconut milk pudding with corn kernels.",
    prices:{tub: 100},
    image: "images/maja.png",
    category: "desserts"
    },{
        name: "Mango Float ",
    desc:"Layers of graham crackers, cream, and fresh mangoes.",
    prices:{tub: 100},
    image: "images/mango-float.png",
    category: "desserts"
    },{
        name: "Torta ",
    desc:"Traditional sponge cake, perfect for coffee or tea.",
    prices:{small: 230, large: 280},
    image: "images/torta.png",
    category: "desserts"
    },{
        name: "Biko ",
    desc:"Sweet sticky rice cake topped with latik (coconut curd).",
    prices:{small: 200, medium: 300, large: 500},
    image: "images/biko.png",
    category: "desserts"
    },{
        name: "Suman ",
    desc:"Sticky rice cake wrapped in banana leaves (Tam-is or Bud-bud).",
    prices:{piece: 7},
    image: "images/suman.png",
    category: "desserts"
    }

    







]

function displayMenu() {
    const container = document.getElementById("food-container");
    if (!container) return;
    
    let allCardsHTML = "";
    const isBookingPage = window.location.pathname.includes("book-now.html");

    dishes.forEach(dish => {
        let pricesHTML = "";
        if (dish.prices) {
            if (dish.prices.small) pricesHTML += `<span>Small: <b>₱ ${dish.prices.small}</b></span>`;
            if (dish.prices.medium) pricesHTML += `<span>Medium: <b>₱ ${dish.prices.medium}</b></span>`;
            if (dish.prices.large) pricesHTML += `<span>Large: <b>₱ ${dish.prices.large}</b></span>`;
        }

        let comboSelectionHTML = "";
        if (dish.category === "combos" && dish.contents) {
            comboSelectionHTML = `
                <div class="combo-selection">
                    <p class="selection-title">Choose   <span></span>/3 :</p>
                    <div class="combo-buttons-grid">
                        ${dish.contents.map(item => `
                            <button type="button" class="combo-item-btn" onclick="this.classList.toggle('selected')">
                                ${item}
                            </button>
                        `).join('')}
                    </div>
                </div>`;
        }

        if (isBookingPage) {
            allCardsHTML += `
                <div class="menu-dishes" data-category="${dish.category}">
                    <div class="add-badge"><i class="fa-solid fa-plus" onclick="toggleIcon(this)"></i></div>
                    <div class="circle-dishes-img"><img src="${dish.image}" alt="${dish.name}" class="menu-img"></div>
                    <div class="card-dishes-container">
                        <h4 class="dish-name">${dish.name}</h4>
                        <p class="description">${dish.desc}</p>
                        <div class="price-list">${pricesHTML}</div>
                        
                        ${comboSelectionHTML}

                    </div>
                </div>`;
        } else {
            allCardsHTML += `
                <div class="menu-dishes" data-category="${dish.category}">
                    <div class="circle-dishes-img"><img src="${dish.image}" alt="${dish.name}" class="menu-img"></div>
                    <div class="card-dishes-container">
                        <h4 class="dish-name">${dish.name}</h4>   
                        <p class="description">${dish.desc}</p>
                        <div class="price-list">${pricesHTML}</div>
                         ${comboSelectionHTML}
                        <div class="card-actions">
                            <button class="book-now-menu">BOOK NOW</button>
                            <button class="cart-btn">ADD TO CART</button>
                        </div>
                    </div> 
                    
                </div>`;


        }
    });

    container.innerHTML = allCardsHTML;
    setupFilters();
    searchDish();
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.menu-btn');
    filterButtons.forEach(button => {
        button.onclick = () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            document.querySelectorAll('.menu-dishes').forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = (filterValue === 'all' || category === filterValue) ? "flex" : "none";
            });
        };
    });
}

function searchDish() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    searchInput.oninput = function() {
        const query = this.value.toLowerCase().trim();
        document.querySelectorAll('.menu-dishes').forEach(card => {
            const name = card.querySelector('.dish-name').textContent.toLowerCase();
            card.style.display = name.includes(query) ? "flex" : "none";
        });
    };
}
function toggleIcon(icon) {

    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-check");

    const badge = icon.parentElement;
    badge.classList.toggle("active");

    const card = icon.closest('.menu-dishes');
    if (card) {
        card.classList.toggle("selected-card");
    }

    const checkOutBtn = document.getElementById("proceed-btn");
    const selectedItems = document.querySelectorAll(".fa-check");

    checkOutBtn.style.display = selectedItems.length > 0 ? "block" : "none";
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('browse-menu')) {
        window.location.href = "menu.html";
    }
    
    if (e.target.classList.contains('book-now')) {
        window.location.href = "book-now.html";
    }
    if(e.target.classList.contains('book-now-menu')){
        window.location.href="checkout.html";
    }

    if (e.target.closest('.messenger-btn')) {
        e.preventDefault();
        window.open("https://www.m.me/perlenegrace.raniseshubac", '_blank');
    }
});