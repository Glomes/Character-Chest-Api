# ⚔️ Character Chest API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)
![License](https://img.shields.io/badge/license-MIT-green)

API RESTful para gerenciamento de fichas de personagens de **múltiplos sistemas de RPG**, com suporte inicial a:
- 🎲 **Dungeons & Dragons 5ª Edição (DND5E)**
- 📖 **Chamado de Cthulhu 7ª Edição (CTHULHU7E)**

> ✨ Arquitetura baseada em **Polimorfismo de Banco de Dados**, permitindo que diferentes sistemas partilhem um **único endpoint centralizado**.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Ambiente:** Node.js
- **Framework:** Express
- **Banco de Dados:** PostgreSQL (via Docker)
- **Driver:** [pg (Node-Postgres)](https://node-postgres.com/)

---

## 🚀 Como Rodar o Projeto

### 1. Configuração do Ambiente

Instalar dependências:
```bash
npm install
```

Subir o container do PostgreSQL via Docker Compose:
```bash
docker-compose up -d postgres
```

Executar migrações (se existir script `migrate`):
```bash
npm run migrate
```

---

### 2. Iniciar o Servidor

```bash
npm run dev
```

O servidor estará disponível em:
👉 http://localhost:3000

---

## 🗺️ Endpoints Disponíveis

| Método  | Endpoint             | Descrição                                                                 |
|---------|----------------------|---------------------------------------------------------------------------|
| **POST**   | `/api/v1/sheets`     | Cria uma nova ficha (`system` define a tabela específica).                  |
| **GET**    | `/api/v1/sheets`     | Lista todas as fichas principais (dados gerais).                           |
| **GET**    | `/api/v1/sheets/:id` | Retorna uma ficha completa (dados gerais + específicos).                    |
| **PUT**    | `/api/v1/sheets/:id` | Atualiza os dados gerais e específicos.                                   |
| **DELETE** | `/api/v1/sheets/:id` | Remove a ficha e seus dados específicos.                                   |

---

## 💾 Exemplos de Payloads

### 📘 D&D 5ª Edição
```json
{
  "name": "Kaelen, o Bárbaro",
  "player": "Seu Nome",
  "system": "DND5E",
  "notes": "Um guerreiro do norte.",
  "specificSheetData": {
    "level": 3,
    "rpg_class": "Bárbaro",
    "armor_class": 15,
    "scores": { "str": 16, "dex": 14, "con": 17, "int": 10, "wis": 12, "cha": 8 },
    "health": { "maxHp": 35, "currentHp": 30 },
    "proficiency_bonus": 2
  }
}
```

### 📙 Chamado de Cthulhu 7ª Edição
```json
{
  "name": "Prof. Elias",
  "player": "Seu Nome",
  "system": "CTHULHU7E",
  "notes": "Investigador com medo de bibliotecas.",
  "specificSheetData": {
    "occupation": "Bibliotecário",
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

## 📌 Próximos Passos

- ✅ Suporte inicial D&D 5E e Cthulhu 7E
- 🔄 Adicionar novos sistemas de RPG
- 🛡️ Autenticação e permissões de acesso
- 📊 Documentação automática (Swagger/OpenAPI)

---

## 👨‍💻 Contribuição

1. Faça um fork do repositório
2. Crie uma branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request 🎉

---

📌 Projeto criado com dedicação para a comunidade RPGista.

