
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ServiceCost } from '../../types/costData';

interface PieChartComponentProps {
  data: ServiceCost[];
}

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

const PieChartComponent = ({ data }: PieChartComponentProps) => {
  const formatTooltip = (value: number, name: string) => [
    `$${value.toLocaleString()}`,
    name
  ];

  const customLabel = ({ service, percentage }: ServiceCost) => {
    // Only show label if percentage is significant enough to avoid overlap
    if (percentage < 3) return '';
    return `${service}: ${percentage}%`;
  };

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={customLabel}
            outerRadius={120}
            innerRadius={40}
            fill="#8884d8"
            dataKey="cost"
            fontSize={12}
            fontWeight="500"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={formatTooltip}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={60}
            wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
