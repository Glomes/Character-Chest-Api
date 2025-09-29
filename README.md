# ⚔️ Character Chest API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)
![License](https://img.shields.io/badge/license-MIT-green)

A robust RESTful API for managing RPG character sheets across multiple systems, with initial support for:
- 🐉 **Dungeons & Dragons 5th Edition (DND5E)**
- 🐙 **Call of Cthulhu 7th Edition (CTHULHU7E)**

> ✨ Built on a **Database Polymorphism** architecture, allowing multiple RPG systems to share a **single unified endpoint**.

---

## 🛠️ Technologies Used

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL (via Docker)
- **Driver:** [pg (Node-Postgres)](https://node-postgres.com/)

---

## 🚀 Getting Started

### 1. Environment Setup

Install dependencies:
```bash
npm install
```

Spin up PostgreSQL with Docker Compose:
```bash
docker-compose up -d postgres
```

Run migrations (if a `migrate` script is available):
```bash
npm run migrate
```

---

### 2. Start the Server

```bash
npm run dev
```

The server will be available at:
👉 http://localhost:3000

---

## 🗺️ Available Endpoints

| Method   | Endpoint             | Description                                                                 |
|----------|----------------------|-----------------------------------------------------------------------------|
| **POST**   | `/api/v1/sheets`     | Create a new sheet (`system` defines the target table).                      |
| **GET**    | `/api/v1/sheets`     | List all character sheets (general data).                                    |
| **GET**    | `/api/v1/sheets/:id` | Retrieve a full character sheet (general + system-specific data).            |
| **PUT**    | `/api/v1/sheets/:id` | Update both general and system-specific data.                               |
| **DELETE** | `/api/v1/sheets/:id` | Delete a character sheet and its related system-specific data.               |

---

## 💾 Example Payloads

### 🐉 D&D 5E
```json
{
  "name": "Kaelen, the Barbarian",
  "player": "Your Name",
  "system": "DND5E",
  "notes": "A warrior from the north.",
  "specificSheetData": {
    "level": 3,
    "rpg_class": "Barbarian",
    "armor_class": 15,
    "scores": { "str": 16, "dex": 14, "con": 17, "int": 10, "wis": 12, "cha": 8 },
    "health": { "maxHp": 35, "currentHp": 30 },
    "proficiency_bonus": 2
  }
}
```

### 🐙 Call of Cthulhu 7E
```json
{
  "name": "Prof. Elias",
  "player": "Your Name",
  "system": "CTHULHU7E",
  "notes": "An investigator afraid of libraries.",
  "specificSheetData": {
    "occupation": "Librarian",
    "age": 55,
    "forScore": 40,
    "podScore": 80,
    "eduScore": 85,
    "derivedStats": { "build": 0, "size": 10, "move": 8 },
    "resources": { "maxSanity": 80, "currentSanity": 65 }
  }
}
```

---

## 📌 Roadmap

- ✅ Initial support for D&D 5E and Call of Cthulhu 7E
- 🔄 Add more RPG systems
- 🛡️ Implement authentication and access control
- 📊 Automatic API documentation (Swagger/OpenAPI)

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin my-feature
   ```
5. Open a Pull Request 🎉

---

📌 Built with dedication for the RPG community.

