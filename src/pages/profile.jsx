import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {FiUser,FiShoppingBag,FiMenu } from "react-icons/fi";
import { useState,useEffect,useContext } from "react";
import axios from "axios"
import Order from "../components/orders";
import { CartContext } from "../components/useContext/cartwishContext";




function Profile(){

    const {cartLength,setCartLength,wishLength,setWishLength}=useContext(CartContext)
    const math=Math.floor(Math.random() * 10) + 1
    const math2=Math.random()
    const navigate=useNavigate();
    const storedUser=localStorage.getItem('currentUser');
    const userData = storedUser ? JSON.parse(storedUser):null;
    const isLoggedIn = userData?.isLoggedIn === true;
    const displayData=isLoggedIn ? userData:{name:`guest${math}`,email:`guest${math}@${math2}`}
    const [menuOpen,setMenuOpen]=useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [editUser, setEditUser] = useState(false);
    const [userForm, setUserForm] = useState({name: displayData?.name || "",username: displayData?.username || "",email:displayData?.email || "",oldpassword: "",password: ""});


    const [address,setAddress]=useState({houseno:"",landmark:"",town:"",district:"",pin:"",mobile:""})
    // const [data,setData]=useState([])

    const [details,Setdetails]=useState(false)

    const HandleData=(e)=>{
        setAddress({...address,[e.target.name]:e.target.value})
    }

    const HandleSubmit=(e)=>{
        e.preventDefault();
        axios.patch(`https://technox-api.onrender.com/users/${displayData.id}`,{address:address})
        .then((res)=>{toast.success("Address is updated");
             Setdetails(false);
    })
        .catch((e)=>{console.log("error",e);
            toast.error("Error saving address")})
    }
    const HandleDetails =()=>{
        axios.get(`https://technox-api.onrender.com/users/${displayData.id}`)
        .then((res)=>setAddress(res.data.address  || {
        houseno:"", landmark:"", town:"", district:"", pin:"", mobile:""
    }))
        
    }

    const HandleUserSubmit =async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.get(`https://technox-api.onrender.com/users/${displayData.id}`)
             const dbUser = res.data;

             if(userForm.password){
                if(userForm.oldpassword!==dbUser.password){
                    toast.error("Old password is Incorrect")
                    return;
                }
             }

             const updatePayload ={
                name: userForm.name,
                username: userForm.username,
                email:userForm.email,
                ...(userForm.password && {password:userForm.password,confirm: userForm.password})
             }

             await axios.patch(`https://technox-api.onrender.com/users/${displayData.id}`, updatePayload);
             toast.success("Profile updated successfully");
                const updatedUser = {
                ...displayData,
                name: updatePayload.name,
                username: updatePayload.username,
                email: updatePayload.email,
                isLoggedIn: true,
                };
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
             setEditUser(false);
        }
        catch(e){
            console.log("Error on changing details");
            toast.error("Error updating profile");
        }
    }

    useEffect(()=>{
        HandleDetails();
    },[displayData.id])


    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-neutral-900 min-h-screen p-4">
            <div  className="lg:hidden fixed top-6 left-6 z-50">
                <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mt-15"
                        onClick={() => setMenuOpen(!menuOpen)}>
                    <FiMenu className="text-2xl"/>
                </button>
            </div>
            {menuOpen && (
                <div className="lg:hidden fixed inset-0 backdrop-blur-3xl opacity-100 bg-white/0 z-40" onClick={()=>setMenuOpen(false)}>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]   pt-20 mt-5 mb-5">
                    <div>
                        <aside className={`
                                            ${menuOpen ? "fixed top-0 left-0 h-full w-60 z-50" : "hidden"} 
                                            lg:block lg:fixed lg:top-20
                                            w-64
                                            bg-white/0 lg:bg-transparent
                                            backdrop-blur-sm
                                            border-2 border-white/20
                                            rounded-lg lg:rounded-xl
                                            p-6
                                            text-white
                                            overflow-y-auto mt-9
                                        `}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold mb-6">Menu</h2>
                                <button className="lg:hidden p-1 text-white/70 hover:text-white"
                                    onClick={()=>setMenuOpen(false)}>
                                    ✕
                                </button>
                            </div>
                            
                            <hr className="border-white/20 mb-6"></hr>
                            <ul className="space-y-4">
                            <li className={`backdrop-blur-md  p-4 rounded-lg border  hover:bg-white/10 hover:border-red-400 hover:text-red-300 transition-all duration-300
                                            shadow-lg hover:shadow-xl cursor-pointer ${activeTab ==="profile"?"bg-white/10 border-red-400 text-red-300":"bg-white/5 border-white/20"}`} onClick={()=>setActiveTab("profile")}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-white/10 border border-red-400 ">
                                    <FiUser className="text-white/80 " />
                                    </div>
                                    <span className="font-medium">Profile</span>
                                </div>
                            </li>
                            <li className={`backdrop-blur-md  p-4 rounded-lg border  hover:bg-white/10 hover:border-red-400 hover:text-red-300 transition-all duration-300
                                            shadow-lg hover:shadow-xl cursor-pointer  ${activeTab==="orders"?"bg-white/10 border-red-400 text-red-300":"bg-white/5 border-white/20"} `} onClick={()=>setActiveTab("orders")}>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-white/10 border border-red-400">
                                    <FiShoppingBag  className="text-white/80" />
                                    </div>
                                    <span className="font-medium">Orders</span>
                                </div>
                            </li>
                            
                            </ul>
                        </aside>
                    </div>
                        
                    {activeTab ==="profile" &&(
                        <div className="backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-xl">
                    <div className="backdrop-blur-xl bg-white/3  rounded-2xl border border-white/20 p-8 shadow-2xl">
                    
                        <div >
                            <h1 className="text-4xl font-bold text-white text-center mb-8">Profile</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">
                            <div className="flex justify-center">
                                <div className="h-40 w-40 rounded-full bg-white/10 backdrop-blur-md border-2 border-red-400 flex items-center justify-center shadow-lg  transition-all duration-300 ease-in-out  hover:scale-103">
                                    <span className="text-white/70 text-lg">
                                    <FiUser className="text-4xl"/>
                                    </span>
                                </div>
                            </div>
                             <div className="space-y-6">
                                <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                           <span className="text-white/80 font-medium"> Name:</span> 
                                            <span className="text-white ms-2">{displayData.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-white/80 font-medium">Username:</span> 
                                            <span className="text-white ms-2">{displayData.username}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-white/80 font-medium">Email:</span> 
                                            <span className="text-white ms-2">{displayData.email}</span>
                                        </div>
                                        <button
                                            className="cursor-pointer bg-green-500  p-2 rounded-2xl ml-3"
                                            onClick={() => {
                                                if (!isLoggedIn) {
                                                toast.error("Please Login");
                                                } else {
                                                setEditUser(true);
                                                }
                                            }}
                                            >
                                            Edit Profile
                                            </button>
                                        <div className=" flex items-center ">
                                            <span className="text-white/80 font-medium ">Address:</span>
                                        </div>
                                        <div className="bg-white/10 me-3 text-white/70 rounded-md p-3  text-sm ">
                                            
                                                
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div  className="flex flex-col">
                                                        <span  className="font-medium text-white/80">House No:</span>
                                                         <span className="text-white/50">{address.houseno || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">Landmark:</span>
                                                         <span className="text-white/50">{address.landmark || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">Town/City:</span>
                                                         <span className="text-white/50">{address.town || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">District:</span>
                                                         <span className="text-white/50">{address.district  || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">POST:</span>
                                                         <span className="text-white/50">{address.pin  || "Not provided"}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span  className="font-medium text-white/80">Mobile:</span>
                                                         <span className="text-white/50">{address.mobile  || "Not provided"}</span>
                                                    </div>    
                                            </div>
                                        </div>
                                            <button className="cursor-pointer bg-blue-500 w-20 h-8 rounded-2xl" onClick={()=>
                                            {if(!isLoggedIn){
                                                toast.error("Please-Login")
                                            }
                                            else{Setdetails(true)}}}>
                                                {Object.values(address).some(val => val) ? "Edit" : "Add"}</button>
                                        
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div>
                                
                                {details &&(
                                    <div>
                                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                       <div className= "bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl relative">
                                        <div className="flex justify-between items-center mb-4">
                                            <h1 className="text-2xl font-bold text-gray-800">Edit address</h1>
                                            <button 
                                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                                onClick={() => Setdetails(false)}>
                                                ✕
                                            </button>
                                        </div>
                                        <form className="space-y-4" onSubmit={HandleSubmit}>
                                            <input placeholder="House NO" value={address.houseno}  type="text" name="houseno" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Landmark" value={address.landmark} type="text" name="landmark"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Town" value={address.town} type="text" name="town"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="District" value={address.district} type="text" name="district"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="POST" value={address.pin} type="text" name="pin"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <input placeholder="Mobile" value={address.mobile} type="text" name="mobile"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" onChange={HandleData}/>
                                            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">Save Changes</button>
                                        </form>
                                       </div>
                                    </div>
                                    </div>
                                )}



                                {isLoggedIn ?
                                    <button className="
                                                px-6 py-2 w-50 mt-7
                                                rounded-lg 
                                                backdrop-blur-md 
                                                bg-red-500/50 
                                                border border-red-400/30 
                                                text-red-100 
                                                font-medium 
                                                shadow-lg 
                                                hover:bg-red-500
                                                hover:border-red-400/50 
                                                hover:text-white 
                                                transition-all 
                                                duration-300
                                                hover:shadow-red-500/20 cursor-pointer"
                                        onClick={()=>{
                                            localStorage.removeItem('currentUser');
                                            setCartLength(0);
                                            setWishLength(0);
                                            toast.info("Log-out successfully")
                                            navigate('/login')
                                        }}>
                                    LogOut
                                </button>
                                :
                                    <button className="
                                                px-6 py-2 w-50 mt-7
                                                rounded-lg 
                                                backdrop-blur-md 
                                                bg-red-500/50 
                                                border border-red-400/30 
                                                text-red-100 
                                                font-medium 
                                                shadow-lg 
                                                hover:bg-red-500
                                                hover:border-red-400/50 
                                                hover:text-white 
                                                transition-all 
                                                duration-300
                                                hover:shadow-red-500/20 cursor-pointer"
                                        onClick={()=>{
                                            toast.info("Please Login")
                                            navigate('/login')
                                        }}>
                                    LogIn
                                    </button>
                                }
                                
                            </div>
                        </div>
                    </div>
                    )}

                    {activeTab==="orders" &&(
                        <Order/>
                    )}
                    {editUser && (
                                <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10">
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl">
                                        <div className="flex justify-between items-center mb-4">
                                        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
                                        <button
                                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                            onClick={() => setEditUser(false)}
                                        >
                                            ✕
                                        </button>
                                        </div>

                                        <form
                                        className="space-y-4" onSubmit={HandleUserSubmit}
                                        >
                                        <input
                                            placeholder="Name"
                                            value={userForm.name}
                                            type="text"
                                            name="name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="Username"
                                            value={userForm.username}
                                            type="text"
                                            name="username"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="Email"
                                            value={userForm.email}
                                            type="text"
                                            name="email"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="Old Password"
                                            value={userForm.oldpassword}
                                            type="password"
                                            name="oldpassword"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />
                                        <input
                                            placeholder="New Password"
                                            value={userForm.password}
                                            type="password"
                                            name="password"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                                            onChange={(e) =>
                                            setUserForm({ ...userForm, [e.target.name]: e.target.value })
                                            }
                                        />

                                        <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                                            Save Changes
                                        </button>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                                )}
                    
                
            </div>
        </div>
    )
}

export default Profile