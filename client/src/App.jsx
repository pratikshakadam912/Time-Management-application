import { useState, useEffect } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [task, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      settasks(response.data.tasks);
    } catch (error) {
      console.error("error fetching tasks:", error);
    }
  };

  const addTask = async (taskData) => {
    try {
      await API.post("/tasks", taskData);
      fetchTasks();
    } catch (error) {
      console.error("error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1> Task Management App</h1>
      <TaskForm onTaskAdded={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
