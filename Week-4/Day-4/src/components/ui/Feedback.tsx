import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// --- Badge ---
export const Badge: React.FC<{ variant?: "success" | "warning" | "info" | "neutral"; children: React.ReactNode }> = ({
  variant = "neutral",
  children,
}) => {
  const styles = {
    success: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    info: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    neutral: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]}`}>{children}</span>;
};

// --- Alert ---
export const Alert: React.FC<{ type?: "info" | "success"; title: string; message: string }> = ({ type = "info", title, message }) => {
  return (
    <div className={`p-4 rounded-xl border flex gap-3 ${type === "success" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-100" : "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 text-indigo-900 dark:text-indigo-100"}`} role="alert">
      {type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />}
      <div>
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs mt-0.5 opacity-90">{message}</p>
      </div>
    </div>
  );
};

// --- Tabs ---
export const Tabs: React.FC<{ tabs: string[]; activeTab: string; onChange: (tab: string) => void }> = ({ tabs, activeTab, onChange }) => (
  <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`pb-2.5 px-3 text-sm font-medium transition-colors relative ${activeTab === tab ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
      >
        {tab}
        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />}
      </button>
    ))}
  </div>
);

// --- Loading Skeleton ---
export const Skeleton: React.FC<{ className?: string }> = ({ className = "h-4 w-full" }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md ${className}`} />
);