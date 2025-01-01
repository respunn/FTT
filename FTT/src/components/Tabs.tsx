import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextType {
  activeTab: number;
  setActiveTab: (index: number) => void;
  tabCount: number;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabCount = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === TabList
  ).length;

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabCount }}>
      <div className="space-y-6">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index });
          }
          return child;
        })}
      </nav>
    </div>
  );
}

interface TabProps {
  children: ReactNode;
  index?: number;
}

export function Tab({ children, index }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  if (typeof index !== 'number') throw new Error('Tab must be rendered within TabList');

  const { activeTab, setActiveTab } = context;

  return (
    <button
      className={`${
        activeTab === index
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  children: ReactNode;
  index: number;
}

export function TabPanel({ children, index }: TabPanelProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;

  if (activeTab !== index) return null;

  return <div className="pt-6">{children}</div>;
}