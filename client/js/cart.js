const cartList = document.getElementById("cart-list");

async function fetchCart() {
  const res = await fetch("http://localhost:5000/api/cart");
  const data = await res.json();

  cartList.innerHTML = "";

  let total = 0;

  data.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" />

      <div>
        <h3>${item.name}</h3>
        <p>Price: Rs.${item.price}</p>

        <div class="qty-box">
          <button onclick="changeQty('${item._id}', ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty('${item._id}', ${item.quantity + 1})">+</button>
        </div>

        <br>
        <button class="remove-btn" onclick="removeItem('${item._id}')">
          Remove
        </button>
      </div>
    `;

    cartList.appendChild(div);
  });

  // ✅ NEW PRO SUMMARY BAR
  const summary = document.createElement("div");
  summary.classList.add("cart-summary");

  summary.innerHTML = `
    <h2>Total: Rs.${total}</h2>
    <button class="place-btn">Place Order</button>
  `;

  summary.querySelector("button").onclick = placeOrder;

  cartList.appendChild(summary);
}

// 🔴 REMOVE
async function removeItem(id) {
  await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
    method: "DELETE"
  });
  fetchCart();
}

// ➕➖ UPDATE
async function changeQty(id, newQty) {
  if (newQty < 1) return;

  await fetch(`http://localhost:5000/api/cart/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ quantity: newQty })
  });

  fetchCart();
}

// 🛒 ORDER
async function placeOrder() {
  const res = await fetch("http://localhost:5000/api/orders/place", {
    method: "POST"
  });

  const data = await res.json();
  alert(data.message);

  window.location.href = "orders.html";
}

fetchCart();