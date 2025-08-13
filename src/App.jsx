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

function App() {

   const location = useLocation();
   const [showNavbar, setShowNavbar] = useState(true);
   const [showFooter,setShowFooter] = useState(true);



  useEffect(()=>{
    const hideOnRoutes = ['/login', '/register'];
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
    </Routes>
    {showFooter && <Footer/>}
    </div>
  )
}

export default App
