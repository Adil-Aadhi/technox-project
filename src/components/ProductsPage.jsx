import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import { BiRupee } from "react-icons/bi";





function Products(){
    
    const [product,setProduct]=useState([])
    const [filteredProducts,setFilteredProduct]=useState([])

    const HandleProduct=()=>{
        axios.get('http://localhost:3000/products')
        .then((res)=>{setProduct(res.data);
            setFilteredProduct(res.data)})
        .catch((e)=>console.log("error",e))
    }

    const filterProducts=(type)=>{
        if(!type){
            setFilteredProduct(product);
        }
        else{
            setFilteredProduct(product.filter(p=> p.type===type));
        }
    }

    useEffect(()=>{
        HandleProduct();
    },[])

   
    

    return (
        <div className="flex min-h-screen">
            <div className="w-50 flex-shrink-0">
                <Sidebar onFilter={filterProducts}/>
            </div>
            <div className="flex-1 m-3">
                <div className="container mx-auto mt-15 px-4 py-12 transition-all duration-300">
                    <h3 className="text-xl text-white">Products</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-4">
                        {filteredProducts.map((product)=>(
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
            </div>
        </div>
    )
}

export default Products