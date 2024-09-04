import React, { useContext, useState } from 'react'
import RatingStars from '../RatingStars/RatingStars.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { addProductToCart } from '../../Services/cartService.js'
import SpinnerLoadingScreen from '../LoadingScreen/SpinnerLoadingScreen.jsx';
import { addProductToWishList, removeProductFromWishlist } from '../../Services/wishlistService.js';
import { Bounce, toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { AuthContext } from '../../../Contexts/authContext.jsx';
import { CartCountContext } from '../../../Contexts/cartCountContext.jsx';



export default function ProductCard({ product, wishedProducts, setWishedProducts }) {

    const [isLoading, setIsLoading] = useState(false);
    const [isAddedToWished, setIsAddedToWished] = useState(false);
    const { userToken } = useContext(AuthContext);
    let { setCartCount } = useContext(CartCountContext);


    let navigate = useNavigate()



    async function handleAddToCart(productId) {

        if (userToken) {
            setIsLoading(true)
            const count = await addProductToCart(productId)
            setCartCount(count)
            setIsLoading(false)
        } else {
            navigate('login')
        }
    }

    async function handleAddToWishList(productId) {
        if (userToken) {
            setIsLoading(true)
            await addProductToWishList(productId)
            setIsAddedToWished(true)
            setWishedProducts([...wishedProducts, productId]); //update Context
            setIsLoading(false)
        } else {
            navigate('login')
        }
    }

    async function handleRemoveFromWishList(productId) {
        if (userToken) {
            setIsLoading(true)
            await removeProductFromWishlist(productId)
            setWishedProducts(wishedProducts.filter(id => id !== productId)); //update Context
            product.isWished = false;
            setIsAddedToWished(false)
            setIsLoading(false)
            toast.success("Product removed from wish list", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            navigate('login')
        }
    }



    return (
        <div className="max-w-2xl mx-auto">
            {isLoading && <SpinnerLoadingScreen />}

            <div className="bg-white shadow-md min-h-full rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-green-300 transition-colors duration-150">
                <Link to={"productDetails/" + product._id}>
                    <img className="rounded-t-lg p-8" src={product.imageCover} alt="product image" />
                </Link>
                <div className="px-5 pb-5">
                    <Link to={"productDetails/" + product._id}>
                        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}</h3>
                    </Link>
                    <p className='line-clamp-2'>{product.description}</p>

                    {/* Rating Stars */}
                    <RatingStars rating={product.ratingsAverage} />

                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">$ {product.price}</span>
                        <div className='flex items-center'>
                            <button onClick={() => handleAddToCart(product._id)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                                to cart</button>

                            {/* WishList Check */}
                            {product.isWished || isAddedToWished ? <>
                                <div className="relative">
                                    <Tippy content="Remove" placement="top">
                                        <button
                                            onClick={() => handleRemoveFromWishList(product._id)}
                                            className='ms-1'
                                        >
                                            <i className="fa-solid fa-heart fa-2x text-green-400 hover:text-red-400 transition-colors duration-150 cursor-pointer"></i>
                                        </button>
                                    </Tippy>
                                </div>
                            </>

                                :

                                <button onClick={() => handleAddToWishList(product._id)} className='ms-1'>
                                    <i className="fa-solid fa-heart fa-2x text-gray-400 hover:text-green-400 transition-colors duration-150 cursor-pointer"></i>
                                </button>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
