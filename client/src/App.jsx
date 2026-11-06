import { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (taskData) => {
    try {
      await API.post("/tasks", taskData);
      await fetchTasks();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Could not add task");
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      await API.put(`/tasks/${id}`, taskData);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Could not update task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await API.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Could not delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const completed = tasks.filter((task) => task.status === "Completed").length;

  const pending = tasks.filter((task) => task.status === "Pending").length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <h2>TaskFlow</h2>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <a className="nav-link active" href="#">
            <span>▦</span> Overview
          </a>
          <a className="nav-link" href="#tasks">
            <span>☷</span> My Tasks
          </a>
        </nav>

        <div className="sidebar-bottom">
          <p>Stay focused. Get things done.</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="welcome-text">WORKSPACE / OVERVIEW</p>
            <h1>My Dashboard</h1>
          </div>

          <button className="add-button" onClick={() => setShowForm(!showForm)}>
            + Add New Task
          </button>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Tasks</p>
            <h2>{tasks.length}</h2>
            <span>All your tasks</span>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2>{pending}</h2>
            <span>Waiting to start</span>
          </div>

          <div className="stat-card">
            <p>In Progress</p>
            <h2>{inProgress}</h2>
            <span>Currently working</span>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>{completed}</h2>
            <span>Successfully finished</span>
          </div>
        </section>

        {showForm && (
          <section className="form-section">
            <TaskForm onTaskAdded={addTask} />
          </section>
        )}

        <section className="tasks-section" id="tasks">
          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Manage and track your daily work.</p>
            </div>
          </div>

          <div className="task-filters">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <TaskList
            tasks={filteredTasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
