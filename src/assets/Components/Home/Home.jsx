import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import { Helmet } from 'react-helmet';
import backBag from '/src/assets/Images/41nN4nvKaAL._AC_SY200_.jpg'
import babyCarSeat from '/src/assets/Images/61cSNgtEISL._AC_SY200_.jpg'
import goldNecklace from '/src/assets/Images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import travelBags from '/src/assets/Images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import music from '/src/assets/Images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import Slider from "react-slick";
import Categories from '../Categories/Categories';
import Products from '../Products/Products';

export default function Home(props) {

    const [Categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    var settings = {
        dots: false,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: false,
    };

    let sliderRef = useRef(null);
    let catSliderRef = useRef(null);
    const nextProductSlider = () => {
        sliderRef.current.slickNext();
    };
    const previousProductSlider = () => {
        sliderRef.current.slickPrev();
    };

    const nextCategorySlider = () => {
        catSliderRef.current.slickNext();
    };
    const previousCategorySlider = () => {
        catSliderRef.current.slickPrev();
    };

    var catSettings = {
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



    useEffect(() => {
        getCategories()
    }, [])


    async function getCategories() {
        setIsLoading(true)
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
        setIsLoading(false)
    }
    return (

        isLoading ? <LoadingScreen /> : <>
            < Helmet>
                <title>FreshCart</title>

            </Helmet>
            <>
                <header className='w-full'>

                    <div className="container mx-auto w-10/12 md:w-6/12 grid grid-cols-2 mt-10 ">
                        <div className='col-span-2 md:col-span-1 mb-5'>
                            <Slider ref={slider => { sliderRef.current = slider }} {...settings}>
                                <img className='w-full' src={backBag} alt="backBag" />
                                <img className='w-full' src={babyCarSeat} alt="backBag" />
                                <img className='w-full' src={goldNecklace} alt="backBag" />
                            </Slider>
                            <div className='text-center mt-5'>
                                <button className="button me-3 py-1 px-2 bg-slate-300 rounded-lg hover:bg-slate-500 transition-colors duration-100" onClick={previousProductSlider}>

                                </button>
                                <button className="button py-1 px-2 bg-slate-300 rounded-lg hover:bg-slate-500 transition-colors duration-100" onClick={nextProductSlider}>

                                </button>
                            </div>

                        </div>
                        <div className="col-span-2 md:col-span-1 mb-5">
                            <img src={travelBags} alt="travelBags" />
                            <img src={music} alt="music" />

                        </div>

                    </div>
                    {/* Categories Slider */}
                    <div className='mt-3'>
                        <Slider ref={slider => { catSliderRef.current = slider }} {...catSettings}>
                            {Categories?.map((category) => {
                                return <div key={category._id} className="w-full max-w-sm mx-auto  overflow-hidden p-1">
                                    <div className="shadow-md rounded-md">
                                        <div className="flex items-end justify-end h-80 w-full bg-cover bg-no-repeat bg-center" style={{ "backgroundImage": `url(${category.image})` }}>
                                        </div>
                                        <div className="px-5 py-3">
                                            <h3 className="text-gray-700 uppercase line-clamp-1 hover:font-bold">{category.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </Slider>
                        <div className='text-center mt-5'>
                            <button className="button me-3 py-1 px-2 bg-slate-300 rounded-lg hover:bg-slate-500 transition-colors duration-100" onClick={previousCategorySlider}>

                            </button>
                            <button className="button py-1 px-2 bg-slate-300 rounded-lg hover:bg-slate-500 transition-colors duration-100" onClick={nextCategorySlider}>

                            </button>
                        </div>
                    </div>

                </header>

                {/* Products View */}
                <Products/>

            </>

        </>
    );
}

