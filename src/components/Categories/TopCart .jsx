import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const TopCart = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  }
  const Tdata = [
    {
      cover: "./images/top/category-1.png",
      para: "headphone",
      desc: "3k orders this week",
    },
    {
      cover: "./images/top/category-2.png",
      para: "watch",
      desc: "4k orders this week",
    },
    {
      cover: "./images/top/category-3.png",
      para: "sunglass",
      desc: "6k orders this week",
    },
    {
      cover: "./images/top/category-2.png",
      para: "watch",
      desc: "4k orders this week",
    },
    {
      cover: "./images/top/category-3.png",
      para: "sunglass",
      desc: "6k orders this week",
    },
  ]
  
  return (
    <>
      <Slider {...settings}>
        {Tdata.map((value, index) => {
          return (
            <>
              <div className='box product' key={index}>
                <div className='nametop d_flex'>
                  <span className='tleft'>{value.para}</span>
                  <span className='tright'>{value.desc}</span>
                </div>
                <div className='img'>
                  <img src={value.cover} alt='' />
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default TopCart