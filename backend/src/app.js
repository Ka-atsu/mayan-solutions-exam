import express from "express";
import cors from "cors";

import taskRoutes from "./routes/tasks.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Enable Cross-Origin Resource Sharing so the frontend can talk to the backend
app.use(cors());

// Parse incoming requests with JSON bodies
app.use(express.json());

// Base health-check route to confirm the API is live
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

// Link all task-related endpoints to the tasks router
app.use("/api/tasks", taskRoutes);

// Centralized error handling middleware (must be loaded last)
app.use(errorHandler);

export default app;
