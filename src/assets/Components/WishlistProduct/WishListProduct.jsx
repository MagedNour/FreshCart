import React, { useContext, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import SpinnerLoadingScreen from '../LoadingScreen/SpinnerLoadingScreen.jsx';
import axios from 'axios';
import { addProductToCart } from '../../Services/cartService.js';
import { removeProductFromWishlist } from '../../Services/wishlistService.js';
import { WishContext } from '../../../Contexts/wishListContext.jsx';

export default function WishListProduct({ product, setProducts }) {

    const [isLoading, setIsLoading] = useState(false);
    let { setWishedProducts } = useContext(WishContext)




    async function getWishListAfterDelete() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            
            setProducts(data.data);
            setWishedProducts(data?.data.map(product=> product._id)); // update the Context
            setIsLoading(false);
            toast.success("Item deleted", {
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
        } catch (error) {
            toast.error('Failed to fetch wishList data');
        }
    }




    async function handleAddToCart(productId) {
        setIsLoading(true)
        await addProductToCart(productId)
        setIsLoading(false)
    }

    async function handleRemoveFromWishList(productId) {
        setIsLoading(true)
        await removeProductFromWishlist(productId)
        await getWishListAfterDelete();
        setIsLoading(false)
    }


    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            {isLoading && <SpinnerLoadingScreen />}
            <img src={product?.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between sm:items-center">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900 max-w-[600px]">{product.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">${new Intl.NumberFormat('en-US').format(product.price)}</p>
                    <button onClick={() => handleRemoveFromWishList(product._id)} className='text-red-500 mt-2'>
                        <i class="fa-solid fa-trash me-2"></i>
                        Remove
                    </button>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

                    <div className="flex items-center space-x-4">
                        <button onClick={() => handleAddToCart(product._id)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                            to cart</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
