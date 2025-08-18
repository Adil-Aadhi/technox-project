import { useState } from "react"; 
import { FiMenu, FiX } from "react-icons/fi";

function Sidebar({onFilter,onBrand}) {

  const [isOpen,setIsOpen]=useState(false);

  const[open,setOpen]=useState(false);

  const [brand,setBrand]=useState("Select Brand")
  const [mobileBrand,setMobilebrand]=useState(null)
  const [mobileFilter,setMobileFilter]=useState(null)

  return (
    <div className='mt-25 ms-4 mb-6'>
      <button className="md:hidden fixed left-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20" onClick={()=>setIsOpen(!isOpen)} aria-label="Toggle menu"> 
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>
      <div className="hidden md:block  ms-4 mb-6 w-50 flex-shrink-0">
        
        <aside className={`${isOpen ? 'fixed inset-0 z-40 pt-16' : 'hidden'} 
                          md:block backdrop-blur-xl bg-white/10 border-r border-white/20 text-white h-full w-full md:w-43 md:h-140 md:pt-15 rounded-xl transition-all duration-300`}>
            <div className="py-1 mb-8">
              <h1 className="text-xl font-bold">Categories</h1>
            </div>
            <ul className="space-y-4 px-6 ">
                <li><button onClick={()=>{onFilter(null);setIsOpen(false);setMobileFilter(null);}} className="block px-2 py-4 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md w-30 text-sm">
                            All Products {mobileFilter === null && " ✔️"}
                      </button></li>
                <li><button onClick={() => { onFilter("Laptop"); setIsOpen(false);setMobileFilter("Laptop"); }} className="block px-4 py-3 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md w-30">
                            Laptops {mobileFilter === "Laptop" && " ✔️"}
                      </button></li>
                <li className="mb-10"><button onClick={() => { onFilter("Mobile"); setIsOpen(false);setMobileFilter("Mobile"); }} className="block px-4 py-3 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md w-30">
                            Mobiles {mobileFilter === "Mobile" && " ✔️"}
                    </button></li>
                    <hr/>
                    <li className="mt-10 text-xl font-bold">BRANDS</li>
                <li><button  className="block px-4 py-3 rounded-lg 
                                                          bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm hover:backdrop-blur-md
                                                          transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                                          transform hover:translate-x-1 hover:scale-[1.02]
                                                          border border-white/10 hover:border-white/20
                                                          shadow-sm hover:shadow-md mt-10 w-30  relative text-sm"
                              onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
                          {brand}
                    </button></li>
            </ul>
          </aside>
        </div>

        {open &&(
          <div onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}  className="absolute left-35 mb-20 w-40 bottom-7 bg-white/5 hover:bg-white/20 
                                                          backdrop-blur-sm  shadow-lg rounded-lg  z-[9999] pointer-events-auto">
            <ul className="py-2 text-black">
            <li className="px-4 py-2 hover:bg-white/20 cursor-pointer w-full"
                onClick={()=>{onBrand(null); setBrand("Select Brand")}}>All Brands</li>
            <li className="px-4 py-2 hover:bg-white/20 cursor-pointer w-full"
                onClick={()=>{onBrand("Apple"); setBrand("Apple")}}>Apple</li>
            <li className="px-4 py-2 hover:bg-white/20 cursor-pointer w-full"
                onClick={()=>{onBrand("Samsung"); setBrand("Samsung")}}>Samsung</li>
            <li className="px-4 py-2 hover:bg-white/20 cursor-pointer w-full"
                onClick={()=>{onBrand("Asus"); setBrand("Asus")}}>Asus</li>
          </ul>
          </div>
        )}

        {/* gpt */}

          {isOpen && (
            <div className="fixed mt-15 inset-0 z-40 backdrop-blur-lg bg-black/30 md:hidden">
              <div className="absolute left-4 mt-20 z-50 w-48 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex flex-col">
                <div className="p-4 border-b border-white/20">
                <h2 className="text-lg font-bold mb-3">Products Types</h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => { onFilter(null);setMobileFilter(null); setIsOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                    >
                      All Products {mobileFilter === null && " ✔️"}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { onFilter("Laptop");setMobileFilter("Laptop");  setIsOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                    >
                      Laptops {mobileFilter === "Laptop" &&  " ✔️"}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { onFilter("Mobile");setMobileFilter("Mobile");  setIsOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                    >
                      Mobiles {mobileFilter === "Mobile" &&  " ✔️"}
                    </button>
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-3"></h2>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => { onBrand(null); setMobilebrand(null) ; setIsOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">
                        All Brands {mobileBrand === null && " ✔️"}
                    </button>
                  </li>
                  <li>
                    <button  onClick={() => { onBrand("Apple");setMobilebrand("Apple") ; setIsOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">
                        Apple {mobileBrand === "Apple" && " ✔️"}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { onBrand("Samsung");setMobilebrand("Samsung") ; setIsOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">
                        Samsung {mobileBrand === "Samsung" && " ✔️"}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { onBrand("Asus");setMobilebrand("Asus") ; setIsOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/20">
                      Asus {mobileBrand === "Asus" && " ✔️"}
                    </button>
                  </li>
                </ul>
            </div>
            </div>
            </div>
            </div>
          )}
    </div>
          
  );
}

export default Sidebar;