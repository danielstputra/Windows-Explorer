# 🧭 Explorer App

A full-stack Windows Explorer-like web application built with:

- **Backend**: [Bun](https://bun.sh), [Elysia](https://elysiajs.com), MySQL/MariaDB, TypeScript, Clean Architecture
- **Frontend**: [Vue 3](https://vuejs.org), Composition API, Vite
- **Architecture**: Clean Architecture (service, repository, entity, controller, route layers), REST API (versioned)

---

## ✨ Features

- Infinite-depth folder structure
- Display subfolders and files
- Dynamic versioned API (`v1`, etc.)
- Global CORS and API Key middleware
- Built-in seeders and schema creator
- Custom error handling
- Hash-based developer name
- Fully scalable design (ready for millions of folders/files)
- Monorepo ready
- Ready for unit + E2E testing
- Swagger (optional)

---

## 🗂️ Project Structure

explorer-app-daniels/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── repositories/
│ │ ├── entities/
│ │ ├── models/
│ │ ├── utils/
│ │ ├── db/
│ │ ├── tables/
│ │ └── index.ts
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── composables/
│ │ ├── services/
│ │ ├── stores/
│ │ ├── types/
│ │ └── main.ts

---

## 🚀 Getting Started

### 🧩 Prerequisites

- [Bun](https://bun.sh) `>=1.1`
- [MySQL/MariaDB](https://www.mysql.com/) `>=5.7`
- [Node.js](https://nodejs.org/) (for frontend only)

---

### 🔌 Backend Setup

```bash
cd backend
bun install
cp .env.example .env
```

### Edit .env:

DB_HOST="localhost"
DB_PORT=3306
DB_USER="root"
DB_PASS=
DB_NAME="db_daniels"

API_KEY="DanielsDeveloper"
DEVELOPER_NAME="Daniels Trysyahputra"

CORS_ORIGIN="http://localhost:5173,http://localhost:3000,https://danielsdeveloper.com"
API_KEY="10cf03c1bbf9c2bcefd01c191833c38813fa877765c04c679ba4bba44c5c00aa"

### ⚙️ Run Backend:

```bash
bun run src/index.ts
```

### This will:

- Create the database if not exists
- Create tables
- Run seeders
- Start API on http://localhost:3000

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

### 🔐 API Access

x-api-key: DanielsDeveloper

### 📦 API Endpoints

### 📁 Folder Endpoints — /api/folders

| Method | Endpoint                      | Description                        |
| ------ | ----------------------------- | ---------------------------------- |
| GET    | `/api/folders`                | Get all folders                    |
| GET    | `/api/folders/:id/subfolders` | Get direct subfolders by folder id |

### 📄 File Endpoints — /api/files

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/api/files/folder/:id` | Get files under specific folder |

### API Versioning:

| Method        | Example                       |
| ------------- | ----------------------------- |
| Query Param   | `?version=1`                  |
| Header        | `x-api-version: 1`            |
| Accept Header | `application/vnd.api.v1+json` |

### 🧪 Testing (Coming Soon)

✅ Unit Test (Jest / Vitest)
✅ Integration Test (Supertest / Elysia hooks)
✅ E2E Test (Playwright / Cypress)

### 📜 License

MIT

### 🧑‍💻 Developer

Daniels Trysyahputra
SHA256: DanielsDeveloper (API key default)
