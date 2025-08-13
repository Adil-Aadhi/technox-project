import { Link } from "react-router-dom"

function Footer(){
    return(
        <footer className=" bottom-0 w-full z-[100] bg-gray-900/80 backdrop-blur-md border-t border-white/50">
            <div className="flex p-9 justify-between items-center">
                <div>
                    <Link to="/" className="text-white text-2xl font-bold">
                        Techno<span style={{color: "red"}}>X</span>
                    </Link>
                </div>
                 <div className="flex gap-6 text-white">
                    <Link to="/contact" className="hover:text-gray-300 transition">
                        Contact Us
                    </Link>
                    <Link to="/about" className="hover:text-gray-300 transition">
                        About Us
                    </Link>
                </div>
            </div>
                <div className="border-t border-white/20 w-full"></div>
                <div className="p-2 text-center text-sm text-gray-300">
                <p>© {new Date().getFullYear()} TechnoX. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer