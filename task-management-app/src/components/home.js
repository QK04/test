import React, { useRef, useState } from "react";
import MyDay from "./MyDay";
import '../css/home.css';
import { Link } from "react-router-dom";

function Home() {
  // Create a reference for navbar
  const navRef = useRef(null);
  const [isShifted, setIsShifted] = useState(false);
  const [content, setContent] = useState("");

  const toggleNavBar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle('show');
      setIsShifted((prevIsShifted) => !prevIsShifted);
    }
  };

  // Switch content of the main-content page
  const renderContentPage = () => {
    switch (content) {
      case 'My Day':
        return <MyDay />;
      default:
        return <h2>Welcome to Task Management</h2>;
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
            alt="Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi" 
          />
          <span>Task Management</span>
        </div>

        <div className="account" id="account-menu">
          <i className="fas fa-user"></i>
          <div className="dropdown-content">
            <Link to="#"><i className="fa-solid fa-user-ninja"></i>Account</Link>
            <Link to="#"><i className="fa-solid fa-gear"></i>Settings</Link>
            <Link to="#" className="logout"><i className="fa-solid fa-right-from-bracket"></i>Logout</Link>
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
          <i className="fa-solid fa-magnifying-glass search-icon"></i>  
        </div>
        <Link to="#" onClick={() => { setContent('My Day'); toggleNavBar(); }}>
          <i className="fa-regular fa-sun"></i>My Day
        </Link>
        <Link to="#" onClick={() => { setContent('Important'); toggleNavBar(); }}>
          <i className="fa-regular fa-star"></i>Important
        </Link>
        <Link to="#" onClick={() => { setContent('Planned'); toggleNavBar(); }}>
          <i className="fa-solid fa-pen"></i>Planned
        </Link>
        <Link to="#" onClick={() => { setContent('Tasks'); toggleNavBar(); }}>
          <i className="fa-solid fa-house"></i>Tasks
        </Link>
        <div className="divider-line"></div>
        <div className="new-section">
          <Link to="#" data-target="new-list"><i className="fas fa-plus"></i>New list</Link>
          <Link to="#" data-target="new-group"><i className="fas fa-copy"></i>New Group</Link>
        </div>
      </div>

      <div className={`content ${isShifted ? 'shift-right' : ''}`}>
        {renderContentPage()}
      </div>
    </div>
  );
}

export default Home;
