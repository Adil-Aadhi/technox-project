import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination,} from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import '../style/swiper.css'
import HomeProducts from "./homeproducts";





function Home() {

    
    const navigate=useNavigate();

    const ShopNavigate=()=>{
        navigate('/products')
    }

const images = [
    "/iphone1.png",
    "/Asus1.png",
  ];

  return (
    <div className="block mt-5">
        <video
        src="/samsungvid.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto">
        </video>

    {/* Chat-GPT */}

        <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                    return `
                        <span class="${className} custom-bullet">
                        <span class="progress-bar"></span>
                        </span>
                    `;
                    },
                }}
                modules={[Autoplay, Pagination]}
                className="w-full h-[500px] relative"
                speed={900}
                >
                {images.map((src, i) => (
                    <SwiperSlide key={i} className="relative">
                    <img 
                        src={src} 
                        alt={`slide-${i}`}
                        className="w-screen h-full object-cover"
                    />
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                        <button 
                            className="relative bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl h-12 w-44
                                    transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/30
                                    text-white font-medium text-sm md:text-base overflow-hidden group"
                            onClick={ShopNavigate}>
                        {/* Glass shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/0 opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-300"></span>
                        
                        
                        
                        {/* Button text with subtle glow */}
                        <span className="relative z-10 flex items-center justify-center h-full w-full">
                        Shop Now
                        <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        </span>
                    </button>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>

                <HomeProducts/>
        
    </div>
  );
}

export default Home;
