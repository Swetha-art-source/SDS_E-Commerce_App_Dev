SDS # E-commerce Application 

 E-commerce Application (React + Node.js)

This is a full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

Project Vision

The goal is to build a complete e-commerce platform where users can browse products, manage a shopping cart, and check out. It also includes a full admin panel for managing products and orders.

For a detailed breakdown of all features, user stories, data models, and page flows, please see the  [Project Plan & Requirements (project_plan.md)](./project_plan.md).

Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: JWT (JSON Web Tokens)

How to Run

Prerequisites

Node.js (v18 or newer)

MongoDB (local instance or a cloud connection string)

1. Backend Setup

# Go to the server directory
cd ecommerce-app/server

# Install dependencies
npm install

# Create a .env file (copy from .env.example)
# Add your MONGO_URI and JWT_SECRET
cp .env.example .env
nano .env

# Run the server
npm run dev 
# (You'll need to add this "dev" script to your server/package.json)


2. Frontend Setup

# In a separate terminal, go to the client directory
cd ecommerce-app/client

# Install dependencies
npm install

# Run the client
npm run dev

