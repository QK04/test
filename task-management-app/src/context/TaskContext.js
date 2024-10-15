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

    // Get list of bookmarked tasks
    const bookmarkedTasks = tasks.filter(task => task.bookmarked);

    return(
        <TaskContext.Provider value={{tasks, addTask, addImportantTask, toggleTask, toggleBookmark, bookmarkedTasks}}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return useContext(TaskContext);
}

