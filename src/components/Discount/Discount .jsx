import React, { useContext } from "react"
import Dcard from "./Dcard"
import { ProductContent } from "../Context/ProductProvider";

const Discount = () => {
  const {GetAllCategories} = useContext(ProductContent);
  return (
    <>
      <section className=' home-wrapper-2 Discount background NewArrivals'>
        <div className='container-xxl'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              <img src='https://img.icons8.com/windows/32/fa314a/gift.png' alt="discount"/>
              <h2>Top Categories</h2>
            </div>
            <div className='heading-right row '>
              <span>View all</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <Dcard />
        </div>
      </section>
    </>
  )
}

export default Discount