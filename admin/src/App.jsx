import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Messages from './pages/Messages';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import Login from './pages/Login';
import { backendUrl } from './config';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Early ping to wake up the Render backend from cold sleep
  useEffect(() => {
    fetch(`${backendUrl}/api/health`).catch(() => {});
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch(`${backendUrl}/api/admin/verify`, {
            headers: { token }
          });
          const data = await response.json();
          if (!data.success) {
            setToken('');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error("Auth_Verification_Error:", error);
          setToken('');
          localStorage.removeItem('token');
        }
      }
    };
    verifyToken();
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <BrowserRouter>
      <div className='bg-[#050505] min-h-screen font-sans text-white'>
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <Routes>
            <Route path="/" element={<AdminLayout setToken={setToken} />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/add" element={<AddProject />} />
              <Route path="projects/edit/:id" element={<EditProject />} />
              <Route path="messages" element={<Messages />} />
            </Route>
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;