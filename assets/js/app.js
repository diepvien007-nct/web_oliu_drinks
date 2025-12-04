// =========================
// OLIU DRINKS - APP.JS
// =========================

// ---------- LOAD HEADER + FOOTER ----------
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

// ---------- DỮ LIỆU SẢN PHẨM ----------
const products = [
  // Trà sữa (sp1.jpg .. sp10.jpg) - 10 items
  { id: 1, name: "Trà sữa Thái xanh", price: 25000, category: "tra-sua", image: "assets/images/sp1.jpg", description: "Trà xanh béo thơm, màu xanh bắt mắt.", tag: "Trà sữa" },
  { id: 2, name: "Hồng trà sữa", price: 22000, category: "tra-sua", image: "assets/images/sp2.jpg", description: "Hồng trà đậm vị, cân bằng giữa trà và sữa.", tag: "Trà sữa" },
  { id: 3, name: "Matcha Latte", price: 29000, category: "tra-sua", image: "assets/images/sp3.jpg", description: "Matcha Nhật kết hợp sữa tươi, ngọt vừa, thơm lâu.", tag: "Matcha" },
  { id: 4, name: "Trà sữa Socola", price: 27000, category: "tra-sua", image: "assets/images/sp4.jpg", description: "Socola béo ngậy, hợp với ai thích vị đậm.", tag: "Hot" },
  { id: 5, name: "Trà sữa Trân châu", price: 30000, category: "tra-sua", image: "assets/images/sp5.jpg", description: "Trà sữa truyền thống kèm trân châu dai.", tag: "Best seller" },
  { id: 6, name: "Trà sữa Bạc hà", price: 26000, category: "tra-sua", image: "assets/images/sp6.jpg", description: "Hương bạc hà tươi mát, vị lạ miệng.", tag: "Mới" },
  { id: 7, name: "Trà sữa Caramel", price: 28000, category: "tra-sua", image: "assets/images/sp7.jpg", description: "Caramel ngọt dịu, thơm vị đường cháy.", tag: "Trà sữa" },
  { id: 8, name: "Trà sữa Khoai môn", price: 32000, category: "tra-sua", image: "assets/images/sp8.jpg", description: "Khoai môn béo, vị đặc trưng, rất thích hợp cho ai mê vị ngọt.", tag: "Đặc sắc" },
  { id: 9, name: "Trà sữa Oolong", price: 30000, category: "tra-sua", image: "assets/images/sp9.jpg", description: "Oolong nhẹ, hòa quyện với sữa tươi.", tag: "Trà sữa" },
  { id: 10, name: "Trà sữa Dâu", price: 29000, category: "tra-sua", image: "assets/images/sp10.jpg", description: "Vị dâu ngọt nhẹ, màu sắc bắt mắt.", tag: "Mùa hè" },

  // Trà trái cây (sp11.jpg .. sp17.jpg) - 7 items
  { id: 11, name: "Trà tắc Thái xanh", price: 19000, category: "tra-trai-cay", image: "assets/images/sp11.jpg", description: "Vị chua ngọt, thơm mùi tắc, uống siêu đã khát.", tag: "Best seller" },
  { id: 12, name: "Trà đào cam thảo", price: 25000, category: "tra-trai-cay", image: "assets/images/sp12.jpg", description: "Đào miếng, cam thảo thơm, hậu vị ngọt nhẹ.", tag: "Trà đào" },
  { id: 13, name: "Trà chanh mật ong", price: 23000, category: "tra-trai-cay", image: "assets/images/sp13.jpg", description: "Chanh tươi, mật ong, vị thanh mát dễ uống.", tag: "Refreshing" },
  { id: 15, name: "Trà xoài", price: 26000, category: "tra-trai-cay", image: "assets/images/sp15.jpg", description: "Xoài chín mềm, ngọt thanh, thơm mùi trái cây.", tag: "Mùa vụ" },
  { id: 16, name: "Trà cóc", price: 20000, category: "tra-trai-cay", image: "assets/images/sp16.jpg", description: "Cóc chua nhẹ, phù hợp khi muốn giải khát.", tag: "Giảm nhiệt" },
  { id: 17, name: "Trà sả chanh", price: 21000, category: "tra-trai-cay", image: "assets/images/sp17.jpg", description: "Sả thơm, chanh tươi tạo cảm giác sảng khoái.", tag: "Tươi mát" },

  // Topping (tp1.jpg .. tp9.jpg) - 9 items
  { id: 18, name: "Trân châu đường đen", price: 6000, category: "topping", image: "assets/images/tp1.jpg", description: "Trân châu dai mềm, áo đường đen thơm.", tag: "Topping" },
  { id: 19, name: "Thạch phô mai", price: 7000, category: "topping", image: "assets/images/tp2.jpg", description: "Viên phô mai béo nhẹ, ăn rất ghiền.", tag: "Topping" },
  { id: 20, name: "Pudding trứng", price: 7000, category: "topping", image: "assets/images/tp3.jpg", description: "Pudding trứng mềm mịn, thơm trứng sữa.", tag: "Topping" },
  { id: 21, name: "Kem phô mai", price: 8000, category: "topping", image: "assets/images/tp4.jpg", description: "Kem phô mai béo mịn, tăng độ ngon cho đồ uống.", tag: "Topping" },
  { id: 22, name: "Rau câu trái cây", price: 6000, category: "topping", image: "assets/images/tp5.jpg", description: "Mềm mịn, vị trái cây tự nhiên.", tag: "Topping" },
  { id: 23, name: "Hạt chia", price: 5000, category: "topping", image: "assets/images/tp6.jpg", description: "Bổ sung dinh dưỡng, giòn nhẹ khi nhai.", tag: "Topping" },
  { id: 24, name: "Trân châu trắng", price: 6000, category: "topping", image: "assets/images/tp7.jpg", description: "Trân châu dai, màu trắng trong suốt.", tag: "Topping" },
  { id: 25, name: "Thạch dừa", price: 7000, category: "topping", image: "assets/images/tp8.jpg", description: "Thạch dừa giòn, thơm mùi nước cốt dừa.", tag: "Topping" },
  { id: 26, name: "Bánh flan", price: 9000, category: "topping", image: "assets/images/tp9.jpg", description: "Bánh flan béo, mềm, rất hợp khi thêm vào trà sữa.", tag: "Topping" },
];

