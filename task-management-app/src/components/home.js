import React from "react";
import '../css/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header>
        <div className="menu-icon" id="menu-icon">
          <i className="fas fa-bars"></i>
        </div>

        <div className="logo">
          <img 
          src="/Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi.png" 
          alt="Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi" />
          <span>Task Management</span>
        </div>

        <div className="account" id="account-menu">
          <i className="fas fa-user"></i>
          <div className="dropdown-content">
            <a href="#"><i className="fa-solid fa-user-ninja"></i>Account</a>
            <a href="#"><i className="fa-solid fa-gear"></i> Settings</a>
            <a href="#" className="logout"><i className="fa-solid fa-right-from-bracket"></i>Logout</a>
          </div>
        </div>
      </header>

      <div className="navbar" id="navbar">
        <a href="#" data-target="dashboard"><i className="fas fa-tachometer-alt"></i>Dashboard</a>
        <a href="#" data-target="completed"><i className="fas fa-check-circle"></i>Completed Tasks</a>
        <a href="#" data-target="pending"><i className="fas fa-hourglass-half"></i>Pending Tasks</a>
        <a href="#" data-target="in-progress"><i className="fas fa-tasks"></i>In Progress Tasks</a>
        <a href="#" data-target="deployed"><i className="fas fa-cloud-upload-alt"></i>Deployed Tasks</a>
        <a href="#" data-target="deferred"><i className="fas fa-pause-circle"></i>Deferred Tasks</a>
        <a href="#" data-target="add-new"><i className="fas fa-plus-circle"></i>Add New Tasks</a>
        <a href="#" data-target="task-stats"><i className="fas fa-chart-bar"></i>Task Stats</a>
      </div>

      <div className="content">
        <div className="content-inner">
          <h2 id="content-title">Task Management System</h2>
          <p id="content-description">Chọn một mục từ navigation bar bên trái để bắt đầu.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
