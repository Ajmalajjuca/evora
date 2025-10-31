import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import UsersPage from './pages/UsersPage';
import { initialEvents, initialUsers } from './data/initialData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [users, setUsers] = useState(initialUsers);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

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
