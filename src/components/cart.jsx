import { useEffect } from "react";
import useHandleCart from "./customhook/carthook"
import { FiMinus,FiPlus,FiTrash2,FiShoppingCart  } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Cart(){

    const {cartList,ToggleCart,DeleteCart,HandleCarts,IncrementQuantity,DecrementQuantity}=useHandleCart()
    const navigate=useNavigate();
   

    return(
        <div className="min-h-screen mt-15 py-12 px-4 sm:px-6 lg:px-8"
            style={{background: "linear-gradient(135deg, rgba(20, 30, 48, 0.9), rgba(36, 59, 85, 0.9))"}}>
                    <div className="max-w-7xl mx-auto mb-6">
                        <div className="bg-[rgba(255,255,255,0.56)] backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                        <div className="flex items-center justify-center gap-3">
                            <h1 className="text-4xl font-bold text-dark text-center">Your Cart</h1>
                            <FiShoppingCart className="text-3xl fill-orange-500"/>
                        </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-[rgba(255,255,255,0.56)] backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl">
                            <div className="border-b border-white/20 p-6">
                                <h3 className="text-xl font-semibold text-dark">Total Items:<span className="text-red-500 ps-1">{cartList.length}</span>
                                </h3>
                            </div>
                            <div className="space-y-4 p-4">
                                {cartList.map(product=>(
                                   <div key={product.id} className="flex items-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/15 p-4 hover:bg-white/10 transition-all duration-300">
                                        <div className="w-1/4 min-w-[80px] mr-3">
                                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                                <img src={product.image} alt={product.name} className="absolute inset-0 w-full transition-transform duration-500 hover:scale-105"
                                                        onClick={()=>{
                                                        navigate(`/products/${product.id}`);    
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-3 sm:px-4 relative pb-10 sm:pb-12">
                                            <h3 className="text-gray-900 font-medium text-base sm:text-lg">{product.name}</h3>
                                            <p className="text-dark/70 text-xs sm:text-sm mt-1 sm:mt-1 line-clamp-2">Colour: {product.color}</p>
                                            <div className="mt-2">
                                                <span className="text-slate-800 text-lg fond-bold">₹{product.price}</span> 
                                            </div>
                                            <div className="flex items-center absolute bottom-0 sm:bottom-7 mb- sm:mb-4 gap-1 left-10">
                                                <button  className="bg-black/80 hover:bg-black text-white w-10 h-6 sm:w-14 sm:h-7 rounded-full flex items-center justify-center transition-colors"
                                                            onClick={()=>DecrementQuantity(product.id)}>
                                                    <FiMinus className="w-3 h-3 sm:w-3.5 sm:h-3.5" size={14}/>
                                                </button>
                                                <span className="text-xs sm:text-sm mx-1">{product.quantity}</span>
                                                <button  className="bg-black/80 hover:bg-black text-white w-10 h-6 sm:w-14 sm:h-7 rounded-full flex items-center justify-center transition-colors"
                                                            onClick={()=>IncrementQuantity(product.id)}>
                                                    <FiPlus className="w- h-3 sm:w-3.5 sm:h-3.5" size={14}/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex flex-col items-end pl-4 border-l border-dark h-full">
                                                <div className="flex items-center justify-center space-x-3 mt-auto">
                                                    <div className="text-right">
                                                        <h3 className="text-sm text-gray-600">Total Price</h3>
                                                        <h2 className="text-sm sm:text-lg font-semibold ">₹{product.price*product.quantity}</h2>
                                                    </div>
                                                <button className="text-red-400 hover:text-red-500 transition-colors absolute bottom-2 right-4"
                                                                onClick={()=>DeleteCart(product)}>
                                                        <FiTrash2 size={20}/>
                                                    </button>
                                                
                                                </div>
                                        </div>
                                       
                                   </div>
                                ))}
                            
                        </div>                           
                        </div>
                        </div>
                    </div>
    )
}

export default Cart