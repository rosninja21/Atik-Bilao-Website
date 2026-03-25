
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

         if (window.location.pathname.includes("checkout.html")) {
        window.addEventListener('beforeunload', () => {
            localStorage.removeItem("checkoutItem");
            localStorage.removeItem("checkoutItems");
        });
    }
        document.querySelector('.clear-btn')?.addEventListener('click', () => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("checkoutItems");
    loadCartItems();
});

    displayMenu();
    loadCheckoutItem();
    loadCartItems();
});


const dishes=[{
    name:"Fried Chicken",
    desc: "Crispy, golden-brown fried chicken perfect for sharing.",
    prices: {small: 300, medium: 400, large: 600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/friedchicken.png",
    category: "../main"
}, {name: "Pancit Bam-I",
    desc: "A Cebuano noodle dish featuring a combination of pancit canton and sotanghon.",
    prices: {small: 300, medium: 400, large: 600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/pancit-bam-e.png",
    category: "main"
}, {
    name: "Pancit Sotanghon",
    desc: "Stir-fried cellophane noodles with meat and vegetables.",
    prices: {small: 300, medium: 450, large: 650},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/pancit-sotanghon.png",
    category: "main"
},{
    name: "Pork Lollipop",
    desc: "Breaded and fried pork lollipops, a favorite for kids and adults alike.",
    prices: {medium: 400, large: 600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/pork-lollipop.png",
    category: "main"
}, {
    name: "Buttered Shrimp",
    desc: "Juicy shrimp cooked in rich butter and garlic sauce.",
    prices: {medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/buttered-shrimp.png",
    category: "main"
}, {
    name: "Pork Laroca",
    desc: "Savory pork dish cooked to perfection.",
    prices: {small: 300, medium: 400, large: 600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/laroca-img.png",
    category: "main"

},{
    name: "Fish Fillet",
    desc: "Breaded fish fillet, crispy on the outside and tender on the inside.",
    prices: {medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/fish-fillet.png",
    category: "main"
},{
    name: "Cordon Bleu",
    desc: "Breaded meat wrapped around cheese and ham, fried to perfection.",
    prices: {small: 300 , medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/cordon-bleu.png",
    category: "main"
}, {

     name: "Chicken Fillet",
    desc: "Fried spring rolls filled with fresh vegetables.",
    prices: {small: 300 , medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/chicken-fillet.png",

    category: "main"
},{
     name: "Lumpiang Shanghai",
    desc: "Filipino-style spring rolls with ground pork and vegetables.",
    prices: {small: 300 , medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/lumpiang-shanghai.png",
    category: "main"

},  {
     name: "Pork Humba",
    desc: "Braised pork belly with a sweet and savory sauce.",
    prices: {small: 300 , medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/pork-humba.png",
    category: "main"

}, {
    name: "Pork Meatballs (Bola-bola)",
    desc: "Delicious fried pork meatballs.",
    prices: {small: 300 , medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/bola-img.png",
    category: "main"

},{
     name: "Spaghetti",
    desc: "Sweet-style Filipino spaghetti with hotdogs and ground meat.",
    prices: {medium: 300, large:500},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/spaghetti.png",
    category: "main"

},{
     name: "Chopsuey",
    desc: "Stir-fried mixed vegetables with meat or seafood.",
    prices: {medium: 400, large:600},
    contents:["Small", "Medium" ,"Large"],
    image: "../images/chapsuey-img.png",
    category: "main"


}, {
    name: "3 in 1 Combo",
    desc: "Selection includes Laroca, Pancit, Cordon Bleu, Meatballs, Chicken Fillet, Vegetable Lumpia, Lumpiang Shanghai, or Fried Chicken.",
    contents: ["Laroca", "Pancit", "Cordon Bleu", "Meatballs", "Chicken Fillet","Vegetable Lumpia", "Lumpiang Shanghai", "Fried Chicken"],
    prices:{set:900},
    image: "../images/3-in1-combo.png",
    category: "combos"

}, {name: "2 in 1 Combo",
    desc: "Selection includes Laroca, Pancit, Cordon Bleu, Meatballs, or Vegetable Lumpia.",
    contents:["Laroca", "Pancit", "Cordon Bleu", "Meatballs", "Vegetable Lumpia"],
    prices:{set:600},
    image:"../images/2-in-1-combo.png",
    category: "combos"

},{
    name: "Puto Cheese",
    desc:"Soft steamed rice cakes topped with cheese.",
    prices:{piece: 5},
    image: "../images/puto-cheese.png",
    category: "desserts"
},{
     name: "Pichi-Pichi ",
    desc:"Sticky cassava dessert coated in grated coconut or cheese.",
    prices:{piece:5},
    image: "../images/pichi.png",
    category: "desserts"
},{
     name: "Coconut Macaroons ",
    desc:"Sweet and chewy coconut treats.",
    prices:{piece: 300},
    image: "../images/macaroons.png",
    category: "desserts"

},{
     name: "Ube Jam ",
    desc:"Rich and creamy purple yam jam.",
    prices:{tub: 100},
    image: "../images/ube-jam.png",
    category: "desserts"
    
},{ name: "Maja Blanca ",
    desc:"Coconut milk pudding with corn kernels.",
    prices:{tub: 100},
    image: "../images/maja.png",
    category: "desserts"
    },{
        name: "Mango Float ",
    desc:"Layers of graham crackers, cream, and fresh mangoes.",
    prices:{tub: 100},
    image: "../images/mango-float.png",
    category: "desserts"
    },{
        name: "Torta ",
    desc:"Traditional sponge cake, perfect for coffee or tea.",
    prices:{small: 230, large: 280},
    image: "../images/torta.png",
    category: "desserts"
    },{
        name: "Biko ",
    desc:"Sweet sticky rice cake topped with latik (coconut curd).",
    prices:{small: 200, medium: 300, large: 500},
    image: "../images/biko.png",
    category: "desserts"
    },{
        name: "Suman ",
    desc:"Sticky rice cake wrapped in banana leaves (Tam-is or Bud-bud).",
    prices:{piece: 7},
    image: "../images/suman.png",
    category: "desserts"
    }

    







]

function selectComboItem(btn, limit) {
    const grid = btn.closest('.combo-buttons-grid');
    const selected = grid.querySelectorAll('.combo-item-btn.selected');

    if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
    } else {
        if (selected.length >= limit) return;
        btn.classList.add('selected');
    }

    const countSpan = btn.closest('.combo-selection').querySelector('#combo-count');
    const newCount = grid.querySelectorAll('.combo-item-btn.selected').length;
    if (countSpan) countSpan.textContent = newCount;
}

function displayMenu() {
    const container = document.getElementById("food-container");
    if (!container) return;
    
    let allCardsHTML = "";
    const isBookingPage = window.location.pathname.includes("book-now.html");

    dishes.forEach(dish => {
        let pricesHTML = "";
        if (dish.prices) {
            Object.entries(dish.prices).forEach(([key, val]) => {
                pricesHTML += `<span>${key.charAt(0).toUpperCase() + key.slice(1)}: <b>₱ ${val}</b></span>`;
            });
        }

        let selectionGridHTML = "";
        if (dish.category === "combos") {
             const limit = dish.name.includes('3') ? 3 : 2; 
            selectionGridHTML = `
                <div class="combo-selection">
                    <p class="selection-title">Choose <span></span>/${dish.name.includes('3') ? '3' : '2'} :</p>
                    <div class="combo-buttons-grid">
                        ${dish.contents.map(item => `<button type="button" class="combo-item-btn" onclick="selectComboItem(this,${limit})">${item}</button>`).join('')}
                    </div>
                </div>`;
        } else {
            const availableKeys = Object.keys(dish.prices);
            
            const buttonsToMake = (dish.category === "main" || dish.name === "Torta" || dish.name === "Biko") 
                                  ? dish.contents 
                                  : availableKeys.map(k => k.charAt(0).toUpperCase() + k.slice(1));

            if (buttonsToMake) {
                selectionGridHTML = `<div class="sizes-buttons-grid">`;
                buttonsToMake.forEach((size, index) => {
                    const sizeLower = size.toLowerCase();
                    const hasPrice = dish.prices.hasOwnProperty(sizeLower);
                    const isDefault = sizeLower === availableKeys[0];

                    selectionGridHTML += `
                        <button type="button" 
                            class="sizes-btn ${isDefault ? 'selected' : ''}" 
                            ${!hasPrice ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''} 
                            onclick="selectSize(this)">
                            ${size}
                        </button>`;
                });
                selectionGridHTML += `</div>`;
            }
        }

        // 3. RENDER THE CARD
        allCardsHTML += `
            <div class="menu-dishes" data-category="${dish.category}">
                ${isBookingPage ? `<div class="add-badge"><i class="fa-solid fa-plus" onclick="toggleIcon(this)"></i></div>` : ''}
                <div class="circle-dishes-img"><img src="${dish.image}" alt="${dish.name}" class="menu-img"></div>
                <div class="card-dishes-container">
                    <h4 class="dish-name">${dish.name}</h4>
                    <p class="description">${dish.desc}</p>
                    <div class="price-list">${pricesHTML}</div>
                    
                    ${selectionGridHTML}

                    ${!isBookingPage ? `
                        <div class="counter-wrapper">
                            <button type="button" class="decrement operator" onclick="changeCount(this, -1)">-</button> 
                            <div class="counter">1</div>
                            <button type="button" class="increment operator" onclick="changeCount(this, 1)">+</button> 
                        </div>
                        <div class="card-actions">
                            <button class="book-now-menu">BOOK NOW</button>
                            <button class="cart-btn">ADD TO CART</button>
                        </div>` : ''}
                </div>
            </div>`;
    });

    container.innerHTML = allCardsHTML;
    setupFilters();
    searchDish();
    getItemsBooknow();
    getItemsAddcart();
}

// Helper function para sa pag-switch og size
function selectSize(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.sizes-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}


function changeCount(button, value) {
    const parent = button.parentElement;
    
    const counterDisplay = parent.querySelector('.counter');
    
    let currentNum = parseInt(counterDisplay.innerText);
    let newNum = currentNum + value;
    
    if (newNum < 1) newNum = 1;
    
    counterDisplay.innerText = newNum;
}



function getItemsBooknow() { 
    const booknowBtn = document.querySelectorAll(".book-now-menu");

    booknowBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const dishCard = btn.closest('.menu-dishes');
            const name = dishCard.querySelector('.dish-name').textContent.trim();
            const counterNum = parseInt(dishCard.querySelector('.counter').textContent);
            const dishData = dishes.find(d => d.name === name);
            
            const sizeBtn = dishCard.querySelector('.sizes-btn.selected');
            let finalSize = "";
            let price = 0;

            if (dishData && dishData.prices) {
                if (dishData.prices.set) {
                    finalSize = "Set";
                    price = dishData.prices.set;
                } else if (sizeBtn) {
                    finalSize = sizeBtn.textContent.trim();
                    price = dishData.prices[finalSize.toLowerCase()] || 0;
                } else {
                    // Fallback para sa Tub o Piece kung walay napili
                    const firstKey = Object.keys(dishData.prices)[0];
                    price = dishData.prices[firstKey];
                    finalSize = firstKey.charAt(0).toUpperCase() + firstKey.slice(1);
                }
            }

            const item = { name, size: finalSize, quantity: counterNum, price };
            localStorage.setItem("checkoutItem", JSON.stringify(item));
            window.location.href = "checkout.html";
        });
    });
}

function getItemsAddcart() {
    const cartBtns = document.querySelectorAll(".cart-btn");
    const cartNotice = document.getElementById("cart-notice");

    cartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartNotice.classList.add("show");
            setTimeout(() => cartNotice.classList.remove("show"), 3000);

            const dishCard = btn.closest('.menu-dishes');
            const name = dishCard.querySelector('.dish-name').textContent.trim();
            const sizeBtn = dishCard.querySelector('.sizes-btn.selected');
            const size = sizeBtn ? sizeBtn.textContent.trim() : '';
            const quantity = parseInt(dishCard.querySelector('.counter').textContent);

            const dishData = dishes.find(d => d.name === name);
            let price = 0;
            if (dishData) {
                if (dishData.prices.set) {
                    price = dishData.prices.set;
                } else if (size) {
                    price = dishData.prices[size.toLowerCase()] || 0;
                }
            }

            const item = { name, size, quantity, price };

            // ✅ Save to localStorage instead of appending to DOM
            const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
            existingCart.push(item);
            localStorage.setItem("cartItems", JSON.stringify(existingCart));
        });
    });
}



function loadCartItems() {
    const container = document.getElementById("cart-card-placeholder");
    if (!container) return;

    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const countEl = document.getElementById("cart-number-placeholder");
    if (countEl) countEl.textContent = cartItems.length;

    const clearBtn = document.querySelector('.clear-btn');
    if (clearBtn) clearBtn.style.display = cartItems.length === 0 ? "none" : "";

    container.innerHTML = "";

    if (cartItems.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:20px;">Your cart is empty.</p>`;
        return;
    }

    cartItems.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        const card = document.createElement("div");
        card.classList.add("create-card");
        card.innerHTML = `
            <div class="cart-holder">
                <span>${item.name} (${item.size}) x${item.quantity} — ₱${subtotal}</span>
            </div>
            <button onclick="removeCartItem(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:18px;">✕</button>
        `;
        container.appendChild(card);
    });

    const checkoutDiv = document.createElement("div");
    checkoutDiv.classList.add("check-out");
    checkoutDiv.innerHTML = `
        <button class="checkout-btn">Proceed to Checkout</button>
    `;
    container.appendChild(checkoutDiv);
}



