import React, { useContext, useMemo } from 'react';
import { ProductContent } from '../components/Context/ProductProvider';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';


function MtnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="145 65 270 270" style={{ width: "2rem", height: "2rem" }}><path d="m145 65h270v270h-270z" fill="#fff" /><path d="m158.163 78.136h243.702v243.702h-243.702z" fill="#ffcb05" /><g fill-rule="nonzero"><path d="m394.237 199.285c0 26.014-51.138 47.101-114.21 47.101-63.086 0-114.224-21.087-114.224-47.101 0-26.015 51.138-47.088 114.224-47.088 63.072 0 114.21 21.073 114.21 47.088" fill="#00678f" /><path d="m206.844 222.532 11.812-47.102h18.873v27.432l12.407-27.432h19.48l-11.799 47.101h-12.406l7.073-30.401-14.755 30.401h-10.017v-30.401l-7.695 30.401h-12.974z" fill="#fff" /><path d="m273.237 223.126 1.768-6.561h13.581l-1.782 6.561h-13.568z" fill="#ed1d24" /><path d="m303.625 222.532 11.799-47.102h13.581l5.913 25.056 6.48-25.056h12.393l-11.799 47.101h-12.987l-6.494-25.636-6.493 25.636h-12.393z" fill="#fff" /><path d="m273.237 175.43-2.957 11.934h12.406l-6.682 25.88h13.567l6.697-25.88h12.392l2.943-11.934h-38.367z" fill="#ffcb05" /></g></svg>
  )
}

const PaymentDetails = () => {
  const { id } = useParams();
  console.log("id:", id)
  const { GetUser, GetAllPayments } = useContext(ProductContent);



  console.log(GetAllPayments?.data);

  const currentPayment = useMemo(() => {
    return GetAllPayments?.data?.filter(p => p?._id === id)[0]
  }, [GetAllPayments?.data, id])

  const userWithId = useMemo(() =>
    GetUser?.data?.users?.filter(user => currentPayment?.order?.orderby === user._id),
    [GetUser?.data?.users, currentPayment?.order?.orderby]
  );

  const formattedCreatedAt = currentPayment?.order?.createdAt ? format(new Date(currentPayment?.order?.createdAt), 'MMMM dd, yyyy HH:mm:ss') : '';
  const formattedUpdatedAt = currentPayment?.order?.updatedAt ? format(new Date(currentPayment?.order?.updatedAt), 'MMMM dd, yyyy HH:mm:ss') : '';

  return (
    <div className="order-details">
      <div className='order-details_title'><h2>Payment Details</h2></div>
      <div className='order-details_top'>
        <div className='order-details_top_1'>
          <p><span className='top_1_x'>Order Status:  </span> {currentPayment?.order?.orderStatus}</p>

          <div className='top_1_s'><p><span className='top_1_x'>Ordered By:  </span></p>
            <p><span>
              <ul>
                {userWithId?.map((user) => (
                  <li>
                    <p>Name: {user.FullName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                  </li>
                ))}
              </ul>
            </span>
            </p>
          </div>
          <p><span className='top_1_x'>Shipping Address:  </span> {currentPayment?.order?.shippingAddress}</p>
          <p><span className='top_1_x'>Total Order Price: </span>{currentPayment?.order?.totalOrderPrice} Rwf</p>
          <p><span className='top_1_x'>Payment Method : <MtnIcon /></span></p>
        </div>
        <div className='order-details_top_2'>
          <p><span className='top_1_x'>Order Created At: </span>{formattedCreatedAt}</p>
          <p><span className='top_1_x'>Order Updated At:</span> {formattedUpdatedAt}</p>
          {/* <p><span className='top_1_x'>Quantity:</span> {GetAllPayments?.data?.quantity}</p> */}
        </div>
      </div>
      <div className='order-details_Bottom'>
        <h3>Ordered Products</h3>
        <ol className='ol_1'>
          {currentPayment?.order?.products?.map(({product, _id}) => (
            <li key={_id} >
              <div className='o_1'>
                <div className='o_1_0'>
                  <img src={product?.productImage?.[0]} alt="" />

                </div>
                <div className='o_1_j'>

                  <div className='o_1_1'>
                    <p><span className='o_1_1_t'>Product Name:</span> {product?.productName}</p>
                    <p><span className='o_1_1_t'>Price: </span>{product?.price} Rwf</p>
                  </div>
                  <div className='o_1_2_x'>
                    <div className='o_1_2'>
                      <p>Description: {product?.description}</p>

                    </div>
                    <div className='o_1_3'>

                      <p>Sold: {product?.sold}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>

          ))}
        </ol>
      </div>
    </div>
  );
};

export default PaymentDetails;
