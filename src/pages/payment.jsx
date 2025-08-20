import { useContext,useState } from "react";
import { CartContext } from "../components/useContext/cartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { IoClose } from 'react-icons/io5';



function Payment() {
    const { grandTotal } = useContext(CartContext);
    const [payment,setPayment]=useState("upi")
    const shipping=payment==="COD"?70:0;
    const navigate=useNavigate();
    const location = useLocation();
    const [deliver,setDeliver]=useState(false)


    const handlePaid = () => {
    setDeliver(true);
  };

  const productName=location.state?.productName || null;
  const productPrice=location.state?.productPrice || null;

  const baseAmount=productPrice || grandTotal;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen p-6">

        {/* gpt  */}

            {deliver && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 flex flex-col items-center">
                            <div className="relative w-20 h-20 mb-4">
                              <div className="absolute inset-0 rounded-full border-4 border-green-400/50 animate-spin"></div>
                              <svg 
                                className="checkmark animate-draw" 
                                viewBox="0 0 52 52"
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  opacity: 0,
                                  animation: 'fadeIn 0.5s ease-in-out 1s forwards'
                                }}
                              >
                                <circle 
                                  className="checkmark-circle" 
                                  cx="26" 
                                  cy="26" 
                                  r="25" 
                                  fill="none"
                                  stroke="rgba(74, 222, 128, 0.3)"
                                  strokeWidth="4"
                                />
                                <path 
                                  className="checkmark-check" 
                                  fill="none" 
                                  stroke="rgba(74, 222, 128, 0.8)" 
                                  strokeWidth="4" 
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeDasharray="48"
                                  strokeDashoffset="48"
                                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                  style={{ animation: 'dash 0.5s ease-in-out 0.5s forwards' }}
                                />
                              </svg>
                            </div>
                            <p className="text-white text-md font-medium">Order Placed Successfully!</p>
                          </div>
                        </div>
                      )}




            <div className="max-w-7xl mx-auto mt-20">
                <div className="relative flex justify-center ">
                    <h1 className=" text-xl sm:text-3xl font-bold text-gray-800 mb-15">Complete Your Payment</h1>
                <div className="bg-red-400">
                    <button  className="absolute top-0 right-0 sm:top-0 sm:right-2  z-10 p-0 sm:p-2 rounded-full bg-white hover:bg-orange-200 transition-colors text-red-500 cursor-pointer"
                                onClick={()=>navigate(-1)}>
                                        <IoClose className="h-4 w-4 sm:h-5 sm:w-5 text-red-700 " />
                                    </button>
                </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:scale-102 transition-all duration-200 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                <h3 className="font-medium text-gray-700 mb-2">Current Address</h3>
                                <p className="text-gray-600">Main Street</p>
                                <p className="text-gray-600">Apartment 4B</p>
                                <p className="text-gray-600">India, kerala 673642</p>
                            </div>
                            {/* <button className="w-full py-2 bg-black/90 text-white rounded hover:bg-blue-500 transition-all duration-500 cursor-pointer h-13">
                                Change Address
                            </button> */}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:scale-102 transition-all duration-200 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                        <div className="space-y-4">
                            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                                <div className="flex items-center mb-3">
                                    <input type="radio" id="upi" name="payment" className="mr-2" defaultChecked value="upi" onChange={(e)=>setPayment(e.target.value)} />
                                    <label htmlFor="upi" className="font-medium text-gray-800">UPI Payment</label>
                                </div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-4 gap-2 ">
                                        {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(app => (
                                            <button 
                                                key={app}
                                                className="p-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer"
                                            >
                                                {app}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                    <input type="radio" id="card" name="payment" className="mr-2" value="card" onChange={(e)=>setPayment(e.target.value)} />
                                    <label htmlFor="card" className="font-medium text-gray-800">Credit/Debit Card</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="COD" name="payment" className="mr-2" value="COD" onChange={(e)=>setPayment(e.target.value)} />
                                    <label htmlFor="COD" className="font-medium text-gray-800">Cash on delivery (COD)</label>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                By choosing COD has cost ₹ 70
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:scale-102 transition-all duration-200 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                {productName && (
                                    <div className="flex justify-between text-gray-600">
                                    <span>{productName}</span>
                                    <span>₹{productPrice.toFixed(2)}</span>
                                </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{baseAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>₹ {shipping}</span>
                                </div>
                                
                                <hr className="my-3 border-gray-200" />
                                <div className="flex justify-between font-semibold text-lg text-gray-800">
                                    <span>Total</span>
                                    <span>₹{(baseAmount + shipping )}</span>
                                </div>
                            </div>
                            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-orange-400  transition-all duration-500 cursor-pointer"
                                    onClick={()=>{payment==="COD"?handlePaid():navigate('/qrcode');
                                        if(payment==="COD"){
                                            setTimeout(()=>{
                                                 navigate('/');setDeliver(false);toast.success("Order Placed Successfully!");
                                            },3000)
                                        }
                                    }}>
                              {payment==="COD"?"Place Order":"Pay Now"}
                            </button>
                            <p className="text-sm text-gray-500 text-center">
                                By completing your purchase you agree to our Terms of Service
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;