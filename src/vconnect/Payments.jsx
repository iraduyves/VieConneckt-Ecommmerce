import React, { useContext, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FaRegTrashAlt } from 'react-icons/fa';
import axios from '../components/configuration/axios';
import { ProductContent } from '../components/Context/ProductProvider';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import { MdOutlineNavigateNext } from "react-icons/md";


function Payments() {
  const { GetOrdersMade, DeleteOrder,GetAllPayments } = useContext(ProductContent);
  const [users, setUsers] = useState([]);

  const colorMap = {
    delivered: 'green',
    cancelled: 'red',
    pending: 'rgba(209, 192, 39, 1)',
  };

  const [pagenumber, setPagenumber] = useState(0);
  const bookpage = 8;
  const pageVisited = pagenumber * bookpage;
  const display = GetAllPayments?.data?.slice(pageVisited, pageVisited + bookpage);

  const changePage = ({ selected }) => {
    setPagenumber(selected);
  };

  const fetchUserData = async (userId) => {
    try {
      let user = JSON.parse(localStorage.getItem('isLoggedIn'));
      const response = await axios.get(`/api/v1/user/viewaUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    const fetchUserDataForOrder = async () => {
      GetAllPayments?.data?.forEach((orderby) => {
        fetchUserData(orderby.order?.orderby);
      });
    };

    fetchUserDataForOrder();
  }, [GetAllPayments]);

  return (
    <div>
      <div className='order_big_container'>
        <div className='order_min_container'></div>
        <div className='order_table_container'>
          <div className='order_product'>
            <h2>All Completed Payments</h2>
          </div>
          <div>
            <table>
              <thead className='allproduct_theader'>
                <th className='allproduct_theader_th'>Customer</th>
                <th className='allproduct_theader_th'>Shipping Address</th>
                <th className='allproduct_theader_th'>Total Amount</th>
                <th className='allproduct_theader_th'>Date</th>
                <th className='allproduct_theader_th'>more</th>
              </thead>
              <tbody>
                {display?.map((item, index) => (
              
                  <tr key={item._id}>
                    <td className='product_name_td_1'>
                      {users?.find((user) => user?._id === item?.order?.orderby)?.email || 'Unknown User'}
                    </td>
                    <td className='product_name_td_1'>{item?.order?.shippingAddress}</td>
                    <td className='product_name_td_1'>{item?.amount} Rwf</td>
                    <td className='product_name_td_1'>{item?.createdAt ? format(new Date(item?.createdAt), 'MMMM dd, yyyy HH:mm:ss') : ''}</td>
                    
                    <td className='product_name_td_1 l'>
                       <NavLink to={`${item._id}`} className='next_s '><MdOutlineNavigateNext className='more_a' /></NavLink>

                    </td>
                    
                  </tr>
                
                ))}
              </tbody>
            </table>
            <div className='order_pagination'>
              <ReactPaginate
                pageCount={Math.ceil(GetAllPayments?.data?.length / bookpage)}
                previousLabel={'<'}
                nextLabel={'>'}
                onPageChange={changePage}
                containerClassName='pagination_l_p'
                previousLinkClassName='privBtn_l'
                nextLinkClassName='NextBtn_l'
                disabledClassName='disable_l'
                activeClassName='paginationactiveL_l'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
