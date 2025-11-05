This repository contains backend code for menu management, including operations for categories, subcategories, and items. The routes and data models for Category, Subcategory, and Item were created and handled accordingly

- Live link of backend deployed on render: https://guestara-internship-assignment-txkh.onrender.com

- Postman API Documentation: https://documenter.getpostman.com/view/40568660/2sB3WqufTy

- Loom Video: https://www.loom.com/share/c8faabf3dae7413ea2870214a0c07d81

### Tech Stack
- **Node.js**
- **Express.js**
- **Postgres as Database**
- **Prisma as ORM**

## How to Run Locally

To run the application locally, follow these steps:

- **1. Clone the repository:**

```
git clone https://github.com/psychomint/Guestara-Internship-Assignment

```
- **2. Navigate to the project directory:**
```
cd Menu-Management-Backend-Guestara
```

- **3. Install dependencies using npm:**
```
npm install
```

- **4. Set up your Postgres database &  Update DATABASE_URL in the .env file.**

- **5. add instructions to run Prisma migrations**

```
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
````

- **6. Start the server:**
```
npm start
```
- ** Now the server will run on specified port locally**


## Answers to the questions asked.

### Which database have you chosen, and why?

- **I chose PostgreSQL as my database, using Prisma ORM for schema management and query abstraction. Prisma made it easier to define relationships, handle migrations, and write cleaner, type-safe queries compared to using raw SQL or Mongoose.**


### 3 things that you learned from this assignment?

- **I learned how to design and manage relational models with one-to-many relationships in a clean, maintainable way.**
- **This assignment helped me understand how to organize code by separating business logic (services) from request handling (controllers).**
- **I improved at designing REST endpoints, handling errors consistently, and structuring JSON responses that are easy for frontend or Postman clients to consume.**

### What was the most difficult part of the assignment?

- **The most challenging part was managing the tax inheritance logic between Category and Subcategory — ensuring that when tax details weren’t provided for a subcategory, they correctly defaulted to the parent category’s tax settings.**

### What would you have done differently, given more time?

- **Implemented pagination and filtering for large datasets.**
- **Containerized the backend with Docker and added CI/CD workflows for production readiness.**