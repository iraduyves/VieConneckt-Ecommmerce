import React, { useCallback, useContext, useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component";
import Input from '../components/input'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faHeart, faCodeCompare } from '@fortawesome/free-solid-svg-icons'
import { useForm, } from 'react-hook-form';
import TextArea from '../components/input/TextArea'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ReactImageZoom from 'react-image-zoom';
import { ProductContent } from '../components/Context/ProductProvider';
import axios from 'axios';
import Notiflix from 'notiflix';


const SingleProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [productData, setProductData] = useState(null);
    const [rating, setRating] = useState(0);

    const navigation = useNavigate();



    const [orderedProduct, SetOrderedProduct] = useState(true)

    const { id } = useParams();
    const { GetSingleProduct, CreateOrder, RateProduct, CreateCart } = useContext(ProductContent)
    const fetchProductData = async () => {
        try {
            const response = await axios.get(`https://vi-connect-e-commerce-api.onrender.com/api/v1/product/viewProd/${id}`);
            setProductData(response?.data?.product);
            Notiflix.Notify.success("Fetched Successfully!!");
        } catch (error) {
            console.error('Error fetching product data:', error);
            Notiflix.Notify.failure(error.response?.data?.message || 'Error fetching product data');
        }
    }

    const [Address, setAddress] = useState("");
    const [count, setCount] = useState(1);

    const MakeOrder = (id, count, color, Address) => {
        console.log(id, count, color, Address);
        CreateOrder.mutate({ id, count, color, Address })
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    const AddToCart = useCallback((prd) => {
        CreateCart.mutate(prd)
        console.log(prd);
    }, [CreateCart])

    
    const onSubmit = async (data) => {
        const reviewData = {
            star: rating,
            comment: data.comment,
        };
        const id = productData
        RateProduct.mutate({ data: reviewData, id })

        // console.log("your rev", { reviewData, id });

    }

    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title='Product Name' />
            <div className="main-product-wrapper home-wrapper-2 py-5">
                <div className="container-xxl ">

                    <div className="row" >
                        <div className="col-6">

                            <div className="main-product-image">
                                <div>

                                    <Zoom>
                                        <img src={productData?.productImage[0]} alt="" width="100" />
                                    </Zoom>
                                </div>
                            </div>
                            <div className="other-product-images d-flex flex-wrap gap-15">
                                <div > <img src={productData?.productImage[0]} alt="" className='image-fluid' /></div>
                                <div > <img src={productData?.productImage[1]} alt="" className='image-fluid' /></div>

                            </div>
                        </div>
                        <div className="col-6">
                            <div className="main-product-details">
                                <div className='border-bottom'>

                                    <h3 className='title'>{productData?.productName}</h3>
                                </div>
                                <div className="border-bottom py-3">
                                    <div className="price">
                                        <p className="price">RWF{productData?.price}</p>
                                        <div className="d-flex align-items-center gap-10">
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={productData?.totalRating}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <p className="mb-0">({productData?.totalRating > 0 ? 'Reviews' : '0 Review'})</p>

                                        </div>
                                        <a href="#review">Write a Review</a>
                                    </div>
                                </div>
                                <div className="border-bottom py-3 single">

                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Brand : </h3>
                                        <p className="product-data">{productData?.brand?.brandName}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Category :</h3>
                                        <p className="product-data">{productData?.category?.categoryName}</p>
                                    </div>

                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Availability :</h3>
                                        <p className="product-data">In Stock</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">color :</h3>
                                        <p className="product-data">{productData?.color?.colorName}</p>
                                    </div>
                                    <div className="d-flex gap-10 flex-row my-2 mt-2">
                                        <h3 className="product-heading">Quantity :</h3>
                                        <div className="f">
                                            <input type="number" name='' id='' defaultValue={count} onChange={(e) => { setCount(() => e.target.value) }} style={{ width: "70px" }} min={1} max={10} className='control-form mt-2 mb-3' />
                                        </div>
                                        <h3 className="product-heading">Address :</h3>
                                        <div className="f">
                                            <input type="text" name='' id='' defaultValue={""} onChange={(e) => { setAddress(() => e.target.value) }} style={{ width: "100%" }} className='control-form mt-2 mb-3' />
                                        </div>
                                    </div>
                                    <div className="d-flex gap-10 flex-row my-2 mt-2">
                                        <div className='d-flex align-items-center gap-30 ms-5'>
                                            <button className='button border-0 ' type='submit' onClick={() => AddToCart(productData)}>Add To Cart</button>
                                            <button className='button cartbtn ' type='submit' onClick={() => MakeOrder(productData?._id, count, productData.color?._id, Address)}>Buy It Now</button>
                                        </div>

                                    </div>
                                    <div className="d-flex  align-item-center gap-15">
                                        <div>
                                            <FontAwesomeIcon icon={faCodeCompare} className='fs-5 me-2' />Add to Compare
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faHeart} className='fs-5 me-2  ' style={{ color: 'red' }} />Add to WishList
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-column my-3 gap-10 mt-4">
                                        <h3 className="product-heading">Shipp & Returns :</h3>
                                        <p className="product-data">
                                            Free shipping and returns Availlable onn all orders!
                                            We ship all US domestic orders within 5-10 business Days!
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="descripton-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className="bg-white p-3">
                                <p >
                                    {productData?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 id='review' >Reviews</h3>
                            <div className="review-inner-wrapper">
                                <div className="review-head d-flex justify-content-between align-items-end">
                                    <div>
                                        <h4 className='mb-2'> Custome Reviews</h4>
                                        <div className='d-flex gap-10 align-items-center'>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={productData?.totalRating}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <p className="mb-0">Based on {productData?.totalRating > 0 ? 'Reviews' : '0 Review'}</p>
                                        </div>
                                    </div>
                                    {orderedProduct && (
                                        <div>
                                            <a href="/" className='text-dark text-decoration-underline'>Write a Review</a>
                                        </div>
                                    )}
                                </div>
                                <div className="review-form py-4">
                                    <h4 className='mb-20 '>WRITE REVIEW</h4>
                                    <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-15 mt-10'>
                                        <div className='mb-2'>
                                            <h4 >Name</h4>
                                            <Input type='text' icon={<><FontAwesomeIcon icon={faUser} className='faicon ' /></>} name='name' placeholder='Name' register={register("name", { required: true })} />
                                        </div>
                                        <div className='mb-2'>
                                            <h4 >Email</h4>
                                            <Input type='text' icon={<><FontAwesomeIcon icon={faEnvelope} className='faicon' /></>} name='email' placeholder='Email' register={register("email", { required: true })} />
                                        </div>
                                        <div className="review-star">
                                            <h4>Rating</h4>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={rating}
                                                edit={true}
                                                activeColor="#ffd700"
                                                onChange={(newRating) => setRating(newRating)}
                                            />

                                        </div>
                                        <div className='mb-4'>
                                            <h4>Your Review</h4>
                                            <TextArea type='text' icon={<><FontAwesomeIcon icon={faEnvelope} className='faicon' /></>} name='comment' placeholder='Your Message ' register={register("comment", { required: true })} />
                                        </div>
                                        <div style={{ width: '20%', minWidth: "fit-content", alignContent: 'end' }} >
                                            <button className='button' style={{ width: '100%' }}>Submit Review</button>
                                            {/* {load ? (Notiflix.Loading.standard('Loading...', {backgroundColor: 'rgba(0,0,0,0.8)',}) ):"Signup"} */}
                                        </div>
                                    </form>
                                </div>
                                <div className="reviews mt-3">
                                    <div className="review">
                                        <div className="d-flex gap-10 align-items-center ">
                                            <h6 className='mb-0'>Yves</h6>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={2}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <p className='mt-3'>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui atque ipsum quam esse nemo sint laboriosam fugit et laudantium fugiat consequatur facilis in aut, recusandae voluptates illum nulla sed voluptatem itaque quasi harum quaerat possimus rem. Nisi, corrupti placeat. Quas, neque minima eligendi sunt praesentium in laborum odio accusamus voluptates!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SingleProduct