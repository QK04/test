import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import React from "react";
import Login from "./components/login.js";
import Register from './components/register.js';
import Home from './components/home.js';
import './App.css';
import { TaskProvider } from './context/TaskContext.js';


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Navigate to="/login" replace/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>} />
    <Route path="/home" element={<Home/>} />
  </>
))
function App() {
  return (
    <>
      <TaskProvider>
        <RouterProvider router={router}/>
      </TaskProvider>
    </>    
  );
}

export default App;
