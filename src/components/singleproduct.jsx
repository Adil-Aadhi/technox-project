import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
        <div className="container mx-auto py-12 px-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
                <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-center">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="max-h-96 rounded-lg object-contain"
                        />
                    </div>
                    <div className="text-white">
                        <p className="text-xl mb-4">Price: ₹{product.price}</p>
                        <p className="mb-6">{product.description}</p>
                        {/* Add more product details as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;