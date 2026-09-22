function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Convert "₦25,000" into the number 25000 so we can do math with it
function parsePrice(priceString) {
  return Number(priceString.replace(/[₦,]/g, ''));
}

function renderCart() {
  const cart = getCart();
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const emptyCartEl = document.getElementById('emptyCart');

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '';
    cartTotalEl.innerHTML = '';
    emptyCartEl.classList.remove('hidden');
    return;
  }

  emptyCartEl.classList.add('hidden');

  let total = 0;

  cartItemsEl.innerHTML = cart.map((item, index) => {
    const itemTotal = parsePrice(item.price) * item.qty;
    total += itemTotal;

    return `
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} each</p>
        </div>
        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
        <p class="item-total">₦${itemTotal.toLocaleString()}</p>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  }).join('');

  cartTotalEl.innerHTML = `<h2>Total: ₦${total.toLocaleString()}</h2>`;
}

function changeQty(index, amount) {
  const cart = getCart();
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1); // remove item if quantity drops to 0
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

renderCart();