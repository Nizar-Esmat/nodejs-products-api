# Node.js Products API

A RESTful API built with Node.js, Express, and MySQL for managing products and users.

## ✨ Features

- ✅ User authentication and management
- ✅ Product CRUD operations
- ✅ Product search functionality
- ✅ Advanced product queries (max price, top expensive products)
- ✅ MySQL database integration
- ✅ Docker support for easy deployment
- ✅ RESTful API architecture

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Database:** MySQL 8.0
- **ORM/Database Client:** mysql2 v3.16.3
- **Containerization:** Docker & Docker Compose

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (optional, for containerized database)
- MySQL 8.0 (if not using Docker)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ass7
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   
   Using Docker:
   ```bash
   docker-compose up -d
   ```
   
   Or manually configure MySQL with the following credentials:
   - Database: `assment7_mysql`
   - User: `app`
   - Password: `app`
   - Port: `3306`

## ⚙️ Configuration

The application runs on port `3000` by default. You can modify this in `index.js`.

Database connection settings are configured in `src/db/db.connection.js`.

## 🏃 Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
node index.js
```

The server will start at `http://localhost:3000`

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Get all products |
| `POST` | `/products` | Add a new product |
| `DELETE` | `/products/:id` | Delete a product by ID |
| `GET` | `/products/search?name=<query>` | Search products by name |
| `GET` | `/products/in?ids=<1,2,3>` | Get products by multiple IDs |
| `GET` | `/products/products-with-users` | Get products with owner information |
| `GET` | `/products/max-price` | Get product with maximum price |
| `GET` | `/products/top-5-expensive` | Get top 5 most expensive products |

### Users

Authentication and user management endpoints are available under `/users` and `/auth` routes.

### Database

Database management endpoints are available under `/db` route.

## 📁 Project Structure

```
ass7/
├── docker-compose.yml       # Docker configuration for MySQL
├── index.js                 # Application entry point
├── package.json             # Project dependencies
├── schema/                  # Database schema files
│   ├── db.dbdiagram
│   └── db.dbml
└── src/
    ├── app.controller.js    # Main application controller
    ├── db/
    │   └── db.connection.js # Database connection setup
    └── modules/
        ├── auth/            # Authentication module
        │   ├── auth.controller.js
        │   └── auth.service.js
        ├── db/              # Database management module
        │   ├── db.controller.js
        │   └── db.service.js
        ├── products/        # Products module
        │   ├── products.controller.js
        │   └── products.service.js
        └── users/           # Users module
            ├── user.service.js
            └── users.controller.js
```

## 🗄 Database Schema

The database schema is defined in the `schema/` directory using DBML format. Import the schema files to visualize the database structure.

## 📝 Example Requests

**Add a product:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15",
    "price": 999,
    "stock": 50,
    "userId": 1
  }'
```

**Search products:**
```bash
curl http://localhost:3000/products/search?name=phone
```

**Get top 5 expensive products:**
```bash
curl http://localhost:3000/products/top-5-expensive
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

**Route Course - Node.js Day 7 Assignment**

---

Made with ❤️ using Node.js and Express
