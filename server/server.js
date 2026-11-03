const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;
let tasks = [];

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
