const express = require("express");

const prisma = require("./prisma");

const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Task Management API is running!");
});

app.post("/api/tasks", (req, res) => {
  const { title, description, priority } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "Task title is required",
    });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    priority,
  };
  tasks.push(newTask);
  res.status(201).json({
    message: "Task created successfully",
    task: newTask,
  });
});

app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    tasks: tasks,
  });
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!tasks) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const { title, description, priority } = req.body;

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.priority = priority ?? task.priority;

  res.status(200).json({
    message: "Task updated successfully",
    task: task,
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
