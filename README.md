# 🗭 Explorer App

A full-stack web application inspired by Windows Explorer.

Built with:

* **Backend**: [Bun](https://bun.sh), [Elysia](https://elysiajs.com), MySQL/MariaDB, TypeScript
* **Frontend**: [Vue 3](https://vuejs.org), Composition API, Vite
* **Architecture**: Clean Architecture (controller, service, repository, entity), versioned REST API

---

## ✨ Features

* 🗂️ Infinite-depth folder structure
* 📄 Display subfolders and files
* 🔑 API key authentication
* 🌐 Global CORS support
* 🧱 Built-in schema creator and seeders
* 🔧 Custom error handling
* 🔀 Dynamic API versioning
* 🔍 Hash-based developer identification
* ⚙️ Monorepo ready & scalable
* 🧪 Unit and E2E testing ready
* 📘 Swagger integration (optional)

---

## 🗓️ Project Structure

```
explorer-app-daniels/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── repositories/
│       ├── entities/
│       ├── models/
│       ├── utils/
│       ├── db/
│       ├── tables/
│       └── index.ts
├── frontend/
│   └── src/
│       ├── components/
│       ├── composables/
│       ├── services/
│       ├── stores/
│       ├── types/
│       └── main.ts
```

---

## 🚀 Getting Started

### ⚙️ Prerequisites

* [Bun](https://bun.sh) `>=1.1`
* [MySQL/MariaDB](https://www.mysql.com/) `>=5.7`
* [Node.js](https://nodejs.org/) (for frontend only)

---

### 🔌 Backend Setup

```bash
cd backend
bun install
cp .env.example .env
```

Edit file `.env` Anda:

```env
DB_HOST="localhost"
DB_PORT=3306
DB_USER="root"
DB_PASS=""
DB_NAME="db_daniels"

DEVELOPER_NAME="Daniels Trysyahputra"

CORS_ORIGIN="http://localhost:5173,http://localhost:3000,https://danielsdeveloper.com"
```

Jalankan backend:

```bash
bun run src/index.ts
```

📦 Ini akan secara otomatis:

* Membuat database (jika belum ada)
* Membuat tabel
* Menjalankan seeder
* Menjalankan API di `http://localhost:3000`

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Buka di browser: [http://localhost:5173](http://localhost:5173)

---

## 🔐 API Access

Gunakan header berikut:

```
x-api-key: DanielsDeveloper
```

---

## 📆 API Endpoints

### 📁 Folder Endpoints (`/api/folders`)

| Method | Endpoint                      | Deskripsi                         |
| ------ | ----------------------------- | --------------------------------- |
| GET    | `/api/folders`                | Mendapatkan semua folder          |
| GET    | `/api/folders/:id/subfolders` | Subfolder langsung dari folder ID |

### 📄 File Endpoints (`/api/files`)

| Method | Endpoint                | Deskripsi                             |
| ------ | ----------------------- | ------------------------------------- |
| GET    | `/api/files/folder/:id` | Mendapatkan file dari folder tertentu |

---

## 📌 API Versioning

Tersedia melalui:

* Query parameter: `?version=1`
* Header: `x-api-version: 1`
* Accept Header: `application/vnd.api.v1+json`

---

## 🧪 Testing (Coming Soon)

* ✅ Unit Test: Vitest / Jest
* ✅ Integration Test: Supertest / Elysia hooks
* ✅ E2E Test: Playwright / Cypress

---

## 📜 License

MIT

---

## 👨‍💻 Developer

**Daniels Trysyahputra**
🔐 SHA256 Key ID: `DanielsDeveloper`