function loadCheckoutItem() {
    const container = document.querySelector(".checkout-placeholder");
    if (!container) return; 

    const cartData = localStorage.getItem("checkoutItems");
    const singleData=localStorage.getItem("checkoutItem");

    const items= cartData ? JSON.parse(cartData) : singleData ? [JSON.parse(singleData)] : [];
     if (items.length === 0) return;
    if (cartData) {
    localStorage.removeItem("checkoutItems");
} else if (singleData) {
    localStorage.removeItem("checkoutItem");
}
    
    

    const deliveryFee = 100;
    let subtotal = 0; 
    let itemsHTML = "";

    items.forEach(item => {
    const itemName = item.name; 
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    itemsHTML += `
        <div class="summary-row">
            <span>${itemName} (${item.size}) x${item.quantity}</span>
            <span>₱ ${itemTotal}</span>
        </div>`;
});

    const total = subtotal + deliveryFee;

    container.innerHTML = `
        ${itemsHTML}
        <hr>
        <div class="summary-row">
            <span><b>Subtotal</b></span>
            <span>₱ ${subtotal}</span>
        </div>
        <div class="summary-row">
            <span>Delivery Fee</span>
            <span>₱ ${deliveryFee}</span>
        </div>
        <div class="summary-row">
            <span><h2>Total</h2></span>
            <span><h2 style="color:red">₱ ${total}</h2></span>
        </div>`;
}

