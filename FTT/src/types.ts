export interface Task {
  id: number;
  taskCode: string;
  description: string;
  amount: number;
  companyId: number;
  companyName: string;
  date: string;
  paymentStatus: 'Paid' | 'Unpaid';
}

export interface Company {
  id: number;
  name: string;
}