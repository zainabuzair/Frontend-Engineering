import { useState } from 'react';
import { Card } from './components/common/Card';
import { Button } from './components/common/Button';
import { StatCard } from './components/dashboard/StatCard';
import { MetricCardProps, ActivityItem } from './types/dashboard';

const initialMetrics: MetricCardProps[] = [
  { id: '1', title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', isPositive: true, ariaLabel: 'Total Revenue: $45,231.89, increased by 20.1%' },
  { id: '2', title: 'Active Subscriptions', value: '+2,350', change: '+180.1%', isPositive: true, ariaLabel: 'Active Subscriptions: 2,350, increased by 180.1%' },
  { id: '3', title: 'System Load', value: '12.2%', change: '-4.5%', isPositive: true, ariaLabel: 'System Load: 12.2%, decreased by 4.5%' },
  { id: '4', title: 'Bounce Rate', value: '24.5%', change: '+2.1%', isPositive: false, ariaLabel: 'Bounce Rate: 24.5%, increased by 2.1%' }
];

const initialActivities: ActivityItem[] = [
  { id: 'act-1', user: 'Alex Morgan', action: 'Deployed API endpoint /v2/auth', timestamp: '2 mins ago', status: 'Completed' },
  { id: 'act-2', user: 'Sarah Chen', action: 'Updated database schema migration', timestamp: '15 mins ago', status: 'Completed' },
  { id: 'act-3', user: 'DevOps Bot', action: 'Automated backup build #4092', timestamp: '1 hour ago', status: 'Pending' },
  { id: 'act-4', user: 'James Wilson', action: 'SSL Certificate Renewal', timestamp: '3 hours ago', status: 'Failed' },
];

export function App() {
  const [metrics] = useState<MetricCardProps[]>(initialMetrics);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending' | 'Failed'>('All');

  const addActivity = (): void => {
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      user: 'Current User',
      action: 'Manual System Sync Executed',
      timestamp: 'Just now',
      status: 'Completed',
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const filteredActivities = activities.filter(
    (act) => filter === 'All' || act.status === filter
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
          DevDashboard <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">Week 4</span>
        </h1>
        <Button ariaLabel="Trigger System Synchronization" variant="primary" size="sm" onClick={addActivity}>
          + Sync System
        </Button>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Responsive Grid: Metrics */}
        <section aria-label="Key Performance Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <StatCard key={metric.id} {...metric} />
          ))}
        </section>

        {/* Dashboard Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Activity Log */}
          <div className="lg:col-span-2">
            <Card 
              title="Recent Activity Log" 
              headerAction={
                <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700/50" role="tablist" aria-label="Filter status">
                  {(['All', 'Completed', 'Pending', 'Failed'] as const).map((status) => (
                    <button
                      key={status}
                      role="tab"
                      aria-selected={filter === status}
                      onClick={() => setFilter(status)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                        filter === status 
                          ? 'bg-blue-600 text-white' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              }
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase bg-slate-900/50 text-slate-400 border-b border-slate-700/50">
                    <tr>
                      <th scope="col" className="px-3 py-2.5">User</th>
                      <th scope="col" className="px-3 py-2.5">Action</th>
                      <th scope="col" className="px-3 py-2.5">Time</th>
                      <th scope="col" className="px-3 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/40">
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30">
                          <td className="px-3 py-3 font-medium text-slate-200">{item.user}</td>
                          <td className="px-3 py-3 text-slate-400">{item.action}</td>
                          <td className="px-3 py-3 text-xs text-slate-500 whitespace-nowrap">{item.timestamp}</td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${
                              item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              item.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-3 py-6 text-center text-slate-500">
                          No activities match the selected filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Quick System Status Panel */}
          <div>
            <Card title="System Performance">
              <div className="space-y-4 text-sm">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>CPU Usage</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700/50">
                    <div className="bg-blue-500 h-full w-[42%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Memory Allocation</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700/50">
                    <div className="bg-indigo-500 h-full w-[68%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Storage Remaining</span>
                    <span>89%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700/50">
                    <div className="bg-emerald-500 h-full w-[89%]" />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/50 flex flex-col gap-2">
                  <Button ariaLabel="Generate Analytics Report" variant="outline" size="sm" className="w-full">
                    Export System Logs
                  </Button>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 p-4 text-center text-xs text-slate-500">
        Week 4 Revision & Final Project — Built with React, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;