import React from 'react'
import Marquee from 'react-fast-marquee'

export const brand = [

    {
        img: "images/brand-01.png"
    },
    {
        img: "images/brand-02.png"
    },
    {
        img: "images/brand-03.png"
    },
    {
        img: "images/brand-04.png"
    },
    {
        img: "images/brand-05.png"
    },
    {
        img: "images/brand-06.png"
    },
    {
        img: "images/brand-07.png"
    },
    {
        img: "images/brand-08.png"
    },

]

const Brands = () => {
    return (
        <>
            <div className="marque-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="marquee-inner-wrapper card-wrapper ">
                                <Marquee className='d-flex'>
                                    {brand.map((item, index) =>
                                        <div key={index} className='mx-4 w-25'>
                                            <img src={item.img} alt="brand" />
                                        </div>
                                    )}
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Brands