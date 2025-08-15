import { useState } from "react"; 
import { FiMenu, FiX } from "react-icons/fi";

function Sidebar({onFilter}) {

  const [isOpen,setIsOpen]=useState(false);

  return (
    <div className='mt-25 ms-4 mb-6'>
      <button className="md:hidden fixed left-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20" onClick={()=>setIsOpen(!isOpen)} aria-label="Toggle menu"> 
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>
      <div className="hidden md:block  ms-4 mb-6 w-50 flex-shrink-0">
        
        <aside className={`${isOpen ? 'fixed inset-0 z-40 pt-16' : 'hidden'} 
                          md:block backdrop-blur-xl bg-white/10 border-r border-white/20 text-white h-full w-full md:w-43 md:h-140 md:pt-15 rounded-xl transition-all duration-300`}>
            <div className="py-7">
              <h1 className="font-bold">Categories</h1>
            </div>
            <ul className="space-y-4 px-6 ">
                <li><button onClick={()=>{onFilter(null);setIsOpen(false);}} className="block px-4 py-3 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md w-30">
                            All Products
                      </button></li>
                <li><button onClick={() => { onFilter("Laptop"); setIsOpen(false); }} className="block px-4 py-3 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md w-30">
                            Laptops
                      </button></li>
                <li><button onClick={() => { onFilter("Mobile"); setIsOpen(false); }} className="block px-4 py-3 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md w-30">
                            Mobiles
                    </button></li>
                <li><button onClick={()=>onFilter("Acceseries")} className="block px-4 py-3 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md w-30">
                          Accessories
                    </button></li>
            </ul>
          </aside>
        </div>

        {/* gpt */}

          {isOpen && (
  <div className="fixed mt-15 inset-0 z-40 backdrop-blur-lg bg-black/30 md:hidden">
    <div className="absolute left-4 mt-20 z-50 w-48 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl overflow-hidden">
      <ul className="space-y-1 p-2">
        <li>
          <button
            onClick={() => { onFilter(null); setIsOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            All Products
          </button>
        </li>
        <li>
          <button
            onClick={() => { onFilter("Laptop"); setIsOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            Laptops
          </button>
        </li>
        <li>
          <button
            onClick={() => { onFilter("Mobile"); setIsOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-200"
          >
            Mobiles
          </button>
        </li>
      </ul>
    </div>
  </div>
)}
    </div>
          
  );
}

export default Sidebar;