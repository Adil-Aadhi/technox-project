import { useState,useEffect,useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../useContext/cartwishContext";


function useHandleCart(){

    const [cartList,setCartList]=useState([])

    let {cartLength,setCartLength}=useContext(CartContext);

      const userData = JSON.parse(localStorage.getItem("currentUser"));
      const userId = userData?.id;

    const ToggleCart=(product)=>{
        if (!userId) {
        toast.error("Please login first to add to cart!");
        return;
        }

        const exist=cartList.some(item=>item.id===product.id)

        if(exist){
            toast.info(`${product.name} Already in the Cart`,{
                    className: 'custom-danger-toast'
                })
            return;
        }
        
        else{
            axios.post('http://localhost:3000/cart',{ ...product, userId, quantity: 1 })
            .then(()=>{
                setCartList(prev=>[...prev,{ ...product, userId, quantity: 1 }])
                 toast.success(`${product.name} Added to Cart`,{
                })
            })
            setCartLength(cartList.length+1)
            .catch((e=>{
                console.log("error on adding",e)
            }))
            
        }
        

        
    }

    const DeleteCart=(product)=>{
        axios.delete(`http://localhost:3000/cart/${product.id}`)
        .then(()=>{
            setCartList(prev=>prev.filter(item=>item.id!==product.id))
            toast.success(`${product.name} removed from Cart`,{
                    className: 'custom-success-toast'})
        })
        setCartLength(cartList.length-1)
        .catch((e)=>console.log(("error removing cart",e)))
        
    }

    const HandleCarts=()=>{
        if (!userId) return;

        axios.get(`http://localhost:3000/cart?userId=${userId}`)
        .then((res)=>{setCartList(res.data);
            setCartLength(res.data.length);
        })
        .catch((e)=>console.log("error fetching cart",e))
    }


    const IncrementQuantity=(productId)=>{
        setCartList(prev=>prev.map(item=>item.id===productId?{
            ...item,quantity:item.quantity + 1
        }:item))

        const product=cartList.find(item=>item.id===productId);
        if(product){
            axios.patch(`http://localhost:3000/cart/${productId}`,{
             quantity: product.quantity + 1   })
             .catch(err=>console.log("Error increment",err))
        }
    }

    const DecrementQuantity=(productId)=>{
        setCartList(prev=>prev.map(item=>item.id===productId && item.quantity>1?{
            ...item, quantity: item.quantity - 1
        }:item))

        const product=cartList.find(item=>item.id===productId);
        if(product && product.quantity>1){
            axios.patch(`http://localhost:3000/cart/${productId}`,{
                quantity: product.quantity - 1}
            )
            .catch(err=>console.log("Error decreemnting quentity",err))
        }
    }

    useEffect(()=>{
        HandleCarts();
    },[userId])

    return(
        {
            cartList,
            ToggleCart,
            DeleteCart,
            HandleCarts,
            IncrementQuantity,
            DecrementQuantity
        }
    )
}

export default useHandleCart