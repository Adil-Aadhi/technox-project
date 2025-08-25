import { createContext,useEffect,useState } from "react";
import Api from "../api/api";
import axios from "axios";

export const ProductContext=createContext()

export function ProductProvider({children}){
    const [product,setProduct]=useState([]);
    const {products}=Api();

    const FetchProduct=async()=>{
        try{
            const res=await axios.get(products)
            setProduct(res.data)
        }
        catch(e){
            console.log("Error on fetching product",e)
        }
        
    }

    useEffect(()=>{
        FetchProduct()
    },[])

    return(
        <ProductContext.Provider value={{product}}>
            {children}
        </ProductContext.Provider>
    )
}