import { useState,useEffect } from "react"
import axios from "axios"
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import useWishList from './customhook/customehook';
import useHandleCart from "./customhook/carthook";
import { useNavigate } from "react-router-dom";






function Wishlist(){

    

    const navigate=useNavigate();

    const {wishlist,ToggleWishList}=useWishList();
    const {cartList,ToggleCart,DeleteCart,HandleCarts}=useHandleCart()

    const[product,setProduct]=useState([])

    const FetchData=()=>{
        const userData = JSON.parse(localStorage.getItem('currentUser'));
       
        axios.get(`https://technox-api.onrender.com/wishlist?userId=${userData.id}`)
        .then((res)=>setProduct(res.data))
        .catch((e)=>console.log("error on fetching",e))
    }

    useEffect(()=>{
        FetchData();
    },[])


    return (
        <div className="min-h-screen mt-15 py-12 px-4 sm:px-6 lg:px-8"
                style={{background: "linear-gradient(135deg, rgba(20, 30, 48, 0.9), rgba(36, 59, 85, 0.9))"}}>
            <div className="max-w-7xl mx-auto mb-6">
                <div className="bg-[rgba(255,255,255,0.56)] backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl font-bold text-dark text-center">Your Wishlist</h1>
                    <FaHeart className="text-3xl fill-red-500"/>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="bg-[rgba(255,255,255,0.56)] backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl">
                    <div className="border-b border-white/20 p-6">
                        <h3 className="text-xl font-semibold text-dark">Total Items:<span className="text-red-500 ps-1">{product.length}</span>
                        </h3>
                    </div>
                    <div className="space-y-4 p-4">
                                {product.map(product=>(
                                   <div key={product.id} className="flex items-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/15 p-4 hover:bg-white/10 transition-all duration-300">
                                        <div className="w-1/4 min-w-[80px] mr-3">
                                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                                <img src={product.image} alt={product.name} className="absolute inset-0 w-full transition-transform duration-500 hover:scale-105 cursor-pointer"
                                                         onClick={()=>{
                                                        navigate(`/products/${product.id}`);    
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-2 text-sm flex flex-col justify-center">
                                            <h3 className="text-gray-900 font-medium text-lg">{product.name}</h3>
                                            <p className="text-dark/70 text-xs sm:text-sm mt-1 sm:mt-1 line-clamp-2">Colour: {product.color}</p>
                                            <div className="mt-2">
                                                <span className="text-slate-800 text-lg fond-bold">₹{product.price}</span> 
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2  gap-y-4">
                                            <button className="p-1.5 sm:p-3 rounded-full backdrop-blur-md bg-black/80 border border-white/20 hover:bg-black transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-12 sm:w-18 "
                                                    onClick={()=>ToggleWishList(product)}>
                                                <FaHeart size={18} className={`transition-duration-300 ml-2 sm:ml-3.5 ${wishlist.some(item=>item.id===product.id)?'text-red-500':'text-white/80'} hover:scale-110`} />
                                            </button>
                                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 text-sm sm:text-base w-12 sm:w-18"
                                                    onClick={()=>ToggleCart(product)}>
                                                <FiShoppingCart size={20} className="mr-1  hover:scale-110" />
                                            </button>
                                        </div>
                                   </div>
                                ))}
                            
                        </div>
                    </div>
                </div>
            </div>
            
                
    )
}
export default Wishlist