// 1. Product data - array of objects
const products = [
  { name: "Versace Eros", price: "₦25,000", category: "Body perfumes", img: "assets/versace.png" },
  { name: "Dior Poison Girl", price: "₦30,000", category: "Body perfumes", img: "assets/poison.png" },
  { name: "Lavender Mist", price: "₦8,000", category: "Mist", img: "assets/lavender.png" },
  { name: "Rose Body Splash", price: "₦6,500", category: "Body splash", img: "assets/rose.png" },
  { name: "Vanilla Diffuser", price: "₦12,000", category: "Diffuser", img: "assets/diffuser.png" },
  { name: "Oud Oil Spray", price: "₦15,000", category: "Oil sprays", img: "assets/oud.png" },
  { name: "Fresh Deodorant", price: "₦4,000", category: "Deodorants", img: "assets/deodorant.png" },
];
const categories = ["All", ...new Set(products.map(p => p.category))];

// 2. Render filter buttons
const filterDiv = document.getElementById('filters');
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.innerText = cat;
  btn.onclick = () => filterProducts(cat, btn);
  filterDiv.appendChild(btn);
});
filterDiv.children[0].classList.add('active');

// 3. Filter logic using .filter()
function filterProducts(category, btn) {
  [...filterDiv.children].forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filtered = category === "All" ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

// 4. Re-render DOM dynamically
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  list.forEach((p) => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><strong>${p.price}</strong></p>
        <p><small>${p.category}</small></p>
        <span class="heart" onclick="toggleWishlist(event)">♡</span>
      </div>
    `;
  });
}

// 5. Wishlist toggle
function toggleWishlist(event) {
  event.target.classList.toggle('liked');
  event.target.innerText = event.target.classList.contains('liked') ? '♥' : '♡';
}

renderProducts(products); // show all on load