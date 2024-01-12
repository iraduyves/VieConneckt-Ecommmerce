import React from "react"

const Annocument = () => {
  const mystyle = {
    width: "30%",
    height: "340px",
    marginBottom: "20px"
  }
  const mystyle1 = {
    width: "68%",
    height: "340px",
  }
  return (
    <>
      <section className='home-wrapper-2 wrapper'>
        <div className='container-xxl d-flex gap-15 flex-wrap mb-20 ' style={{paddingBottom: '100px'}}>
          <div className='img' style={mystyle}>
            <img src='./images/banner-1.png' width='100%' height='100%' />
          </div>
          <div className='img' style={mystyle1}>
            <img src='./images/banner-2.png' width='100%' height={'100%'} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Annocument