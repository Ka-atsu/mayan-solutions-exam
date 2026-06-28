import { Router } from "express";
import * as taskController from "../controllers/tasks.controller.js";

import {
  validateCreateTask,
  validateUpdateTask,
  validateStatus,
} from "../middleware/validateTask.js";

const router = Router();

// Route to get all tasks (supports search text and status filters)
router.get("/", taskController.getTasks);

// Route to get a single task by its ID
router.get("/:id", taskController.getTask);

// Route to create a new task (checks if the data is valid first)
router.post("/", validateCreateTask, taskController.createTask);

// Route to update a task's text fields (checks if the data is valid first)
router.put("/:id", validateUpdateTask, taskController.updateTask);

// Route to change only the status of a task (checks if the status is valid first)
router.patch("/:id/status", validateStatus, taskController.updateTaskStatus);

// Route to delete a task by its ID
router.delete("/:id", taskController.deleteTask);

export default router;
