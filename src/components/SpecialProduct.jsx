import React from 'react'
import SpecialProductCard from './SpecialProductCard'

const SpecialProduct = () => {
  return (
    <>
    <div className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">Most Bought Products</h3>
                </div>
            </div>
            <div className="row gap-15" style={{gap:'15px'}}>
                <SpecialProductCard/>
            </div>
        </div>
    </div>
    </>
  )
}

export default SpecialProduct