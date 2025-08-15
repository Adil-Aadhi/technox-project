import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function useHandleCart(){

    const [cartList,setCartList]=useState([])


    const ToggleCart=(product)=>{

        const exist=cartList.some(item=>item.id===product.id)

        if(exist){
            console.log("already added")
            toast.success(`${product.name} Already in the Cart`,{
                    className: 'custom-danger-toast'
                })
            return;
        }
        else{
            axios.post('http://localhost:3000/cart',product)
            .then(()=>{
                setCartList(prev=>[...prev,product])
                 toast.success(`${product.name} Added to Cart`,{
                })
            })
            .catch((e=>{
                console.log("error on adding",e)
            }))
            
        }

        
    }

    const DeleteCart=(product)=>{
        axios.delete(`http://localhost:3000/cart/${product.id}`)
        setCartList(prev=>prev.filter(item=>item.id!==product.id))
        toast.success(`${product.name} removed from Cart`,{
                    className: 'custom-success-toast'
                })
    }

    const HandleCarts=()=>{
        axios.get('http://localhost:3000/cart')
        .then((res)=>{setCartList(res.data)})
        .catch((e)=>console.log("error fetching cart",e))
    }

    useEffect(()=>{
        HandleCarts();
    },[cartList])

    return(
        {
            cartList,
            ToggleCart,
            DeleteCart,
            HandleCarts
        }
    )
}

export default useHandleCart