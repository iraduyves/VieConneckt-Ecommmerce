import React, { useContext } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../Categories/style.css"
import { ProductContent } from "../Context/ProductProvider"

const Dcard = () => {
  const {GetAllCategories} = useContext(ProductContent);
  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }
  const Ddata = [
    {
      cover: "./images/discount/discount-1.png",
      name: "BenuX 2022",
      price: "250,000 RWF",
    },
    {
      cover: "./images/discount/discount-2.png",
      name: "Sony TV 1080p",
      price: "450,000 RWF",
    },
    {
      cover: "./images/discount/discount-3.png",
      name: "Sony PS4",
      price: "50,000 RWF",
    },
    {
      cover: "./images/discount/discount-4.png",
      name: "Setgearr 2022",
      price: "100,000 RWF",
    },
    {
      cover: "./images/discount/discount-5.png",
      name: "Tony BGB",
      price: "20,000 RWF",
    },
    {
      cover: "./images/discount/discount-6.png",
      name: "RG products",
      price: "200,000 RWF",
    },
    {
      cover: "./images/discount/discount-7.png",
      name: "Ranasonic 2022",
      price: "300,000 RWF",
    },
    {
      cover: "./images/discount/discount-8.png",
      name: "Pune HD",
      price: "30,000 RWF",
    },
    {
      cover: "./images/discount/discount-9.png",
      name: "Sony CCTV",
      price: "80,000 RWF",
    },
  ]
  return (
    <>
      <Slider {...settings} >
        {GetAllCategories?.data?.map((value, index) => {
          return (
            <>
              <div className='box product' key={index}>
                <div className='img' style={{height: 150}}>
                  <img src={value.image} alt='' width='100%' style={{width:"100%",height:"100%",objectFit:"contain"}} />
                </div>
                <span style={{fontSize:10}}>{value.categoryName}</span>
                <span>{value.price}</span>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default Dcard