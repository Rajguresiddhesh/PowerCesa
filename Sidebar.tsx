import {
  LayoutDashboard,
  TrendingUp,
  Lightbulb,
  Leaf,
  FlaskConical,
  Settings,
  Camera,
  Database,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'forecast', name: 'Energy Forecast', icon: TrendingUp },
  { id: 'optimization', name: 'Optimization Insights', icon: Lightbulb },
  { id: 'sustainability', name: 'Sustainability Metrics', icon: Leaf },
  { id: 'simulation', name: 'Simulation', icon: FlaskConical },
  { id: 'occupancy', name: 'Occupancy Detection', icon: Camera },
  { id: 'datasets', name: 'Energy Datasets', icon: Database },
  { id: 'system', name: 'System Integrations', icon: Activity },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo & Title */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">EnergyAI</h1>
            <p className="text-xs text-gray-500">Campus Optimizer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w - full flex items - center gap - 3 px - 4 py - 3 rounded - lg transition - all ${isActive
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } `}
                >
                  <Icon className={`w - 5 h - 5 ${isActive ? 'text-emerald-600' : ''} `} />
                  <span className="text-sm">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-700 mb-1">AI Model Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-600">Active & Learning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
