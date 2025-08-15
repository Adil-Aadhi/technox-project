import { useState,useEffect } from "react"
import axios from "axios"
import { FaHeart } from "react-icons/fa";
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

        axios.get('http://localhost:3000/wishlist')
        .then((res)=>setProduct(res.data))
        .catch((e)=>console.log("error on fetching",e))
    }

    useEffect(()=>{
        FetchData();
    })


    return (
        <div className="min-h-screen mt-15 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mb-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                    <h1 className="text-4xl font-bold text-dark text-center">Your Wishlist</h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl">
                    <div className="border-b border-white/20 p-6">
                        <h3 className="text-xl font-semibold text-white">Total Items:<span className="text-red-400 ps-1">{product.length}</span>
                        </h3>
                    </div>
                    <div className="space-y-4 p-4">
                                {product.map(product=>(
                                   <div key={product.id} className="flex items-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/15 p-4 hover:bg-white/10 transition-all duration-300">
                                        <div className="w-1/4 min-w-[80px] mr-3">
                                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                                <img src={product.image} alt={product.name} className="absolute inset-0 w-full transition-transform duration-500 hover:scale-105"
                                                         onClick={()=>{
                                                        navigate(`/products/${product.id}`);    
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-2 text-sm flex flex-col justify-center">
                                            <h3 className="text-white font-medium text-lg">{product.name}</h3>
                                            <p className="text-white/70 text-sm mt-1 line-clamp-2">{product.description}</p>
                                            <div className="mt-2">
                                                <span className="text-white fond-bold">₹{product.price}</span> 
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <button className="p-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-18"
                                                    onClick={()=>ToggleWishList(product)}>
                                                <FaHeart size={24} className={`transition-duration-300 ml-3.5 ${wishlist.some(item=>item.id===product.id)?'text-red-500':'text-white/80'} hover:scale-110`} />
                                            </button>
                                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg  transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-18"
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