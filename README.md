# 🧾 InvoiceFlow

A lightweight, full-stack **invoice management** web application — register users, manage customers, products, and companies, build invoices with line items, track payments, and export your invoices as PDFs.

> **Note:** This is a **demo project** built for learning and showcasing full-stack development patterns. It is intended to run locally and is **not hardened for production** (e.g. no auth-rate limiting, no HTTPS, static secret fallback).

---

## ✨ Features

- **Authentication & Authorization** — JWT-based login/register with `bcrypt` password hashing.
- **Company profile** — store your business details (name, email, phone, address, tax number) and create/edit your company record.
- **Customers** — manage customer records with contact details.
- **Products** — maintain a product catalog with pricing and descriptions.
- **Invoices** — create invoices with multiple line items, auto-calculated subtotal/tax/total, and status tracking (`draft`, `pending`, `paid`, `overdue`, `cancelled`).
- **Payments** — record payments against invoices and view payment history.
- **PDF Export** — download any invoice as a clean, formatted PDF.
- **Responsive Dashboard UI** — modern dark-themed UI styled with Tailwind CSS.

---

## 🧰 Tech Stack

| Layer      | Technology                                              |
|------------|---------------------------------------------------------|
| Backend    | [Node.js](https://nodejs.org) + [Express](https://expressjs.com) |
| Database   | [MySQL](https://www.mysql.com) with [Sequelize](https://sequelize.org) ORM |
| Auth       | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) + [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| Migrations | [Sequelize CLI](https://github.com/sequelize/cli)        |
| Frontend   | Vanilla HTML/CSS/JS with [Tailwind CSS](https://tailwindcss.com) (CDN) |
| PDF export | [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)  |
| Environment| [dotenv](https://github.com/motdotla/dotenv)             |

### Why Node.js?

Node.js drives the entire stack with a **non-blocking, event-driven, asynchronous** runtime. All API handlers use `async/await` over promises, allowing the server to handle many concurrent requests (db queries, auth checks, etc.) without blocking the event loop — ideal for a data-driven CRUD app like this one.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v16+)
- [MySQL](https://www.mysql.com) server running locally
- `npm`

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

Create a `.env` file in the project root:

```env
DB_NAME=invoiceflow
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_DIALECT=mysql
```

### 3. Run database migrations

```bash
npm run db:migrate
```

> This creates the `users`, `companies`, `customers`, `products`, `invoices`, `invoiceItems`, and `payments` tables.

### 4. Start the server

```bash
npm start
```

Open your browser and visit **http://localhost:3000** (default port is `3000`).

---

## 🧪 Planned / Possible Enhancements

- Expense tracking and recurring invoices
- PDF email delivery to customers
- Reporting & analytics dashboard
- Pagination and advanced filtering
- Docker setup for database + app

---

## 📄 License

[MIT](LICENSE)

---

## 🙋 Support

This is a demo project — feel free to explore, adapt, and learn from it. Contributions and improvement ideas are welcome!