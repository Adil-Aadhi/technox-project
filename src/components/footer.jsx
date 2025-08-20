import { Link } from "react-router-dom"
import { useState } from "react"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTimes } from 'react-icons/fa';

function Footer(){

    const [isOpen,setIsOpen]=useState(false);

    return(
        <footer className=" bottom-0 w-full z-[100] bg-black backdrop-blur-md border-t border-white/50">
             {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[101] flex items-center justify-center">
                    <div className="bg-black/80 p-6 rounded-lg border border-white/20 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-xl font-bold">Connect With Us</h2>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="text-white hover:text-gray-300 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="text-white flex gap-5">
                            <FaFacebook className="cursor-pointer"/>
                            <FaTwitter className="cursor-pointer"/>
                            <FaInstagram className="cursor-pointer"/>
                            <FaLinkedin className="cursor-pointer"/>
                            <FaYoutube className="cursor-pointer"/>
                            <FaTimes className="cursor-pointer"/>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex p-9 justify-between items-center">
                 <div className="flex-shrink-0 flex items-center relative text-white">
                                <Link to="/"><img src="/logo1.png" className='w-12 h-12 md:w-20 md:h-18 hover:opacity-80 transition-opacity' alt="Company Logo"></img></Link>-
                                <h2 className="text-white text-xl absolute left-24">Techn<span className="text-red-400">o</span><span className="text-2xl text-red-500">X</span></h2>
                            </div>
                 <div className="flex gap-6 text-white">
                    <button className="hover:text-gray-300 transition cursor-pointer" onClick={()=>setIsOpen(true)}>
                        Connect Us
                    </button>
                    <Link to="/about" className="hover:text-gray-300 transition">
                        About Us
                    </Link>
                </div>
            </div>
                <div className="border-t border-white/20 w-full"></div>
                <div className="p-2 text-center text-sm text-gray-300">
                <p>© {new Date().getFullYear()} TechnoX. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer