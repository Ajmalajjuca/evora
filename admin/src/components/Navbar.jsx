import React, { useState } from 'react';
import { Menu, LogOut, Bell, Search, Settings, User } from 'lucide-react';

const Navbar = ({ setIsOpen, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-black border-b border-zinc-800 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-full">
        {/* Left Section - Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search Icon for Mobile */}
          <button className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
              {/* Notification Badge */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-900"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
                <div className="p-4 border-b border-zinc-800">
                  <h3 className="text-white font-semibold">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[
                    { title: 'New user registered', time: '2 min ago', unread: true },
                    { title: 'Event "Tech Conference" updated', time: '1 hour ago', unread: true },
                    { title: 'New event created', time: '3 hours ago', unread: false }
                  ].map((notif, index) => (
                    <div key={index} className="p-4 hover:bg-white/5 transition-colors border-b border-zinc-800/50 last:border-b-0">
                      <div className="flex items-start gap-3">
                        {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                        <div className="flex-1">
                          <p className="text-white text-sm">{notif.title}</p>
                          <p className="text-zinc-500 text-xs mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-zinc-800 text-center">
                  <button className="text-zinc-400 text-sm hover:text-white transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden sm:block">
            <Settings className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-zinc-800 hidden sm:block"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer hidden sm:flex">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden lg:block">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-zinc-500 text-xs">Administrator</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-100 transition-all transform hover:scale-105 active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
