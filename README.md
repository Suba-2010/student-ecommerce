# 🎓 Student Store – E-commerce Web App

A simple full-stack e-commerce web application built for students to buy essential items like books, bags, and stationery at affordable prices.

---

## 🚀 Features

- 🛍️ View Products
- 🔍 Search & Filter products
- 🛒 Add to Cart
- ➕➖ Update Quantity
- ❌ Remove Items
- 📦 Place Orders
- 📜 Order History
- 🚚 Order Tracking (Pending → Shipped → Delivered)
- 🌙 Dark Mode UI

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 📁 Project Structure


student_ecommerce/
│
├── client/ # Frontend
├── server/ # Backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── config/
│ └── server.js


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo


git clone https://github.com/Suba-2010/student-ecommerce

cd student_ecommerce


---

### 2️⃣ Install backend dependencies


cd server
npm install


---

### 3️⃣ Create `.env` file inside `server/`


MONGO_URI=mongodb+srv://suba2007:Suba%402007@cluster0.gwotpab.mongodb.net/studentDB?retryWrites=true&w=majority
PORT=5000


---

### 4️⃣ Run server


node server.js


---

### 5️⃣ Open frontend

Just open:


client/index.html


---

## 🌐 API Endpoints

### 🛍️ Products
- `GET /api/products`

### 🛒 Cart
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/update/:id`
- `DELETE /api/cart/remove/:id`

### 📦 Orders
- `GET /api/orders`
- `POST /api/orders/place`

---

## 🚀 Deployment

### Backend (Render)
- Build: `npm install`
- Start: `node server.js`

### Frontend (Vercel)
- Upload `client` folder

---

## 👩‍💻 Author

**Subashinee N**

---

## ⭐ Future Improvements

- 💳 Payment Integration (Razorpay / Stripe)
- 🔐 Authentication (JWT)
- 📱 Mobile Responsive UI
- 🧾 Invoice Download
- 📦 Live Delivery Tracking

---

## 💖 Made for Students
Smart shopping under budget 💸
