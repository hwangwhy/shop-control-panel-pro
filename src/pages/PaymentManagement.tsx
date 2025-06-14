
import React, { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, Search, Filter, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const transactions = [
    {
      id: 'TXN-001',
      orderId: '#1234',
      customer: 'John Doe',
      amount: '$299.99',
      method: 'Credit Card',
      status: 'Completed',
      date: '2024-01-21',
      fee: '$8.99',
      net: '$291.00'
    },
    {
      id: 'TXN-002',
      orderId: '#1235',
      customer: 'Jane Smith',
      amount: '$159.99',
      method: 'PayPal',
      status: 'Processing',
      date: '2024-01-21',
      fee: '$4.79',
      net: '$155.20'
    },
    {
      id: 'TXN-003',
      orderId: '#1236',
      customer: 'Bob Johnson',
      amount: '$89.99',
      method: 'Credit Card',
      status: 'Failed',
      date: '2024-01-20',
      fee: '$0.00',
      net: '$0.00'
    },
    {
      id: 'TXN-004',
      orderId: '#1237',
      customer: 'Alice Brown',
      amount: '$399.99',
      method: 'Bank Transfer',
      status: 'Completed',
      date: '2024-01-20',
      fee: '$5.99',
      net: '$394.00'
    },
    {
      id: 'TXN-005',
      orderId: '#1238',
      customer: 'Charlie Wilson',
      amount: '$199.99',
      method: 'Credit Card',
      status: 'Refunded',
      date: '2024-01-19',
      fee: '$0.00',
      net: '$0.00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Credit Card':
        return 'bg-blue-100 text-blue-800';
      case 'PayPal':
        return 'bg-purple-100 text-purple-800';
      case 'Bank Transfer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + parseFloat(t.net.replace('$', '')), 0);

  const totalFees = transactions
    .reduce((sum, t) => sum + parseFloat(t.fee.replace('$', '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Monitor transactions and payment analytics</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download size={20} className="mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="text-green-600" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CreditCard className="text-blue-600" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
              <p className="text-sm text-blue-600 mt-1">+8.2% from last month</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="text-purple-600" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Processing Fees</p>
              <p className="text-2xl font-bold text-gray-900">${totalFees.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-1">2.8% of revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((transactions.filter(t => t.status === 'Completed').length / transactions.length) * 100)}%
              </p>
              <p className="text-sm text-green-600 mt-1">+2.1% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Credit Card</span>
              <span className="text-sm font-medium text-gray-900">
                {transactions.filter(t => t.method === 'Credit Card').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">PayPal</span>
              <span className="text-sm font-medium text-gray-900">
                {transactions.filter(t => t.method === 'PayPal').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bank Transfer</span>
              <span className="text-sm font-medium text-gray-900">
                {transactions.filter(t => t.method === 'Bank Transfer').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-sm font-medium text-green-600">
                {transactions.filter(t => t.status === 'Completed').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Processing</span>
              <span className="text-sm font-medium text-yellow-600">
                {transactions.filter(t => t.status === 'Processing').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Failed</span>
              <span className="text-sm font-medium text-red-600">
                {transactions.filter(t => t.status === 'Failed').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Refunded</span>
              <span className="text-sm font-medium text-gray-600">
                {transactions.filter(t => t.status === 'Refunded').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-900 font-medium">$299.99 payment received</p>
              <p className="text-gray-500">2 minutes ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 font-medium">Refund processed</p>
              <p className="text-gray-500">1 hour ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 font-medium">Payment failed</p>
              <p className="text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search transactions by ID, order, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter size={20} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMethodColor(transaction.method)}`}>
                      {transaction.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.fee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {transaction.net}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center">
                      <Eye size={16} className="mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
