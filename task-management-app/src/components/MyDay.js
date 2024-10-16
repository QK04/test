import {React, useState} from 'react';
import "../css/myday.css";
import { useTasks } from '../context/TaskContext';
import TaskDetails from './TaskDetails';

function MyDay() {
  // State to hold tasks
  const {tasks, addTask, toggleTask, toggleBookmark } = useTasks(); // export as an object to use for useTasks()
  const [newTask, setNewTask] = useState('');
  const [isCompletedVisible, setIsCompletedVisible] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

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
      addTask(newTask);
      setNewTask('');
    }
  };

  // Handle input change
  const handleTaskInput = (e) => {
    setNewTask(e.target.value);
  };

  // Toggle completed section visibility
  const toggleCompletedSection = () => {
    setIsCompletedVisible(!isCompletedVisible);
  };

  // Open task details
  const openTaskDetails = (task) => {
    if (selectedTask && selectedTask.id === task.id) {
      closeTaskDetails();
    } else {
      setSelectedTask(task);
      const myDayContainer = document.querySelector('.my-day-container');
      const taskDetailsSection = document.querySelector('.task-details-section');
  
      if (myDayContainer && taskDetailsSection) {
          myDayContainer.classList.add('shifted'); // Remove the period
          taskDetailsSection.classList.add('active'); // Remove the period
      } else {
          console.error('Element not found: myDayContainer or taskDetailsSection');
      }
    }
    
}

  // Close task details
  const closeTaskDetails = () => {
    setSelectedTask(null);
    const myDayContainer = document.querySelector('.my-day-container');
    const taskDetailsSection = document.querySelector('.task-details-section');

    if (myDayContainer && taskDetailsSection) {
        myDayContainer.classList.remove('shifted'); // Remove the period
        taskDetailsSection.classList.remove('active'); // Remove the period
    } else {
        console.error('Element not found: myDayContainer or taskDetailsSection');
    }
  }

  return (
    <div className='my-day-container'>
      <div className='my-day-header'>
        <h2>My Day</h2>
        <p>{currentDate}</p>
      </div>

      <div className='task-list'>
        {tasks.filter(task => !task.completed).map((task) => (
            <div key={task.id} className="task-item" onClick={() => openTaskDetails(task)}>
              <input 
                type="checkbox" 
                id={`task-${task.id}`} 
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <label htmlFor={`task-${task.id}`}>{task.name}</label>
              <i
                className={`fa${task.bookmarked ? '-solid' : '-regular'} fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                onClick={(e) => {e.stopPropagation(); toggleBookmark(task.id)}}
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
              <div key={task.id} className="task-item completed-task" onClick={() => openTaskDetails(task)}>
                <input 
                  type="checkbox" 
                  id={`completed-task-${task.id}`} 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <label htmlFor={`completed-task-${task.id}`}>{task.name}</label>
                <i
                  className={`fa${task.bookmarked ? '-solid' : '-regular'} star-icon fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                  onClick={(e) => {e.stopPropagation(); toggleBookmark(task.id)}}
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

      <div className='task-details-section'>
        {selectedTask && (
          <TaskDetails task={selectedTask} closeDetails={closeTaskDetails}/>
        )}
      </div>
    </div>
  );
}

export default MyDay;
