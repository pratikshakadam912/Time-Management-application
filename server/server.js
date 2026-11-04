const express = require("express");

const prisma = require("./prisma");

const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Task Management API is running!");
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating task",
    });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching tasks",
    });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, priority, status } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id },
    });
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        status,
      },
    });
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating task",
    });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting task",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
