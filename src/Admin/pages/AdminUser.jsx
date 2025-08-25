import { FiSearch,FiBell,FiMessageSquare,FiUser,FiPackage,FiKey,FiMail,FiShoppingCart } from "react-icons/fi"
import {useContext,useState } from "react";
import { UsersContext } from "../context/userContext";
import Api from "../api/api"
import axios from "axios";
import { Listbox } from "@headlessui/react"
import { Check, ChevronDown } from "lucide-react"


function AdminUser(){ 
    const {userList,setUserList,userCount}=useContext(UsersContext);
    const {users}=Api();

    const [search,setSearch]=useState('')
    const [statusFilter,setStatusFilter] = useState("All")  


        const filters=userList.filter((u)=>u.role==="user")
                    .filter((user)=>{
                        if(search.trim()===''){
                            
                        const isUser=
                        user.name.toLowerCase().includes(search.toLowerCase())||
                        user.email.toLowerCase().includes(search.toLowerCase())||
                        user.id.toString().includes(search.toLowerCase())
                         if(!isUser) return false
                        }
                        if(statusFilter=="Active") return user.status==="active"
                        if(statusFilter=="Inactive") return user.status==="inactive"
                        return true
                    })

    const UpdateStatus=async(userId,currentStatus)=>{
        try{
            const newStatus=currentStatus==="active"?"inactive":"active"
            const res=await axios.patch(`${users}/${userId}`,{
                status:newStatus
            })
            setUserList((prev)=>
            prev.map((u)=>
            u.id===userId?{...u,status:newStatus}:u))
            console.log("role is updated")

        }
        catch(e){
            console.log("Erro on patching status",e)
        }
    }
    return(
        <div className="p-5">
            <main>
                <nav className="flex justify-between items-center bg-white/70 rounded-2xl p-6 backdrop-blur-lg shadow-sm">
                    <div className="flex gap-3">
                        <FiUser className="text-2xl mt-1"/>
                        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                        <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            className="bg-white rounded-2xl pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" 
                            placeholder="Search..." onChange={(e)=>{setSearch(e.target.value)}} 
                        />
                        </div>
                        <button className="relative p-2.5 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                        <FiBell size={20} className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                        </button>
                        <div className="flex items-center gap-2 bg-white rounded-xl pl-2 pr-4 py-2 border border-gray-200">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">A</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Admin</span>
                        </div>
                    </div>
                </nav>
                <div className="mt-5 flex justify-between">
                    <div>
                        <div className="rounded-2xl text-sm  bg-white/10 backdrop-blur-md border  border-white/20 shadow-lg shadow-black/10 py-2 px-4  text-black cursor-pointertransition-all ">
                            <span className="text-xl">Total users :</span>
                            <span className="text-red-400 text-xl"> {userCount}</span>
                        </div>
                    </div>
                    <select value={statusFilter}onChange={(e)=>setStatusFilter(e.target.value)} className="rounded-2xl text-sm  bg-white/10 backdrop-blur-md border  border-white/20 shadow-lg shadow-black/10 py-2 px-4  text-black cursor-pointertransition-all hover:bg-white/15focus:outline-nonefocus:ring-2 focus:ring-white/30">
                        <option className="bg-gray-800 text-white cursor-pointer">All</option>
                        <option className="bg-gray-800 text-white cursor-pointer">Active</option>
                        <option className="bg-gray-800 text-white cursor-pointer">Inactive</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                    {filters
                    .map((user)=>(
                        <div key={user.id} className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-sm mt-5 hover:scale-102 transition-all duration-200 ease-in-out">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">#{user.id}</h3>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.status === 'active' ? 'Active' : 'Inactive'}
                                </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                        <FiKey className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">User ID</p>
                                        <p className="font-medium text-gray-800">#{user.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <FiUser className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="font-medium text-gray-800">{user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                                        <FiMail className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 text-start">Email</p>
                                        <p className="font-medium text-gray-800">{user.email}</p>
                                    </div>
                                </div>
                         </div>
            

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                    <FiShoppingCart className="text-orange-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Orders</p>
                                    <p className="font-medium text-gray-800 text-start">{user.orders.length}</p>
                                </div>
                            </div>
                        
                        <div className="flex items-center">
                            <div className="bg-pink-100 p-3 rounded-lg mr-4">
                                <FiPackage className="text-pink-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Products Ordered</p>
                                <p className="font-medium text-gray-800 text-start">{user.orders.reduce((acc,val)=>acc+val.products.length,0)}</p>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div className="pt-2 mt-5">
                            <button 
                            className={`w-full py-2.5 rounded-lg font-medium transition-all ${user.status === 'active' 
                                ? 'bg-red-500 hover:bg-red-600 text-white' 
                                : 'bg-green-500 hover:bg-green-600 text-white'} cursor-pointer`}
                            onClick={() => 
                                UpdateStatus(user.id,user.status)
                            }
                            >
                            {user.status === 'active' ? 'Block User' : 'Unblock User'}
                        </button>
                    </div>
                    </div>
                    ))}
                    
                </div>
            </main>
        </div>
    )
}

export default AdminUser