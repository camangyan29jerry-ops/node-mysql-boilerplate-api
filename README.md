# TypeScript CRUD API — Node.js, Express & MySQL

A fully-typed REST API that manages user records, built with TypeScript, Express, Sequelize, and MySQL.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| MySQL | ≥ 8 |
| npm | ≥ 9 |

---

## Setup

### 1. Clone & install dependencies
```bash
git clone <repo-url>
cd typescript-crud-api
npm install
```

### 2. Create the MySQL database
```sql
CREATE DATABASE typescript_crud_db;
```

### 3. Configure the app
Edit `config.json` in the project root:
```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "your_password",
    "database": "typescript_crud_db"
  },
  "secret": "your-super-secret-jwt-key"
}
```

### 4. Start the development server
```bash
npm run start:dev
```
You should see:
```
✅ Database connection established.
✅ All models synced.
✅ Server running on http://localhost:4000
```

### 5. Build for production
```bash
npm run build
npm start
```

---

## Project Structure

```
typescript-crud-api/
├── src/
│   ├── _helpers/
│   │   ├── db.ts              # Sequelize initialization & model registry
│   │   └── role.ts            # Role enum (Admin | User)
│   ├── _middleware/
│   │   ├── errorHandler.ts    # Global error handler
│   │   └── validateRequest.ts # Joi schema validation factory
│   ├── users/
│   │   ├── user.model.ts      # Sequelize model + TypeScript interfaces
│   │   ├── user.service.ts    # Business logic (CRUD + bcrypt)
│   │   └── users.controller.ts# Express routes + Joi schemas
│   └── server.ts              # Entry point
├── config.json                # DB config & JWT secret
├── tsconfig.json              # TypeScript compiler options
└── package.json
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

---

## Testing with Postman / curl

### Create a user (POST /users)
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "role": "User",
    "password": "secret123"
  }'
```
**Expected:** `200 OK` with the created user object (passwordHash excluded).

---

### Get all users (GET /users)
```bash
curl http://localhost:4000/users
```
**Expected:** `200 OK` with an array of user objects.

---

### Get user by ID (GET /users/:id)
```bash
curl http://localhost:4000/users/1
```
**Expected:** `200 OK` with a single user object.  
**If not found:** `404` with `{ "message": "User not found" }`.

---

### Update a user (PUT /users/:id)
```bash
curl -X PUT http://localhost:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{ "firstName": "Janet" }'
```
**Expected:** `200 OK` with the updated user object.

---

### Delete a user (DELETE /users/:id)
```bash
curl -X DELETE http://localhost:4000/users/1
```
**Expected:** `200 OK` with `{ "message": "User deleted successfully" }`.

---

### Validation error (missing required field)
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{ "firstName": "Jane" }'
```
**Expected:** `400 Bad Request` with a descriptive validation message.

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Access denied for user 'root'` | Check `config.json` credentials |
| `Unknown database` | Run `CREATE DATABASE typescript_crud_db;` in MySQL |
| `ECONNREFUSED` | Make sure MySQL server is running |
| TypeScript compile errors | Run `npx tsc --noEmit` to see all type errors |

---

## TypeScript Highlights

- `strict: true` — full type checking enabled
- `UserAttributes` interface — defines exact shape of a user
- `Role` enum — replaces magic strings (`'Admin'`, `'User'`)
- `Partial<UserCreationAttributes>` — safe partial updates
- `Promise<T>` return types — explicit async function signatures
- Joi + TypeScript — compile-time **and** runtime validation


