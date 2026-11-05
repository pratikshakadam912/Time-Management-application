function TaskList({ tasks }) {
  return (
    <div>
      <h2> My Tasks</h2>
      {tasks.length === 0 ? (
        <p> No tasks yet . Add your first task !</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
