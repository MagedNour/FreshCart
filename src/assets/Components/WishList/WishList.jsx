import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import WishListProduct from '../WishlistProduct/WishListProduct.jsx';

export default function WishList() {
    const [products, setProducts] = useState();


    useEffect(() => {
        getWishList();
    }, [])

    async function getWishList() {

        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });

            setProducts(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        products ?

            <>
                <div className='container mx-auto mt-10 bg-gray-50 p-10'>

                    <h2 className='text-2xl font-bold mb-8'>My wish List</h2>
                    {products.length > 0 ? products?.map((product, i) => {
                        return <WishListProduct key={i} product={product} setProducts={setProducts} />
                    }) : <h2>Your Wish List is Empty </h2>}


                </div>

            </> : <LoadingScreen />
    )
}
