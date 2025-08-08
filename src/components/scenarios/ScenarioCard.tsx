import React from 'react';

interface ScenarioCardProps {
  title: string;
  description: string;
  stats: {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  actionLabel?: string;
  onAction?: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  title,
  description,
  stats,
  actionLabel = 'View Details',
  onAction
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase">{stat.label}</p>
              <p className="mt-1 text-xl font-semibold">{stat.value}</p>
              {stat.change && (
                <div className="mt-1 flex items-center text-xs">
                  {stat.trend === 'up' && (
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                  {stat.trend === 'down' && (
                    <svg className="w-3 h-3 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  <span className={`
                    ${stat.trend === 'up' ? 'text-green-600' : ''}
                    ${stat.trend === 'down' ? 'text-red-600' : ''}
                    ${stat.trend === 'neutral' ? 'text-gray-600' : ''}
                  `}>
                    {stat.change}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {actionLabel && (
          <button
            onClick={onAction}
            className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ScenarioCard;
