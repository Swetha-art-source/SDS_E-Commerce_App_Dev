#E-commerce Project: Plan & Requirements

##Phase - 1
This document outlines the core requirements, data models, and page flow (wireframes) for the e-commerce application.

###1. Core Requirements (User Stories)

####Public User (Guest)

- As a guest, I want to see a grid of all available products on the homepage.

- As a guest, I want to click on a product to view its detailed description, price, and image.

- As a guest, I want to add a product to my shopping cart.

- As a guest, I want to view the items in my cart, change quantities, and remove items.

- As a guest, I want to check out by providing shipping information and a (dummy) payment.

####Authenticated User (Customer)

- As a user, I want to create a new account (signup) with my email and password.

- As a user, I want to log in to my account.

- As a user, I want to remain logged in (using JWT).

- As a user, I want all the abilities of a guest (browse, add to cart, checkout).

- As a user, I want to view my past order history on a profile page.

- As a user, I want to log out.

####Admin User

- As an admin, I want to log in and access a protected admin panel.

- As an admin, I want to add new products (name, description, price, image URL, stock).

- As an admin, I want to edit existing products.

- As an admin, I want to delete products.

- As an admin, I want to view a list of all orders placed by all users.

- As an admin, I want to update the status of an order (e.g., "Pending" -> "Shipped").

###2. Data Models (MongoDB Schemas)

This defines the structure for your MongoDB database.

User Collection

{
  "_id": "ObjectId",
  "username": { "type": "String", "required": true, "unique": true },
  "email": { "type": "String", "required": true, "unique": true },
  "password": { "type": "String", "required": true },
  "role": { "type": "String", "enum": ["customer", "admin"], "default": "customer" },
  "createdAt": { "type": "Date", "default": "Date.now" }
}


Product Collection

{
  "_id": "ObjectId",
  "name": { "type": "String", "required": true },
  "description": { "type": "String", "required": true },
  "price": { "type": "Number", "required": true },
  "imageUrl": { "type": "String", "required": true },
  "stockQuantity": { "type": "Number", "required": true, "default": 0 },
  "category": { "type": "String" },
  "createdAt": { "type": "Date", "default": "Date.now" }
}


Order Collection

{
  "_id": "ObjectId",
  "user": { "type": "ObjectId", "ref": "User" }, // Can be null for guest checkouts
  "products": [
    {
      "product": { "type": "ObjectId", "ref": "Product" },
      "quantity": { "type": "Number", "required": true },
      "priceAtPurchase": { "type": "Number", "required": true }
    }
  ],
  "totalAmount": { "type": "Number", "required": true },
  "shippingAddress": {
    "street": "String",
    "city": "String",
    "postalCode": "String",
    "country": "String"
  },
  "status": {
    "type": "String",
    "enum": ["Pending", "Shipped", "Delivered", "Cancelled"],
    "default": "Pending"
  },
  "createdAt": { "type": "Date", "default": "Date.now" }
}


Note: The shopping cart will be managed on the client-side (React Context + Local Storage) and only converted to an Order upon successful checkout.

###3. Page Flow (Text-based Wireframes)

This describes the layout for each page.

/ (Homepage):

Navbar (Logo, Home, Cart, Login)

Product Grid (List of all products, each with image, name, price)

Footer

/product/:id (Product Detail Page):

Navbar

Single Product View:

Large Image

Product Name

Product Description

Price

"Add to Cart" Button

Footer

/cart (Cart Page):

Navbar

List of Cart Items:

For each item: Image, Name, Price, Quantity (with +/- buttons), Remove button

Cart Total (Subtotal, Shipping, Total)

"Proceed to Checkout" Button

Footer

/login (Login Page):

Navbar

Login Form (Email, Password)

"Sign in" Button

Link to /signup

Footer

/signup (Signup Page):

Navbar

Signup Form (Username, Email, Password)

"Create Account" Button

Link to /login

Footer

/checkout (Checkout Page):

Navbar

Shipping Address Form

Payment Form (Dummy: Card number, Expiry, CVC)

Order Summary

"Place Order" Button

Footer

/profile/orders (User's Order History):

Navbar (Now shows "Profile", "Logout")

List of past orders (Order ID, Date, Total, Status)

Footer

/admin/dashboard (Admin Panel - Protected):

Admin Navbar (Dashboard, Manage Products, Manage Orders)

Simple stats (e.g., Total Users, Total Orders)

Links to Manage Products/Orders

/admin/products (Admin - Manage Products):

Admin Navbar
"Add New Product" Button

Table of all products (Name, Price, Stock, Edit/Delete buttons)

/admin/orders (Admin - Manage Orders):

Admin Navbar

Table of all user orders (Order ID, User, Date, Total, Status)

Ability to update status.


##Phase - 2
| Day | Tasks | Output |
|-----|--------|---------|
| **Day 1** | Set up React + Tailwind project, create folder structure, setup routing with react-router-dom | Working navigation skeleton |
| **Day 2** | Build Navbar + Footer components | Common layout visible on all pages |
| **Day 3** | Build Homepage with product grid using mock data | Product listing page ready |
| **Day 4** | Build Product Details Page | Individual product view |
| **Day 5** | Build Cart + Checkout Pages (static UI) | Cart and order flow |
| **Day 6** | Build Login, Signup, Profile Orders Pages | User auth pages |
| **Day 7** | Build Admin Dashboard, Products, and Orders Pages | Admin UI complete |


###✅ Deliverables After Phase 2
- Functional navigation between all pages
- Responsive UI for desktop and mobile
- Consistent design (Tailwind utility classes)
- Mock data displayed correctly
- Static forms ready for backend integration in Phase 3
  
