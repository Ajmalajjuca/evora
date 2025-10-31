import React, { useState } from 'react';
import { Plus, X, User, Mail, Shield, Calendar, Trophy, Search, Filter, Edit, Trash2, MoreVertical } from 'lucide-react';

// User Table Component
const UserTable = ({ users, onEdit, onDelete }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
        <div className="text-zinc-400 text-sm font-medium">User</div>
        <div className="text-zinc-400 text-sm font-medium">Email</div>
        <div className="text-zinc-400 text-sm font-medium">Role</div>
        <div className="text-zinc-400 text-sm font-medium">Joined</div>
        <div className="text-zinc-400 text-sm font-medium">Events</div>
        <div className="text-zinc-400 text-sm font-medium text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-zinc-800">
        {users.map((user) => (
          <div
            key={user.id}
            onMouseEnter={() => setHoveredRow(user.id)}
            onMouseLeave={() => setHoveredRow(null)}
            className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-white/5 transition-colors group"
          >
            {/* User */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">{user.name}</span>
            </div>

            {/* Email */}
            <div className="flex items-center">
              <span className="text-zinc-400 text-sm">{user.email}</span>
            </div>

            {/* Role */}
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                user.role === 'Admin'
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {user.role}
              </span>
            </div>

            {/* Joined */}
            <div className="flex items-center">
              <span className="text-zinc-400 text-sm">{user.joined}</span>
            </div>

            {/* Events Attended */}
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">{user.eventsAttended}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => onEdit(user)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <Edit className="w-4 h-4 text-zinc-400 hover:text-white" />
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4 text-zinc-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500">No users found</p>
        </div>
      )}
    </div>
  );
};

// Main Users Page Component
const UsersPage = ({ users = [], setUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    joined: '',
    eventsAttended: ''
  });

  // Mock users if none provided
  const mockUsers = users.length > 0 ? users : [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', joined: 'Jan 2024', eventsAttended: 12 },
    { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', role: 'User', joined: 'Feb 2024', eventsAttended: 8 },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'User', joined: 'Mar 2024', eventsAttended: 15 },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', joined: 'Jan 2024', eventsAttended: 20 },
    { id: '5', name: 'Chris Wilson', email: 'chris@example.com', role: 'User', joined: 'Apr 2024', eventsAttended: 5 }
  ];

  const displayUsers = users.length > 0 ? users : mockUsers;

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      if (setUsers) {
        setUsers(displayUsers.filter(u => u.id !== id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setUsers) {
      if (editingUser) {
        setUsers(displayUsers.map(u => u.id === editingUser.id ? { ...formData, id: u.id } : u));
      } else {
        setUsers([...displayUsers, { ...formData, id: Date.now().toString() }]);
      }
    }
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'User', joined: '', eventsAttended: '' });
  };

  const filteredUsers = displayUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalUsers = displayUsers.length;
  const adminCount = displayUsers.filter(u => u.role === 'Admin').length;
  const totalEvents = displayUsers.reduce((sum, u) => sum + u.eventsAttended, 0);

  return (
    <div className="min-h-screen bg-black p-6 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-5 animate-float"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
            <p className="text-zinc-400">Manage users and their permissions</p>
          </div>
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: '', email: '', role: 'User', joined: '', eventsAttended: '' });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-100 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Administrators</p>
                <p className="text-2xl font-bold text-white">{adminCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Total Attendance</p>
                <p className="text-2xl font-bold text-white">{totalEvents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search users by name, email or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl text-white hover:bg-zinc-800 transition-all flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* User Table */}
        <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-zinc-900 rounded-2xl w-full max-w-md overflow-hidden border border-zinc-800 shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="text-2xl font-bold text-white">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    required
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <Shield className="w-4 h-4" />
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-zinc-600 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Joined */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    Joined Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Jan 2024"
                    value={formData.joined}
                    onChange={e => setFormData({...formData, joined: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    required
                  />
                </div>

                {/* Events Attended */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <Trophy className="w-4 h-4" />
                    Events Attended
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.eventsAttended}
                    onChange={e => setFormData({...formData, eventsAttended: parseInt(e.target.value) || ''})}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:bg-zinc-100 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {editingUser ? 'Update User' : 'Create User'}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-semibold hover:bg-zinc-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UsersPage;
