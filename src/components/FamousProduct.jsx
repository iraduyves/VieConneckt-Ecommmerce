import React from 'react'

const FamousProduct = () => {
    return (
        <>
            <div className="famous-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3 " style={{display: 'flex', justifyContent:'space-between',gap:'40px'}}>
                            <div className="famous-card position-relative ">
                                <img
                                    src="images/smartWatchseries7.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain'}}
                                    className='img-fluid'
                                />
                                <div className="famous-content position-absolute" >
                                    <h5>Big Screen</h5>
                                    <h6>Smart Watch Serie7</h6>
                                    <p>From $399 or $16.62/mo. for 24 mo.*</p>
                                </div>
                            </div>
                            <div className="famous-card position-relative ">
                                <img
                                    src="images/smartWatchseries7.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain'}}
                                    className='img-fluid'
                                />
                                <div className="famous-content position-absolute" >
                                    <h5>Big Screen</h5>
                                    <h6>Smart Watch Serie7</h6>
                                    <p>From $399 or $16.62/mo. for 24 mo.*</p>
                                </div>
                            </div>
                            <div className="famous-card position-relative">
                                <img
                                    src="images/smartWatchseries7.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain'}}
                                    className='img-fluid'
                                />
                                <div className="famous-content position-absolute" >
                                    <h5>Big Screen</h5>
                                    <h6>Smart Watch Serie7</h6>
                                    <p>From $399 or $16.62/mo. for 24 mo.*</p>
                                </div>
                            </div>
                            <div className="famous-card position-relative">
                                <img
                                    src="images/smartWatchseries7.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain'}}
                                    className='img-fluid'
                                />
                                <div className="famous-content position-absolute" >
                                    <h5>Big Screen</h5>
                                    <h6>Smart Watch Serie7</h6>
                                    <p>From $399 or $16.62/mo. for 24 mo.*</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="d-flex col-3 gap-10">

                                <img
                                    src="images/macbook2.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain' }}
                                    className='img-fluid'
                                />
                                <img
                                    src="images/macbook2.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain' }}
                                    className='img-fluid'
                                />
                                <img
                                    src="images/macbook2.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain' }}
                                    className='img-fluid'
                                />
                                <img
                                    src="images/macbook2.jpg"
                                    alt="famous product"
                                    style={{objectFit:'contain' }}
                                    className='img-fluid'
                                />
                              
                            
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FamousProduct