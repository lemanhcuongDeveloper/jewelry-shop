# Jewelry Shop Website

## Overview

This project is a simple e-commerce web application for jewelry products.
It focuses on backend development, authentication, and admin data management.

## Features

User:

* Register and login (JWT authentication)
* View blog list and blog details

Admin:

* Manage products (CRUD)
* Manage users (CRUD)
* Manage blogs (CRUD)
* Manage orders
* Role-based authorization (admin/user)

## Tech Stack

Frontend:

* ReactJS
* React Router DOM
* Tailwind CSS

Backend:

* Node.js
* Express.js
* MySQL
* JWT Authentication

## API

Base URL:
https://jewelry-shop-xz6e.onrender.com

Main endpoints:

* POST /auth/login
* POST /auth/register
* GET /blogs
* POST /blogs
* PUT /blogs/:id
* DELETE /blogs/:id
* GET /products
* GET /users

## Deployment

Backend is deployed on Render:
https://jewelry-shop-xz6e.onrender.com

Note:
The server may take 30–60 seconds to start due to free hosting.

## Installation

Clone the repository:

git clone https://github.com/lemanhcuongDeveloper/jewelry-shop.git

Install dependencies:

npm install

Run the project:

npm run dev

## Author

Le Manh Cuong
GitHub: https://github.com/lemanhcuongDeveloper
