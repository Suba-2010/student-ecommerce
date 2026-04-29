const orderList = document.getElementById("order-list");
const emptyMsg = document.getElementById("empty-msg");

// ✅ Move function to top
function getTrackingUI(status) {
  const steps = ["Pending", "Shipped", "Delivered"];

  return `
    <div class="tracking">
      ${steps.map((step, i) => `
        <div class="step ${steps.indexOf(status) >= i ? "active" : ""}">
          <span>${i + 1}</span>
          <p>${step}</p>
        </div>
      `).join("")}
    </div>
  `;
}

async function fetchOrders() {
  const res = await fetch("http://localhost:5000/api/orders");
  const data = await res.json();

  orderList.innerHTML = "";

  if (data.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  data.forEach(order => {
    const div = document.createElement("div");
    div.classList.add("order-card");

    let itemsHTML = "";

    order.items.forEach(item => {
      itemsHTML += `
        <div class="order-item">
          <img src="${item.image || 'images/default.jpg'}">

          <div>
            <h4>${item.name}</h4>
            <p>Rs.${item.price} × ${item.quantity}</p>
          </div>
        </div>
      `;
    });

    div.innerHTML = `
      <h3>🧾 Order</h3>

      ${itemsHTML}

      <p class="order-total">Total: Rs.${order.total}</p>

      <!-- ✅ Tracking UI -->
      ${getTrackingUI(order.status || "Pending")}

      <p class="order-date">
        Date: ${new Date(order.createdAt).toLocaleString()}
      </p>
    `;

    orderList.appendChild(div);
  });
}

fetchOrders();