import {React, useState} from 'react';
import "../css/important.css";

function Important() {
  // State to hold tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isCompletedVisible, setIsCompletedVisible] = useState(true);


  // Handle adding a task 
  const handleAddTask = () => {
    if(newTask.trim()) {
      setTasks([...tasks, { id: Date.now() , name: newTask, completed: false, bookmarked: true}]) // Set an unique ID
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

  // Toggle bookmark status of a task 
  const toggleBookmark = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if(task.id === taskId) {
        return{ ...task, bookmarked: !task.bookmarked};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className='important-container'>
      <div className='important-header'>
        <i className="fa-regular fa-star"></i><h2>Important</h2>
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
              <i
                className={`fa${task.bookmarked ? '-solid' : '-regular'} fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                onClick={() => toggleBookmark(task.id)}
                style={{ marginLeft: 'auto', cursor: 'pointer' }}
              ></i>
            </div>
          ))}

        {tasks.filter(task => task.completed).length > 0 && (
          <div className="completed-section">
            <div className="completed-header" onClick={toggleCompletedSection}>
              <span>
                <i className={`fa-solid fa-chevron-${isCompletedVisible ? 'right' : 'down'}`}></i> 
                Completed {tasks.filter(task => task.completed).length}
              </span>
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
                <i
                  className={`fa${task.bookmarked ? '-solid' : '-regular'} star-icon fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                  onClick={() => toggleBookmark(task.id)}
                  style={{ marginLeft: 'auto', cursor: 'pointer' }}
                ></i>
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

export default Important;
