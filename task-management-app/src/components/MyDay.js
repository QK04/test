import {React, useState} from 'react';
import "../css/myday.css";
function MyDay() {
  // State to hold tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isCompletedVisible, setIsCompletedVisible] = useState(true);

  // Get the current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle adding a task 
  const handleAddTask = () => {
    if(newTask.trim()) {
      setTasks([...tasks, { id: Date.now() , name: newTask, completed: false}]) // Set an unique ID
      setNewTask('');
    }
  };

  // Handle input change
  const handleTaskInput = (e) => {
    setNewTask(e.target.value);
  };

  // Handle toggle tasks
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }; 
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Toggle completed section visibility
  const toggleCompletedSection = () => {
    setIsCompletedVisible(!isCompletedVisible);
  };

  return (
    <div className='my-day-container'>
      <div className='my-day-header'>
        <h2>My Day</h2>
        <p>{currentDate}</p>
      </div>

      <div className='task-list'>
        {tasks.filter(task => !task.completed).map((task) => (
            <div key={task.id} className="task-item">
              <input 
                type="checkbox" 
                id={`task-${task.id}`} 
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <label htmlFor={`task-${task.id}`}>{task.name}</label>
            </div>
          ))}

        {tasks.filter(task => task.completed).length > 0 && (
          <div className="completed-section">
            <div className="completed-header" onClick={toggleCompletedSection}>
              <span>{isCompletedVisible ? '-' : '+'} Completed {tasks.filter(task => task.completed).length}</span>
            </div>
            {isCompletedVisible && tasks.filter(task => task.completed).map((task) => (
              <div key={task.id} className="task-item completed-task">
                <input 
                  type="checkbox" 
                  id={`completed-task-${task.id}`} 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <label htmlFor={`completed-task-${task.id}`}>{task.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className='task-input'>
        <i className="fa-solid fa-plus" onClick={handleAddTask}></i>
        <input
          type='text'
          placeholder='Add a task'
          value={newTask}
          onChange={handleTaskInput}
          onKeyDown={(e) => e.key === 'Enter' ? handleAddTask() : null}
        />
      </div>
    </div>
  );
}

export default MyDay;
