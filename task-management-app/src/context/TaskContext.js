import { React, useContext, createContext, useState } from 'react';

// Create a context
const TaskContext = createContext();

// Create a context provider
export const TaskProvider = ({children}) => {
    const[tasks, setTasks] = useState([]);

    // Adding task for MyDay
    const addTask = (task) => {
        if(task.trim()) {
            setTasks([...tasks, {id: Date.now(), name: task, completed: task.completed, bookmarked: task.bookmarked}])
        }
    }

    // Adding task for Important
    const addImportantTask = (task) => {
        if(task.trim()){
            setTasks([...bookmarkedTasks, {id: Date.now(), name: task, completed: task.completed, bookmarked: true}])
        }
    }

    // Toggling task 
    const toggleTask = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => 
                task.id === taskId ? { ...task, completed: !task.completed} : task
            )
        );
    };

    // Toggling bookmark
    const toggleBookmark = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => 
                task.id === taskId ? { ...task, bookmarked: !task.bookmarked } : task
            )
        );
    };

    // Adding task to MyDay page
    const addMyDay = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => 
                task.id === taskId ? {...task, myDay: !task.myDay} : task
            )
        );
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

    // Adding repeat schedule option for tasks 
    const setRepeat = (taskId, repeat) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => 
                task.id === taskId ? {...task, repeat} : task
            )
        );
    };


    // Get list of bookmarked tasks
    const bookmarkedTasks = tasks.filter(task => task.bookmarked);

    return(
        <TaskContext.Provider value={{tasks, addTask, addImportantTask, addMyDay, addStep, setDueDate, setRepeat, toggleTask, toggleBookmark, bookmarkedTasks}}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
}

