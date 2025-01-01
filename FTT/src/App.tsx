import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './components/Tabs';
import { TaskForm } from './components/TaskForm';
import { CompanyForm } from './components/CompanyForm';
import { TaskList } from './components/TaskList';
import { CompanyList } from './components/CompanyList';
import { Task, Company } from './types';
import { toast, Toaster } from 'react-hot-toast';
import { Building2, ClipboardList } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [nextTaskId, setNextTaskId] = useState(1);
  const [nextCompanyId, setNextCompanyId] = useState(1);

  const handleAddTask = (taskData: {
    description: string;
    amount: number;
    companyId: number;
    date: string;
    paymentStatus: 'Paid' | 'Unpaid';
  }) => {
    const company = companies.find(c => c.id === taskData.companyId);
    if (!company) return;

    const newTask: Task = {
      id: nextTaskId,
      taskCode: `${nextTaskId.toString().padStart(4, '0')}`,
      description: taskData.description,
      amount: taskData.amount,
      companyId: taskData.companyId,
      companyName: company.name,
      date: taskData.date,
      paymentStatus: taskData.paymentStatus,
    };

    setTasks([...tasks, newTask]);
    setNextTaskId(nextTaskId + 1);
    toast.success('Task added successfully');
  };

  const handleAddCompany = (name: string) => {
    const newCompany: Company = {
      id: nextCompanyId,
      name,
    };

    setCompanies([...companies, newCompany]);
    setNextCompanyId(nextCompanyId + 1);
    toast.success('Company added successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Task Tracker</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your financial tasks and company information
          </p>
        </div>

        <Tabs>
          <TabList>
            <Tab>
              <ClipboardList className="h-5 w-5" />
              <span className="ml-2">Tasks</span>
            </Tab>
            <Tab>
              <Building2 className="h-5 w-5" />
              <span className="ml-2">Companies</span>
            </Tab>
          </TabList>

          <TabPanel index={0}>
            <div className="space-y-6">
              <TaskForm
                companies={companies}
                onSubmit={handleAddTask}
                nextTaskId={nextTaskId}
              />
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Task List</h2>
                <TaskList tasks={tasks} />
              </div>
            </div>
          </TabPanel>

          <TabPanel index={1}>
            <div className="space-y-6">
              <CompanyForm onSubmit={handleAddCompany} />
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Company List</h2>
                <CompanyList companies={companies} />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;