document.getElementById("proceed-btn")?.addEventListener("click", () => {
    const selectedCards = document.querySelectorAll(".selected-card");
    const items = [];

    selectedCards.forEach(card => {
        const name = card.querySelector('.dish-name').textContent.trim();
        const dishData = dishes.find(d => d.name === name);
        const sizeBtn = card.querySelector('.sizes-btn.selected');

        let size = "";
        let price = 0;

        if (dishData && dishData.prices) {
            if (dishData.prices.set) {
                size = "Set";
                price = dishData.prices.set;
            } else if (sizeBtn) {
                size = sizeBtn.textContent.trim();
                price = dishData.prices[size.toLowerCase()] || 0;
            } else {
                const firstKey = Object.keys(dishData.prices)[0];
                size = firstKey.charAt(0).toUpperCase() + firstKey.slice(1);
                price = dishData.prices[firstKey];
            }
        }

        items.push({ name, size, quantity: 1, price });
    });

    localStorage.setItem("checkoutItems", JSON.stringify(items));
    window.location.href = "checkout.html";
});
    
const nameInput=document.getElementById("name");

if(nameInput){
    nameInput.addEventListener("input", () =>{
   nameInput.value= nameInput.value.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
})

}

const phoneInput=document.getElementById("phone-number");

if(phoneInput){
    phoneInput.addEventListener("input", () =>{
    phoneInput.value=phoneInput.value.toLowerCase()
        .replace(/\b\w/g, letter => letter.toUpperCase());
})

}



