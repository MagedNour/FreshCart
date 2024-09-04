import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import ProductCard from '../ProductCard/ProductCard.jsx';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import { WishContext } from '../../../Contexts/wishListContext.jsx';
import { useParams } from 'react-router-dom';

export default function ProductsByBrand() {

    let { wishedProducts, setWishedProducts } = useContext(WishContext)
    let{id} = useParams();

    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products?brand='+id)
    }


    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        // refetchOnWindowFocus: true
        // refetchOnReconnect: true
        staleTime: 1000,
        gcTime: 60000,
        retry: 3,

    })

    const productsWithWishedStatus = useMemo(() => {
        return data?.data.data.map(product => ({
            ...product,
            isWished: wishedProducts?.includes(product._id),
        }));
    }, [data, wishedProducts]);



    return (
        isLoading ? <LoadingScreen /> : <div>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <div className='py-24 container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {productsWithWishedStatus.map((product, i) => {

                        return <ProductCard key={i} product={product} wishedProducts= {wishedProducts} setWishedProducts={setWishedProducts} />
                    })}
                </div>
            </div>

        </div>
    );
}

