// product-detail.js - render product detail, allow selecting size, toppings, ice level

function getQueryParam(name) {
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

function renderProductDetail() {
  const id = parseInt(getQueryParam('id'), 10);
  if (!id) return;
  const product = products.find(p => p.id === id);
  if (!product) return;

  const container = document.getElementById('product-detail');
  if (!container) return;

  // gather toppings from products array
  const toppingOptions = (products.filter(p => p.category === 'topping') || []);

  container.innerHTML = `
    <div class="detail-grid">
      <div class="detail-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="detail-body">
        <h2 class="detail-name">${product.name}</h2>
        <div class="detail-tag">${product.tag || ''}</div>
        <p class="detail-desc">${product.description}</p>

        <div class="detail-price">Giá: <span id="detail-base-price">${formatCurrency(product.price)}</span></div>

        <div class="detail-options">
          <div class="option-group">
            <label class="option-label">Kích thước</label>
            <div class="option-values">
              <label><input type="radio" name="size" value="M" checked /> M</label>
              <label><input type="radio" name="size" value="L" /> L (+5.000đ)</label>
            </div>
          </div>

          <div class="option-group">
            <label class="option-label">Topping (chọn nhiều hoặc không)</label>
            <div class="topping-list">
              ${toppingOptions.map(t => `
                <label class="topping-item"><input type="checkbox" name="topping" value="${t.id}" /> ${t.name} (+${formatCurrency(t.price)})</label>
              `).join('')}
            </div>
            <div class="topping-actions">
              <label><input type="checkbox" id="topping-select-all" /> Chọn tất cả</label>
            </div>
          </div>

          <div class="option-group">
            <label class="option-label">Đá</label>
            <div class="option-values">
              <label><input type="radio" name="ice" value="Đá thường" checked /> Đá thường</label>
              <label><input type="radio" name="ice" value="Ít đá" /> Ít đá</label>
              <label><input type="radio" name="ice" value="Không đá" /> Không đá</label>
            </div>
          </div>

          <div class="option-group">
            <label class="option-label">Số lượng</label>
            <div class="qty-control detail-qty">
              <button id="detail-minus" class="qty-btn">-</button>
              <span id="detail-qty-value">1</span>
              <button id="detail-plus" class="qty-btn">+</button>
            </div>
          </div>

          <div class="option-group">
            <button id="detail-add-to-cart" class="btn btn-primary">Thêm vào giỏ</button>
            <a href="sanpham.html" class="btn btn-outline">Quay lại</a>
          </div>

          <div class="option-group">
            <div>Thành tiền: <strong id="detail-total-price">${formatCurrency(product.price)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // wire events
  const plusBtn = document.getElementById('detail-plus');
  const minusBtn = document.getElementById('detail-minus');
  const qtyValueEl = document.getElementById('detail-qty-value');
  const addBtn = document.getElementById('detail-add-to-cart');
  const selectAll = document.getElementById('topping-select-all');
  const totalPriceEl = document.getElementById('detail-total-price');

  let qty = 1;

  function getSelectedOptions() {
    const size = (document.querySelector('input[name="size"]:checked') || {}).value || 'M';
    const ice = (document.querySelector('input[name="ice"]:checked') || {}).value || '';
    const toppings = Array.from(document.querySelectorAll('input[name="topping"]:checked')).map(i => parseInt(i.value, 10));
    return { size, ice, toppings };
  }

  function computeTotal() {
    const opts = getSelectedOptions();
    let price = product.price;
    // size L +5000
    if (opts.size === 'L') price += 5000;
    // toppings cost
    if (opts.toppings && opts.toppings.length) {
      opts.toppings.forEach(tid => {
        const t = products.find(p => p.id === tid);
        if (t) price += t.price;
      });
    }
    return price * qty;
  }

  function updateTotalDisplay() {
    totalPriceEl.textContent = formatCurrency(computeTotal());
  }

  // Mobile action bar (for small screens) - shows price + quick actions
  let mobileBar = null;
  function ensureMobileBar() {
    if (mobileBar) return;
    mobileBar = document.createElement('div');
    mobileBar.className = 'mobile-action-bar container';
    mobileBar.innerHTML = `
      <div class="mobile-price">${formatCurrency(computeTotal())}</div>
      <div class="mobile-actions">
        <button class="btn btn-outline" id="mobile-add">Thêm</button>
        <button class="btn btn-buy" id="mobile-buy">Mua ngay</button>
      </div>
    `;
    document.body.appendChild(mobileBar);

    const mobilePriceEl = mobileBar.querySelector('.mobile-price');
    const mobileAdd = document.getElementById('mobile-add');
    const mobileBuy = document.getElementById('mobile-buy');

    function refreshMobilePrice() {
      if (mobilePriceEl) mobilePriceEl.textContent = formatCurrency(computeTotal());
    }

    mobileAdd.addEventListener('click', () => {
      const opts = getSelectedOptions();
      const itemOptions = { size: opts.size, ice: opts.ice, toppings: opts.toppings };
      addToCart(product.id, itemOptions, qty);
      updateCartUI();
      alert('Đã thêm vào giỏ hàng');
      refreshMobilePrice();
    });

    mobileBuy.addEventListener('click', () => {
      const opts = getSelectedOptions();
      const itemOptions = { size: opts.size, ice: opts.ice, toppings: opts.toppings };
      buyNow(product.id, itemOptions, qty);
    });
  }

  plusBtn.addEventListener('click', () => { qty++; qtyValueEl.textContent = qty; updateTotalDisplay(); });
  minusBtn.addEventListener('click', () => { if (qty>1) qty--; qtyValueEl.textContent = qty; updateTotalDisplay(); });

  // topping select all
  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      const checked = e.target.checked;
      document.querySelectorAll('input[name="topping"]').forEach(inp => inp.checked = checked);
      updateTotalDisplay();
    });
  }

  // update total when options change
  container.addEventListener('change', (e) => {
    updateTotalDisplay();
    if (window.innerWidth <= 760) {
      ensureMobileBar();
      const mp = document.querySelector('.mobile-action-bar .mobile-price');
      if (mp) mp.textContent = formatCurrency(computeTotal());
    }
  });

  addBtn.addEventListener('click', () => {
    const opts = getSelectedOptions();
    const itemOptions = {
      size: opts.size,
      ice: opts.ice,
      toppings: opts.toppings
    };
    addToCart(product.id, itemOptions, qty);
    alert('Đã thêm vào giỏ hàng');
    // update UI cart
    updateCartUI();
  });

  // buy now button (more prominent)
  const buyNowBtn = document.createElement('button');
  buyNowBtn.className = 'btn btn-buy';
  buyNowBtn.textContent = 'Mua ngay';
  buyNowBtn.style.marginLeft = '10px';
  addBtn.parentNode.insertBefore(buyNowBtn, addBtn.nextSibling);

  buyNowBtn.addEventListener('click', () => {
    const opts = getSelectedOptions();
    const itemOptions = { size: opts.size, ice: opts.ice, toppings: opts.toppings };
    // use buyNow to redirect to checkout with single item
    buyNow(product.id, itemOptions, qty);
  });

  // create mobile bar on load if needed
  if (window.innerWidth <= 760) ensureMobileBar();
  updateTotalDisplay();
}

// init on product page
document.addEventListener('DOMContentLoaded', () => {
  renderProductDetail();
});