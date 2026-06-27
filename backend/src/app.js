import express from "express";
import cors from "cors";

import taskRoutes from "./routes/tasks.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
