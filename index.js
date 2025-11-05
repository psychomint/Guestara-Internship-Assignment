import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./routes/index.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Use environment port or default 3000
const PORT = process.env.PORT || 3000;

// Routes
app.use("/", routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Function to start server with retry logic
async function startServer() {
  let retries = 5;
  while (retries > 0) {
    try {
      await prisma.$connect();
      console.log("✅ Connected to PostgreSQL via Prisma");

      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });

      break; // Exit loop if connection succeeds
    } catch (error) {
      console.error(
        `❌ Error connecting to PostgreSQL, retries left: ${retries - 1}`
      );
      console.error(error.message);
      retries--;
      if (retries === 0) {
        console.error("❌ Could not connect to database after multiple attempts. Exiting.");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, 5000)); // wait 5 seconds before retry
    }
  }
}

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 SIGINT received (Ctrl+C)");
  await prisma.$disconnect();
  console.log("🔌 Prisma disconnected");
  process.exit(0);
});
