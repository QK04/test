import { React, useContext, createContext, useState } from 'react';

// Create a context
const TaskContext = createContext();

// Create a context provider
export const TaskProvider = ({children}) => {
    const[tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const addTask = (task, dueDate = null, files=[], note="") => {
        if(task.trim()) {
            const formatDueDate = dueDate ? new Date(dueDate).toISOString() : null;
            setTasks([...tasks, 
                {
                    id: Date.now(), 
                    name: task, 
                    completed: false, 
                    bookmarked: false, 
                    steps: [],
                    myDay: false,
                    dueDate: formatDueDate,
                    files,
                    note,
                }])
        }
    }
    // Adding task to Important
    const addImportantTask = (task, dueDate = null, files=[], note="") => {
        if(task.trim()){
            setTasks([...bookmarkedTasks, 
                {
                    id: Date.now(), 
                    name: task, 
                    completed: false, 
                    bookmarked: true, 
                    steps: [],
                    myDay: false,
                    dueDate,
                    files,
                    note,
                }])
        }
    }

    // Add a task to My Day
    const addMyDay = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map( task => 
                task.id === taskId ? {...task, myDay: true} : task
            )
        );
    };

    // Toggle the My Day state 
    const toggleMyDay = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, myDay: !task.myDay } : task
            )
        );
    };

    // Toggling task 
    const toggleTask = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => 
                task.id === taskId ? { ...task, completed: !task.completed} : task
            )
        );
    };

    // Deleting task 
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    // Toggling bookmark
    const toggleBookmark = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => 
                task.id === taskId ? { ...task, bookmarked: !task.bookmarked } : task
            )
        );
    };

    // Pop up the Task Details
    const openTaskDetails = (task, containerClass, detailsClass) => {
        if (selectedTask && selectedTask === task) {
          return;
        } 

          setSelectedTask(task);
          const myDayContainer = document.querySelector(`.${containerClass}`);
          const taskDetailsSection = document.querySelector(`.${detailsClass}`);
      
          if (myDayContainer && taskDetailsSection) {
              myDayContainer.classList.add('shifted');
              taskDetailsSection.classList.add('active');
          } else {
              console.error(`Element not found: ${containerClass} or ${detailsClass}`);
          }
    
      };

    // Close the Pop Up Task Details
    const closeTaskDetails = (containerClass, detailsClass) => {
        setSelectedTask(null);
        const container = document.querySelector(`.${containerClass}`);
        const detailsSection = document.querySelector(`.${detailsClass}`);
      
        if (container && detailsSection) {
          container.classList.remove('shifted'); 
          detailsSection.classList.remove('active'); 
        } else {
          console.error(`Element not found: ${containerClass} or ${detailsClass}`);
        }
      };

    // Adding due date for tasks
    const setDueDate = (taskId, dueDate) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => 
                task.id === taskId ? {...task, dueDate} : task
            )
        );
    };

    // Adding subtasks for tasks
    const addStep = (taskId, step) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? {...task, steps: [...task.steps, {name: step, completed: false}]} : task
            )
        );
    };

    // Toggle step completed status
    const toggleStep = (taskId, stepIndex) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        steps: task.steps.map((step, index) =>
                            index === stepIndex ? { ...step, completed: !step.completed } : step
                        ),
                    }
                    : task
            )
        );
    };

    // Delete a step 
    const deleteStep = (taskId, stepIndex) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          steps: task.steps.filter((_, index) => index !== stepIndex),
                      }
                    : task
            )
        );
    };

    // Adding repeat schedule option for tasks 
    const setRepeat = (taskId, repeat) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => 
                task.id === taskId ? {...task, repeat: repeat} : task
            )
        );
    };

    // Handle editing the task's name
    const updateTaskName = (taskId, newName) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? {...task, name: newName } : task
            )
        );
    };

    // Handle editing the step's name
    const updateStepName = (taskId, stepIndex, newStepName) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === taskId ? {
                    ...task,
                    steps: task.steps.map((step, index) => 
                        index === stepIndex ? { ...step, name: newStepName } : step
                    )
                } : task
            )
        );
    };

    // Handle adding a file to a task
    const addFile = (taskId, file) => {
        setTasks(prevTasks => 
            prevTasks.map((task) => 
                task.id === taskId ? {...task, files: [...task.files, file]} : task
            )
        );
    };

    // Handle adding a note to a task
    const addNote = (taskId, note) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === taskId ? {...task, note} : task
            )
        );
    };

    // Handle calculating steps total and completed 
    const getStepsInfo = (steps = []) => {
        const stepsTotal = steps.length;
        const stepsCompleted = steps.filter(step => step.completed).length;
        return { stepsTotal, stepsCompleted }
    }
    // Get list of bookmarked tasks
    const bookmarkedTasks = tasks.filter(task => task.bookmarked);

    return(
        <TaskContext.Provider 
        value={{
                tasks, 
                selectedTask , 
                bookmarkedTasks, 
                addTask,
                addFile, 
                addNote,
                setTasks,
                deleteTask, 
                addImportantTask, 
                openTaskDetails, 
                closeTaskDetails, 
                addMyDay,
                toggleMyDay, 
                addStep, 
                toggleStep, 
                deleteStep,
                getStepsInfo, 
                setDueDate, 
                setRepeat,
                toggleTask, 
                toggleBookmark, 
                updateTaskName, 
                updateStepName, 
                }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
}

