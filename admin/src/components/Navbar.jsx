import React, { useState } from 'react';
import { Menu, LogOut, Bell, Search, Settings, User } from 'lucide-react';

const Navbar = ({ setIsOpen, onLogout }) => {
  const user = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;

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


        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Divider */}
          <div className="w-px h-6 bg-zinc-800 hidden sm:block"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer hidden sm:flex">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden lg:block">
              <p className="text-white text-sm font-medium">{user.name}</p>
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
