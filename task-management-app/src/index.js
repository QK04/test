import React from 'react';
import ReactDOM from 'react-dom/client';  // Lưu ý import từ 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';  // Đảm bảo đường dẫn chính xác tới App

const root = ReactDOM.createRoot(document.getElementById('root'));  // Tạo root mới
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
