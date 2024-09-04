import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars.jsx';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import ProductImgSlider from '../ProductImgSlider/ProductImgSlider.jsx';
import RelatedProducts from '../RelatedProducts/RelatedProducts.jsx';
import { addProductToCart } from '../../Services/cartService.js';
import SpinnerLoadingScreen from '../LoadingScreen/SpinnerLoadingScreen.jsx';
import { CartCountContext } from '../../../Contexts/cartCountContext.jsx';

export default function ProductDetails() {
    let { id } = useParams()
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingToCart, setIsLoadingToCart] = useState(false);
    let { setCartCount } = useContext(CartCountContext);



    async function handleAddToCart(productId) {
        setIsLoadingToCart(true)
        const count = await addProductToCart(productId)
        setCartCount(count)
        setIsLoadingToCart(false)
    }

    async function getProductDetails() {
        try {
            setIsLoading(true)
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            setProductDetails(data.data);
            getRelatedProducts(data.data?.category._id)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function getRelatedProducts(categoryId) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/`, {
            params: { category: categoryId }
        })
        setRelatedProducts(data.data)
    }

    useEffect(() => {
        getProductDetails()
    }, [id])

    return (
        isLoading ? <LoadingScreen /> :
            <>
                <div className="py-24 container mx-auto">
                    {isLoadingToCart && <SpinnerLoadingScreen />}

                    <main className="my-8">
                        <div className="container mx-auto px-6">
                            <div className="md:flex md:items-center">
                                <div className="w-full md:w-4/12 ">
                                    <ProductImgSlider images={productDetails.images} />
                                </div>
                                <div className="w-full max-w-lg mx-auto mt-20 md:ml-8 md:mt-0 md:w-8/12">
                                    <h3 className="text-gray-700 uppercase text-lg">{productDetails.title}</h3>
                                    <span className="text-gray-500 mt-3">${productDetails.price}</span>
                                    <hr className="my-3" />
                                    <div className="mt-2">

                                    </div>
                                    <div className="mt-3">
                                        <label className="text-gray-700 text-sm" htmlFor="rating">Rating:</label>
                                        <RatingStars rating={productDetails.ratingsAverage} />
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-gray-700 text-sm" htmlFor="category">Description:</label>
                                        <h3>{productDetails.description}</h3>
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-gray-700 text-sm" htmlFor="category">Category:</label>
                                        <h3>{productDetails.subcategory[0].name}</h3>
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-gray-700 text-sm" htmlFor="subCategory">subCategory:</label>
                                        <h3>{productDetails.category.name}</h3>
                                    </div>
                                    <div className="mt-3 flex items-center">
                                        <img className='w-1/4' src={productDetails.brand.image} alt={productDetails.brand.name} />
                                    </div>

                                    <div className="flex items-center mt-6">
                                        <button onClick={() => handleAddToCart(productDetails._id)} className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>
                                        <button onClick={() => handleAddToCart(productDetails._id)} className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <RelatedProducts products={relatedProducts} />
                        </div>
                    </main>






                </div >
            </>
    )
}
