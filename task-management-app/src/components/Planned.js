import { React, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskDetails from './TaskDetails';
import "../css/planned.css"

function Planned() {
    const { tasks, selectedTask, toggleTask, toggleBookmark, getStepsInfo, openTaskDetails, closeTaskDetails, addTask } = useTasks();
    const [newTask, setNewTask] = useState('');
    const [isSectionVisible, setIsSectionVisible] = useState({});

    // Handle adding a task 
    const handleAddTask = () => {
        if (newTask.trim()) {
            addTask(newTask);  // Add the task using the addTask function from context
            setNewTask('');
        }
    };

    // Handle input change
    const handleTaskInput = (e) => {
        setNewTask(e.target.value);
    };


    // Toggle section visibility
    const toggleSectionVisibility = (dueDate) => {
        setIsSectionVisible(prevState => ({
            ...prevState,
            [dueDate]: !prevState[dueDate]
        }));
    }

    // Group tasks by due date
    const groupByDueDate = (tasks) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const tomorrow = new Date(today + 86400000).getTime(); // 86400000 ms in a day
    
        return tasks.reduce((acc, task) => {
            let dateLabel;
            if (!task.dueDate) {
                dateLabel = "No Due Date";
            } else {
                // Ensure dueDate is in ISO format before comparison
                const dueDate = new Date(task.dueDate).getTime();
    
                if (dueDate < today) {
                    dateLabel = "Overdue";
                } else if (dueDate === today) {
                    dateLabel = "Today";
                } else if (dueDate === tomorrow) {
                    dateLabel = "Tomorrow";
                } else {
                    dateLabel = new Date(task.dueDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    });
                }
            }
    
            if (!acc[dateLabel]) {
                acc[dateLabel] = [];
            }
            acc[dateLabel].push(task);
            return acc;
        }, {});
    };

    const groupedTasks = groupByDueDate(tasks);

    return (
        <div className='planned-container'>
            <div className='planned-header'>
                <i className="fa-regular fa-calendar"></i><h2>Planned</h2>
            </div>

            <div className='task-list'>
                {Object.keys(groupedTasks).map(dueDate => (
                    <div key={dueDate} className="due-date-section">
                        <div className="due-date-header" onClick={() => toggleSectionVisibility(dueDate)}>
                            <span>
                                <i className={`fa-solid fa-chevron-${isSectionVisible[dueDate] ? 'down' : 'right'}`}></i>
                                {dueDate} ({groupedTasks[dueDate].length}) 
                            </span>
                        </div>
                        {isSectionVisible[dueDate] && groupedTasks[dueDate].map(task => {
                            const { stepsTotal, stepsCompleted } = getStepsInfo(task.steps || []);
                            return (
                                <div 
                                    key={task.id} 
                                    className={`task-item ${task.completed ? 'completed-task' : ''}`}
                                    onClick={(e) => {
                                    // Check if the clicked target is not the checkbox
                                    if (e.target.tagName !== 'INPUT') {
                                        openTaskDetails(task, 'planned-container', 'task-details-section');
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
                    </div>
                ))}
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
                            closeDetails={() => closeTaskDetails('planned-container', 'task-details-section')}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Planned;
