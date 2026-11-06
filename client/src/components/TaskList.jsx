function TaskList({ tasks }) {
  return (
    <div className="task-grid">
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet. Create your first task!</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-card-top">
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>

              <span className="task-status">{task.status}</span>
            </div>

            <h3>{task.title}</h3>
            <p className="task-description">
              {task.description || "No description provided."}
            </p>

            <div className="task-card-footer">
              <span>Task #{task.id}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
