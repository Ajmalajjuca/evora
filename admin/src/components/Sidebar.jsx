import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Calendar, Users, X, Shield, Activity } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: Calendar, label: 'Events', path: '/events', badge: '12' },
    { icon: Users, label: 'Users', path: '/users', badge: '48' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EventAdmin</h1>
              <div className="flex items-center gap-1 mt-0.5">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="text-xs text-zinc-400">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Menu</p>
          </div>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-white text-black shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-black' : 'text-zinc-400 group-hover:text-white'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-lg ${
                    isActive
                      ? 'bg-black/10 text-black'
                      : 'bg-white/10 text-zinc-400 group-hover:bg-white/20 group-hover:text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>



        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
      </aside>
    </>
  );
};

export default Sidebar;
