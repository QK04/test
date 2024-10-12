import React, { useRef } from "react";
import '../css/home.css';

function Home(){
  // Create a reference for navbar
  const navRef = useRef(null);

  const toggleNavBar = () => {
    if(navRef.current){
      navRef.current.classList.toggle('show');
    }
  };

  return (
    <div className="home-page">
      <header>
        <div className="menu-icon" id="menu-icon" onClick={toggleNavBar}>
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

      <div className="navbar" ref={navRef}>
        <div className="search-container">
          <input 
            type="text"
            placeholder="Search"
            className="search-bar"
          />
          <i class="fa-solid fa-magnifying-glass search-icon"></i>  
        </div>
        <a href="#" ><i class="fa-regular fa-sun"></i>My Day</a>
        <a href="#" ><i class="fa-regular fa-star"></i>Important</a>
        <a href="#" ><i class="fa-solid fa-pen"></i>Planned</a>
        <a href="#" ><i class="fa-solid fa-house"></i>Tasks</a>
        <div className="divider-line"></div>
        <div className="new-section">
          <a href="#" data-target="new-list"><i className="fas fa-plus"></i>New list</a>
          <a href="#" data-target="new-group"><i className="fas fa-copy"></i>New Group</a>
        </div>
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
