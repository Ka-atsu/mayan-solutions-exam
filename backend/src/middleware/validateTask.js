const VALID_STATUSES = ["pending", "in_progress", "completed"];

export function validateCreateTask(req, res, next) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Task title is required.",
    });
  }

  next();
}

export function validateUpdateTask(req, res, next) {
  const { title } = req.body;

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      message: "Task title cannot be empty.",
    });
  }

  next();
}

export function validateStatus(req, res, next) {
  const { status_name } = req.body;

  if (!status_name) {
    return res.status(400).json({
      message: "Status is required.",
    });
  }

  if (!VALID_STATUSES.includes(status_name)) {
    return res.status(400).json({
      message: "Invalid status.",
    });
  }

  next();
}
