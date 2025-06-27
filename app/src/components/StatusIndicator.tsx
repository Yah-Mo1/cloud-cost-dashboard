
import { Card, CardContent } from '@/components/ui/card';

interface StatusIndicatorProps {
  label: string;
  status: 'operational' | 'monitoring' | 'degraded';
  uptime: string;
}

const StatusIndicator = ({ label, status, uptime }: StatusIndicatorProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'monitoring':
        return 'bg-yellow-500';
      case 'degraded':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'monitoring':
        return 'Monitoring';
      case 'degraded':
        return 'Degraded';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">{label}</span>
          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} animate-pulse`}></div>
        </div>
        <div className="text-sm text-slate-400">
          {getStatusText(status)} • {uptime}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusIndicator;
