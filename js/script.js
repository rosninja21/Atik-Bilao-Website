import useDishMethod from "../../../../backend/useDishMethod.js";

window.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbarPlaceholder = document.getElementById("navbar-placeholder");
      if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = data;
        const currentPage =
          window.location.pathname.split("/").pop() || "index.html";
        const navLinks = navbarPlaceholder.querySelectorAll(".nav-links li a");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === currentPage)
            link.classList.add("active");
        });
      }
    });

  fetch("footer.html")
    .then((response) =>
      response.ok ? response.text() : Promise.reject("Footer not found"),
    )
    .then((data) => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
        const path = window.location.pathname.split("/").pop();
        const currentPage = path === "" || path === "/" ? "home.html" : path;
        footerPlaceholder.querySelectorAll("a").forEach((link) => {
          if (link.getAttribute("href") === currentPage)
            link.classList.add("active-footer-link");
        });
      }
    })
    .catch((error) => console.error(error));

  document.querySelector(".clear-btn")?.addEventListener("click", () => {
    localStorage.removeItem("cartItems");
    loadCartItems();
  });

  displayMenu();
  loadCheckoutItem();
  loadCartItems();
});

// --- HELPER: Find price in the array of objects ---
function getPriceValue(dish, sizeName) {
  if (!dish.prices || !Array.isArray(dish.prices)) return 0;
  const target = sizeName.toLowerCase();
  const found = dish.prices.find(
    (p) => Object.keys(p)[0].toLowerCase() === target,
  );
  return found ? Object.values(found)[0] : 0;
}

async function displayMenu() {
  const container = document.getElementById("food-container");
  if (!container) return;

  const { fetchDish } = useDishMethod();
  const dishes = await fetchDish();

  let allCardsHTML = "";
  const isBookingPage = window.location.pathname.includes("book-now.html");

  dishes.forEach((dish) => {
    let pricesHTML = "";
    const flatPrices = {};
    if (dish.prices) {
      dish.prices.forEach((p) => {
        const key = Object.keys(p)[0];
        const val = p[key];
        flatPrices[key.toLowerCase()] = val;
        pricesHTML += `<span>${key.charAt(0).toUpperCase() + key.slice(1)}: <b>₱ ${val}</b></span>`;
      });
    }

    let selectionGridHTML = "";
    if (dish.category.toLowerCase() === "combos") {
      selectionGridHTML = `
                <div class="combo-selection">
                    <p class="selection-title">Choose <span></span>/${dish.name.includes("3") ? "3" : "2"} :</p>
                    <div class="combo-buttons-grid">
                        ${dish.contents.map((item) => `<button type="button" class="combo-item-btn" onclick="this.classList.toggle('selected')">${item}</button>`).join("")}
                    </div>
                </div>`;
    } else {
      const buttonsToMake = dish.contents || [];
      const firstAvailableKey =
        dish.prices && dish.prices.length > 0
          ? Object.keys(dish.prices[0])[0].toLowerCase()
          : "";

      if (buttonsToMake.length > 0) {
        selectionGridHTML = `<div class="sizes-buttons-grid">`;
        buttonsToMake.forEach((size) => {
          const sizeLower = size.toLowerCase();
          const hasPrice = flatPrices.hasOwnProperty(sizeLower);
          const isDefault = sizeLower === firstAvailableKey;

          selectionGridHTML += `
                        <button type="button" 
                            class="sizes-btn ${isDefault ? "selected" : ""}" 
                            ${!hasPrice ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ""} 
                            onclick="selectSize(this)">
                            ${size}
                        </button>`;
        });
        selectionGridHTML += `</div>`;
      }
    }

    allCardsHTML += `
            <div class="menu-dishes" data-category="${dish.category}">
                ${isBookingPage ? `<div class="add-badge"><i class="fa-solid fa-plus" onclick="toggleIcon(this)"></i></div>` : ""}
                <div class="circle-dishes-img"><img src="${dish.image}" alt="${dish.name}" class="menu-img"></div>
                <div class="card-dishes-container">
                    <h4 class="dish-name">${dish.name}</h4>
                    <p class="description">${dish.desc}</p>
                    <div class="price-list">${pricesHTML}</div>
                    
                    ${selectionGridHTML}

                    ${
                      !isBookingPage
                        ? `
                        <div class="counter-wrapper">
                            <button type="button" class="decrement operator" onclick="changeCount(this, -1)">-</button> 
                            <div class="counter">1</div>
                            <button type="button" class="increment operator" onclick="changeCount(this, 1)">+</button> 
                        </div>
                        <div class="card-actions">
                            <button class="book-now-menu">BOOK NOW</button>
                            <button class="cart-btn">ADD TO CART</button>
                        </div>`
                        : ""
                    }
                </div>
            </div>`;
  });

  container.innerHTML = allCardsHTML;
  setupFilters();
  searchDish();
  getItemsBooknow(dishes);
  getItemsAddcart(dishes);
}

