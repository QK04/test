import React, { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { post } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

function ChooseRole() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Lấy thông tin người dùng từ Cognito
        const currentUser = await getCurrentUser();
        const userId = currentUser.attributes.sub;  // user_id (sub trong Cognito)
        const email = currentUser.attributes.email; // Email của người dùng

        console.log('User ID:', userId);
        console.log('Email:', email);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleRoleSelection = async () => {
    try {
        const currentUser = await getCurrentUser();
        const token = currentUser.signInUserSession.idToken.jwtToken;
        const userId = currentUser.attributes.sub;

        console.log('idToken: ', token)

        const myAPI = 'role';
        const path = '/save-role';
        const requestBody = { userId, role };
        const response = await post(myAPI, path, {
            body: requestBody,
            headers: {
                Authorization: token,
            }
        });

        console.log('POST response: ', response);

        // Chuyển hướng tới trang tương ứng với vai trò
        if (role === 'Teacher') {
            navigate('/teacher-dashboard');
        } else if (role === 'Student') {
            navigate('/student-dashboard');
        }
        } catch (error) {
        console.error('Error saving role:', error);
        }
    };

  return (
    <div>
      <h2>Choose your role</h2>
      <button onClick={() => setRole('Teacher')}>Teacher</button>
      <button onClick={() => setRole('Student')}>Student</button>
      {role && <button onClick={handleRoleSelection}>Confirm</button>}
    </div>
  );
}

export default ChooseRole;
