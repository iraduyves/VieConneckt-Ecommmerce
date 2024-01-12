import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Brands from '../components/Brands';
import Services from '../components/Services';
import Blogs from '../components/Blogs';
import Products from '../components/Products';
import SpecialProduct from '../components/SpecialProduct';
import FamousProduct from '../components/FamousProduct';
import Annocument from '../components/Annocument';
import Categories from '../components/Categories/Categories ';
import Discount from '../components/Discount/Discount ';
import Wrapper from '../components/Wrapper/Wrapper ';
import { ProductContent } from '../components/Context/ProductProvider';

export const homeproduct = [

  {
    name: "Music & Gamming",
    img: "images/camera.jpg",
    items: 10
  },
  {
    name: "Smart Tv",
    img: "images/tv.jpg",
    items: 10
  },
  {
    name: "Smart Watch",
    img: "images/camera.jpg",
    items: 10
  },
  {
    name: "Cameras",
    img: "images/camera.jpg",
    items: 10
  },
  {
    name: "Music & Gamming",
    img: "images/camera.jpg",
    items: 10
  },
  {
    name: "Smart Tv",
    img: "images/camera.jpg",
    items: 10
  },
  {
    name: "Smart Watch",
    img: "images/camera.jpg",
    items: 10
  },
  {
    name: "Cameras",
    img: "images/camera.jpg",
    items: 10
  },

];


const Home = () => {
  const { NewArrivals,GetLatestProduct } = useContext(ProductContent)
  const latestProducts = NewArrivals?.data?.slice(0, 3);

  
  const LatestProduct = GetLatestProduct?.data?.popularProducts[0];



  return (
    <>
      <section className="home-wrapper-1 py-3">
        <div className="container-xxl">
          <div className="row top-div">
            <div className="col-6">
              <div className="">
                <div className="main-banner-content position-relative p-3">
                  <img
                    src="images/main-banner-1.jpg"
                    alt="main-banner"
                    className='img-fluid rounded-3'
                  />
                  <div className="">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>ipad S13+ Pro</h5>
                    <p>From 500,000 RWF or<br/> 42,000 RWF/mo.</p>
                    <Link className='button'>BUY NOW</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between p-3">
                <div className="small-banner position-relative ">
                  <img
                    src={LatestProduct?.productDetails?.productImage[0]}
                    alt="small-banner"
                    className='img-fluid rounded-3'
                  />

                  <div className="small-banner-content ">
                    <h4>best sales</h4>
                    <h5 className='lines-2'>{LatestProduct?.productName}</h5>
                    <p>From {LatestProduct?.productDetails?.price} RWF <br /> or {Math.round(LatestProduct?.productDetails?.price/12)}/mo.</p>
                  </div>
                </div>
                {latestProducts && latestProducts.length > 0 && latestProducts.map((item, index) => (
                  <div className="small-banner position-relative" key={index}>
                    <img
                      src={item?.productImage[0]}
                      alt="small-banner"
                      className='img-fluid rounded-3'
                    />
            
                    <div className="small-banner-content ">
                      <h4>NEW ARRIVAL</h4>
                      <h5 className='lines-2'>{item?.productName}</h5>
                      <p>For {item?.price} FRW<br/> or {Math.round(item?.price / 12)}RWF/mo.  </p>

                    </div>
                  </div>
                ))}


              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Services/> */}
      {/* <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex flex-wrap justify-content-between align-items-center" >
              {homeproduct.map((items,index)=>
                <div className='d-flex gapalign-items-center' key={index}>
                  <div>
                    <h6>{items.name}</h6>
                    <p>{items.items} Items</p>
                  </div>
                  <img src={items.img} alt="camera" />
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Wrapper />
      <Discount />
      <Products />
      <Categories />
      <SpecialProduct />
      <Brands />
      <Blogs />
      <Annocument />

    </>
  )
}

export default Home