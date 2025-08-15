import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue={name:"", email:"", password:"",confirm:''}

function Register(){

    const [formData,setFormData]=useState(initialValue);
    const [msg,setMsg]=useState('');

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    
    const navigate=useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(formData.password !==formData.confirm){
            setMsg("password must be same !!");
            return
        }
        

        try{
            const response= await fetch('http://localhost:3000/users',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            })

            if(response.ok){
                setMsg("signUp successfully");
                setFormData({name:'',email:'',password:'',confirm:''});

                setTimeout(()=>{
                    navigate('/login')
                    toast.success("Sign-up Successfully")
                },2000)
                
            }
            else{
                setMsg("signUp failed")
            }
        }
        catch (e){
            setMsg("Error",e.message);
        }
    }



    return(
        <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 max-w-md mx-auto mt-18">
            <div className="relative">
                <Link to="/" className="absolute top-0 right-0 z-10 p-2 -mt-2 -mr-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <IoClose className="h-5 w-5 text-white hover:text-red-400" />
                </Link>
                <div className="inline-block backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-xl shadow-2xl px-5 py-2 overflow-hidden relative h-13 w-50">
                    <h1 className="text-2xl font-bold text-white whitespace-nowrap">Sign-Up</h1>
                </div>
            <form className="text-sm" onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Name" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105"
                    onChange={handleChange} value={formData.name} required>
                </input>
                <input name="email" type="text" placeholder="Username/E-mail" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105"
                    onChange={handleChange}  value={formData.email} required>
                </input>
                <input name="password" type="text" placeholder="Password" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105"
                    onChange={handleChange}  value={formData.password} required>
                </input>
                <input name="confirm" type="password" placeholder="Confirm Password" 
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105 "
                    onChange={handleChange} value={formData.confirm} required>
                </input>
                <h6 className="mt-3">Already Have Account?<Link to="/login" className="text-blue-50 transition duration-200 hover:text-blue-300"> Login</Link></h6>

                <button type="submit" className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg h-10 w-40 mt-10
                                                    transition duration-300 hover:bg-orange-300 hover:scale-105">Signup
                </button>
                <div className="text-black mt-4 font-semibold">
                {msg && <p>{msg}</p>}
                </div>
            </form>
        </div>
        </div>
      </div>
    )
}

export default  Register