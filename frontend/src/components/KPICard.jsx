import React from 'react';

export default function KpiCard({ title, value, subtitle, delta, trend }) {
  let trendColor = 'text-gray-500';

  if (trend === 'up') trendColor = 'text-green-600';
  else if (trend === 'down') trendColor = 'text-red-600';

  return (
    <div className='rounded-xl bg-white p-5 shadow-sm'>
      <p className='text-sm text-gray-500'>{title}</p>

      <h2 className='mt-1 text-2xl font-semibold'>{value}</h2>

      {subtitle && <p className='mt-1 text-xs text-gray-400'>{subtitle}</p>}

      {delta && (
        <p className={`mt-2 text-sm ${trendColor}`}>
          {trend === 'up' && '▲ '}
          {trend === 'down' && '▼ '}
          {delta}
        </p>
      )}
    </div>
  );
}
