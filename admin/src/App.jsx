import React, { use, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import UsersPage from './pages/UsersPage';
import { getAllEvents }  from './Service/eventService';
import { getAllUsers } from './Service/userService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('admin') !== null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () =>{
    setIsAuthenticated(false);
    localStorage.removeItem('admin');
    localStorage.removeItem('accessToken');
  }

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      console.log('response>>>',response);
      const data = response.data;
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log('response>>>',response);
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
      fetchUsers();
    }
  }, [isAuthenticated]);
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-[#8B6F47]">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar setIsOpen={setSidebarOpen} onLogout={handleLogout} />

          <main className="flex-1 overflow-y-auto bg-[#8B6F47]">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard events={events} users={users} />} />
              <Route path="/events" element={<EventsPage events={events} setEvents={setEvents} />} />
              <Route path="/users" element={<UsersPage users={users} setUsers={setUsers} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
