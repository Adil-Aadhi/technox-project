import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function QRPayment() {

    const handlePaid = () => {
        toast.success("✅ Order Placed Successfully!");
      };

      const navigate=useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-sm w-full">
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
                                navigate('/')
                            },1000)}
                }>
          Paid
        </button>
      </div>
    </div>
  );
}

export default QRPayment;
