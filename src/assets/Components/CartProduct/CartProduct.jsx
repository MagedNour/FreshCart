import React, { useContext, useEffect, useState } from 'react'
import SpinnerLoadingScreen from '../LoadingScreen/SpinnerLoadingScreen.jsx';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { CartCountContext } from '../../../Contexts/cartCountContext.jsx';

export default function CartProduct({ product, setCart }) {

    const [isLoadingToCart, setIsLoadingToCart] = useState(false);
    const [isLoadingIncrease, setIsLoadingIncrease] = useState(false);
    const [isLoadingDecrease, setIsLoadingDecrease] = useState(false);
    let { setCartCount } = useContext(CartCountContext);


    const [productCount, setProductCount] = useState(product.count);


    async function updateProductCount(productId, count) {
        if(count>product.count){
            setIsLoadingIncrease(true)
        }else{
            setIsLoadingDecrease(true)
        }
            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
                count
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            setCart(data);
            setProductCount(count)
            setIsLoadingIncrease(false)
            setIsLoadingDecrease(false)

    }


    async function removeProductFromCart(productId) {
        setIsLoadingToCart(true)
        const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setCartCount(data.data.products.length)
        if(data.data.products.length > 0){
            setCart(data);
        }else{
            setCart(null)
        }
        
        setIsLoadingToCart(false)

        toast.success("Item Deleted", {
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
    }

    return (
        product.product&&
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            {isLoadingToCart && <SpinnerLoadingScreen />}
            <img src={product?.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">${product.price}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <button disabled={ product.count == 1 || isLoadingDecrease} onClick={() => updateProductCount(product.product._id, product.count - 1)} className="cursor-pointer rounded-l bg-gray-100 disabled:hover:bg-gray-100 disabled:hover:text-black py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 disabled:cursor-not-allowed"> {isLoadingDecrease? <i className='fas fa-spinner fa-spin'></i>: "-"} </button>
                        <input  onBlur={()=> product.count!=productCount && updateProductCount(product.product._id, productCount)} onChange={(e)=> setProductCount(e.target.value)} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={productCount} min="1" />
                        <button disabled={isLoadingIncrease} onClick={() => updateProductCount(product.product._id, product.count + 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black"> {isLoadingIncrease? <i className='fas fa-spinner fa-spin'></i>: "+"} </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">${new Intl.NumberFormat('en-US').format(product.price * product.count)}</p>
                        <svg onClick={() => removeProductFromCart(product.product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>



    )
}
