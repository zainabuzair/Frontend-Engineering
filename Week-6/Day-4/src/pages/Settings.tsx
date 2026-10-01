import React from 'react';
import { Button } from '../assets/components/common/Button';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Developer Settings</h2>
        <p className="text-sm text-slate-500">Manage user configuration and application preferences.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-800 text-base border-b border-slate-100 pb-2">Profile Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Developer Name</label>
            <input type="text" defaultValue="Zainab Uzair" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" readOnly />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
            <input type="email" defaultValue="intern@devtrack.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" readOnly />
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};