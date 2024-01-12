import React, { useContext } from "react"
import "../Categories/style.css"
import { ProductContent } from "../Context/ProductProvider";

const Wrapper = () => {
  
  const data = [
    {
        img: "images/service.png",
      title: "Worldwide Delivery",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
        img: "images/service-05.png",
      title: "Safe Payment",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
        img: "images/service-02.png",
      title: "Daily Suprise Offers ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
        img: "images/service-03.png",
      title: "24/7 Support ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ]
  return (
    <>
      <section className=' home-wrapper-2 wrapper' >
        <div className='container grid2 '>
          {data?.map((val, index) => {
            return (
              <div className='product mt-20' key={index}>
                <div className='img icon-circle'>
                  <i><img src={val.img} alt="" /></i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper