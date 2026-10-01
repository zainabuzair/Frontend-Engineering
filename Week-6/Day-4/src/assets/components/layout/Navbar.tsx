import React from 'react';
import { Bell, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-slate-800">Architecture Workspace</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
            <User className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-slate-700 leading-none">Developer Intern</p>
            <p className="text-xs text-slate-400 mt-1">Week 6: Day 1 Setup</p>
          </div>
        </div>
      </div>
    </header>
  );
};