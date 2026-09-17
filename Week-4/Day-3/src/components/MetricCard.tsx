import React from "react";
import { MetricCardProps } from "../types/dashboard";

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
}) => {
  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {value}
        </h2>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            isPositive
              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};