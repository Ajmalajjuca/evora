import React from 'react';

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[var(--text-light)] text-sm">{label}</p>
        <p className="text-3xl font-semibold text-[var(--text)]">{value}</p>
      </div>
      <div className="p-3 bg-[var(--primary)]/10 rounded-full">
        <Icon className="w-6 h-6 text-[var(--primary)]" />
      </div>
    </div>
  </div>
);

export default StatCard;
