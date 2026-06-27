import "./App.css";

import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks,

    loading,

    error,

    search,

    statusFilter,

    setSearch,

    setStatusFilter,

    createTask,

    updateTask,

    deleteTask,

    updateStatus,
  } = useTasks();

  return (
    <div className="container">
      <h1>Task Management System</h1>

      <TaskForm onSubmit={createTask} />

      <SearchBar value={search} onSearch={setSearch} />

      <FilterTabs selected={statusFilter} onChange={setStatusFilter} />

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onStatusChange={updateStatus}
      />
    </div>
  );
}

export default App;
