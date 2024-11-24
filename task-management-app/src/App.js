import React, { useEffect, useCallback } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser  } from 'aws-amplify/auth';
import { get } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);


function App({ signOut, user }) {
  const navigate = useNavigate();

  const checkIfFirstLogin = useCallback(async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: `, signInDetails);

      const myAPI = 'role'
      const path = '/get-user-role'
      console.log(`API Name: ${myAPI}`);
      console.log(`API Path: ${path}`);
      console.log(`Full URL: ${myAPI}${path}/${userId}`);
      // Kiểm tra nếu người dùng đã chọn vai trò trước đó
      const response = await get(`${myAPI}${path}/${userId}`);
      console.log('GET call succeeded: ', response);
      if (response.role) {
        // Nếu đã có vai trò, chuyển tới trang tương ứng
        if (response.role === 'Teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        // Nếu chưa có vai trò, chuyển tới trang chọn vai trò
        navigate('/choose-role');
      }
    } catch (error) {
      console.error('Error checking first login:', error);
      if (error.response) {
        console.error('API Error Response:', error.response);
      } else if (error.request) {
        console.error('API Error Request:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
    }
  }, [navigate]);

  useEffect(() => {
    checkIfFirstLogin();
  }, [checkIfFirstLogin]);

  return (
    <div>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App);
