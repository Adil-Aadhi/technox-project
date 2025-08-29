import { createContext,useEffect,useState } from "react";
import Api from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";

export const ProductContext=createContext()

export function ProductProvider({children}){

    const initialValue={name:"",brand:"",price:"",type:"",storage:"",ram:"",color:"",image:"",display:"",cpu:"",description:"",status:"active",totalquantity:""}

    const [product,setProduct]=useState([]);
    const {products}=Api();
    const [hidden,setHidden]=useState([])
    const [addProduct,setAddProduct]=useState(initialValue)
    const [editProductId, setEditProductId] = useState(null);

    const FetchProduct=async()=>{
        try{
            const res=await axios.get(products)
            setProduct(res.data)
        }
        catch(e){
            console.log("Error on fetching product",e)
        }
        
    }


    const HideProduct=async(id)=>{
        try{

            const currentRes = await axios.get(`${products}/${id}`);
            const currentStatus = currentRes.data.status;

            const newStatus=currentStatus==="hidden"?"active":"hidden"
            setHidden(newStatus);
            toast.success(currentStatus==="hidden"?"Succesfully product is Unhiddden":"The Product is Now hidden", {
        style: {
            background: "white",
            color: "black",
        }
    })
            

            const res=await axios.patch(`${products}/${id}`,{
                status:newStatus
            })
            console.log("Product updated:", res.data);
        }
        catch(e){
            console.log("Error on patching hide",e)
        }
    }


    const AddProduct=async()=>{
        try{
            const res=await axios.post(products,addProduct)
            toast.success("Product added successfully!", {
            style: {
                background: "white",
                color: "black",
            },
        })
        setProduct((prev) => [...prev, res.data]);
        setAddProduct(initialValue);
        }
        catch(e){
            console.log("Error on posting product", e);
        toast.error("Failed to add product", {
            style: {
                background: "white",
                color: "black",
            },
        })
        }
    }

    const DeleteProduct=async(id)=>{
        try{
            const res=await axios.delete(`${products}/${id}`)
            setProduct((prev)=>prev.filter((p)=>p.id!==id))
            toast.success("Product deleted successfully!", {
            style: { background: "white", color: "black" }
            });
        }
        catch(e){
            console.log("Error on deleting product")
            toast.error("Failed to delete product", {
            style: { background: "white", color: "black" }
            });
        }
    }

    const EditProduct=async()=>{
        try{
            const res=await axios.patch(`${products}/${editProductId}`,addProduct)
            setProduct((prev)=>prev.map((p)=>(p.id===editProductId?res.data:p)))
            toast.success("Product updated successfully!", {
            style: { background: "white", color: "black" }
            });
            setAddProduct(initialValue);
            setEditProductId(null);
        }
        catch(e){
            console.log("Error on edit product",e)
            toast.error("Failed to update product", {
            style: { background: "white", color: "black" }
            });
        }
        
    }

    useEffect(()=>{
        FetchProduct()
    },[hidden])

    return(
        <ProductContext.Provider value={{product,HideProduct,hidden,setAddProduct,addProduct,AddProduct,DeleteProduct,setEditProductId,EditProduct,editProductId}}>
            {children}
        </ProductContext.Provider>
    )
}