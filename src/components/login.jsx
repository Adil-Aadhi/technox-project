import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { IoClose } from 'react-icons/io5';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const initialValue={name:'',password:''}

function Login(){

        const navigate=useNavigate();
        const [state,setState]=useState([])
        const [userName,setUserName]=useState('')
        const [password,setPassword]=useState('')
        const [error,setError]=useState('')
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const HandleFetch=()=>{
            fetch('http://localhost:3000/users')
            .then((res)=>res.json())
            .then((data)=>setState(data))
        }

        useEffect(()=>{
            HandleFetch();
        },[])



        const HandleLogin=(e)=>{
            e.preventDefault();

          if( userName.trim()!=='' && password.trim()!==''){

                let loginSuccessful = false;
                let loggedInUser = null;

                 state.forEach(user=>{
                
                if((user.name===userName || user.email===userName) && user.password===password){
                    loginSuccessful=true;
                    loggedInUser=user}
                })

                    if(loginSuccessful && loggedInUser){
                        try{
                             const userData={
                            id: loggedInUser.id,
                            name: loggedInUser.name,
                            email: loggedInUser.email,
                            isLoggedIn: true
                        }
                        localStorage.setItem('currentUser', JSON.stringify(userData));
                         if (!localStorage.getItem(`cart_${loggedInUser.id}`)){
                            localStorage.setItem(`cart_${loggedInUser.id}`, JSON.stringify([]))
                         }
                         if (!localStorage.getItem(`wishlist_${loggedInUser.id}`)){
                            localStorage.setItem(`wishlist_${loggedInUser.id}`, JSON.stringify([]))
                          }
                          setIsLoggedIn(true);
                          console.log('User data stored:', userData);
                           

                            setError("Login Successful! Redirecting...");
                              setTimeout(()=>{
                        navigate("/")
                        toast.success("Succesfully Logged-In");
                    },2000)
                        }catch(error){
                             console.error('Failed to save to localStorage:', error)
                             setError('Login failed due to a technical error. Please try again.');
                        }
                    }else{
                        setError('Invalid username/E-mail or password');
                    }
                }else{
                    setError('Please enter both username and password');
                }
            }
                    
           

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                <Link to="/" className="absolute top-9 right-8 z-10 p-2 -mt-2 -mr-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <IoClose className="h-5 w-5 text-white hover:text-red-400" />
                </Link>
         <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-8 ">
            <div className="inline-block backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-xl shadow-2xl px-6 py-2 overflow-hidden relative w-50 h-13 mb-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-20 -z-10"></div>
                    <h1 className="text-2xl font-bold text-white whitespace-nowrap">Login</h1>
            </div>
            <form className="text-sm" onSubmit={HandleLogin}>
                <input type="text" placeholder="Username/E-mail" onChange={(e)=>setUserName(e.target.value)}
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105" required>
                </input>
                <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 bg-transparent border border-white/30 rounded-md text-white placeholder-white
                                focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300  hover:scale-105" required>
                </input>
                <h6 className="mt-3">Don't have account?<Link to="/register" className="text-blue-50 transition duration-200 hover:text-blue-300"> SignUp</Link></h6>
                <div>
                     {error && <p className="text-black-500 mt-4 font-semibold">{error}</p> }
                </div>
                <button type="submit" className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg h-10 w-40 mt-10
                                transition duration-300 hover:bg-green-300 hover:scale-105">Get Started
                </button>
            </form>
            </div>
        </div>
      </div>
    )
}
export default Login