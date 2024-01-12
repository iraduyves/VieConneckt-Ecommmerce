import React, { useContext, useEffect, useCallback } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { ProductContent } from '../components/Context/ProductProvider'
import { useState } from 'react'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import Input from '../components/input';
import { useMutation } from '@tanstack/react-query'
import axios from '../components/configuration/axios'
import Notiflix from 'notiflix'




function Card({ item }) {
  const { DeleteItemInCart, Editcart } = useContext(ProductContent)
  const [count, setCount] = useState(Number(item.count) || 1)

  const HandleDelete = () => {
    DeleteItemInCart.mutate(item?._id)
  }

  const handlecount = useCallback((e) => {
    setCount(e.target.valueAsNumber)

    const productId = item?.product?._id;
    const colorId = item?.product?.color?._id;
    Editcart.mutate({ productId, colorId, count: e.target.valueAsNumber });
  }, [Editcart, item?.product?._id, item?.product?.color?._id])

  return (
    <div className="cart-data py-3 d-flex justify-content-between align-items-center">
      <div className='cart-col-1 d-flex align-items-center gap-15'>
        <div style={{ width: "110px", height: "110px" }}>
          <img src={item?.product?.productImage[0]} alt="cart" className='image-fluid' style={{ objectFit: "contain", height: "100%", width: "100%" }} />
        </div>
        <div className='w-75'>
          <p className="title">{item?.product?.productName}</p>
        </div>
      </div>
      <div className='cart-col-2'>
        <h5 className="price">{item?.product?.price} RWF</h5>
      </div>
      <div className='cart-col-3 d-flex align-items-center gap-15 '>
        <div>
          <input className='form-control' type="number" name='' id='' min={0} max={10} defaultValue={count} onChange={handlecount} />
        </div>
        <div>
          <FontAwesomeIcon icon={faTrash} className='text-danger ' onClick={HandleDelete} style={{ cursor: 'pointer' }} />
        </div>
      </div>
      <div className='cart-col-4'>
        <h5 className="price"> {item?.product?.price * count} RWF</h5>
      </div>
    </div>
  )
}

function MtnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="145 65 270 270" style={{width: "2rem", height: "2rem"}}><path d="m145 65h270v270h-270z" fill="#fff"/><path d="m158.163 78.136h243.702v243.702h-243.702z" fill="#ffcb05"/><g fill-rule="nonzero"><path d="m394.237 199.285c0 26.014-51.138 47.101-114.21 47.101-63.086 0-114.224-21.087-114.224-47.101 0-26.015 51.138-47.088 114.224-47.088 63.072 0 114.21 21.073 114.21 47.088" fill="#00678f"/><path d="m206.844 222.532 11.812-47.102h18.873v27.432l12.407-27.432h19.48l-11.799 47.101h-12.406l7.073-30.401-14.755 30.401h-10.017v-30.401l-7.695 30.401h-12.974z" fill="#fff"/><path d="m273.237 223.126 1.768-6.561h13.581l-1.782 6.561h-13.568z" fill="#ed1d24"/><path d="m303.625 222.532 11.799-47.102h13.581l5.913 25.056 6.48-25.056h12.393l-11.799 47.101h-12.987l-6.494-25.636-6.493 25.636h-12.393z" fill="#fff"/><path d="m273.237 175.43-2.957 11.934h12.406l-6.682 25.88h13.567l6.697-25.88h12.392l2.943-11.934h-38.367z" fill="#ffcb05"/></g></svg>
  )
}

