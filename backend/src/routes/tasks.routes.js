import { Router } from "express";
import * as taskController from "../controllers/tasks.controller.js";

import {
  validateCreateTask,
  validateUpdateTask,
  validateStatus,
} from "../middleware/validateTask.js";

const router = Router();

router.get("/", taskController.getTasks);

router.get("/:id", taskController.getTask);

router.post("/", validateCreateTask, taskController.createTask);

router.put("/:id", validateUpdateTask, taskController.updateTask);

router.patch("/:id/status", validateStatus, taskController.updateTaskStatus);

router.delete("/:id", taskController.deleteTask);

export default router;
