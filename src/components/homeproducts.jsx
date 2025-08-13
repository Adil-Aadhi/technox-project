import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { IoClose } from 'react-icons/io5';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";



function HomeProducts(){

    const [products,setProducts]=useState([]);
    const [selectedProduct,setSelectedProduct]=useState(null)
    const [isModelOpen,setIsModelOpen] = useState(false);
    
    const navigate=useNavigate();

    const HandleProducts=()=>{
        fetch('http://localhost:3000/products')
        .then((res)=>res.json())
        .then((data)=>setProducts(data))
    }

    const openModal=(product)=>{
        setSelectedProduct(product);
        setIsModelOpen(true);
    }

    const closeModal =()=>{
        setIsModelOpen(false);
        setTimeout(()=>{
            setSelectedProduct(null);
        },300);
    }


    const HandleCart=()=>{
        navigate('/cart')
    }

    useEffect(()=>{
        HandleProducts();
    },[])

    return(
        <div className="relative">
             <div className={`container mx-auto px-4 py-12 transition-all duration-300 ${isModelOpen ? 'blur-sm scale-95' : 'blur-0 scale-100'}`}>
            <div>
                <h2 className="text-3xl font-bold text-white mb-4">Featured Products</h2>
            </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-4">
                    {products.map((product)=>(
                        <div key={product.id} onClick={()=>openModal(product)}
                         className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden
                                                            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                        <div className="aspect-square overflow-hidden">
                            <img src ={product.image} alt={product.name}  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-white truncate" >{product.name}</h3>
                                <div className="pb-3">
                                    <span className="text-white/80"><BiRupee className="inline-block mr-1" />{product.price}</span>
                                </div>
                        </div>
                        </div>
                    ))}
             </div>
        </div> 

                    {/* Chat GPT */}

        {selectedProduct && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isModelOpen ? 'backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`} >
                <div  className={`relative max-w-4xl w-full bg-white/10 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 transform ${isModelOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <button onClick={closeModal}  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <IoClose className="h-5 w-5 text-white hover:text-red-400" />
                </button>
                <div className="flex flex-col md:flex-row">
                     <div className="md:w-1/2 p-6 flex items-center justify-center">
                     <img src={selectedProduct.image} alt={selectedProduct.name}
                        className="w-full h-auto max-h-[400px] object-contain rounded-lg transition-transform duration-500 hover:scale-105"/>
                     </div>
                     <div className="md:w-1/2 p-6 text-dark">
                         <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                         <div className="text-xl mb-4">
                            <BiRupee className="inline-block mr-1" />{selectedProduct.price}
                         </div>
                          <p className="text-grey-600 mb-20 font-medium">{selectedProduct.description || "Product description goes here."}
                          </p>
                          <div className="flex gap-4 justify-center">
                           <button className="bg-blue-600 hover:bg-blue-700 font-light text-white px-6  rounded-lg  transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-29">
                            <span className="text-sm">Learn more</span>
                           </button>
                           <button  className="bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl h-12 w-20
                                    transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/30
                                    text-white font-medium text-sm md:text-base overflow-hidden group">
                                        <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-300">
                                        </span>
                                         <span className="relative z-10 flex items-center justify-center">
                                            <FaRegHeart className="text-white text-xl transition duration-300  hover:scale-110"/>
                                         </span>
                                    
                            </button>
                           <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg  transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 w-18"
                                    onClick={HandleCart}>
                            <FiShoppingCart className="text-white text-xl transition duration-300  hover:scale-110"/>
                           </button>
                           </div>
                     </div>
                </div>
            </div>
            </div>
        )}

        </div>
    )
}

export default HomeProducts