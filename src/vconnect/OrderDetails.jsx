import React, { useContext, useEffect } from 'react';
import { ProductContent } from '../components/Context/ProductProvider';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const OrderDetails = () => {
  const { id } = useParams();
  console.log("id:",id)
  const { GetorderDitail,GetUser } = useContext(ProductContent);

  useEffect(() => {
    GetorderDitail.mutate({id});
  },[]);
console.log("xnkacejsvkjs",GetorderDitail?.data?.orderDetails
);
  const orderData = GetorderDitail?.data?.orderDetails || {}; // Provide a default value if data is not available
  
  console.log('createdAt:', orderData?.createdAt);
  console.log('updatedAt:', orderData?.updatedAt);
  
  const userWithId = GetUser?.data?.users?.filter(user => user._id === orderData.orderby );
  console.log("sveufuiwe",userWithId);
  const formattedCreatedAt = orderData.createdAt ? format(new Date(orderData.createdAt), 'MMMM dd, yyyy HH:mm:ss') : '';
  const formattedUpdatedAt = orderData.updatedAt ? format(new Date(orderData.updatedAt), 'MMMM dd, yyyy HH:mm:ss') : '';
  
  console.log('updatedAtqws:', formattedUpdatedAt);
  return (
    <div className="order-details">
      <div className='order-details_title'><h2>Order Details</h2></div>
      <div className='order-details_top'>
        <div className='order-details_top_1'>
      <p><span className='top_1_x'>Order Status:  </span> {orderData.orderStatus}</p>
      
      <div className='top_1_s'><p><span className='top_1_x'>Ordered By:  </span></p>
      <p><span>
      <ul>
      {userWithId?.map((product) => (
        <li>
          <p>Name: {product.FullName}</p>
          <p>Email: {product.email}</p>
          <p>Phone: {product.phone}</p>
          </li>
      ))}
        </ul>
        </span>
        </p>
        </div>
      <p><span className='top_1_x'>Shipping Address:  </span> {orderData.shippingAddress}</p>
      <p><span className='top_1_x'>Total Order Price: </span>{orderData.totalOrderPrice} Rwf</p>
      </div>
      <div className='order-details_top_2'>
      <p><span className='top_1_x'>Order Created At: </span>{formattedCreatedAt}</p>
      <p><span className='top_1_x'>Order Updated At:</span> {formattedUpdatedAt}</p>
      <p><span className='top_1_x'>Quantity:</span> {orderData.quantity}</p>
      </div>
      </div>
      <div className='order-details_Bottom'>
      <h3>Ordered Products</h3>
      <ol className='ol_1'>
        {orderData.products?.map((product) => (
          <li key={product._id} >
            <div className='o_1'>
            <div className='o_1_0'>
              <img src={product.productImage[0]} alt="" />
            
            </div>
            <div className='o_1_j'>
            
              <div className='o_1_1'>
              <p><span className='o_1_1_t'>Product Name:</span> {product.productName}</p>
              <p><span className='o_1_1_t'>Price: </span>{product.price} Rwf</p>
              </div>
              <div className='o_1_2_x'>
              <div className='o_1_2'>
            <p>Description: {product.description}</p>
            
            </div>
            <div className='o_1_3'>

            <p>Sold: {product.sold}</p>
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

export default OrderDetails;
