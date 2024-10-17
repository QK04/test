import {React, useState} from 'react';
import "../css/important.css";
import { useTasks } from '../context/TaskContext';
import TaskDetails from './TaskDetails';

function Important() {
  // State to hold tasks
  const { bookmarkedTasks, selectedTask, addImportantTask, toggleTask, toggleBookmark, getStepsInfo, openTaskDetails, closeTaskDetails } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [isCompletedVisible, setIsCompletedVisible] = useState(true);


  // Handle adding a task 
  const handleAddTask = () => {
    if(newTask.trim()) {
      addImportantTask(newTask);
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
    <div className='important-container'>
      <div className='important-header'>
        <i className="fa-regular fa-star"></i><h2>Important</h2>
      </div>

      <div className='task-list'>
        {bookmarkedTasks.filter(task => !task.completed).map((task) => {
            const { stepsTotal, stepsCompleted } = getStepsInfo(task.steps || []);
            return(
            <div key={task.id} className="task-item"onClick={(e) => {
              // Check if the clicked target is not the checkbox
              if (e.target.tagName !== 'INPUT') {
                console.log("Opening task details for:", task);
                openTaskDetails(task, 'important-container', 'task-details-section')
              }
            }}>
              <input 
                type="checkbox" 
                id={`task-${task.id}`} 
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <div className="task-content">
                <div className="task-info">
                  <label htmlFor={`task-${task.id}`}>{task.name}</label>
                  <div className="task-meta">
                    <span>• Tasks</span>
                    <span>• {stepsCompleted} of {stepsTotal}</span>
                    {task.dueDate && <span>• 📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                    {task.repeat && <span>• 🔁 {task.repeat}</span>}
                    {task.note && <span>• 📝</span>}
                  </div>
                </div>
                <i
                  className={`fa${task.bookmarked ? '-solid' : '-regular'} fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleBookmark(task.id); }}
                  style={{ marginLeft: 'auto', cursor: 'pointer' }}
                ></i>
              </div>
            </div>
            );
          })}

        {bookmarkedTasks.filter(task => task.completed).length > 0 && (
          <div className="completed-section">
            <div className="completed-header" onClick={toggleCompletedSection}>
              <span>
                <i className={`fa-solid fa-chevron-${isCompletedVisible ? 'right' : 'down'}`}></i> 
                Completed {bookmarkedTasks.filter(task => task.completed).length}
              </span>
            </div>
            {isCompletedVisible && bookmarkedTasks.filter(task => task.completed).map((task) => {
              const { stepsTotal, stepsCompleted } = getStepsInfo(task.steps || []);
              return(
                <div key={task.id} className="task-item completed-task" onClick={(e) => {
                  if (e.target.tagName !== 'INPUT') {
                    openTaskDetails(task, 'important-container', 'task-details-section')
                  }
                }}>
                <input 
                  type="checkbox" 
                  id={`completed-task-${task.id}`} 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div className="task-content">
                    <div className="task-info">
                      <label htmlFor={`completed-task-${task.id}`}>{task.name}</label>
                      <div className="task-meta">
                        <span>• Tasks</span>
                        <span>• {stepsCompleted} of {stepsTotal}</span>
                        {task.dueDate && <span>• 📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                        {task.repeat && <span>• 🔁 {task.repeat}</span>}
                        {task.note && <span>• 📝</span>}
                      </div>
                    </div>
                    <i
                      className={`fa${task.bookmarked ? '-solid' : '-regular'} fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(task.id); }}
                      style={{ marginLeft: 'auto', cursor: 'pointer' }}
                    ></i>
                  </div>
                </div>
              );
            })};
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
            <TaskDetails 
              task={selectedTask} 
              closeDetails={() => closeTaskDetails('important-container', 'task-details-section')} />
          </>
        )}
      </div>
    </div>
  );
}

export default Important;
