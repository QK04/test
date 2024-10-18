import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import React from "react";
import Login from "./components/login.js";
import Register from './components/register.js';
import Home from './components/home.js';
import './App.css';
import { TaskProvider } from './context/TaskContext.js';
import ForgotPassword from './components/forgotPassword.js';
import Profile from './components/profile.js';
import Settings from './components/settings.js';
import { ProfileProvider } from './context/ProfileContext.js';


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Navigate to="/login" replace/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route 
      path="/profile" 
      element={
        <ProfileProvider>
          <Profile />
        </ProfileProvider>
      } 
    />
    <Route 
      path="/settings" 
      element={
        <ProfileProvider>
          <Settings />
        </ProfileProvider>
      } 
    />
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
