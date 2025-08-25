import { FiUser, FiSearch, FiBell, FiMessageSquare, FiDollarSign, FiShoppingBag, FiTrendingUp, FiActivity,FiBox,FiShoppingCart } from "react-icons/fi";
import { useContext, useEffect } from "react";
import { UsersContext } from "../context/userContext";


function AdminPanel() {

  const {userCount,orderCount}=useContext(UsersContext);

 

  const stats = [
    { title: 'Total Users', value:userCount , change: '+12%', icon: <FiUser size={24} />, color: 'bg-blue-500' },
    { title: 'Total Revenue', value:'$24,580' , change: '+12%', icon: <FiDollarSign size={24} />, color: 'bg-green-500' },
    { title: 'Total Orders', value:orderCount, change: '+8%', icon: <FiShoppingCart size={24} />, color: 'bg-orange-400' },
    { title: 'Total Products', value: '362', change: '+5%', icon: <FiBox size={24} />, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <main className={`transition-all duration-300`}>
        <nav className="flex justify-between items-center bg-white/70 rounded-2xl p-6 backdrop-blur-lg shadow-sm mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input 
                type="text" 
                className="bg-white rounded-2xl pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" 
                placeholder="Search..." 
              />
            </div>
            <button className="relative p-2.5 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <FiBell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
            <button className="p-2.5 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <FiMessageSquare size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 bg-white rounded-xl pl-2 pr-4 py-2 border border-gray-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full mt-2 inline-block">
                    {stat.change}
                  </span>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-15 text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;