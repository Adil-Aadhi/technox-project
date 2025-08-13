import { useState } from "react"; 

function Sidebar({onFilter}) {

  const [isOpen,setIsOpen]=useState(false);

  return (
    <div className='mt-25 ms-4 mb-6'>
      <button className="md:hidden fixed z-50 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"> 
        menu
      </button>
        <aside className={`${isOpen ? 'fixed inset-0 z-40 pt-20' : 'hidden'} 
                          md:block backdrop-blur-xl bg-white/10 border-r border-white/20 text-white h-full w-full md:w-43 md:h-140 md:pt-15 rounded-xl transition-all duration-300`}>
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
          
  );
}

export default Sidebar;