import React from "react";
import "../css/settings.css"; // Make sure the path is correct
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

const Settings = () => {
    const { profileData, updateProfileData } = useProfile();
    const navigate = useNavigate();
    
    const handleLogOut = async (e) => {
        e.preventDefault();
        try{
            navigate("/login")
        } catch(e){
            console.log("There is some unexpected error happened", e);
        }
    }

  return (
    <div className="settings-page">
        <header className="settings-header">
            <Link to="/home" className="home-btn">
                <i className="fas fa-home"></i> 
            </Link>
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
                        <Link to="/profile"><i className="fa-solid fa-user-ninja"></i>Account</Link>
                        <Link to="/settings"><i className="fa-solid fa-gear"></i>Settings</Link>
                        <Link to="/login" className="logout"><i className="fa-solid fa-right-from-bracket"></i>Logout</Link>
                    </div>
            </div>
        </header>
        <div className="settings-container">
            <div className="profile-section">
                <img 
                    src={profileData.avatar} 
                    alt="Profile Pics" 
                    className="profile-picture" 
                />
                <div className="profile-details">
                    <h2>{profileData.name}</h2>
                    <p>{profileData.email}</p>
                </div>
                <div className="profile-actions">
                    <button className="manage-account-btn">Manage account</button>
                    <button className="sign-out-btn" onClick={handleLogOut}>Sign out</button>
                </div>
            </div>

            <div className="settings-section">
                <h3>General</h3>

                <div className="setting-item">
                <label htmlFor="add-tasks-top">Add new tasks on top</label>
                <input type="checkbox" id="add-tasks-top" defaultChecked />
                </div>

                <div className="setting-item">
                <label htmlFor="move-starred-tasks">Move starred tasks to top</label>
                <input type="checkbox" id="move-starred-tasks" defaultChecked />
                </div>

                <div className="setting-item">
                <label htmlFor="play-sound">Play completion sound</label>
                <input type="checkbox" id="play-sound" defaultChecked />
                </div>

                <div className="setting-item">
                <label htmlFor="confirm-delete">Confirm before deleting</label>
                <input type="checkbox" id="confirm-delete" defaultChecked />
                </div>

                <div className="setting-item">
                <label htmlFor="week-start">Start of the Week</label>
                <select id="week-start">
                    <option value="system">System default</option>
                    <option value="monday">Monday</option>
                    <option value="sunday">Sunday</option>
                </select>
                </div>

                <div className="setting-item">
                <label htmlFor="app-badge">App Badge</label>
                <select id="app-badge">
                    <option value="due-overdue">Due today and overdue</option>
                    <option value="all-tasks">All tasks</option>
                </select>
                </div>

                <div className="setting-item">
                <label htmlFor="recognize-dates">Recognize dates and times in task titles</label>
                <input type="checkbox" id="recognize-dates" defaultChecked />
                </div>

                <div className="setting-item">
                <label htmlFor="remove-dates">Remove dates and times once recognized</label>
                <input type="checkbox" id="remove-dates" />
                </div>

            </div>

            {/* Theme Section */}
            <div className="settings-section">
                <h3>Theme</h3>
                <div className="setting-item">
                <label htmlFor="theme-light">Light theme</label>
                <input type="radio" id="theme-light" name="theme" value="light" />
                </div>
                <div className="setting-item">
                <label htmlFor="theme-dark">Dark theme</label>
                <input type="radio" id="theme-dark" name="theme" value="dark" />
                </div>
                <div className="setting-item">
                <label htmlFor="theme-default">Use my Windows theme</label>
                <input type="radio" id="theme-default" name="theme" value="default" defaultChecked />
                </div>
            </div>

            {/* Smart Lists Section */}
            <div className="settings-section">
                <h3>Smart lists</h3>
                <div className="setting-item">
                <label htmlFor="smart-important">Important</label>
                <input type="checkbox" id="smart-important" defaultChecked />
                </div>
                <div className="setting-item">
                <label htmlFor="smart-planned">Planned</label>
                <input type="checkbox" id="smart-planned" defaultChecked />
                </div>
                <div className="setting-item">
                <label htmlFor="smart-completed">Completed</label>
                <input type="checkbox" id="smart-completed" />
                </div>
                <div className="setting-item">
                <label htmlFor="smart-all">All</label>
                <input type="checkbox" id="smart-all" />
                </div>
            </div>

            {/* Notifications Section */}
            <div className="settings-section">
                <h3>Notifications</h3>
                <div className="setting-item">
                <label htmlFor="Reminder">Reminder</label>
                <input type="checkbox" id="Reminder" defaultChecked />
                </div>
                <div className="setting-item">
                <label htmlFor="Shared-list-activity">Shared list activity</label>
                <input type="checkbox" id="Shared-list-activity" defaultChecked />
                </div>
            </div>

            {/* Help & Feedback Section */}
            <div className="settings-section">
                <h3>Help & feedback</h3>
                <div className="help-links">
                <Link to="#">Get support</Link>
                <Link to="#">Suggest a feature</Link>
                <Link to="#">Rate us</Link>
                </div>
                <button className="sync-btn">Sync</button>
            </div>
        </div>
    </div>
  );
};

export default Settings;
