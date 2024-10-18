
import { Link } from "react-router-dom";
import "../css/profile.css"
import{ useTasks } from "../context/TaskContext";
import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";

const Profile = () => {
    const { tasks, bookmarkedTasks } = useTasks();
    const { profileData, updateProfileData } = useProfile();


    // Filter tasks by categories
    const myDayTasks = tasks.filter(task => task.myDay);
    const importantTasks = bookmarkedTasks;
    const plannedTasks = tasks.filter(task => task.dueDate);
    const allTasks = tasks.length;

    // Enable the Edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [newProfileData, setNewProfileData] = useState(profileData);
    const [newAvatar, setNewAvatar] = useState(null);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProfileData({ ...profileData, [name]: value });
    };
    
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setNewAvatar(URL.createObjectURL(file)); // Preview image
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newAvatar) {
            updateProfileData({ ...newProfileData, avatar: newAvatar });
        } else {
            updateProfileData(newProfileData);
        }
        setIsEditing(false);
    };

    useEffect(() => {
        setNewProfileData(profileData);
    }, [profileData])
    
    return (
        <div className="profile-page">
            <header>
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

            <div className="main-content">
                <div className="profile-container">
                    <div className="profile-header">
                        <img
                            src={newAvatar || profileData.avatar}
                            alt="User Avatar"
                            className="profile-avatar"
                        />
                        <div className="profile-info">
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="edit-profile-form">
                                    <input
                                        type="text"
                                        name="name"
                                        value={newProfileData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={newProfileData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                    />
                                    <label htmlFor="avatar-upload" className="avatar-upload-label">
                                        Change Profile Image:
                                        <input
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        />
                                    </label>
                                    <button type="submit" className="save-profile-btn">
                                        Save Changes
                                    </button>
                                </form>
                            ): (
                                <>
                                    <h1>{profileData.name}</h1>
                                    <p>Email: {profileData.email}</p>
                                    <button className="edit-profile-btn" onClick={toggleEditMode}>
                                        <i className="fas fa-edit" /> Edit Profile
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="profile-details">
                        <h2>About me</h2>
                        <div className="profile-about">
                            <p>
                                <strong>Name:</strong> {profileData.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {profileData.email}
                            </p>
                        </div>
                        <h2>Task Overview</h2>
                        <div className="task-stats">
                            <div className="task-stat">
                                <h3>My Day Tasks</h3>
                                <p>{myDayTasks.length}</p>
                            </div>
                            <div className="task-stat">
                                <h3>Important Tasks</h3>
                                <p>{importantTasks.length}</p>
                            </div>
                            <div className="task-stat">
                                <h3>Planned Tasks</h3>
                                <p>{plannedTasks.length}</p>
                            </div>
                            <div className="task-stat">
                                <h3>All Tasks</h3>
                                <p>{allTasks}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;