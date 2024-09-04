import React from 'react'
import Slider from "react-slick";



export default function ProductImgSlider({ images }) {
    var settings = {
        customPaging: function (i) {
            return (
                <img className="my-5 rounded-md object-contain" src={images[i]} alt="Product image" />
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        arrows: false,
        
    };
    return (
        <Slider {...settings}>
            {images?.map((img) => {
                return <img key={img} className="w-full rounded-md object-contain max-w-lg mx-auto" src={img} alt="product image" />
            })}
        </Slider>
    )
}
