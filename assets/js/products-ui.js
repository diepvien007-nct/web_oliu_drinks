// products-ui.js - filtering, rendering, product page interactions
var currentFilter = "all";
var currentSearch = "";
var currentSort = "default";

function getFilteredProducts() {
  let data = Array.isArray(products) ? [...products] : [];

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
    listEl.innerHTML = '<div class="product-empty">Không tìm thấy sản phẩm phù hợp.</div>';
    return;
  }

  // log matched product names for easier debugging
  console.debug("[DEBUG] matched products:", data.map(p => ({ id: p.id, name: p.name, category: p.category })));

  data.forEach((product) => {
    const card = document.createElement("article");
    // temporarily remove 'fade-section' to avoid elements remaining invisible
    card.className = "product-card";

    card.innerHTML = `
      <a class="product-image-wrapper" href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.name}" />
      </a>
      <div class="product-body">
        <div class="product-tag">${product.tag || ""}</div>
        <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-price-display">${formatCurrency(product.price)}</div>
      </div>
      <div class="product-actions">
        <button class="btn btn-buy" data-id="${product.id}">Mua ngay</button>
        <button class="btn btn-add" data-id="${product.id}">Thêm vào giỏ</button>
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
    const addBtn = e.target.closest(".btn-add");
    if (addBtn) {
      const id = parseInt(addBtn.dataset.id, 10);
      addToCart(id);
      return;
    }

    const buyBtn = e.target.closest('.btn-buy');
    if (buyBtn) {
      const id = parseInt(buyBtn.dataset.id, 10);
      // buy now with default options
      buyNow(id, {}, 1);
      return;
    }
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
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
