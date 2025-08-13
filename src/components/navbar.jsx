import {Link} from 'react-router-dom'
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from 'react';

function Navbar(){

const [msg,setMsg]=useState(false)
const [mobSearch,setMobSearch]=useState(false)
const [showMenu, setShowMenu] = useState(false)
 
    return(
       <nav className='fixed top-0 w-full z-[100] bg-gray-900/80 backdrop-blur-md border-b border-white/50 p-3'>
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className='flex flex-col gap-1'>
                    <div className="flex items-center  gap-4 sm:gap-6 justify-between">
                        <div className='flex items-center gap-4'>
                            <div className="sm:hidden relative">
                                <button onClick={()=> setShowMenu(!showMenu)} className='text-white p-1'>
                                    <FiMenu className="text-xl transition duration-300 hover:scale-110"/>
                                </button>
                                {showMenu && (
                                    <div className='absolute left-0 mt-2 w-36 bg-white/10 backdrop-blur-xl border-2 border-white/25 rounded-xl shadow-2xl z-[9999] overflow-hidden'>
                                        <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                                            group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <Link to="/products" onClick={()=>setShowMenu(false)} className='relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4'>
                                            Products
                                        </Link>
                                        <Link to="/products" onClick={()=>setShowMenu(false)} className='relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4'>
                                            About
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="flex-shrink-0">
                            <Link to="/" className="text-white text-2xl font-bold">Techno<span style={{color:"red"}}>X</span></Link>
                        </div>
                        </div>
                        <div className='hidden sm:flex  items-center gap-4 md:gap-6  rounded-lg px-3 py-1 text-white'> 
                        <div className='relative group overflow-hidden hover:bg-white/10 transition-all duration-300 rounded-md px-3 py-1'>
                            <Link to="/products" >Product</Link>
                             <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        <div  className='relative group overflow-hidden hover:bg-white/10 transition-all duration-300 rounded-md px-3 py-1'>
                            <Link to="/about" >About</Link>
                             <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg px-3 py-1">
                            <input style={{color:"white",borderRadius:"10px",padding:"5px"}} type="text" placeholder='search...' 
                                     className="hidden sm:flex flex-shrink w-full max-w-xs sm:max-w-[100px] md:max-w-[200px] lg:max-w-[320px] bg-transparent outline-none transition duration-300 hover:scale-102">
                            </input>
                            <button className="sm:hidden text-white text-xl p-2 hover:scale-110 transition duration-300" onClick={()=>{
                                setMobSearch((!mobSearch))}}aria-label="Toggle Search Bar">
                                <FiSearch/>
                            </button>
                            <Link to="/cart" className="text-white p-1"> <FiShoppingCart className="text-white text-xl transition duration-300  hover:scale-110" /> </Link>
                            <Link to="/whistlist" className="text-white"> <FaRegHeart  className="text-white text-xl transition duration-300  hover:scale-110 " /> </Link>
                            <div  className="relative group z-[200]" onMouseEnter={()=>setMsg(true)} onMouseLeave={()=>setMsg(false)}>
                                <button>
                                    <FiUser className="text-white text-xl transition duration-300  hover:scale-110" />
                                </button>
                                {msg && (
                                        <div className="absolute right-0  w-32 bg-white/10 backdrop-blur-xl border-2 border-white/25 rounded-xl shadow-2xl
                                                        opacity-0 translate-y-1 pointer-events-none
                                                        group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                                                        transition-all duration-300 ease-out z-[9999] overflow-hidden">
                                            
                                            <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                                            group-hover:opacity-100 transition-opacity duration-300"></span>
                                            
                                            <Link 
                                            to="/login" 
                                            className="relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        border-b border-white/15 transition-all duration-200 hover:bg-white/15 hover:pl-4"
                                            >
                                            Login
                                            </Link>
                                            <Link 
                                            to="/register"  
                                            className="relative z-10 block px-4 py-3 text-sm text-white font-medium hover:text-black
                                                        transition-all duration-200 hover:bg-white/15 hover:pl-4"
                                            >
                                            Signup
                                            </Link>
                                        </div>
                                        )}
                            </div>
                        </div>
                        </div>
                        {mobSearch &&(
                            <div className="sm:hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 mt-8 mx-3 transition-all duration-300 z-10">
                                <input type="text" className="w-full bg-transparent outline-none" placeholder='search....' style={{ color: "white", borderRadius: "10px", padding: "5px" }}>
                                </input>
                            </div>
                        )}
                    </div> 
                </div>
            </div>
       </nav>
    )
}

export default Navbar