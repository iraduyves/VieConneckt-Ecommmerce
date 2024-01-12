import React from "react"
import  './style.css'
import TopCart from "./TopCart "
import { FaBorderAll } from "react-icons/fa";


const Categories = () => {
  

  return (
    <section className='TopCate background home-wrapper-2'>
    <div className='container'>
      <div className='heading d_flex'>
        <div className='heading-left row  f_flex'>
          <i className='fa-solid fa-border-all'></i>
          {/* <FaBorderAll className="i" /> */}
          <h2>Top Categories</h2>
        </div>
        <div className='heading-right row '>
          <span>View all</span>
          <i className='fa-solid fa-caret-right'></i>
        </div>
      </div>
      <TopCart />
    </div>
  </section>
  )
}

export default Categories