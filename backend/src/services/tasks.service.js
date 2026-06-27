import { supabase } from "../config/supabaseClient.js";

/*
    GET ALL TASKS
*/
export async function getAllTasks(search = "", status = "all") {
  let query = supabase
    .from("task_details")
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

/*
    GET TASK BY ID
*/
export async function getTaskById(id) {
  const { data, error } = await supabase
    .from("task_details")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

/*
    CREATE TASK
*/
export async function createTask(task) {
  const { title, description } = task;

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
    UPDATE TASK
*/
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

/*
    UPDATE STATUS
*/
export async function updateTaskStatus(id, statusName) {
  // Find status id
  const { data: status, error: statusError } = await supabase
    .from("statuses")
    .select("id")
    .eq("name", statusName)
    .single();

  if (statusError) throw new Error("Invalid status.");

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

/*
    DELETE TASK
*/
export async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw error;

  return true;
}
