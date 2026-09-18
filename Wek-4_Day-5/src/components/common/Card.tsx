import React from 'react';
import { CardProps } from '../../types/dashboard';

export const Card: React.FC<CardProps> = ({ title, children, className = '', headerAction }) => {
  return (
    <section 
      aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`} 
      className={`bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 shadow-lg backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/50">
        <h2 
          id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`} 
          className="text-base font-semibold text-slate-200"
        >
          {title}
        </h2>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
};