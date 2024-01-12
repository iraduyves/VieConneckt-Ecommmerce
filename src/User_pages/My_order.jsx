import React, { useContext } from 'react'
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { ProductContent } from '../components/Context/ProductProvider';
function My_order() {

  const {GetOrders} = useContext(ProductContent)

  // console.log("orders",GetOrders.data);
  


  const Orders = [{
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  {
    id: "27732",
    product_name: "iphone 13 ",
    totalprice: "10000",
    Date: "27/02/2023 10:20:40",
    category: "phone",
    brand: "apple",
    address: "kk500st",
    status: "pending",
  },
  ]

  const colorMap = {
    'delivered': 'green',
    'cancelled': 'red',
    'pending': 'rgba(209, 192, 39, 1)',
  };
  const [colors, setColors] = useState('black');
  const [pagenumber, setpagenumber] = useState(0);
  const bookpage = 5;
  const pageVisited = pagenumber * bookpage;
  const display = GetOrders?.data?.slice(pageVisited, pageVisited + bookpage);

  const changepage = ({ selected }) => {
    setpagenumber(selected)
  };

  useEffect(() => {
    // Set the color based on the product status
    const newColors = Orders.map(item => colorMap[item.status] || 'black');
    setColors(newColors);
  }, []);
  return (
    <div>
      <div className="my_order">
        <div className='My_order_title'>
          <h2>My order</h2>
        </div>
        <div>
          <table>
            <thead className='my_order_theader'>
              <th className='my_order_th'>product name</th>
              <th className='my_order_th'>total price</th>
              <th className='my_order_th'>category</th>
              <th className='my_order_th'>brand</th>
              <th className='my_order_th'>date</th>
              <th className='my_order_th'>address</th>
              <th className='my_order_th'>status</th>
            </thead>
            <tbody>
              {display?.map((item, index) => (
                <tr key={item._id}>
                  <td className='my_order_td_1'>
                    {item?.products[0]?.productName}
                  </td>

                  <td className='my_order_td_1'>{item?.totalOrderPrice}</td>
                  <td className='my_order_td_1'>{item?.products[0]?.category?.categoryName}</td>
                  <td className='my_order_td_1'>{item?.products[0]?.brand?.brandName}</td>
                  <td className='my_order_td_1'>{item?.products[0]?.createdAt}</td>
                  <td className='my_order_td_1'>{item.shippingAddress}</td>
                  <td className='my_order_td_1' style={{ color: item?.orderStatus === 'Pending' ? 'rgba(209, 192, 39, 1)' : 'green' }}>{item.orderStatus}</td>

                </tr>

              ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(GetOrders?.data?.length / bookpage)}
            previousLabel={<TbPlayerTrackPrevFilled />}
            nextLabel={<TbPlayerTrackNextFilled />}
            onPageChange={changepage}
            containerClassName="pagination_l"
            previousLinkClassName="privBtn_l"
            nextLinkClassName="NextBtn_l"
            disabledClassName="disable_l"
            activeClassName="paginationactiveL_l"
          >

          </ReactPaginate>
        </div>
      </div>
    </div>
  )
}

export default My_order
