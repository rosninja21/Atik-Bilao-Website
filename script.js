window.addEventListener('DOMContentLoaded', () => {
   

    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

            const currentPage = window.location.pathname.split("/").pop(); 
            const navLinks = document.querySelectorAll('.nav-links li a');

            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage) {
                    link.classList.add('active'); 
                }
            });
        });
});

window.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error("Footer file not found");
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;

                const footerLinks = footerPlaceholder.querySelectorAll('a');

                let path = window.location.pathname.split("/").pop();
                let currentPage = (path === "" || path === "/") ? "home.html" : path;

                footerLinks.forEach(link => {
                    const linkPage = link.getAttribute('href');
                    if (linkPage === currentPage) {
                        link.classList.add('active-footer-link');
                    }
                });
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});


  let browsebtns = document.querySelectorAll(".browse-menu"); 

browsebtns.forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "menu.html";
  });
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
}


]


function setupFilters() {
    const filterButtons = document.querySelectorAll('.menu-btn');
    const dishesCards = document.querySelectorAll('.menu-dishes');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            dishesCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex'; 
                } else {
                    card.style.display = 'none'; 
                }
            });
        });
    });
}


function displayMenu() {
    const container = document.getElementById("food-container");
    if (!container) return; 

    container.innerHTML = "";

    const isBookingPage = window.location.pathname.includes("book-now.html");

    dishes.forEach(dish => {
        let cardHTML = "";

        if (isBookingPage) {
            cardHTML = `
            <div class="menu-dishes" data-category="${dish.category}">
                <div class="add-badge"><i class="fa-solid fa-plus"></i></div>
                <div class="dish-image-wrapper">
                    <img src="${dish.image}" alt="${dish.name}">
                </div>
                <div class="dish-info">
                    <h4>${dish.name}</h4>
                    <p class="description">${dish.desc}</p>
                    <div class="price-display">
                        ${dish.prices.small ? `<span>Small: <b>₱ ${dish.prices.small}</b></span>` : ''}
                        ${dish.prices.medium ? `<span>Medium: <b>₱ ${dish.prices.medium}</b></span>` : ''}
                        ${dish.prices.large ? `<span>Large: <b>₱ ${dish.prices.large}</b></span>` : ''}
                    </div>
                    <div class="size-selector">
                        <button class="size-btn">Small</button>
                        <button class="size-btn">Medium</button>
                        <button class="size-btn">Large</button>
                    </div>
                </div>
            </div>`;
        } else {
            cardHTML = `
            <div class="menu-dishes" data-category="${dish.category}">
                <div class="circle-dishes-img">
                    <img src="${dish.image}" alt="${dish.name}" class="menu-img">
                </div>
                <div class="card-dishes-container">
                    <h4>${dish.name}</h4>   
                    <p class="description">${dish.desc}</p>
                    <div class="price-list">
                        ${dish.prices.small ? `<span>Small: <b>₱ ${dish.prices.small}</b></span>` : ''}
                        ${dish.prices.medium ? `<span>Medium: <b>₱ ${dish.prices.medium}</b></span>` : ''}
                        ${dish.prices.large ? `<span>Large: <b>₱ ${dish.prices.large}</b></span>` : ''}
                    </div>
                    <div class="card-actions">
                        <button class="book-now">BOOK NOW</button>
                        <button class="cart-btn">ADD TO CART</button>
                    </div>
                </div> 
            </div>`;
        }
        
        container.innerHTML += cardHTML;
    });

    setupFilters();
}
 document.addEventListener('DOMContentLoaded', displayMenu);

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('book-now')) {
        window.location.href = "book-now.html";
    }
});

document.addEventListener('click', function(event) {
    if (event.target.closest('.messenger-btn')) {
        event.preventDefault(); 
        
        const messengerLink = "https://www.m.me/perlenegrace.raniseshubac";
        
        window.open(messengerLink, '_blank');
    }
});


    

