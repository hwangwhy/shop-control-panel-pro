
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  CreditCard, 
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/',
    },
    {
      title: 'Account Management',
      icon: Users,
      path: '/accounts',
    },
    {
      title: 'Product Management',
      icon: Package,
      path: '/products',
    },
    {
      title: 'Payment Management',
      icon: CreditCard,
      path: '/payments',
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-slate-900 text-white z-50 transition-transform duration-300 ease-in-out",
        "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={onToggle}
            className="lg:hidden text-white hover:bg-slate-700 p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onToggle()}
                className={cn(
                  "flex items-center px-6 py-3 text-sm transition-colors duration-200",
                  isActive 
                    ? "bg-blue-600 text-white border-r-4 border-blue-400" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon size={20} className="mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