function contactButton(event){
     event.preventDefault();

    const formContact=document.getElementById("contact-form");
    const nameContact=document.getElementById("name");
     const phoneContact=document.getElementById("phone-number");
     const textContact=document.getElementById("text");
     const errMsg=document.querySelector(".error-msg");
     const nameError=document.getElementById("name-error");
     const phoneError=document.getElementById("phone-error");
     const textError=document.getElementById("text-error");
     const category=document.getElementById("category-select");
     const select=category.value;
     




    const name = nameContact.value.trim();
    const phone = phoneContact.value.trim();
    const text= textContact.value.trim();

    nameError.textContent = "";
    phoneError.textContent = "";
    textError.textContent = "";

    let hasError= false;


    if(name=== "" ){
                    nameError.textContent="Please fill out this field!"
                    errMsg.style.color="red";
                    hasError=true;
                    

     }
    if (  name.length > 0 && name.length <3 ){
                   nameError.textContent=" Input must not be less than 3 characters."
                   errMsg.style.color="red";
                    nameContact.value="";
                   hasError=true;
                   


                }

    if(/\d/.test(name)){
        nameError.textContent="Name should not contain numbers!";
        errMsg.style.color="red";
        nameContact.value="";
        hasError=true;
    }

    if(phone ===""){
        phoneError.textContent="Please fill out this field!"
        errMsg.style.color="red";
        hasError=true;
        
    }


      if(phone.length < 11 && phone.length >0){
        phoneError.textContent="Phone number must not be less than 11 characters!";
        errMsg.style.color="red";
        phoneContact.value="";
        hasError=true;
    }
   
     if(/[A-Za-z]/.test(phone)){
        phoneError.textContent="Phone must not contain letters!";
        errMsg.style.color="red";
        phoneContact.value="";
        hasError=true;

    }

    if(text=== ""){
        textError.textContent="Please fill out this field!"
        errMsg.style.color="red";
        hasError=true;
    }

    if (hasError) {
    document.querySelectorAll(".error-msg").forEach(el => {
        el.style.color = "red";
    });
}



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
    // if(e.target.classList.contains('book-now-menu')){
    //     window.location.href="checkout.html";
    // }
    if(e.target.classList.contains('checkout-btn')){
         const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

         if(cartItems.length===0){
            alert("Your cart is empty");
            return;
         }

         localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
         window.location.href="checkout.html";
    
    }

    // if (e.target.closest('.messenger-btn')) {
    //     e.preventDefault();
    //     window.open("https://www.m.me/perlenegrace.raniseshubac", '_blank');
    // }

    
});