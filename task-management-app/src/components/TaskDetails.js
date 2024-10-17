import { React, useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import "../css/taskDetails.css"

const TaskDetails = ({ task, closeDetails }) => {
    const { tasks,setTasks, addMyDay, addFile, addNote, toggleMyDay, setDueDate, addStep, deleteStep, toggleStep, setRepeat, deleteTask, toggleTask, toggleBookmark, updateTaskName, updateStepName } = useTasks();
    const [newStep, setNewStep] = useState('');
    const [currentTask, setCurrentTask] = useState(task);
    const [isEditingTaskName, setIsEditingTaskName] = useState(false);
    const [isEditingStepName, setIsEditingStepName] = useState(-1); // Use -1 to indicate no step is being edited
    const [editedTaskName, setEditedTaskName] = useState(currentTask.name);
    const [editedStepNames, setEditedStepNames] = useState(currentTask.steps.map(step => step.name));
    
    // State to work with Due Date
    const [dueDate, setDueDateInput] = useState(currentTask.dueDate || '');
    const [isEditingDueDate, setIsEditingDueDate] = useState(false);

    // State to work with Repeat
    const [showRepeatOptions, setShowRepeatOptions] = useState(false);
    const repeatOptions = ['None', 'Daily', 'Weekday', 'Weekly', 'Monthly', 'Yearly', 'Custom'];

    // State to work with file and note 
    const [newFile, setNewFile] = useState(null);
    const [note, setNote] = useState(currentTask.note || "");

    // useEffect to update local state whenever the task prop changes
    useEffect(() => {
        setCurrentTask(task);
        setEditedTaskName(task.name);
        setEditedStepNames(task.steps.map(step => step.name));
        setDueDateInput(task.dueDate || '');
        setNote(task.note || "");
    }, [task]);

    const handleAddStep = () => {
        if (newStep.trim() && currentTask) {
            addStep(currentTask.id, newStep);
            
            const step = {
                name: newStep,
                completed: false,
            };

            // Update the currentTask state to include the new step
            setCurrentTask(prev => ({
                ...prev,
                steps: [...prev.steps, step]
            }));
            setNewStep('');
        }
    };

    // Immediately update the local state when toggling bookmark
    const handleToggleTask = () => {
        toggleTask(currentTask.id);
        setCurrentTask(prev => ({ ...prev, completed: !prev.completed }));
    };

    // Handle deleting the task
    const handleDeleteTask = () => {
        deleteTask(currentTask.id);
        closeDetails(); 
    };

    // Immediately update the local state when toggling bookmark
    const handleToggleBookmark = () => {
        toggleBookmark(currentTask.id);
        setCurrentTask(prev => ({ ...prev, bookmarked: !prev.bookmarked }));
    };

    // Handle the Task Name Editing
    const handleEditTaskName = (e) => {
        if (e.key === 'Enter') {
            updateTaskName(currentTask.id, editedTaskName);
            setCurrentTask(prev => ({ ...prev, name: editedTaskName }));
            setIsEditingTaskName(false);
        }
    };

    // Handle the Step Name Editing
    const handleEditStepName = (index, e) => {
        if (e.key === 'Enter') {
            updateStepName(currentTask.id, index, editedStepNames[index]);
            const newStepName = editedStepNames[index]; 
            setCurrentTask(prev => {
                const updatedSteps = [...prev.steps];
                updatedSteps[index] = {...updatedSteps[index], name: newStepName}; // Update new Name in local state 
                return {...prev, steps: updatedSteps };
            })
            setIsEditingStepName(-1);
        }
    };

    // Handle toggling step completion
    const handleToggleStep = (index) => {
        toggleStep(currentTask.id, index);
        setCurrentTask(prev => {
            const updatedSteps = [...prev.steps];
            updatedSteps[index] = { ...updatedSteps[index], completed: !updatedSteps[index].completed };
            return { ...prev, steps: updatedSteps };
        });
    };

    // Handle deleting a step 
    const handleDeleteStep = (index) => {
        deleteStep(currentTask.id, index);
        setCurrentTask(prev =>({
            ...prev,
            steps: prev.steps.filter((_, stepIndex) => stepIndex !== index )
        }));
    };

    // Adding the Task to My day 
    const handleAddToMyDay = () => {
        if (currentTask.myDay) {
            toggleMyDay(currentTask.id); 
        } else {
            addMyDay(currentTask.id); 
        }
        setCurrentTask(prev => ({ ...prev, myDay: !prev.myDay }));
    }

    // Handle the Due Date change
    const handleDueDateChange = (e) => {
        const newDueDate = e.target.value;
        setDueDateInput(newDueDate);
        setDueDate(currentTask.id, newDueDate);
        setIsEditingDueDate(false); 
    }

    // Handle toggling between span and input
    const handleDueDateClick = () => {
        setIsEditingDueDate(true);
    };

    // Handle input blur (optional: if the user clicks away without selecting a date)
    const handleBlur = () => {
        if (!dueDate) {
            setIsEditingDueDate(false);
        }
    };

    const renderDueDate = () => {
        if (!dueDate) 
            return null; // If no due date, nothing is rendered
        const formattedDate = new Date(dueDate).toLocaleDateString(); 
        return `Due ${formattedDate}`;
    };

    // Handle the repeat option selection
    const handleRepeatSelect = (option) => {
        setRepeat(currentTask.id, option);
        setCurrentTask((prev) => ({ ...prev, repeat: option }));
        setShowRepeatOptions(false);
    }

    // Render repeat options
    const renderRepeatOptions = () => {
        if (!showRepeatOptions)
            return null;
        return (
            <div className="repeat-options">
                {repeatOptions.map((option) => (
                    <div key={option} className="repeat-option" onClick={() => handleRepeatSelect(option)}>
                        {option}
                    </div>
                ))}
            </div>
        );
    };

    // Handle adding file 
    const handleAddFile = (e) => {
        const file = e.target.files[0];
        if(file) {
            addFile(currentTask.id, file);
            setCurrentTask(prev => ({...prev, files: [...prev.files, file]}));
            setNewFile(null);
        }
    }

    // Handle deleting file
    const handleDeleteFile = (fileIndex) => {
        const updatedFiles = currentTask.files.filter((_, index) => index !== fileIndex);
    
        // Use context to update the tasks
        setTasks((prevTasks) => 
            prevTasks.map((task) => 
                task.id === currentTask.id ? { ...task, files: updatedFiles } : task
            )
        );

        setCurrentTask((prevTask) => {
            return {...prevTask, files: updatedFiles};
        });
    };

    // Handle adding note
    const handleNoteChange = (e) => {
        const newNote = e.target.value;
        setNote(newNote);
        addNote(currentTask.id, newNote);
    };

    return (
        <div className="task-details-container">
            <div className="task-details-header">    
                <div className="close-button" onClick={closeDetails}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div key={currentTask.id} className="task-container first">
                <div className="task-inline">
                    <input
                        type="checkbox"
                        id={`task-${currentTask.id}`} 
                        checked={currentTask.completed}
                        onChange={handleToggleTask}
                        />
                    {isEditingTaskName ? (
                        <input
                            type="text"
                            value={editedTaskName}
                            onChange={(e) => setEditedTaskName(e.target.value)}
                            onKeyDown={handleEditTaskName}
                            onBlur={() => setIsEditingTaskName(false)}
                            style={{ marginLeft: '10px' }}
                        />
                    ) : (
                        <h3 onClick={() => setIsEditingTaskName(true)} style={{ marginLeft: '10px' }}>
                            {currentTask.name}
                        </h3>
                    )}
                    <i
                        className={`fa${currentTask.bookmarked ? '-solid' : '-regular'} fa-star ${currentTask.bookmarked ? 'bookmarked' : ''}`}
                        onClick={handleToggleBookmark}
                        style={{ marginLeft: 'auto', cursor: 'pointer' }}
                    ></i>
                </div>

                <div className="step-list">
                    {currentTask.steps && currentTask.steps.length > 0 ? (
                        currentTask.steps.map((step, index) => (
                            <div key={index} className={`step-item ${step.completed ? 'completed-task' : ''}`}>
                                <input
                                    type='checkbox'
                                    id={`step-${index}`}
                                    checked={step.completed}
                                    onChange={() => handleToggleStep(index)}
                                    />
                                {isEditingStepName === index ? (
                                    <input
                                        type="text"
                                        value={editedStepNames[index]}
                                        onChange={(e) => {
                                            const newStepNames = [...editedStepNames];
                                            newStepNames[index] = e.target.value;
                                            setEditedStepNames(newStepNames);
                                        }}
                                        onKeyDown={(e) => handleEditStepName(index, e)}
                                        onBlur={() => setIsEditingStepName(-1)}
                                        style={{ marginLeft: '10px' }}
                                    />
                                ) : (
                                    <label
                                        htmlFor={`step-${index}`}
                                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => setIsEditingStepName(index)}
                                    >
                                        {step.name}
                                    </label>
                                )}
                                <i 
                                    className="fa-solid fa-trash" 
                                    style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                    onClick={() => handleDeleteStep(index)}
                                ></i>
                            </div>
                        ))) : (
                            <p>No steps added yet.</p>
                        )}
                </div>

                <div className="step-container">
                    <i className="fa-solid fa-plus" onClick={handleAddStep}></i>
                    <input
                        type="text"
                        placeholder="Add a step"
                        value={newStep}
                        onChange={(e) => setNewStep(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleAddStep() : null}
                        />
                </div>
            </div>

            <div className="task-container-2" onClick={handleAddToMyDay} style={{ color: currentTask.myDay ? 'blue' : 'inherit' }}>
                {currentTask.myDay ? (
                    <>
                         <i className="fa-regular fa-sun sun"></i>
                        <span>Added to My Day</span>
                        <i className="fa-solid fa-xmark x"></i>
                    </>
                ): (
                    <>
                        <i className="fa-regular fa-sun sun" ></i>
                        <span>Add to My Day</span>
                    </>
                )} 
            </div>

            <div className="action-container">
                <div className="action-container-item">
                    <i className="fa-regular fa-bell" onClick={() => console.log("Remind me clicked")}></i> Remind Me
                </div>
                <div className="action-container-item">
                    {!isEditingDueDate ? (
                        <>
                            {!dueDate ? (
                                <span
                                    className="due-date-placeholder"
                                    onClick={handleDueDateClick}
                                >
                                    <i className="fa-regular fa-calendar-plus"></i>
                                    Set due date
                                </span>
                            ) : (
                                <span
                                    className="due-date-display"
                                    onClick={handleDueDateClick}
                                >
                                    <i className="fa-regular fa-calendar-plus"></i>
                                    {renderDueDate()}
                                </span>
                            )}
                        </>
                    ) : (
                        <input
                            type="date"
                            value={dueDate}
                            onChange={handleDueDateChange}
                            onBlur={handleBlur} 
                            autoFocus
                        />
                    )}
                </div>
                <div className="action-container-item" onClick={() => setShowRepeatOptions(!showRepeatOptions)}>
                    <i className="fa-solid fa-repeat repeat"></i> {currentTask.repeat || 'Repeat'}
                </div>
                {renderRepeatOptions()}
            </div>

            <div className="file-container">
            {currentTask.files && currentTask.files.length > 0 && (
                <div className="file-list">
                    <ul>
                        {currentTask.files.map((file, index) => (
                            <li key={index} className="file-item">
                                <a 
                                    href={URL.createObjectURL(file)} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >{file.name}</a>
                                <i 
                                    className="fa fa-trash" 
                                    onClick={() => handleDeleteFile(index)} 
                                ></i>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
                <input type="file" onChange={handleAddFile} />
            </div>


            <div className="task-container">
                <textarea placeholder="Add note" value={note} onChange={handleNoteChange}></textarea>
            </div>

            <div className="delete-task-container" onClick={handleDeleteTask} style={{marginTop: '50px', cursor: 'pointer', color: 'red', position: 'sticky', bottom: '0'}}>
                <i className="fa-solid fa-trash" style={{marginRight: '5px'}}></i> Delete Task
            </div>
        </div>
    );
};

export default TaskDetails;
