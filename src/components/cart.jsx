import { useEffect } from "react";
import useHandleCart from "./customhook/carthook"
import { FiMinus,FiPlus,FiTrash2,FiShoppingCart  } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Cart(){

    const {cartList,ToggleCart,DeleteCart,HandleCarts,IncrementQuantity,DecrementQuantity}=useHandleCart()
    const navigate=useNavigate();

    const TotalAmount=cartList.reduce((sum,product)=>
        sum+product.price*product.quantity,
        0
    )
   
    const discount=Math.round(TotalAmount * 0.05);

    const grandTotal=TotalAmount - discount;

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
                        {cartList.length>0 ?(
                            <div className="max-w-xl mx-auto mb-6">
                             <div className="bg-[rgba(255,255,255,0.56)] backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl w-full">
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="col-span-2 text-center">
                                        <h1 className="text-4xl font-bold text-dark pb-2">Total Cart</h1>
                                        <hr className="border-gray-400 my-2"></hr>
                                     </div>
                                      <div className="col-span-1 space-y-2">
                                        <p className="text-gray-700 font-medium">Total Items</p>
                                        <p className="text-gray-700 font-medium">Amount</p>
                                        <p className="text-gray-700 font-medium">Discount</p>
                                      </div>
                                       <div className="col-span-1 space-y-2 text-right">
                                        <p className="text-gray-900 font-semibold">{cartList.length}</p>
                                        <p className="text-gray-900 font-semibold">₹ {TotalAmount}</p>
                                        <p className="text-red-600 font-semibold">-₹ {discount}</p>
                                       </div>
                                        <div className="col-span-2">
                                            <hr className="border-gray-400 my-2"/>
                                            <div className="flex justify-between items-center mt- p-1">
                                                <p className="text-lg font-bold text-gray-800">Grand Total:</p>
                                                <p className="text-xl font-bold text-gray-900">₹ {grandTotal}</p>
                                            </div>
                                            <div  className="mt-6 flex justify-center">
                                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-70 cursor-pointer">
                                                    PLACE ORDER
                                                </button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>):(
                            <div className="text-center py-10">
                                <div className="flex items-center justify-center gap-3">
                                <h2 className="text-4xl font-bold text-dark text-center">Your cart is empty</h2>
                                <FiShoppingCart className="text-3xl fill-orange-500"/>
                                </div>
                                
                                <button
                                onClick={() => navigate("/products")}
                                className="mt-7 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg w-50 h-13">
                                Go Shopping
                                </button>
                            </div>
                        )}
                                             
                        </div>
                        </div>
                    </div>
    )
}

export default Cart