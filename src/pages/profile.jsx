import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {FiUser,FiShoppingBag,FiMenu } from "react-icons/fi";
import { useState } from "react";




function Profile(){


    const math=Math.floor(Math.random() * 10) + 1
    const math2=Math.random()
    const navigate=useNavigate();
    const storedUser=localStorage.getItem('currentUser');
    const userData = storedUser ? JSON.parse(storedUser):null;
    const isLoggedIn = userData?.isLoggedIn === true;
    const displayData=isLoggedIn ? userData:{name:`guest${math}`,email:`guest${math}@${math2}`}
    const [menuOpen,setMenuOpen]=useState(false);


    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-neutral-900 min-h-screen p-4">
            <div  className="lg:hidden fixed top-6 left-6 z-50">
                <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mt-15"
                        onClick={() => setMenuOpen(!menuOpen)}>
                    <FiMenu className="text-2xl"/>
                </button>
            </div>
            {menuOpen && (
                <div className="lg:hidden fixed inset-0 backdrop:blur-3xl bg-white/0 z-40" onClick={()=>setMenuOpen(false)}>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] max-w-7xl mx-auto pt-20 mt-10">
                        <aside className={`${menuOpen ? 'fixed' : 'hidden'} lg:block lg:relative inset-y-0 left-0 w-64 h-100 sm:h-[100%] bg-white/0 lg:bg-transparent backdrop-blur-sm border-2 border-white/20  rounded-lg lg:rounded-xl  p-6 text-white z-50 lg:z-auto overflow-y-auto mt-17 sm:mt-1`}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold mb-6">Menu</h2>
                                <button className="lg:hidden p-1 text-white/70 hover:text-white"
                                    onClick={()=>setMenuOpen(false)}>
                                    ✕
                                </button>
                            </div>
                            
                            <hr className="border-white/20 mb-6"></hr>
                            <ul className="space-y-4">
                            <li className="backdrop-blur-md bg-white/5 p-4 rounded-lg border border-white/20 hover:bg-white/10 hover:border-red-400 hover:text-red-300 transition-all duration-300
                                            shadow-lg hover:shadow-xl cursor-pointer " onClick={()=>navigate('/profile')}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-white/10 border border-red-400 ">
                                    <FiUser className="text-white/80 " />
                                    </div>
                                    <span className="font-medium">Profile</span>
                                </div>
                            </li>
                            <li className="backdrop-blur-md bg-white/5 p-4 rounded-lg border border-white/20 hover:bg-white/10 hover:border-red-400 hover:text-red-300 transition-all duration-300
                                            shadow-lg hover:shadow-xl cursor-pointer" onClick={()=>navigate('/orders')}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-white/10 border border-red-400">
                                    <FiShoppingBag  className="text-white/80" />
                                    </div>
                                    <span className="font-medium">Orders</span>
                                </div>
                            </li>
                            
                            </ul>
                        </aside>
                    
                    <div className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                    <div className="backdrop-blur-xl bg-white/3  rounded-2xl border border-white/20 p-8 shadow-2xl">
                    
                        <div >
                            <h1 className="text-4xl font-bold text-white text-center mb-8">Profile</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">
                            <div className="flex justify-center">
                                <div className="h-40 w-40 rounded-full bg-white/10 backdrop-blur-md border-2 border-red-400 flex items-center justify-center shadow-lg  transition-all duration-300 ease-in-out  hover:scale-103">
                                    <span className="text-white/70 text-lg">
                                    <FiUser className="text-4xl"/>
                                    </span>
                                </div>
                            </div>
                             <div className="space-y-6">
                                <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                           <span className="text-white/80 font-medium w-24">Name:</span> 
                                            <span className="text-white">{displayData.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-white/80 font-medium w-24">Username:</span> 
                                            <span className="text-white">{displayData.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div>
                                {isLoggedIn ?
                                    <button className="
                                                px-6 py-2 w-50 mt-7
                                                rounded-lg 
                                                backdrop-blur-md 
                                                bg-red-500/50 
                                                border border-red-400/30 
                                                text-red-100 
                                                font-medium 
                                                shadow-lg 
                                                hover:bg-red-500
                                                hover:border-red-400/50 
                                                hover:text-white 
                                                transition-all 
                                                duration-300
                                                hover:shadow-red-500/20 cursor-pointer"
                                        onClick={()=>{
                                            localStorage.removeItem('currentUser');
                                            toast.info("Log-out successfully")
                                            navigate('/login')
                                        }}>
                                    LogOut
                                </button>
                                :
                                    <button className="
                                                px-6 py-2 w-50 mt-7
                                                rounded-lg 
                                                backdrop-blur-md 
                                                bg-red-500/50 
                                                border border-red-400/30 
                                                text-red-100 
                                                font-medium 
                                                shadow-lg 
                                                hover:bg-red-500
                                                hover:border-red-400/50 
                                                hover:text-white 
                                                transition-all 
                                                duration-300
                                                hover:shadow-red-500/20 cursor-pointer"
                                        onClick={()=>{
                                            toast.info("Please Login")
                                            navigate('/login')
                                        }}>
                                    LogIn
                                    </button>
                                }
                                
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default Profile