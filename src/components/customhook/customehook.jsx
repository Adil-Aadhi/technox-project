import { useState,useEffect,useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../useContext/cartwishContext";


function useWishList(){

    const [wishlist,setWishlist]=useState([])

    const {wishLength,setWishLength}=useContext(CartContext)

    const userData = JSON.parse(localStorage.getItem('currentUser'));


     

    const ToggleWishList= async (product)=>{

        if(!userData || !userData.isLoggedIn){
            toast.error("Please login first to use wishlist!");
            return;
        }

        try{
            const exist=wishlist.some(item=>item.id===product.id);

            if(exist){
                await axios.delete(`https://technox-api.onrender.com/wishlist/${product.id}`)
                setWishlist(prev=>prev.filter(item=>item.id!==product.id));
                setWishLength(wishlist.length-1)
                toast.success(`${product.name} removed from wishlist`,{
                    className: 'custom-success-toast'
                })
            }
            else{
                await axios.post('https://technox-api.onrender.com/wishlist',{...product,productId: product.id,userId:userData.id});
                setWishlist(prev=>[...prev,product])
                setWishLength(wishlist.length+1)
                toast.success(`${product.name} added to wishlist!`,{
                })
            }
        }
        catch(e){
            console.log("error update",e)
             toast.error(`Failed to update wishlist: ${e.message}`);
        }
    }

    const HandleWishlist=()=>{

        if(!userData || !userData.isLoggedIn) return;

        axios.get(`https://technox-api.onrender.com/wishlist?userId=${userData.id}`)
        .then((res)=>{setWishlist(res.data);
            setWishLength(res.data.length)
        })
        .catch((e)=>{console.log("error fetching",e)
            toast.error('Failed to load wishlist')})
    }

    useEffect(()=>{
        HandleWishlist();
    },[userData?.id])

   

    return({
        wishlist,
        ToggleWishList}
    )
    
}

export default useWishList;
