// cart.js - cart state and helpers (global)
var cart = [];

function formatCurrency(value) {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

function saveCart() {
  localStorage.setItem("oliu_cart", JSON.stringify(cart));
}

function loadCart() {
  const data = localStorage.getItem("oliu_cart");
  if (data) {
    try {
      cart = JSON.parse(data) || [];
    } catch {
      cart = [];
    }
  }
}

function getCartItemUnitPrice(item) {
  const product = products.find((p) => p.id === item.productId);
  if (!product) return 0;
  let price = product.price;
  const opts = item.options || {};
  if (opts.size === 'L') price += 5000; // size premium
  if (Array.isArray(opts.toppings)) {
    opts.toppings.forEach(tid => {
      const t = products.find(p => p.id === tid);
      if (t) price += t.price;
    });
  }
  return price;
}

function getCartTotal() {
  return cart.reduce((total, item) => {
    return total + getCartItemUnitPrice(item) * item.quantity;
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function _optionsKey(options) {
  try {
    return JSON.stringify(options || {});
  } catch (e) {
    return '';
  }
}

function addToCart(productId, options = {}, qty = 1) {
  // find existing item matching productId + options
  const key = _optionsKey(options);
  const idx = cart.findIndex(c => c.productId === productId && _optionsKey(c.options) === key);
  if (idx >= 0) {
    cart[idx].quantity += qty;
  } else {
    cart.push({ productId, quantity: qty, options: options });
  }
  saveCart();
  updateCartUI();
  if (typeof renderCartPage === 'function') renderCartPage();
  if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
}

// Buy now: store one-time buy item in session and redirect to checkout
function buyNow(productId, options = {}, qty = 1) {
  const item = { productId, options, quantity: qty };
  try {
    sessionStorage.setItem('oliu_buy_now', JSON.stringify(item));
  } catch (e) {}
  // navigate to checkout
  window.location.href = 'checkout.html';
}

function changeQuantityByKey(key, delta) {
  const idx = parseInt(key, 10);
  if (isNaN(idx) || !cart[idx]) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) {
    cart.splice(idx, 1);
  }
  saveCart();
  updateCartUI();
  if (typeof renderCartPage === 'function') renderCartPage();
  if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
}

function removeItemByKey(key) {
  const idx = parseInt(key, 10);
  if (isNaN(idx) || !cart[idx]) return;
  cart.splice(idx, 1);
  saveCart();
  updateCartUI();
  if (typeof renderCartPage === 'function') renderCartPage();
  if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
}

function updateCartUI() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total-value");
  const countEl = document.getElementById("cart-count");

  if (container) {
    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = '<div class="cart-empty">Giỏ hàng đang trống.</div>';
    } else {
      cart.forEach((item, idx) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return;

        const el = document.createElement("div");
        el.className = "cart-item";

        // options summary
        let optsHtml = '';
        if (item.options) {
          if (item.options.size) optsHtml += `<div class="cart-opt">Kích thước: ${item.options.size}</div>`;
          if (item.options.ice) optsHtml += `<div class="cart-opt">Đá: ${item.options.ice}</div>`;
          if (Array.isArray(item.options.toppings) && item.options.toppings.length) {
            const names = item.options.toppings.map(tid => (products.find(p=>p.id===tid)||{}).name || '').filter(Boolean);
            if (names.length) optsHtml += `<div class="cart-opt">Topping: ${names.join(', ')}</div>`;
          }
        }

        const unitPrice = getCartItemUnitPrice(item);

        el.innerHTML = `
          <div class="cart-item-img">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${product.name}</div>
            ${optsHtml}
            <div class="cart-item-actions">
              <div class="qty-control">
                <button class="qty-btn" data-action="minus" data-key="${idx}">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-action="plus" data-key="${idx}">+</button>
              </div>
              <button class="cart-remove" data-action="remove" data-key="${idx}">
                Xoá
              </button>
            </div>
            <div class="cart-item-price">
              ${formatCurrency(unitPrice * item.quantity)}
            </div>
          </div>
        `;
        container.appendChild(el);
      });
    }
  }

  if (totalEl) totalEl.textContent = formatCurrency(getCartTotal());
  if (countEl) countEl.textContent = getCartCount();
}
