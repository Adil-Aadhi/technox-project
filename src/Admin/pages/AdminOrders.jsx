import {FiShoppingCart, FiSearch,FiBell,FiClock, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi"
import { useContext, useEffect,useState } from "react";
import { OrderContext } from "../context/orderContext";
import { IoClose } from "react-icons/io5";


function AdminOrders(){

    const {order,HandleOrders,HandleOrderStatus }=useContext(OrderContext)

  const processingCount = order.filter(o => o.status === "Processing").length;
  const shippedCount = order.filter(o => o.status === "Shipped").length;
  const deliveredCount = order.filter(o => o.status === "Delivered").length;
  const canceledCount = order.filter(o => o.status === "Cancel").length;

  const [search,setSearch]=useState('');
  const [sortBy, setSortBy] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("");

 

    const stats = [
        { title: 'Total Orders', value:order.length , change: '+12%', icon: <FiShoppingCart size={24} />, color: 'bg-orange-500' },
        { title: 'Processing', value: processingCount , change: '+12%', icon: <FiClock size={24} />, color: 'bg-purple-500' },
        { title: 'Shipped', value: shippedCount, change: '+12%', icon: <FiTruck size={24} />, color: 'bg-blue-500' },
        { title: 'Delivered', value: deliveredCount, change: '+5%', icon: <FiCheckCircle size={24} />, color: 'bg-green-500' },
        { title: 'Canceled', value: canceledCount, change: '+8%', icon: <FiXCircle size={24} />, color: 'bg-red-500'}
      ];
      

      
       const [isOpen, setIsOpen] = useState(false);
       const [selectedOrder, setSelectedOrder] = useState(null);
       const [status, setStatus] = useState(selectedOrder?.status || "Processing");

       const FilterOrders= order.filter((o)=>{
        if(search.trim()!==''){
          const match =o.odr.toLowerCase().includes(search.toLowerCase()) ||
                        o.status.toLowerCase().includes(search.toLowerCase()) 
          if(!match ) return false
        }
        if (statusFilter && o.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
        return true;
       })


      


      const handleStatusChange=(e)=>{
        const newStatus=e.target.value;
        setStatus(newStatus);
        HandleOrderStatus(selectedOrder.userId,selectedOrder.odr,newStatus)
      }


      useEffect(()=>{
        console.log(order)
      },[order])

      useEffect(()=>{
        if(selectedOrder){
            setStatus(selectedOrder.status)
        }
      },[selectedOrder])

    return(
        <div className="p-5">
            <main>
                <nav className="flex flex-wrap justify-between items-center bg-white/70 rounded-2xl p-4 sm:p-6 backdrop-blur-lg shadow-sm">
                                            <div className="flex gap-2 sm:gap-3 items-center">
                                                <FiShoppingCart className="text-lg sm:text-2xl" />
                                                <h1 className="text-base sm:text-2xl font-bold text-gray-800">Orders</h1>
                                            </div>
                                            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 sm:gap-4 w-full md:w-auto mt-3 md:mt-0">
                                                
                                                <div className="relative flex-1 md:flex-none w-full md:w-64">
                                                <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-white rounded-2xl pl-10 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"  
                                                    placeholder="Search..." 
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                                </div>
                                                {/* <button className="relative p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                                                <FiBell size={18} className="text-gray-600" />
                                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                                                </button> */}
                
                                                <div className="flex items-center gap-2 bg-white rounded-xl pl-2 pr-3 py-1.5 border border-gray-200">
                                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">A</span>
                                                </div>
                                                <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                                                </div>
                                            </div>
                    </nav>
                    

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-5 mt-5">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                <p className="text-gray-500 text-sm">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-15 text-white`}>
                                {stat.icon}
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                      <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-white rounded-2xl px-3 py-2 text-sm border border-gray-200 
                                      focus:outline-none focus:ring-2 focus:ring-blue-500/30 
                                      focus:border-blue-500/50 transition-all "
                          >
                            <option value="">All Status</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancel">Cancel</option>
                          </select>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {order.length === 0 && (
        <p className="text-gray-400 col-span-full text-center">No orders yet</p>
      )}

      {FilterOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((ord, i) => (
        <div
          key={i}
          onClick={()=>{setIsOpen(true);setSelectedOrder(ord)}}
          className="bg-gradient-to-br from-cyan-50 to-blue-50 border-l-4 border-orange-400 rounded-xl shadow-lg p-5 flex flex-col gap-4 transform hover:-translate-y-1 transition-transform duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{ord.userName}</h2>
              <p className="text-sm text-gray-600">{ord.userEmail}</p>
            </div>
            <FiShoppingCart size={28} className="text-cyan-600" />
          </div>

          <div
            className={`flex flex-col gap-2 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-cyan-100`}
          >
            {ord.products.map((prod, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm"
              >
                <img src={prod.image} alt={prod.name} className="w-14 h-14 object-cover rounded-md" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{prod.name}</p>
                  <p className="text-xs text-gray-500">
                    {prod.brand} | {prod.storage} | {prod.ram}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">₹{prod.price} × {prod.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-3 text-gray-900 font-semibold">
            <span>Order ID:</span>
            <span>{ord.odr}</span>
          </div>
          <div className="flex justify-between items-center mt-1 text-gray-900 font-semibold">
            <span>Date:</span>
            <span>{ord.date}</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-green-700 font-bold text-lg">
            <span>Total:</span>
            <span>₹{ord.amount}</span>
          </div>
          <div className="flex justify-between items-center mt-2 text-orange-500 font-bold text-lg">
            <span>Status:</span>
            <span className={`px-4 py-2 rounded-lg shadow-md border  text-sm
                              border-orange-400 
                              ${ord.status === "Shipped" ? "text-blue-400 bg-black" : 
                                ord.status === "Delivered" ? "text-green-400 bg-black" : 
                                ord.status === "Cancel" ? "text-red-400 bg-black" : 

                                "text-orange-500 bg-black"}`}>
                {ord.status}
            </span>
          </div>
        </div>
      ))}
    </div>

   {selectedOrder && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-4xl p-8 overflow-y-auto relative">
      <button
        onClick={() => setSelectedOrder(null)}
        className="absolute top-4 right-4 text-white "
      >
        <IoClose className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:text-red-400 cursor-pointer" />
      </button>
    <div className="max-h-96 overflow-y-auto scrollbar-none">
      {selectedOrder.products.map((prod, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-5 shadow-lg gap-4 justify-between"
        >
          {/* Left: Image */}
          <div className="flex-shrink-0">
            <img
              src={prod.image}
              alt={prod.name}
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>

          {/* Middle: Product details */}
          <div className="flex-col">
            <div>
              <p className="font-semibold text-gray-900 text-lg">{prod.name}</p>
              <p className="text-sm text-gray-600">{prod.brand} | {prod.storage} | {prod.ram}</p>
              <p className="text-sm font-semibold text-gray-700">₹{prod.price} × {prod.quantity}</p>
            </div>

            {/* Order info below product details */}
            <div className="flex flex-col gap-6 mt-20 text-gray-900 font-semibold">
              <span>Order ID: {selectedOrder.odr}</span>
              <span>Date: {selectedOrder.date}</span>
              <span className="text-green-700 font-bold">Total: ₹{selectedOrder.amount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Right: Shipping address */}
          <div className="flex-shrink-0 w-64   p-4 rounded-xl justify-end">
            <h3 className="text-lg font-bold mb-2">Shipping Address</h3>
            <hr className="mb-2 border-white/30" />
            <p><span className="font-semibold">House No:</span> {selectedOrder.shipping.houseno}</p>
            <p><span className="font-semibold">Landmark:</span> {selectedOrder.shipping.landmark}</p>
            <p><span className="font-semibold">Town/City:</span> {selectedOrder.shipping.town}</p>
            <p><span className="font-semibold">District:</span> {selectedOrder.shipping.district}</p>
            <p><span className="font-semibold">POST:</span> {selectedOrder.shipping.pin}</p>
            <p><span className="font-semibold">Mobile:</span> {selectedOrder.shipping.mobile}</p>
          </div>
        </div>
      ))}
      </div>


      <div className="mt-4 flex items-center gap-3 text-black font-bold text-lg">
        <span>Status:</span>
        <select className={`px-4 py-2 rounded-lg shadow-md border text-sm bg-black
    ${status === "Processing" ? "text-orange-500" :
      status === "Shipped" ? "text-blue-500" :
      status === "Cancel" ? "text-red-500" :
      status === "Delivered" ? "text-green-500" : "text-orange-500"
    }`}
            onChange={handleStatusChange} value={status}>
          <option className="text-orange-500">Processing</option>
          <option className="text-blue-500">Shipped</option>
          <option className="text-red-500">Cancel</option>
          <option className="text-green-500">Delivered</option>
        </select>
      </div>
    </div>
  </div>
)}
            </main>
        </div>
    )
}

export default AdminOrders