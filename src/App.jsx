import './App.css'
import Navbar from './components/navbar'
import Register from './components/register'
import {Routes,Route} from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './components/footer'
import Products from './components/ProductsPage'
import Wishlist from './components/wishlist'
import Cart from './components/cart'
import { ToastContainer,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleProduct from './components/singleproduct'
import Profile from './pages/profile'
import Payment from './pages/payment'
import QRPayment from './pages/qrcode.jsx'
import AboutPage from './pages/about.jsx'
import NotFound from './pages/notfound.jsx'
// import { WishlistProvider } from './components/useContext/wishlistContext.jsx'


function App() {

   const location = useLocation();
   const [showNavbar, setShowNavbar] = useState(true);
   const [showFooter,setShowFooter] = useState(true);



  useEffect(()=>{
    const hideOnRoutes = ['/login', '/register','/payment','/qrcode'];
    const shouldHide =hideOnRoutes.includes(location.pathname);
    setShowNavbar(!shouldHide)
    setShowFooter(!shouldHide)
  },[location])

  return (
    <div className="overflow-x-hidden max-w-[100vw]">
    {showNavbar  && <Navbar />}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/products/:id" element={<SingleProduct/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/payment" element={<Payment/>}/>
      <Route path="/qrcode" element={<QRPayment/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    {showFooter && <Footer/>}
   <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar
  newestOnTop
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable={false}
  pauseOnHover
  transition={Slide}
  toastStyle={{
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    color: 'white',
    padding: '16px',
    margin: '8px 0',
    overflow: 'hidden',
    position: 'relative'
  }}
  bodyStyle={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: 0,
    padding: 0
  }}
  
/>
    </div>
  )
}

export default App
