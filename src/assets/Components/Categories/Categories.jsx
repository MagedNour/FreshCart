import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import axios from 'axios';
import SpinnerLoadingScreen from '../LoadingScreen/SpinnerLoadingScreen.jsx';
import { useQuery } from '@tanstack/react-query';


export default function Categories(props) {

    // const [Categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    // const [isLoading, setIsLoading] = useState(true);
    const [isModalLoading, setModalIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)


    // async function getCategories() {
    //     setIsLoading(true)
    //     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    //     setCategories(data.data);
    //     console.log(data.data);
    //     setIsLoading(false)
    // }

    const getCategories =()=>  axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        // refetchOnWindowFocus: true
        // refetchOnReconnect: true
        staleTime: 10000,
        gcTime: 60000,
        retry: 3,

    })

    function handleModal(id, categoryName) {
        setCurrentCategory(categoryName)
        setShowModal(true)
        getSubCategories(id);

    }

    async function getSubCategories(id) {
        setModalIsLoading(true)
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/' + id + '/subcategories');
        setSubCategories(data.data)
        console.log(data.data);
        setModalIsLoading(false)
    }



    useEffect(() => {
        getCategories();
    }, [])
    return (
        <div>
            < Helmet>
                <title>Categories</title>
            </Helmet>
            {isLoading ? <LoadingScreen /> :
                <div className='container mx-auto'>
                    <h2 className='text-2xl font-bold text-center mb-3'>All Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {data?.data.data?.map((category) => {
                            return <div key={category._id} className="w-full max-w-sm mx-auto  overflow-hidden p-1">
                                <div className="shadow-md rounded-md hover:shadow-green-200">
                                    <div onClick={() => handleModal(category._id, category.name)} className="flex items-end justify-end h-40 w-full bg-cover bg-no-repeat bg-center cursor-pointer" style={{ "backgroundImage": `url(${category.image})` }}>
                                    </div>
                                    <div className="px-5 py-3">
                                        <h3 onClick={() => handleModal(category._id, category.name)} className="text-gray-700 uppercase line-clamp-1 cursor-pointer hover:font-bold">{category.name}</h3>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                </div>

            }

            {showModal && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        {isModalLoading ? <SpinnerLoadingScreen /> : <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {currentCategory}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="grid grid-cols-3 gap-3">
                                        {
                                            subCategories?.length > 0?

                                            subCategories?.map((sub) => {
                                                return <div key={sub._id} className='bg-slate-300 rounded-md px-3 py-2 cursor-pointer hover:bg-slate-400' >{sub.name}</div>
                                            }):
                                            
                                            <h3 className='col-span-2'>No Sub Categories found for {currentCategory}!</h3>}

                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 border border-transparent rounded-md background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear hover:border hover:border-red-500 transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )
            }


        </div >
    );
}

