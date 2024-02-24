import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.routes.js";
import playerRouter from "./routes/player.routes.js";
import { errorMiddleware } from "./middlewares/index.js";
import { check_connection } from "./config/postgres.js";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 8080;

/* Middlewares */
app.use(morgan("dev"));
app.use(express.json());
app.use((req: Request, res: Response, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    app.use(express.urlencoded({ extended: true }));
  }
  next();
});

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(errorMiddleware);

// Error handling middleware with four parameters
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", error);
  res.status(500).send("An unhandled error occurred.");
});

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/auth", authRouter);
app.use("/players", playerRouter)

app.listen(port, () => {
  console.log(`Server is running at ${port}\n`);
});

check_connection();