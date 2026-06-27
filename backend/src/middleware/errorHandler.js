export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.message === "Invalid status.") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.code === "PGRST116") {
    return res.status(404).json({
      message: "Task not found.",
    });
  }

  return res.status(500).json({
    message: "Internal Server Error.",
  });
}
