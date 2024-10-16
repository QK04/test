import { React, useContext, createContext, useState } from 'react';

// Create a context
const TaskContext = createContext();

// Create a context provider
export const TaskProvider = ({children}) => {
    const[tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    // Adding task to everything
    // const addTask = (task) => {
    //     if(task.trim()) {
    //         setTasks([...tasks, 
    //             {
    //                 id: Date.now(), 
    //                 name: task, 
    //                 completed: false, 
    //                 bookmarked: false, 
    //                 steps: [],
    //                 myDay: false,
    //             }])
    //     }
    // }
    const addTask = (task, dueDate = null) => {
        if(task.trim()) {
            setTasks([...tasks, 
                {
                    id: Date.now(), 
                    name: task, 
                    completed: false, 
                    bookmarked: false, 
                    steps: [],
                    myDay: false,
                    dueDate,
                }])
        }
    }
    // Adding task to Important
    const addImportantTask = (task) => {
        if(task.trim()){
            setTasks([...bookmarkedTasks, 
                {
                    id: Date.now(), 
                    name: task, 
                    completed: false, 
                    bookmarked: true, 
                    steps: [],
                    myDay: false
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
    const openTaskDetails = (task) => {
        if (selectedTask && selectedTask === task) {
          closeTaskDetails();
        } else {
          setSelectedTask(task);
          const myDayContainer = document.querySelector('.my-day-container');
          const taskDetailsSection = document.querySelector('.task-details-section');
      
          if (myDayContainer && taskDetailsSection) {
              myDayContainer.classList.add('shifted');
              taskDetailsSection.classList.add('active');
          } else {
              console.error('Element not found: myDayContainer or taskDetailsSection');
          }
        }  
      };

    // Close the Pop Up Task Details
    const closeTaskDetails = () => {
        setSelectedTask(null);
        const myDayContainer = document.querySelector('.my-day-container');
        const taskDetailsSection = document.querySelector('.task-details-section');
    
        if (myDayContainer && taskDetailsSection) {
            myDayContainer.classList.remove('shifted'); 
            taskDetailsSection.classList.remove('active'); 
        } else {
            console.error('Element not found: myDayContainer or taskDetailsSection');
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

    // Get list of bookmarked tasks
    const bookmarkedTasks = tasks.filter(task => task.bookmarked);

    return(
        <TaskContext.Provider 
        value={{
                tasks, 
                selectedTask , 
                bookmarkedTasks, 
                addTask,
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
                setDueDate, 
                setRepeat,
                toggleTask, 
                toggleBookmark, 
                updateTaskName, 
                updateStepName 
                }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
}

