import { createContext } from "react";
import useWishList from "../customhook/customehook";

const WishListContext=createContext;

function WishListProvider({children}){
    const {wishlist,ToggleWishList}=useWishList

    return(
        <WishListContext.Provider value={{wishlist,ToggleWishList}}>
            {children}
        </WishListContext.Provider>
    )
}
export  {WishListProvider,WishListContext}