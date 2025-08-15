import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';

function useWishList(){

    const [wishlist,setWishlist]=useState([])

    const userData = JSON.parse(localStorage.getItem('currentUser'));


     

    const ToggleWishList= async (product)=>{

        if(!userData || !userData.isLoggedIn){
            toast.error("Please login first to use wishlist!");
            return;
        }

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
                await axios.post('http://localhost:3000/wishlist',{...product,productId: product.id,userId:userData.id});
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

        if(!userData || !userData.isLoggedIn) return;

        axios.get(`http://localhost:3000/wishlist?userId=${userData.id}`)
        .then((res)=>setWishlist(res.data))
        .catch((e)=>{console.log("error fetching",e)
            toast.error('Failed to load wishlist')})
    }

    useEffect(()=>{
        HandleWishlist();
    },[userData?.id,wishlist])

   

    return({
        wishlist,
        ToggleWishList}
    )
    
}

export default useWishList;
