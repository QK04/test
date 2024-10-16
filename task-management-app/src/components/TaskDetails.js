import { React, useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskDetails = ({ task, closeDetails }) => {
    const { addMyDay, setDueDate, addStep, setRepeat, toggleBookmark } = useTasks();
    const [newStep, setNewStep] = useState('');
    
    const handleAddStep = () => {
        if (newStep.trim()) {
            addStep(task.id, newStep);
            setNewStep('');
        }
    };

    return (
        <div className="task-details">
            <div className="task-details-header">
                <h3>{task.name}</h3>
                <i
                    className={`fa${task.bookmarked ? '-solid' : '-regular'} fa-star ${task.bookmarked ? 'bookmarked' : ''}`}
                    onClick={() => toggleBookmark(task.id)}
                    style={{ cursor: 'pointer' }}
                ></i>
                <button className="close-details" onClick={closeDetails}>X</button>
            </div>

            <div className="task-steps">
                <p>Add step</p>
                <ul>
                    {task.steps?.map((step, index) => (
                        <li key={index}>{step}</li>
                    )) || <li>No steps available</li>}
                </ul>
                <input 
                    type="text" 
                    placeholder="Add a step" 
                    value={newStep} 
                    onChange={(e) => setNewStep(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
                />
            </div>

            <div className="task-options">
                <button className="add-to-my-day" onClick={() => addMyDay(task.id)}>
                    {task.myDay ? 'Remove from My Day' : 'Add to My Day'}
                </button>

                <div className="task-due-date">
                    <p>Add due date</p>
                    <input 
                        type="date" 
                        onChange={(e) => setDueDate(task.id, e.target.value)} 
                    />
                </div>

                <div className="task-repeat">
                    <p>Repeat</p>
                    <select onChange={(e) => setRepeat(task.id, e.target.value)}>
                        <option value="none">None</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="yearly">Yearly</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
            </div>

            <div className="task-footer">
                <p>Created on {task.createdOn || 'Date not set'}</p>
                {/* <button className="delete-task" onClick={() => deleteTask(task.id)}>Delete</button> */}
            </div>
        </div>
    );
};

export default TaskDetails;