// ---------- GIỎ HÀNG ----------
let cart = [];
let currentFilter = "all";
let currentSearch = "";
let currentSort = "default";

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

function getCartTotal() {
  return cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(productId) {
  const item = cart.find((c) => c.productId === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  saveCart();
  updateCartUI();
  renderCartPage();
  renderCheckoutSummary();
}

function changeQuantity(productId, delta) {
  const item = cart.find((c) => c.productId === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((c) => c.productId !== productId);
  }
  saveCart();
  updateCartUI();
  renderCartPage();
  renderCheckoutSummary();
}

function removeFromCart(productId) {
  cart = cart.filter((c) => c.productId !== productId);
  saveCart();
  updateCartUI();
  renderCartPage();
  renderCheckoutSummary();
}

// sidebar cart
function updateCartUI() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total-value");
  const countEl = document.getElementById("cart-count");

  if (container) {
    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML =
        '<div class="cart-empty">Giỏ hàng đang trống.</div>';
    } else {
      cart.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return;

        const el = document.createElement("div");
        el.className = "cart-item";
        el.innerHTML = `
          <div class="cart-item-img">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-actions">
              <div class="qty-control">
                <button class="qty-btn" data-action="minus" data-id="${product.id}">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-action="plus" data-id="${product.id}">+</button>
              </div>
              <button class="cart-remove" data-action="remove" data-id="${product.id}">
                Xoá
              </button>
            </div>
            <div class="cart-item-price">
              ${formatCurrency(product.price * item.quantity)}
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

// ---------- PRODUCT LIST + FILTER ----------
function getFilteredProducts() {
  let data = [...products];

  // normalize filter string
  const filterKey = (currentFilter || "all").toString().trim();

  if (filterKey !== "all") {
    data = data.filter((p) => (p.category || "").toString().trim() === filterKey);
  }

  if (currentSearch.trim() !== "") {
    const key = currentSearch.trim().toLowerCase();
    data = data.filter(
      (p) =>
        p.name.toLowerCase().includes(key) ||
        (p.description && p.description.toLowerCase().includes(key))
    );
  }

  if (currentSort === "price-asc") {
    data.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    data.sort((a, b) => b.price - a.price);
  } else if (currentSort === "name-asc") {
    data.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }

  return data;
}

function renderProducts() {
  const listEl = document.getElementById("product-list");
  if (!listEl) return;

  const data = getFilteredProducts();
  // debug: show category map and matched count
  try {
    const categories = products.reduce((acc, p) => {
      const k = (p.category || "").toString().trim();
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
    console.debug("[DEBUG] renderProducts: currentFilter=", JSON.stringify(currentFilter), "matched=", data.length, "categories=", categories);
  } catch (e) {
    console.debug("[DEBUG] renderProducts: currentFilter=", JSON.stringify(currentFilter), "matched=", data.length);
  }

  listEl.innerHTML = "";

  if (data.length === 0) {
    listEl.innerHTML =
      '<div class="product-empty">Không tìm thấy sản phẩm phù hợp.</div>';
    return;
  }

  data.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card fade-section";

    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-body">
        <div class="product-tag">${product.tag || ""}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-meta">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <button class="btn btn-primary btn-add" data-id="${product.id}">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    `;

    listEl.appendChild(card);
  });
}

