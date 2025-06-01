import React from 'react';

interface ProgressRadialChartProps {
  percentage: number;
  size: number;
  strokeWidth?: number;
  color?: string;
}

const ProgressRadialChart: React.FC<ProgressRadialChartProps> = ({
  percentage,
  size,
  strokeWidth = 8,
  color = '#10B981' // Default color (green-500)
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage * circumference) / 100;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-bold text-gray-800 dark:text-white">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressRadialChart;