import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';

function useWishList(){

    const [wishlist,setWishlist]=useState([])

     

    const ToggleWishList= async (product)=>{
        try{
            const exist=wishlist.some(item=>item.id===product.id);

            if(exist){
                await axios.delete(`http://localhost:3000/wishlist/${product.id}`)
                setWishlist(prev=>prev.filter(item=>item.id!==product.id));
                toast.success(`${product.name} removed from wishlist`,{
                    className: 'custom-success-toast'
                })
            }
            else{
                await axios.post('http://localhost:3000/wishlist',product);
                setWishlist(prev=>[...prev,product])
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
        axios.get('http://localhost:3000/wishlist')
        .then((res)=>setWishlist(res.data))
        .catch((e)=>{console.log("error fetching",e)
            toast.error('Failed to load wishlist')})
    }

    useEffect(()=>{
        HandleWishlist();
    },[wishlist])

   

    return({
        wishlist,
        ToggleWishList}
    )
    
}

export default useWishList;
