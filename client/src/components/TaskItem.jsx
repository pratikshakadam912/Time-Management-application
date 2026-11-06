import { useState } from "react";

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    await onUpdate(task.id, {
      title,
      description,
      priority,
    });

    setIsEditing(false);
  };

  const handleStatusChange = (e) => {
    onUpdate(task.id, {
      status: e.target.value,
    });
  };

  return (
    <div className="task-card">
      <div className="task-card-top">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

        <select
          className="task-status-select"
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {isEditing ? (
        <div className="edit-fields">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button type="button" onClick={handleSave}>
            Save
          </button>

          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>

          <p className="task-description">
            {task.description || "No description provided."}
          </p>

          <div className="task-card-footer">
            <span>Task #{task.id}</span>

            <div className="task-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>

              <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