function selectSize(btn) {
  const parent = btn.parentElement;
  parent
    .querySelectorAll(".sizes-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function changeCount(button, value) {
  const parent = button.parentElement;
  const counterDisplay = parent.querySelector(".counter");
  let currentNum = parseInt(counterDisplay.innerText);
  let newNum = Math.max(1, currentNum + value);
  counterDisplay.innerText = newNum;
}

function getItemsBooknow(dishes) {
  document.querySelectorAll(".book-now-menu").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dishCard = btn.closest(".menu-dishes");
      const name = dishCard.querySelector(".dish-name").textContent.trim();
      const quantity = parseInt(dishCard.querySelector(".counter").textContent);
      const dishData = dishes.find((d) => d.name === name);

      const sizeBtn = dishCard.querySelector(".sizes-btn.selected");
      let finalSize = sizeBtn
        ? sizeBtn.textContent.trim()
        : dishData.contents
          ? dishData.contents[0]
          : "";
      let price = getPriceValue(dishData, finalSize);

      const item = { name, size: finalSize, quantity, price };
      localStorage.setItem("checkoutItem", JSON.stringify(item));
      window.location.href = "checkout.html";
    });
  });
}

function getItemsAddcart(dishes) {
  const cartNotice = document.getElementById("cart-notice");
  document.querySelectorAll(".cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (cartNotice) {
        cartNotice.classList.add("show");
        setTimeout(() => cartNotice.classList.remove("show"), 3000);
      }

      const dishCard = btn.closest(".menu-dishes");
      const name = dishCard.querySelector(".dish-name").textContent.trim();
      const sizeBtn = dishCard.querySelector(".sizes-btn.selected");
      const quantity = parseInt(dishCard.querySelector(".counter").textContent);
      const dishData = dishes.find((d) => d.name === name);

      let size = sizeBtn
        ? sizeBtn.textContent.trim()
        : dishData.contents
          ? dishData.contents[0]
          : "";
      let price = getPriceValue(dishData, size);

      const item = { name, size, quantity, price };
      const existingCart = JSON.parse(
        localStorage.getItem("cartItems") || "[]",
      );
      existingCart.push(item);
      localStorage.setItem("cartItems", JSON.stringify(existingCart));
      loadCartItems();
    });
  });
}

function loadCartItems() {
  const container = document.getElementById("cart-card-placeholder");
  if (!container) return;

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const countEl = document.getElementById("cart-number-placeholder");
  if (countEl) countEl.textContent = cartItems.length;

  const clearBtn = document.querySelector(".clear-btn");
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
  checkoutDiv.innerHTML = `<button class="checkout-btn">Proceed to Checkout</button>`;
  container.appendChild(checkoutDiv);
}

window.removeCartItem = (index) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItems();
};

function loadCheckoutItem() {
  const container = document.querySelector(".checkout-placeholder");
  if (!container) return;
  const data = localStorage.getItem("checkoutItem");
  if (!data) return;

  const item = JSON.parse(data);
  const deliveryfee = 100;
  const subtotal = parseFloat(item.price) * parseInt(item.quantity);
  const total = subtotal + deliveryfee;

  container.innerHTML = `
        <div class="summary-row">
            <span>${item.name} (${item.size}) x${item.quantity}</span>
            <span>₱ ${subtotal}</span> 
        </div>
        <hr>
        <div class="summary-row"><span><b>Subtotal</b></span><span>₱ ${subtotal}</span></div>
        <div class="summary-row"><span>Delivery Fee</span><span>₱ ${deliveryfee}</span></div>
        <div class="summary-row"><span><h2>Total</h2></span><span><h2 style="color:red">₱ ${total}</h2></span></div>
    `;
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".menu-btn");
  filterButtons.forEach((button) => {
    button.onclick = () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filterValue = button.getAttribute("data-filter").toLowerCase();
      document.querySelectorAll(".menu-dishes").forEach((card) => {
        const category = card.getAttribute("data-category").toLowerCase();
        card.style.display =
          filterValue === "all" || category === filterValue ? "flex" : "none";
      });
    };
  });
}

function searchDish() {
  const searchInput = document.querySelector(".search-input");
  if (!searchInput) return;
  searchInput.oninput = function () {
    const query = this.value.toLowerCase().trim();
    document.querySelectorAll(".menu-dishes").forEach((card) => {
      const name = card.querySelector(".dish-name").textContent.toLowerCase();
      card.style.display = name.includes(query) ? "flex" : "none";
    });
  };
}

function toggleIcon(icon) {
  icon.classList.toggle("fa-plus");
  icon.classList.toggle("fa-check");
  const badge = icon.parentElement;
  badge.classList.toggle("active");
  const card = icon.closest(".menu-dishes");
  if (card) card.classList.toggle("selected-card");
  const checkOutBtn = document.getElementById("proceed-btn");
  if (checkOutBtn) {
    const selectedItems = document.querySelectorAll(".fa-check");
    checkOutBtn.style.display = selectedItems.length > 0 ? "block" : "none";
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("browse-menu"))
    window.location.href = "menu.html";
  if (e.target.classList.contains("book-now"))
    window.location.href = "book-now.html";
  if (e.target.classList.contains("checkout-btn"))
    window.location.href = "checkout.html";
  if (e.target.closest(".messenger-btn")) {
    e.preventDefault();
    window.open("https://www.m.me/perlenegrace.raniseshubac", "_blank");
  }
});