function initProductPage() {
  const listEl = document.getElementById("product-list");
  if (!listEl) return;

  renderProducts();

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    addToCart(id);
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // normalize filter value to avoid hidden whitespace issues
      currentFilter = (btn.dataset.filter || "all").toString().trim();
      console.debug("[DEBUG] filter clicked:", JSON.stringify(currentFilter));
      renderProducts();
    });
  });

  const sortSelect = document.getElementById("filter-sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentSort = sortSelect.value || "default";
      renderProducts();
    });
  }

  const searchInput = document.getElementById("product-search");
  const searchForm = document.getElementById("product-search-form");
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      currentSearch = searchInput.value || "";
      renderProducts();
    });
    searchInput.addEventListener("keyup", () => {
      currentSearch = searchInput.value || "";
      renderProducts();
    });
  }
}

// ---------- CART SIDEBAR ----------
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
      const id = parseInt(btn.dataset.id, 10);
      const action = btn.dataset.action;

      if (action === "minus") {
        changeQuantity(id, -1);
      } else if (action === "plus") {
        changeQuantity(id, 1);
      } else if (action === "remove") {
        removeFromCart(id);
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Giỏ hàng đang trống.");
        return;
      }
      // chuyển tới trang checkout
      window.location.href = "checkout.html";
    });
  }
}

// ---------- SLIDER ----------
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
    }, 5000); // 5 giây
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

// ---------- FADE-IN SCROLL ----------
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

// ---------- AUTH PAGE ----------
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

// ---------- CART PAGE ----------
function renderCartPage() {
  const container = document.getElementById("cart-page-items");
  const totalEl = document.getElementById("cart-page-total");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML =
      '<div class="cart-empty">Giỏ hàng đang trống. Hãy quay lại menu để chọn món nhé.</div>';
  } else {
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const row = document.createElement("div");
      row.className = "cart-page-item";
      row.innerHTML = `
        <div class="cart-page-item-info">
          <div class="cart-page-name">${product.name}</div>
          <div class="cart-page-meta">
            <span class="cart-page-price">${formatCurrency(
              product.price
            )}</span>
            <div class="qty-control">
              <button class="qty-btn" data-action="minus" data-id="${product.id}">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-action="plus" data-id="${product.id}">+</button>
            </div>
            <button class="cart-remove" data-action="remove" data-id="${product.id}">
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
    const id = parseInt(btn.dataset.id, 10);
    const action = btn.dataset.action;

    if (action === "minus") {
      changeQuantity(id, -1);
    } else if (action === "plus") {
      changeQuantity(id, 1);
    } else if (action === "remove") {
      removeFromCart(id);
    }
  });
}

// ---------- CHECKOUT PAGE ----------
function renderCheckoutSummary() {
  const container = document.getElementById("checkout-summary");
  const totalEl = document.getElementById("checkout-total");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML =
      '<div class="cart-empty">Giỏ hàng đang trống.</div>';
  } else {
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const row = document.createElement("div");
      row.className = "checkout-item";
      row.innerHTML = `
        <div class="checkout-item-name">${product.name}</div>
        <div class="checkout-item-qty">x${item.quantity}</div>
        <div class="checkout-item-price">${formatCurrency(
          product.price * item.quantity
        )}</div>
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
    if (cart.length === 0) {
      alert("Giỏ hàng đang trống, hãy chọn đồ uống trước.");
      return;
    }
    alert(
      "Đây là demo. Khi triển khai thật, bạn sẽ gửi dữ liệu form + giỏ hàng lên server để tạo đơn."
    );
  });
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", async () => {
  // nạp header + footer
  await loadLayout();

  // set năm
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // giỏ hàng
  loadCart();
  updateCartUI();

  // init các phần
  initCartEvents();
  initProductPage();
  initSlider();
  initScrollAnimations();
  initAuthPage();
  initCartPage();
  initCheckoutPage();
});
