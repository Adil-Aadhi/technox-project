import { createContext,useState,useEffect } from "react";
import Api from "../api/api";
import axios from "axios";

export const OrderContext=createContext()

export function OrderProvider({children}){

    const {users}=Api()
    const [order,setOrder]=useState([])
    const [revenue,setRevenue]=useState([])

    const [topProducts, setTopProducts] = useState([]);


    const HandleOrders=async()=>{
        try{
            const res=await axios.get(users)
        const user=res.data;
        

        const allOrders=user.flatMap(user=>(user.orders || []).map(orders=>({
            ...orders,userId:user.id,userName:user.name,userEmail:user.email
        })))
        setOrder(allOrders)
        }catch(e){
            console.log("Error on fetching orders",e)
        }
        
    }

    const HandleOrderStatus=async(userId,orderOdr,newStatus)=>{
        try{

            const  res=await axios.get(`${users}/${userId}`);
            const user=res.data;

            const updatedOrders=user.orders.map(ord=>
                ord.odr===orderOdr?{...ord,status:newStatus}:ord
            )

            await axios.patch(`http://localhost:3000/users/${userId}`, { orders: updatedOrders });
            setOrder(prev=>prev.map(o=>o.odr===orderOdr ? {...o,status:newStatus}:o))
            console.log("Order status updated successfully!");
        }catch(e){
            console.log("Error on updating Status",e)
        }
    }

    useEffect(() => {
    if (order.length > 0) {
        const revenue = order
            .filter(x=>x.status !=="Cancel")
            .reduce((acc, x) => acc + Number(x.amount || 0), 0);

        setRevenue(revenue.toLocaleString("en-IN", { style: "currency", currency: "INR" }));
        console.log("Updated total revenue:", revenue);
    }
    }, [order]);


    //gpt//

    const [revenueData, setRevenueData] = useState([]);

useEffect(() => {
  if (order.length > 0) {
    // ✅ Filter out cancelled orders
    const validOrders = order.filter(x => x.status !== "Cancel");

    // ✅ Group by date
    const grouped = validOrders.reduce((acc, x) => {
      const d = new Date(x.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });

      acc[d] = (acc[d] || 0) + Number(x.amount || 0);
      return acc;
    }, {});

    // ✅ Convert to array for chart
    const chartData = Object.keys(grouped).map(d => ({
      date: d,
      revenue: grouped[d]
    }));

    setRevenueData(chartData);
    console.log("Revenue chart data:", chartData);
  }
}, [order]);


useEffect(() => {
  if (order.length > 0) {
    // Count products
    const productCount = {};

    order.forEach(ord => {
      (ord.products || []).forEach(prod => {
        productCount[prod.name] = (productCount[prod.name] || 0) + 1;
      });
    });

    // Convert to array for BarChart
    const chartData = Object.keys(productCount).map(name => ({
      name,
      orders: productCount[name],
    }));

    setTopProducts(chartData);
    console.log("Top Products (by orders):", chartData);
  }
}, [order]);

//...gpt...//


    useEffect(()=>{
        HandleOrders();
    },[])

    return(
        <OrderContext.Provider value={{order,HandleOrders,HandleOrderStatus,revenue,revenueData,topProducts }}>
            {children}
        </OrderContext.Provider>
    )
}