export default function errorHandler(err, req, res, next) {
  // Log the full error to the server console for debugging
  console.error(err);

  // Handle errors caused by sending an invalid status name
  if (err.message === "Invalid status.") {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Handle the specific database error when a requested row/task is not found
  if (err.code === "PGRST116") {
    return res.status(404).json({
      message: "Task not found.",
    });
  }

  // Fallback for any other unexpected server errors
  return res.status(500).json({
    message: "Internal Server Error.",
  });
}
