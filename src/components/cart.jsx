import useHandleCart from "./customhook/carthook"
import { FiMinus,FiPlus,FiTrash2  } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function Cart(){

    const {cartList,ToggleCart,DeleteCart,HandleCarts}=useHandleCart()
    const navigate=useNavigate();

    


        

    return(
        <div className="min-h-screen mt-15 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto mb-6">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                            <h1 className="text-4xl font-bold text-dark text-center">Your Cart</h1>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl">
                            <div className="border-b border-white/20 p-6">
                                <h3 className="text-xl font-semibold text-white">Total Items:<span className="text-red-400 ps-1">{cartList.length}</span>
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
                                        <div className="flex-1 px-4">
                                            <h3 className="text-white font-medium text-lg">{product.name}</h3>
                                            <p className="text-white/70 text-sm mt-1 line-clamp-2">{product.description}</p>
                                            <div className="mt-2">
                                                <span className="text-white fond-bold">₹{product.price}</span> 
                                            </div>
                                            <div className="flex items-center absolute bottom-0 mb-4  space-x-5">
                                                <button  className="bg-white/10 hover:bg-white/20 text-white w-18 h-8 rounded-full flex items-center justify-center transition-colors"
                                                            onClick=''>
                                                    <FiMinus size={14}/>
                                                </button>
                                                <span>ok</span>
                                                <button  className="bg-white/10 hover:bg-white/20 text-white w-18 h-8 rounded-full flex items-center justify-center transition-colors"
                                                            onClick=''>
                                                    <FiPlus size={14}/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex flex-col items-end pl-4 border-l border-white/20 h-full">
                                                <div className="flex items-center justify-center space-x-3 mt-auto">
                                                    <h3>Total Price</h3>
                                                    <h2>{product.price}</h2>
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