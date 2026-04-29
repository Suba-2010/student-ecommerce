  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");

  let allProducts = [];

  // Fetch products
  async function fetchProducts() {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();

    allProducts = data;
    displayProducts(data);
  }

  // Display
  function displayProducts(products) {
    productList.innerHTML = "";

    products.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("product-card");

      div.innerHTML = `
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">Rs.${p.price}</p>
        <p class="desc">${p.description}</p>
    <button onclick="addToCart(
  '${p._id}',
  '${p.name}',
  ${p.price},
  '${p.image}',
  this
)">
  Add to Cart
</button>
      `;

      productList.appendChild(div);
    });
  }

  // Filter logic
  function applyFilters() {
    let filtered = allProducts;

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const maxPrice = priceRange.value;

    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search)
    );

    if (category) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(category.toLowerCase())
      );
    }

    filtered = filtered.filter(p => p.price <= maxPrice);

    displayProducts(filtered);
  }

  // Events
  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  priceRange.addEventListener("input", () => {
    priceValue.innerText = "Rs." + priceRange.value;
    applyFilters();
  });

async function addToCart(productId, name, price, image, btn) {
  try {
    btn.innerText = "Adding...";
    btn.disabled = true;

    await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId, name, price, image })
    });

    // ✅ Success animation
    btn.innerText = "✔ Added";
    btn.style.background = "#28a745";

    setTimeout(() => {
      btn.innerText = "Add to Cart";
      btn.style.background = "#007bff";
      btn.disabled = false;
    }, 1500);

  } catch (error) {
    console.log(error);
  }
}
  fetchProducts();