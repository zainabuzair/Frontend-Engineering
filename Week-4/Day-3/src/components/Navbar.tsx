import React from "react";
import { Sun, Moon, LayoutDashboard, Search, Bell } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-md shadow-indigo-500/20">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
            DevPulse UI
          </span>
        </div>

        {/* Search Input Utility */}
        <div className="hidden md:flex items-center relative w-64 lg:w-96">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, metrics..."
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Actions & Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            aria-label="Notifications"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:ring-2 hover:ring-indigo-500 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>
      </div>
    </nav>
  );
};