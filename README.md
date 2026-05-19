# Full-Stack Authentication System - Backend API (Node.js, Express & MySQL)

This is the backend service for the Full-Stack Authentication System. It provides robust user management, sign-up with email verification, secure login (JWT and HttpOnly cookie refresh tokens), password reset, and role-based access control (RBAC).

## Features

- **TypeScript-powered REST API** built with Express and Sequelize.
- **Dynamic Database Failover**: Connects to MySQL in production, and automatically falls back to SQLite in-memory for zero-config testing if MySQL is unavailable.
- **Secure Authentication**: Uses short-lived JWT access tokens (15 mins) in memory and secure, HttpOnly refresh tokens in cookies (7 days).
- **Email Verification**: Sends validation links upon signup (using Ethereal SMTP mailers).
- **Interactive Swagger Documentation**: Exposed at `/api-docs` using OpenAPI/Swagger.
- **Environment Configuration**: Supported via system environment variables and local `.env` files.

---

## Live Deployment Link
* **Production API Endpoint**: [https://camangyan-auth-api.onrender.com](https://camangyan-auth-api.onrender.com)
* **API Documentation (Swagger)**: [https://camangyan-auth-api.onrender.com/api-docs](https://camangyan-auth-api.onrender.com/api-docs)

---

## Prerequisites

- **Node.js**: `v20` or higher
- **NPM**: `v10` or higher
- **MySQL**: Local or remote instance (optional, falls back to SQLite)

---

## Getting Started (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of this project (it is already ignored in `.gitignore`) and fill it based on `.env.example`:

```ini
PORT=4000
NODE_ENV=development

# MySQL Database Configurations
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=node_mysql_api

# JWT Secret
JWT_SECRET=YOUR_SUPER_SECRET_KEY

# SMTP Server Options (Ethereal Mailer details)
EMAIL_FROM=info@my-node-api.com
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass

# Allowed CORS Origin (Frontend URL)
CORS_ORIGIN=http://localhost:4200
```

### 3. Start Development Server
```bash
npm run start:dev
```
If MySQL is not started, the console will show:
`MySQL connection failed. Falling back to SQLite in-memory database.`
And the server will still run successfully using SQLite.

---

## Production Deployment (e.g. Render)

### 1. Create a Web Service on Render
* Connect your GitHub repository: `https://github.com/camangyan29jerry-ops/node-mysql-boilerplate-api.git`
* **Environment**: `Node`
* **Build Command**: `npm run build`
* **Start Command**: `node dist/server.js`

### 2. Environment Variables Configuration
Set the following environment variables in the Render Dashboard:
- `NODE_ENV` = `production`
- `JWT_SECRET` = `(Generate a long secure random string)`
- `CORS_ORIGIN` = `https://your-frontend-deployment.onrender.com` (Your frontend URL)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE` (Remote MySQL credentials)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` (SMTP credentials)

---

## API Endpoints

- **Swagger Documentation**: `/api-docs` (Interactive UI)
- **Authentication Routes**:
  - `POST /accounts/authenticate` - Authenticates user & returns JWT + sets cookie
  - `POST /accounts/refresh-token` - Refreshes expired JWT
  - `POST /accounts/revoke-token` - Revokes refresh token
  - `POST /accounts/register` - Registers new user
  - `POST /accounts/verify-email` - Verifies registration
  - `POST /accounts/forgot-password` - Requests reset link
  - `POST /accounts/reset-password` - Resets password
- **User Management (Admin/Owner only)**:
  - `GET /accounts` - Gets all accounts
  - `GET /accounts/:id` - Gets account details
  - `POST /accounts` - Creates new account (pre-verified)
  - `PUT /accounts/:id` - Updates details
  - `DELETE /accounts/:id` - Deletes account
