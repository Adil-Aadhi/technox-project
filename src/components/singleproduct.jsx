import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";


function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const HandleProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/products/${id}`);
            console.log("API Response:", response.data);
            setProduct(response.data);
        } catch (e) {
            console.error("Error fetching product:", e);
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        HandleProducts();
    }, [id]);

    if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    if (error) return <div className="flex min-h-screen items-center justify-center text-red-500">{error}</div>;
    if (!product) return <div className="flex min-h-screen items-center justify-center">Product not found</div>;

    return (
        <div className="bg-black max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-16">
    <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        {/* Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Section */}
            <div className="flex items-center justify-center bg-gray-900/30 rounded-xl border border-white/10 p-4">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-96 object-contain rounded-lg"
                />
            </div>
            
            {/* Details Section */}
            <div className="text-white space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="mt-4">
                        <span className="text-2xl font-semibold text-blue-400">₹{product.price}</span>
                    </div>
                </div>
                
                <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h3 className="font-medium mb-2">About this product</h3>
                    <p className="text-gray-300">{product.description}</p>
                </div>
                
                <div className="flex space-x-4 pt-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex-1 text-center transition-colors">
                        Add to Cart
                    </button>
                    <button className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors">
                        <FaRegHeart  className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default SingleProduct;