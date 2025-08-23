import axios from "axios"
import { useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";



function Order(){

    const [product,setProduct]=useState([])
    const [deleteOrder,setDeleteOrder]=useState(null)

    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const navigate=useNavigate()

    const HandleOrders=async()=>{

        try{
            const res=await axios.get(`http://localhost:3000/users/${userData.id}`)
            setProduct(res.data.orders || [])
        }
        catch(e){
            console.log("error on fetching orders",e);
        }
        
    }

    const DeleteOrders=async (orderid)=>{

        try{
            const res=await axios.get(`http://localhost:3000/users/${userData.id}`)
            const user=res.data
            const updatedOrders=user.orders.filter(order=>order.odr !== orderid)

            await axios.patch(`http://localhost:3000/users/${userData.id}`, {
            orders: updatedOrders
        })
        console.log("order deleted")
        setProduct(updatedOrders);
    }
    catch(e){
        console.log("error delete",e)
    }
}



    useEffect(()=>{
        HandleOrders();
    },[])

    return(
        <div className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
            <div>
                {deleteOrder && (
                                          <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-2xl z-9999 ">
                                            <div className="bg-white/10 p-6 rounded-xl shadow-lg text-center space-y-4">
                                              <p className="text-lg font-medium text-white">Are you sure you want to cancel?</p>
                                              <div className="flex gap-4 justify-center">
                                                <button
                                                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer transition-all duration-300 ease-in-out"
                                                  onClick={() => setDeleteOrder(null)}
                                                >
                                                  No
                                                </button>
                                                <button
                                                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-all duration-300 ease-in-out"
                                                  onClick={() => {DeleteOrders(deleteOrder);
                                                                    setDeleteOrder(null)
                                                  }}
                                                >
                                                  Yes
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                <div className="backdrop-blur-xl bg-white/3  rounded-2xl border border-white/20 shadow-2xl p-5">
                    <h1 className="text-4xl font-bold text-white text-center">ORDERS</h1>
                </div>
                {product.length > 0  ?(
                    <div>
                    {product.map((order,index)=>(
                        <div key={index} className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl text-white mb-3 mt-2">
                            <div className="text-start text-white text-sm mb-3">
                                <p><span className="font-bold">ORDER ID:</span> {order.odr}</p>
                                <p><span className="font-bold">Date:</span> {order.date}</p>
                            </div>
                            <div>
                                {order.products.map((p,index)=>(
                                    <div key={index} className="backdrop-blur-lg rounded-2xl border bg-white/5 border-white/20 p-8 shadow-xl gap-3 mt-2 justify-center mb-3">
                                        <div className="grid grid-cols-3">
                                            <div>
                                            <img src={p.image} alt={p.name} onClick={()=> navigate(`/products/${p.id}`)}  className="w-35 h-42 object-cover rounded-lg transition-transform duration-500 hover:scale-105 cursor-pointer"/>
                                            <p className="text-start">{p.name}</p>
                                            </div>
                                            <div className="mt-15">
                                                <p>{p.price}</p>
                                            </div>
                                            <div className="text-white/80 text-start">
                                                    <h1 className="text-bold text-white mb-2">Shipping Address</h1>
                                                    <hr className="text-white/30 mb-2 w-40"/>
                                                    <p><span>House No:</span> {order.shipping.houseno}</p>
                                                    <p><span>Landmark:</span> {order.shipping.landmark}</p>
                                                    <p><span>Town/city:</span> {order.shipping.town}</p>
                                                    <p><span>District:</span> {order.shipping.district}</p>
                                                    <p><span>POST:</span> {order.shipping.pin}</p>
                                                    <p><span>Mobile:</span> {order.shipping.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className=" flex text-start justify-between">
                                <p><span className="font-bold">Total Amount</span><span> {order.amount}</span></p>
                                <FiTrash2 className="text-red-400 text-xl cursor-pointer" title="Cancel order" onClick={()=>setDeleteOrder(order.odr)}/>
                            </div>
                            <div>
                            </div>
                        </div> 
                    ))}
                </div>
                ):(
                    <div className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl text-white mb-3 mt-2">
                        <h2 className="text-2xl">No Orders Yet....</h2>
                        <div className="flex justify-center">
                            <button className="mt-7 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg w-50 h-13 cursor-pointer flex items-center justify-center gap-2"
                                    onClick={()=>navigate('/products')}>
                            <FiShoppingCart className="text-lg" />
                            <span>Please Shop</span>
                            </button>                        
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Order