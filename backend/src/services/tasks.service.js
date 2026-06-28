import { supabase } from "../config/supabaseClient.js";

// Get all tasks (supports title search and status filtering)
export async function getAllTasks(search = "", status = "all") {
  let query = supabase
    .from("task_details") // Uses a database view to get status names
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (status !== "all") {
    query = query.eq("status_name", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Get a single task by its ID
export async function getTaskById(id) {
  const { data, error } = await supabase
    .from("task_details")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Create a new task (automatically defaults to 'pending' status)
export async function createTask(task) {
  const { title, description } = task;

  const { data, error } = await supabase
    .from("tasks")
    .insert({ title, description })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update a task's title and description
export async function updateTask(id, task) {
  const updateData = {
    ...task,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("tasks")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Change a task's status using its name (e.g., 'completed')
export async function updateTaskStatus(id, statusName) {
  // 1. Find the ID for the given status name
  const { data: status, error: statusError } = await supabase
    .from("statuses")
    .select("id")
    .eq("name", statusName)
    .single();

  if (statusError) throw new Error("Invalid status.");

  // 2. Update the task with the new status ID
  const { data, error } = await supabase
    .from("tasks")
    .update({
      status_id: status.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete a task permanently by its ID
export async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw error;
  return true;
}
