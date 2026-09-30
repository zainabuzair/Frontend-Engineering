import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm">Project status and summary architecture overview.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Projects</span>
          <p className="text-3xl font-extrabold text-slate-800 mt-2">12</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Tasks</span>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">28</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completion Rate</span>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">84%</p>
        </div>
      </div>
    </div>
  );
};