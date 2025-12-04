// init.js - initialization and remaining UI pieces

async function loadLayout() {
  const headerHost = document.getElementById("site-header");
  const footerHost = document.getElementById("site-footer");

  async function fetchFragment(url, el) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        el.innerHTML = await res.text();
      } else {
        el.innerHTML = "";
      }
    } catch (e) {
      console.error("Không load được", url, e);
    }
  }

  const tasks = [];
  if (headerHost) tasks.push(fetchFragment("header.html", headerHost));
  if (footerHost) tasks.push(fetchFragment("footer.html", footerHost));

  await Promise.all(tasks);
}

function initCartEvents() {
  const cartToggle = document.getElementById("cart-toggle");
  const cartClose = document.getElementById("cart-close");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartItemsEl = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("cart-checkout");

  if (cartToggle && cartSidebar && cartOverlay) {
    const openCart = () => {
      cartSidebar.classList.add("open");
      cartOverlay.classList.add("show");
    };
    const closeCart = () => {
      cartSidebar.classList.remove("open");
      cartOverlay.classList.remove("show");
    };

    cartToggle.addEventListener("click", openCart);
    cartClose && cartClose.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
  }

  if (cartItemsEl) {
    cartItemsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const key = btn.dataset.key;
      const action = btn.dataset.action;

      if (action === "minus") {
        changeQuantityByKey(key, -1);
      } else if (action === "plus") {
        changeQuantityByKey(key, 1);
      } else if (action === "remove") {
        removeItemByKey(key);
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Giỏ hàng đang trống.");
        return;
      }
      window.location.href = "checkout.html";
    });
  }
}

let sliderIntervalId = null;
function initSlider() {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  if (!slides.length) return;

  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  let currentIndex = 0;

  function setActiveSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
  }

  function goToSlide(i) {
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    currentIndex = i;
    setActiveSlide(currentIndex);
  }

  function startAutoPlay() {
    stopAutoPlay();
    sliderIntervalId = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }

  function stopAutoPlay() {
    if (sliderIntervalId) clearInterval(sliderIntervalId);
    sliderIntervalId = null;
  }

  setActiveSlide(currentIndex);
  startAutoPlay();

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);
}

function initScrollAnimations() {
  const sections = document.querySelectorAll(".fade-section");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

function initAuthPage() {
  const tabButtons = document.querySelectorAll(".auth-tab-btn");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  if (!tabButtons.length || !loginForm || !registerForm) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.target;
      if (target === "login") {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
      } else {
        registerForm.classList.add("active");
        loginForm.classList.remove("active");
      }
    });
  });
}

function renderCartPage() {
  const container = document.getElementById("cart-page-items");
  const totalEl = document.getElementById("cart-page-total");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Giỏ hàng đang trống. Hãy quay lại menu để chọn món nhé.</div>';
  } else {
    cart.forEach((item, idx) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const row = document.createElement("div");
      row.className = "cart-page-item";
      const unitPrice = (typeof getCartItemUnitPrice === 'function') ? getCartItemUnitPrice(item) : product.price;
      row.innerHTML = `
        <div class="cart-page-item-info">
          <div class="cart-page-name">${product.name}</div>
          <div class="cart-page-meta">
            <span class="cart-page-price">${formatCurrency(unitPrice)}</span>
            <div class="qty-control">
              <button class="qty-btn" data-action="minus" data-key="${idx}">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-action="plus" data-key="${idx}">+</button>
            </div>
            <button class="cart-remove" data-action="remove" data-key="${idx}">
              Xoá
            </button>
          </div>
        </div>
      `;
      container.appendChild(row);
    });
  }

  if (totalEl) totalEl.textContent = formatCurrency(getCartTotal());
}

function initCartPage() {
  const container = document.getElementById("cart-page-items");
  if (!container) return;

  renderCartPage();

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const key = btn.dataset.key;
    const action = btn.dataset.action;

    if (action === "minus") {
      changeQuantityByKey(key, -1);
    } else if (action === "plus") {
      changeQuantityByKey(key, 1);
    } else if (action === "remove") {
      removeItemByKey(key);
    }
  });
}

function renderCheckoutSummary() {
  const container = document.getElementById("checkout-summary");
  const totalEl = document.getElementById("checkout-total");
  if (!container) return;
  container.innerHTML = "";

  // check for buy-now temporary item
  const buyNowRaw = sessionStorage.getItem('oliu_buy_now');
  if (buyNowRaw) {
    try {
      const bi = JSON.parse(buyNowRaw);
      const product = products.find((p) => p.id === bi.productId);
      if (product) {
        const unitPrice = (typeof getCartItemUnitPrice === 'function') ? getCartItemUnitPrice(bi) : product.price;
        const row = document.createElement("div");
        row.className = "checkout-item";
        row.innerHTML = `
          <div class="checkout-item-name">${product.name}</div>
          <div class="checkout-item-qty">x${bi.quantity}</div>
          <div class="checkout-item-price">${formatCurrency(unitPrice * bi.quantity)}</div>
        `;
        container.appendChild(row);
        if (totalEl) totalEl.textContent = formatCurrency(unitPrice * bi.quantity);
      }
    } catch (e) {
      console.error('Invalid buy_now data', e);
    }
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Giỏ hàng đang trống.</div>';
  } else {
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const unitPrice = (typeof getCartItemUnitPrice === 'function') ? getCartItemUnitPrice(item) : product.price;

      const row = document.createElement("div");
      row.className = "checkout-item";
      row.innerHTML = `
        <div class="checkout-item-name">${product.name}</div>
        <div class="checkout-item-qty">x${item.quantity}</div>
        <div class="checkout-item-price">${formatCurrency(unitPrice * item.quantity)}</div>
      `;
      container.appendChild(row);
    });
  }

  if (totalEl) totalEl.textContent = formatCurrency(getCartTotal());
}

function initCheckoutPage() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  renderCheckoutSummary();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // if buy_now present, process that item; otherwise process cart
    const buyNowRaw = sessionStorage.getItem('oliu_buy_now');
    if (!buyNowRaw && cart.length === 0) {
      alert("Giỏ hàng đang trống, hãy chọn đồ uống trước.");
      return;
    }

    // simulate order submission
    alert("Đơn hàng đã được gửi (demo). Cảm ơn bạn!");

    // clear buy_now or cart
    if (buyNowRaw) {
      sessionStorage.removeItem('oliu_buy_now');
    } else {
      cart = [];
      saveCart();
    }
    updateCartUI();
    if (typeof renderCartPage === 'function') renderCartPage();

    // redirect to thank you page
    window.location.href = 'thankyou.html';
  });
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", async () => {
  await loadLayout();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

function initCarousel() {
  const carousel = document.querySelector(".featured-carousel");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  if (!carousel || !prevBtn || !nextBtn) return;

  const scrollAmount = 260; // Item width (240px) + gap (20px)

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

  loadCart();
  updateCartUI();

  initCartEvents();
  initProductPage();
  initSlider();
  initScrollAnimations();
  initAuthPage();
  initCartPage();
  initCheckoutPage();
  initCarousel();
});
