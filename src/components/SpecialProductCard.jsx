import React, { useContext } from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import { ProductContent, GetAllBrands } from './Context/ProductProvider';


const specialProduct = [

    {
        image: "images/whitecamera.jpg",
        brand: "Camera",
        title: "Canon EOS 4000D DSLR Camera EF-S 18-55 mm...",
        price1: "60,000RWF",
        price2: "52,000RWF",
        nbrOfItems: 6
    },
    {
        image: "images/smartwatch002.jpg",
        brand: "Smart Watch",
        title: "Amazfit GTS Fitness Smart Watch: 14-Day Battery li ...",
        price1: "60,000RWF",
        price2: "40,000RWF",
        nbrOfItems: 25
    },
    {
        image: "images/speaker1.jpg",
        brand: "Speaker",
        title: "Sony EXTRA BASS Portable Bluetooth Speaker,...",
        price1: "58,000RWF",
        price2: "50,000RWF",
        nbrOfItems: 19
    },


]




const SpecialProductCard = () => {
    const { GetLatestProduct, GetAllBrands } = useContext(ProductContent)
    const getBrandNameById = (brandId) => {
        const brand = GetAllBrands?.data?.find((brand) => brand._id === brandId);
        return brand ? brand.brandName : 'Unknown Brand';
    };

    return (
        <>
            <div className="product-cards">
                {GetLatestProduct?.data?.popularProducts?.slice(0, 3).map((item, index) =>
                    <div key={index}>
                        <img src={item?.productDetails?.productImage[0]} alt="special product" />
                        <div className="">
                            <h5 className="brand" style={{ color: "var(--color-bf4800)" }}>{getBrandNameById(item?.productDetails?.brand)}</h5>
                            <h6 className="title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>{item.productName}</h6>
                            <ReactStars
                                count={5}
                                size={24}
                                value={item?.productDetails?.ratings[0].star}
                                edit={false}
                                activeColor="#ffd700"
                            />
                            <p className="price">
                                <span className="red-p">{item?.productDetails?.price} RWF </span>
                            </p>

                            <div className="prod-count my-3">
                                <p>Products:{item.orderCount}</p>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: '25%' }}
                                        aria-valuenow={Math.round(item?.productDetails?.ratings[0]?.star * 5 / 100)}
                                        aria-valuemin="0"
                                        aria-valuemax="100" >
                                    </div>
                                </div>
                            </div>
                            {/* <Link className='button'>Add to cart</Link> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SpecialProductCard