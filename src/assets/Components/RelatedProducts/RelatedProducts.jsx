import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import { addProductToCart } from '../../Services/cartService.js';
import SpinnerLoadingScreen from '../LoadingScreen/SpinnerLoadingScreen.jsx';
import { CartCountContext } from '../../../Contexts/cartCountContext.jsx';



export default function RelatedProducts({ products }) {

    const [isLoadingToCart, setIsLoadingToCart] = useState(false);
    let { setCartCount } = useContext(CartCountContext);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
        ]
    };

    async function handleAddToCart(productId) {
        setIsLoadingToCart(true)
        const count = await addProductToCart(productId)
        setCartCount(count)
        setIsLoadingToCart(false)
    }

    return (
        <div className="mt-24">
            {isLoadingToCart && <SpinnerLoadingScreen />}
            <h3 className="text-gray-600 text-2xl font-medium mb-10">More Products</h3>
            <Slider {...settings}>
                {products?.map((product) => {
                    return <div key={product._id} className="w-full max-w-sm mx-auto  overflow-hidden p-3">
                        <div className="shadow-md rounded-md">
                            <div className="flex items-end justify-end h-56 w-full bg-cover bg-no-repeat bg-center" style={{ "backgroundImage": `url(${product.imageCover})` }}>
                                <button onClick={() => handleAddToCart(product._id)} className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </button>
                            </div>
                            <div className="px-5 py-3">
                                <Link to={"/FreshCart/productDetails/" + product._id}>
                                    <h3 className="text-gray-700 uppercase line-clamp-1 hover:font-bold">{product.title}</h3>
                                </Link>
                                <span className="text-gray-500 mt-2">${product.price}</span>
                            </div>
                        </div>
                    </div>
                })}
            </Slider>

        </div>
    )
}
