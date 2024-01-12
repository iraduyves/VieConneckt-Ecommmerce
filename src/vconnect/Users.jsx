import React, { useContext } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";


import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

import { ProductContent } from '../components/Context/ProductProvider';

function Users() {

  const { GetUser, DeleteUser } = useContext(ProductContent);


  const [searchQuery, setSearchQuery] = useState('');
  const [pagenumber, setpagenumber] = useState(0);
  const bookpage = 7;

  
  const filteredUser = GetUser?.data?.users.filter(item =>
    Object.values(item).some(value => {
      // Check if the value is a string before using .includes
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false; // For non-string values, consider how you want to handle them
    })
  );
  const pageVisited = pagenumber * bookpage;
  const display = filteredUser?.slice(pageVisited, pageVisited + bookpage);
  const changepage = ({ selected }) => {
    setpagenumber(selected)
  };

  const HandleDelete = (id) => {
    DeleteUser.mutate(id);
  }

  return (
    <div className='allproduct_parent'>
      {/* <div><h2 className='add_product_title'>all Users</h2></div> */}
      <div className='allproduct_main'>

        <div className='allproduct_text_container'>
          <h2>All Users</h2>
          <div>
            <form>
              <input
                type="text"
                placeholder='search here...'
                className='search_input'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className='search_button'
                type='button'

              ><IoSearch className='search_icon' /></button>
            </form>
            {/* <HiDotsVertical /> */}
          </div>
        </div>
        <div className='table_px'>
          <table>
            <thead className='allproduct_theader'>
              <th className='allproduct_theader_th l'>Name</th>
              <th className='allproduct_theader_th'>Email</th>
              <th className='allproduct_theader_th'>Phone</th>
              <th className='allproduct_theader_th'>Role</th>
              <th className='allproduct_theader_th'>location</th>
              <th className='allproduct_theader_th'>Action</th>
              <th className='allproduct_theader_th'>More</th>




            </thead>
            <tbody>
              {display?.map((item, index) => (
                <tr key={item.id} className='product_name_tr_1'>

                  <td className='product_name_td_1'>

                    <div className='product_name_td_1 l'>
                      <div className='product_name_td_img_container'>
                        <img src={item.profileImage} alt="" className='product_name_td_img' />
                      </div>
                      <div>
                        <h1 className='product_name_td_h1'>{item.FullName}</h1>
                      </div>
                    </div>

                  </td>
                  <td className='product_name_td_1'>{item.email}</td>
                  <td className='product_name_td_1'>{item.phone}</td>
                  <td className='product_name_td_1'>{item.role}</td>
                  <td className='product_name_td_1'>{item.location}</td>

                  <td className='product_name_td_1'>
                    <button className='trach_button'><FaRegTrashAlt className='trash' onClick={()=>HandleDelete(item._id)}/></button>
                  </td>

                  <td className='product_name_td_1'>
                    <button className='more_button' onClick={() => window.location.href=`users/${item._id}`}><MdOutlineNavigateNext className='trash' /></button>
                  </td>

                </tr>

              ))}
            </tbody>
          </table>

        </div>


      </div>
      <div className="order_pagination">
      <ReactPaginate
        pageCount={Math.ceil(filteredUser?.length / bookpage)}
        previousLabel={<TbPlayerTrackPrevFilled />}
        nextLabel={<TbPlayerTrackNextFilled />}
        onPageChange={changepage}
        containerClassName="pagination_l_p"
        previousLinkClassName="privBtn_l"
        nextLinkClassName="NextBtn_l"
        disabledClassName="disable_l"
        activeClassName="paginationactiveL_l"
      >

      </ReactPaginate>
      </div>
    </div>
  )
}

export default Users
