import { useState, useEffect } from 'react';
import { Camera, Users, MapPin, Activity } from 'lucide-react';

interface ZoneData {
  zone: string;
  people_count: number;
  status: string;
  detections: number;
}

interface OccupancyMetrics {
  timestamp: string;
  total_people: number;
  active_zones: number;
  zones_data: ZoneData[];
}

export function OccupancyDetection() {
  const [metrics, setMetrics] = useState<OccupancyMetrics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/occupancy/metrics');
        const data = await res.json();
        setMetrics(data);
      } catch (e) {
        console.error("Error fetching occupancy data:", e);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Camera className="w-6 h-6 text-blue-600" />
            Occupancy Detection Service
          </h2>
          <p className="text-sm text-gray-500">Live AI Camera Feed (YOLOv8 Simulation)</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg flex flex-col items-center">
            <span className="text-xs text-blue-600 font-semibold uppercase">Total People</span>
            <span className="text-xl font-bold text-blue-700">{metrics?.total_people || 0}</span>
          </div>
          <div className="bg-emerald-50 px-4 py-2 rounded-lg flex flex-col items-center">
            <span className="text-xs text-emerald-600 font-semibold uppercase">Active Zones</span>
            <span className="text-xl font-bold text-emerald-700">{metrics?.active_zones || 0}</span>
          </div>
        </div>
      </div>

      {/* Simulated Video Feed Area */}
      <div className="relative w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner flex items-center justify-center">
        {/* Fake bounding boxes jumping around for "YOLO" feel */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)'
        }} />
        <p className="text-slate-500 font-mono flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" /> LIVE YOLOv8 FEED PLACEHOLDER
        </p>
        
        {/* Simulated Box 1 */}
        <div className="absolute border-2 border-emerald-400 bg-emerald-400/10 transition-all duration-1000 ease-in-out"
             style={{ top: '30%', left: '40%', width: '12%', height: '40%' }}>
            <span className="absolute -top-6 left-0 bg-emerald-400 text-slate-900 text-xs font-bold px-1">Person 0.89</span>
        </div>
        {/* Simulated Box 2 */}
        <div className="absolute border-2 border-emerald-400 bg-emerald-400/10 transition-all duration-700 ease-in-out delay-150"
             style={{ top: '45%', left: '60%', width: '10%', height: '35%' }}>
            <span className="absolute -top-6 left-0 bg-emerald-400 text-slate-900 text-xs font-bold px-1">Person 0.92</span>
        </div>
      </div>

      {/* Zone Metrics Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" /> Zone Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Zone Name</th>
                <th className="px-6 py-3">People Count</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Raw Detections</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {metrics?.zones_data.map((zone, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{zone.zone}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        {zone.people_count}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      zone.status === 'Busy' ? 'bg-red-100 text-red-700' :
                      zone.status === 'Normal' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {zone.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{zone.detections}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!metrics && (
            <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
                <Activity className="w-5 h-5 animate-spin" /> Fetching data from YOLOv8 Gateway...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
