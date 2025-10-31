import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const UserTable = ({ users, onEdit, onDelete }) => (
  <div className="bg-[#F5EFE6] rounded-lg border-2 border-[#8B6F47] overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#8B6F47] text-[#F5EFE6]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Events</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#8B6F47]">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-[#8B6F47]/10 transition">
              <td className="px-6 py-4 text-[#2C1810] font-medium">{user.name}</td>
              <td className="px-6 py-4 text-[#8B6F47]">{user.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === 'Admin' ? 'bg-[#2C1810] text-[#F5EFE6]' : 'bg-[#8B6F47] text-[#F5EFE6]'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-[#2C1810]">{user.joined}</td>
              <td className="px-6 py-4 text-[#2C1810]">{user.eventsAttended}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 bg-[#8B6F47] text-[#F5EFE6] rounded hover:bg-[#2C1810] transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;
