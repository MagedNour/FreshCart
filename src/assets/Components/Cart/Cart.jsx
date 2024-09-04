import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CartCountContext } from '../../../Contexts/cartCountContext.jsx';

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let { setCartCount } = useContext(CartCountContext);

    useEffect(() => {
        getUserCart();
    }, []);

    async function getUserCart() {
        setIsLoading(true);
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            if (data?.data?.products.length > 0) {
                setCart(data);
            } else {
                setCart(null);
            }
        } catch (error) {
            toast.error('Failed to fetch cart data');
            setCart(null); // Optionally set to null on error
        } finally {
            setIsLoading(false);
        }
    }

    async function clearCart() {
        setIsLoading(true);
        try {
            await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setCart(null);
            setCartCount(0)
            toast.success('Cart cleared successfully');
        } catch (error) {
            toast.error('Failed to clear the cart');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        isLoading ? <LoadingScreen /> :
            <>
                <Helmet>
                    <title>Cart</title>
                </Helmet>

                {cart ? (
                    <div className="pt-20">
                        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                            <div className="md:w-2/3">
                                {cart.data.products.map((product, index) => (
                                    <CartProduct key={index} product={product} setCart={setCart} />
                                ))}
                            </div>
                            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                <div className="mb-2 flex justify-between">
                                    <p className="text-gray-700">Subtotal</p>
                                    <p className="text-gray-700">${cart.data.totalCartPrice}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Shipping</p>
                                    <p className="text-gray-700">$0</p>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div className="">
                                        <p className="mb-1 text-lg font-bold">${new Intl.NumberFormat('en-US').format(cart.data.totalCartPrice)}</p>
                                        <p className="text-sm text-gray-700">including VAT</p>
                                    </div>
                                </div>
                                <Link to={`/FreshCart/shippingAddress/${cart.data._id}`} className="block text-center mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                                    Check out
                                </Link>
                            </div>
                        </div>
                        <button onClick={clearCart} className='text-red-500 border border-red-500 rounded-md px-2 py-4 mx-auto block'>Clear Cart</button>
                    </div>
                ) : (
                    <h1>Your cart is Empty</h1>
                )}
            </>
    );
}
