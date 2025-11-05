import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import prisma from "./config/prismaClient.js";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT || 3000;

// Routes to Category, subcategory, item.
app.use("/", routes)


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


// Check database connection and start server
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to PostgreSQL:", error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown handler
process.on("SIGINT", async () => {
  console.log("\n🛑 SIGINT received (e.g., Ctrl+C)");
  await prisma.$disconnect();
  console.log("🔌 Prisma disconnected");
  process.exit(0);
});