function Cart() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigation = useNavigate();
  const { GetCarts, MakePayment, GetOrders, GetAllProduct } = useContext(ProductContent)

  const [address, setAddress] = useState("")
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const CreateCartOrder = useMutation({
    mutationFn: async (data) => {
      console.log("payment", { data });
      let user = JSON.parse(localStorage.getItem("isLoggedIn"));

      const response = await axios.post(`/api/v1/order/createCartOrder`, data, {
        "content-type": "multipart/form-data",
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      Notiflix.Notify.success("cart order IS Sucessfully Done !!");
      setCreatedOrderId(data.order._id)
      setPaymentModalOpen(true)
      const shippingAddressModal = document.getElementById('shippingAddress');
      shippingAddressModal.classList.remove('show');
      shippingAddressModal.style.display = 'none';

    },
    onError: (error) => {
      console.log(error);
    },
  });


  const handleCheckoutClick = (body) => {


    const numberOfProducts = GetCarts?.data?.length || 0;
    const selectedProductIndices = Array.from({ length: numberOfProducts }, (_, index) => index);

    body.selectedProductIndices = selectedProductIndices
    console.log(body);
    CreateCartOrder.mutate(body);

  };
  const handlePaymentSubmit = (body) => {

    const { shippingAddress, ...paymentBody } = body;
    MakePayment.mutate({ data: paymentBody, id: createdOrderId });

  };
  const handlePaymentModalClose = () => {
    setPaymentModalOpen(false);
    window.location.reload()
  };
  useEffect(() => {
    if (isPaymentModalOpen) {
      const paymentModal = document.getElementById('paymentModal');
      paymentModal.classList.add('show');
      paymentModal.style.display = 'block';
    }
  }, [isPaymentModalOpen]);
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      {isPaymentModalOpen && (
        <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className='d-flex gap-2' style={{alignItems: 'center'}}> 
                  <h1 class="modal-title fs-5" id="paymentModal">Payment Information </h1><MtnIcon />
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handlePaymentModalClose}></button>
              </div>
              <div class="modal-body sign">
                <form onSubmit={handleSubmit(handlePaymentSubmit)}>
                  <Input
                    icon={<FontAwesomeIcon icon={faLocation} className='faicon' />}
                    name='number'
                    placeholder='Enter your payment number'
                    register={register("number", { required: true })}
                  />

                  {errors.number && <p style={{ color: 'red', fontSize: 'small' }}>payment number is required to proceed the payment</p>}

                  <button className="button" >Pay</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cart-wrapper home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Products</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              {/* {GetCarts?.data
                  ?.map((item) => {
                    const product = GetAllProduct.data?.filter(
                      (i) => i._id === item.product
                    )[0];
                    return { ...item, product };
                  })
                  .map((item, index) => (
                    <Card item={item} key={item?._id} />
                  ))}  */}
              {GetCarts?.data?.map((item, index) =>
                <Card item={item} key={item?._id} />
              )}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <button className="button" onClick={() => { navigation("/ourstore") }}>
                  back To shopping
                </button>

                <div className="d-flex flex-column align-items-end">
                  <h4>{GetCarts?.data
                    ?.map((item) => {
                      const product = GetAllProduct.data?.filter(
                        (i) => i._id === item.product?._id
                      )[0];
                      return { ...item, product };
                    })
                    .reduce(
                      (sum, i) => sum + (i?.price * i?.count || 0),
                      0
                    )}{" "}
                    RWF</h4>
                  <p>No Taxes and Shipping fees</p>
                  <button className='button' data-bs-toggle="modal" data-bs-target="#shippingAddress">Checkout</button>
                  <div class="modal fade" id="shippingAddress" tabindex="-1" aria-labelledby="shippingAddress" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="shippingAddress">Shipping Address</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body sign">

                          <form onSubmit={handleSubmit(handleCheckoutClick)}>
                            <Input
                              icon={<FontAwesomeIcon icon={faLocation} className='faicon' />}
                              name='shippingAddress'
                              placeholder='Shipping Address'
                              register={register("shippingAddress", { required: true })}
                            />

                            {errors.shippingAddress && <p style={{ color: 'red', fontSize: 'small' }}>Shipping address is required to proceed making order</p>}

                            <button className="button" >Proceed</button>
                          </form>
                          {/* {load ? (Notiflix.Loading.standard('Loading...', {backgroundColor: 'rgba(0,0,0,0.8)',}) ):"Signup"} */}

                        </div>

                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart