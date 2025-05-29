import React from 'react';

interface Tab {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface TabsGradientProps<T extends string> {
  tabs: Tab[];
  activeTab: T;
  onTabChange: (value: T) => void;
  className?: string;
}

const TabsGradient = <T extends string>({ tabs, activeTab, onTabChange, className = '' }: TabsGradientProps<T>) => {
  return (
    <div className={`flex w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 shadow-lg ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-center font-bold text-lg transition-all duration-200
            ${activeTab === tab.value
              ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow'
              : 'bg-white dark:bg-gray-900 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
          `}
          style={activeTab === tab.value ? { boxShadow: '0 2px 8px 0 rgba(80,112,255,0.10)' } : {}}
          onClick={() => onTabChange(tab.value as T)}
          type="button"
        >
          {tab.icon && <span className="w-5 h-5 flex items-center justify-center">{tab.icon}</span>}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabsGradient;
