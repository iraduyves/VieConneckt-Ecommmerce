import React from 'react'


export const Service = [
    {
        img: "images/service.png",
        service: "Free Shipping",
        description:"From all orders over $5"
    },
    {
        img: "images/service-02.png",
        service: "Daily Surprise offers",
        description:"Save up to 25% off"
    },
    {
        img: "images/service-03.png",
        service: "Support 24/7",
        description:"Shop with an Expert"
    },
    {
        img: "images/service-04.png",
        service: "Affordable Prices",
        description:"Get Factory Default Price"
    },
    {
        img: "images/service-05.png",
        service: "Secure Payment",
        description:"100% Protected Payment"
    },
  ]; 

const Services = () => {
  return (
    <>
    <div className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                {Service.map((item,index) =>
                <div className='d-flex align-items-center gap-15' >
                  <img src={item.img} alt="services" />
                  <div>
                    <h6>{item.service}</h6>
                    <p className='mb-0'>{item.description}</p>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services