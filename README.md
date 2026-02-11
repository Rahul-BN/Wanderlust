<p align="center">
  <h1 align="center">🌍 Wanderlust</h1>
  <p align="center">
    A Full-Stack Travel Listing Platform <br/>
    Built with Node.js, Express, MongoDB & EJS
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" />
</p>

---

## 🌎 About The Project

Wanderlust is a full-stack travel listing platform that allows users to discover, create, and manage unique travel destinations around the world.

The application provides secure authentication, location-based mapping, cloud-based image uploads, and a clean MVC architecture designed for scalability and maintainability.

---

## 🚀 Live Demo

🚀 **View Live Application:**  
👉 https://wanderlust-xn6n.onrender.com  

_Deployed on Render_

---

## 🚀 Key Features

- 🔐 Secure User Authentication (Register / Login / Logout)
- 🏕️ Create, Edit, and Delete Travel Listings
- 🖼️ Image Upload & Cloud Storage Integration (Cloudinary)
- 📍 Interactive Map Integration with Geocoding (Mapbox)
- 🛡️ Authorization & Protected Routes
- ⚡ Server-side Validation & Centralized Error Handling
- 💬 Flash Messages for User Feedback
- 🏗️ Structured MVC Architecture
- 🔄 Full CRUD Functionality

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- EJS (Embedded JavaScript Templates)
- Bootstrap
- Custom CSS

### Additional Tools & Services
- Cloudinary (Image Hosting)
- Mapbox (Maps & Geocoding)
- Passport.js (Authentication)
- Express-Session
- Connect-Flash
- Joi (Validation)

---

## 📂 Project Architecture

```
Wanderlust/
│
├── controllers/      → Route logic
├── models/           → Database schemas
├── routes/           → Application routes
├── views/            → EJS templates
├── public/           → Static assets (CSS, JS)
├── utils/            → Custom utilities
├── init/             → Sample data
│
├── middleware.js     → Custom middleware
├── cloudConfig.js    → Cloudinary setup
├── schema.js         → Joi validation schemas
├── app.js            → Main application entry point
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rahul-BN/Wanderlust.git
cd Wanderlust
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```
ATLASDB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
SECRET=your_session_secret
```

### 4️⃣ Run the Application

```bash
node app.js
```

Or with nodemon:

```bash
nodemon app.js
```

Visit:

```
http://localhost:8080
```

---

## 📈 Future Enhancements

- ⭐ Review & Rating System
- 🔎 Advanced Search & Filtering
- ❤️ Wishlist / Favorites Feature
- 📱 Improved Mobile Responsiveness
- 💳 Booking & Payment Integration

---

## 💡 What This Project Demonstrates

- RESTful Routing & MVC Architecture
- Authentication & Authorization Workflows
- Third-Party API Integration (Mapbox & Cloudinary)
- Secure Session Handling
- Full CRUD Operations with MongoDB
- Production Deployment on Render

---

## 👨‍💻 Developer

Built with dedication by **Rahul Navi**  
Passionate about Full-Stack Development & Scalable Web Applications.

---

## 📄 License

This project is open-source and available under the MIT License.
