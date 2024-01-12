import React from 'react'
import ProductCard from './ProductCard'

const Products = () => {
  return (
    <>
    <div className="popular-wrapper py-5 home-wrapper-2 ">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">Featured Collection</h3>
                </div>
               <ProductCard/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Products