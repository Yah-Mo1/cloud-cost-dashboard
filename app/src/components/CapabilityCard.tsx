
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status: 'active' | 'monitoring' | 'secure';
  features: string[];
}

const CapabilityCard = ({ icon: Icon, title, description, status, features }: CapabilityCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'monitoring':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'secure':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <CardTitle className="text-white">{title}</CardTitle>
            </div>
          </div>
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </div>
        <CardDescription className="text-slate-300 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Key Features:</h4>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilityCard;
