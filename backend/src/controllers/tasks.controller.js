import * as taskService from "../services/tasks.service.js";

/*
    GET /api/tasks
*/
export async function getTasks(req, res, next) {
  try {
    const { search = "", status = "all" } = req.query;

    const tasks = await taskService.getAllTasks(search, status);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

/*
    GET /api/tasks/:id
*/
export async function getTask(req, res, next) {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

/*
    POST /api/tasks
*/
export async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

/*
    PUT /api/tasks/:id
*/
export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;

    const task = await taskService.updateTask(id, req.body);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

/*
    PATCH /api/tasks/:id/status
*/
export async function updateTaskStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status_name } = req.body;

    const task = await taskService.updateTaskStatus(id, status_name);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

/*
    DELETE /api/tasks/:id
*/
export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    await taskService.deleteTask(id);

    res.status(200).json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
