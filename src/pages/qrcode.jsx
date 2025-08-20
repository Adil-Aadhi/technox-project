import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoClose } from 'react-icons/io5';
import { useState } from "react";


function QRPayment() {

    const handlePaid = () => {
        setDeliver(true);
      };

      const [popUp,setPopUp]=useState(false)
      const [deliver,setDeliver]=useState(false)

      

      const navigate=useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">

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
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-sm w-full relative">
        <button  className="absolute top-2 right-2 sm:top-2 sm:right-2  z-10 p-0 sm:p-2 rounded-full bg-white hover:bg-orange-200 transition-all duration-300 ease-in-out text-red-500 cursor-pointer"
                                onClick={()=> setPopUp(true)}>
                                        <IoClose className="h-4 w-4 sm:h-5 sm:w-5 text-red-700 " />
                                    </button>
                                     {popUp && (
                                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-2xl">
                                            <div className="bg-white/10 p-6 rounded-xl shadow-lg text-center space-y-4">
                                              <p className="text-lg font-medium text-white">Are you sure you want to cancel?</p>
                                              <div className="flex gap-4 justify-center">
                                                <button
                                                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer transition-all duration-300 ease-in-out"
                                                  onClick={() => setPopUp(false)}
                                                >
                                                  No
                                                </button>
                                                <button
                                                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-all duration-300 ease-in-out"
                                                  onClick={() => navigate("/")}
                                                >
                                                  Yes
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Scan to Pay</h1>
        <div className="flex justify-center mb-6"> 
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DummyPayment123" 
            alt="QR Code" 
            className="rounded-lg border border-gray-300 shadow-md"
          />
        </div>
        <p className="text-gray-600 mb-4">Use any UPI app (PhonePe, GPay, Paytm) to complete payment.</p>
        <button className="w-full py-3 bg-green-600 text-white rounded-xl font-medium text-lg shadow-md hover:bg-green-700 transition-all duration-300"
                onClick={()=>{handlePaid();
                            setTimeout(()=>{
                                navigate('/');setDeliver(false);toast.success("Order Placed Successfully!");

                            },3000)}
                }>
          Paid
        </button>
      </div>
    </div>
  );
}

export default QRPayment;
