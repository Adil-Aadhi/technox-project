import { createContext,useState,useEffect } from "react";
import axios from 'axios';
import Api from "../api/api";

export const UsersContext=createContext();

export function UsersProvider({children}){
    const [userCount,setUserCount]=useState(null);
    const {users}=Api();
    const [userList,setUserList]=useState([]);
    const [orderCount,setOrderCount]=useState(null)


    


    const FetchData=async ()=>{

        try{
            const res=await axios.get(users)
             const onlyUsers = res.data.filter((u) => u.role === "user");
            setUserList(res.data);
            setUserCount(onlyUsers.length);
            console.log(res.data);

            const allOrders=res.data.flatMap(u=>u.orders || []);
            setOrderCount(allOrders.length)
        }
        catch(e){
            console.log("error on Fetching user",e)
        }
    }


    useEffect(()=>{
        FetchData();
    },[])


    return(
        <UsersContext.Provider value={{userList,userCount,orderCount,setUserList}}>
            {children}
        </UsersContext.Provider>
    )
}