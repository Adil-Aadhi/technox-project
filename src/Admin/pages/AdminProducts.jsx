import { FiBox,FiSearch,FiBell,FiMessageSquare } from "react-icons/fi"
import Api from "../api/api"
import { ProductContext } from "../context/productContext";
import { useContext } from "react";
import { BiRupee } from "react-icons/bi";
function AdminProducts(){

    const {products}=Api();
    const {product}=useContext(ProductContext);
    // const [isBrand,setBrand]=useState(false)

    return(
        <div className="p-5">
                    <main>
                        <nav className="flex justify-between items-center bg-white/70 rounded-2xl p-6 backdrop-blur-lg shadow-sm">
                            <div className="flex gap-3">
                                <FiBox className="text-2xl mt-1"/>
                                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    className="bg-white rounded-2xl pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" 
                                    placeholder="Search..." 
                                />
                                </div>
                                <button className="relative p-2.5 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                                <FiBell size={20} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                                </button>
                                <div className="flex items-center gap-2 bg-white rounded-xl pl-2 pr-4 py-2 border border-gray-200">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">A</span>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Admin</span>
                                </div>
                            </div>
                        </nav>

                        <div className="flex justify-between mt-5 ">
                                <div>
                                    <div className="rounded-2xl text-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 py-2 px-4 text-white cursor-pointer transition-all">
                                    <span className="text-xl text-black">Total Products : </span>
                                    <span className="text-red-400 text-xl"> {product.length}</span>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between">
  
                                <div className="flex gap-3">
                                    <div className="relative group">
                                    <div className="rounded-xl text-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 py-2 px-4 text-white cursor-pointer transition-all">
                                        <button className="text-lg text-black">Brand</button>
                                    </div>
                                    
                                    <div className="absolute right-0 top-full mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg shadow-black/20 overflow-hidden z-10">
                                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors cursor-pointer">
                                        Apple
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer">
                                        Samsung
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer">
                                        Google
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer">
                                        OnePlus
                                        </button>
                                    </div>
                                    </div>

                                    <div className="relative group">
                                    <div className="rounded-xl text-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 py-2 px-4 text-white cursor-pointer transition-all ">
                                        <button className="text-lg text-black">Type</button>
                                    </div>
                                    
                                    <div className="absolute right-0 top-full mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-lg shadow-black/20 overflow-hidden z-10">
                                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors cursor-pointer">
                                        Mobile
                                        </button>
                                        <button className="w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors border-t border-white/10 cursor-pointer">
                                        Laptop
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5 mt-5">
                            {product.map((x) => (
                                <div
                                    key={x.id}
                                    className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    <div className="w-full h-40 overflow-hidden flex items-center justify-center bg-black/20">
                                    <img
                                        src={x.image}
                                        alt={x.name}
                                        className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                    </div>
                                    <div className="p-3 bg-white/10 backdrop-blur-md">
                                    <h3 className="text-sm font-medium text-black truncate">{x.name}</h3>
                                    <div className="mt-1">
                                        <span className="text-green-500/70 flex items-center">
                                        <BiRupee className="inline-block mr-1" />
                                        {x.price}
                                        </span>
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
        </div>
    )
}

export default AdminProducts