import React from 'react';
import { MetricCardProps } from '../../types/dashboard';

export const StatCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, ariaLabel }) => {
  return (
    <article 
      tabIndex={0}
      aria-label={ariaLabel}
      className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-xl flex flex-col justify-between hover:border-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</span>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        <span 
          className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}
        >
          {isPositive ? '↑' : '↓'} {change}
        </span>
      </div>
    </article>
  );
};