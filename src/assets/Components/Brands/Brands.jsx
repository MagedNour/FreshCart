import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Brands(props) {


    const getBrands = () => axios.get('https://ecommerce.routemisr.com/api/v1/brands');


    const { data, isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
        // refetchOnWindowFocus: true
        // refetchOnReconnect: true
        staleTime: 10000,
        gcTime: 60000,
        retry: 3,

    })



    return (
        <div>
            < Helmet>
                <title>Brands</title>
            </Helmet>
            {isLoading ? <LoadingScreen /> :
                <div className='container mx-auto'>
                    <h2 className='text-2xl font-bold text-center mb-3'>All Brands</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {data?.data.data?.map((brand, i) => {
                            return <div key={i} className="w-full max-w-sm mx-auto  overflow-hidden p-1">
                                <div className="shadow-md rounded-md hover:shadow-green-200">
                                    <Link to={"products/"+brand._id}>
                                        <div className="flex items-end justify-end h-40 w-full bg-cover bg-no-repeat bg-center cursor-pointer" style={{ "backgroundImage": `url(${brand.image})` }}>
                                        </div>
                                    </Link>
                                    <div className="px-5 py-3">
                                        <h3 className="text-gray-700 uppercase line-clamp-1 cursor-pointer hover:font-bold">{brand.name}</h3>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                </div>

            }
        </div>
    );
}

