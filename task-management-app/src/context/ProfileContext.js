// ProfileContext.js
import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        name: "Example Name",
        email: "user@example.com",
        avatar: "/Logo-Truong-Dai-hoc-Khoa-hoc-va-Cong-nghe-Ha-Noi.png",
    });

    const updateProfileData = (newData) => {
        setProfileData(prevData => ({
            ...prevData,
            ...newData
        }));
    };

    return (
        <ProfileContext.Provider value={{ profileData, setProfileData, updateProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};
