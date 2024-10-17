import {React, useState} from 'react';
import "../css/myday.css";
import { useTasks } from '../context/TaskContext';
import TaskDetails from './TaskDetails';

function MyDay() {
  // State to hold tasks
  const {tasks, selectedTask, addTask, setTasks, addMyDay, openTaskDetails, closeTaskDetails, toggleTask, toggleBookmark, getStepsInfo } = useTasks(); // export as an object to use for useTasks()
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
      addTask(newTask);
      setTasks((prevTasks) => {
        const newTaskId = Date.now(); // Set up the same Id
        return prevTasks.map(task => 
            task.id === newTaskId ? { ...task, myDay: true } : task
        );
    });
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

  return (
    <div className='my-day-container'>
      <div className='my-day-header'>
        <h2>My Day</h2>
        <p>{currentDate}</p>
      </div>

      <div className='task-list'>
        {tasks.filter(task => task.myDay && !task.completed).map((task) => {
            const { stepsTotal, stepsCompleted } = getStepsInfo(task.steps || []);
            return(
            <div key={task.id} className="task-item" onClick={(e) => { 
                // Check if the clicked target is not the checkbox
                if (e.target.tagName !== 'INPUT') {
                  openTaskDetails(task, 'my-day-container', 'task-details-section');
                }
              }}>

              <input 
                type="checkbox" 
                id={`task-${task.id}`} 
                checked={task.completed}
                onChange={()=> toggleTask(task.id)}
              />
              
              <div className="task-content">
                <div className="task-info">
                  <label htmlFor={`task-${task.id}`}>{task.name}</label>
                  <div className="task-meta">
                    {task.myDay && <span>☀ My Day</span>}
                    <span>• Tasks</span>
                    <span>• {stepsCompleted} of {stepsTotal}</span>
                    {task.dueDate && <span>• 📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                    {task.repeat && <span>• 🔁 {task.repeat}</span>}
                    {task.note && <span>• 📝</span>}
                  </div>
                </div>
                <i
                  className={`fa${task.bookmarked ? '-solid' : '-regular'} fa-star  ${task.bookmarked ? 'bookmarked' : ''}`}
                  onClick={(e) => {e.stopPropagation(); toggleBookmark(task.id)}}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
            </div>
            );
          })}

        {tasks.filter(task => task.myDay && task.completed).length > 0 && (
          <div className="completed-section">
            <div className="completed-header" onClick={toggleCompletedSection}>
              <span>
                <i className={`fa-solid fa-chevron-${isCompletedVisible ? 'right' : 'down'}`}></i> 
                Completed {tasks.filter(task => task.completed).length}
              </span>
            </div>
            {isCompletedVisible && tasks.filter(task => task.myDay && task.completed).map((task) => {
              const { stepsTotal, stepsCompleted } = getStepsInfo(task.steps || []);
              return (
              <div key={task.id} className="task-item completed-task" onClick={(e) => { 
                if (e.target.tagName !== 'INPUT') {
                  openTaskDetails(task, 'my-day-container', 'task-details-section');
                }
                }}>
                <input 
                  type="checkbox" 
                  id={`completed-task-${task.id}`} 
                  checked={task.completed}
                  onChange={()=> toggleTask(task.id)}
                />
                
                <div className="task-content">
                  <div className="task-info">
                    <label htmlFor={`completed-task-${task.id}`}>{task.name}</label>
                    <div className="task-meta">
                      {task.myDay && <span>☀ My Day</span>}
                      <span>• Tasks</span>
                      <span>• {stepsCompleted} of {stepsTotal}</span>
                      {task.dueDate && <span>• 📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                      {task.repeat && <span>• 🔁 {task.repeat}</span>}
                      {task.note && <span>• 📝</span>}
                    </div>
                  </div>
                  <i
                    className={`fa${task.bookmarked ? '-solid' : '-regular'} fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                    onClick={(e) => {e.stopPropagation(); toggleBookmark(task.id)}}
                    style={{ cursor: 'pointer' }}
                  ></i>
                </div>
              </div>
              );
            })}
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
          <>
          {console.log("Selected Task:", selectedTask)}
          <TaskDetails 
            task={selectedTask} 
            closeDetails={() => closeTaskDetails('my-day-container', 'task-details-section')}
          />
           </>
        )}
      </div>
    </div>
  );
}

export default MyDay;
