import React, { useContext } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { useDebounce } from 'use-debounce';
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';
import { FaPencilAlt } from "react-icons/fa";
import Edit_product from './Edit_product';




function All_product() {


  const { GetAllProduct, DeleteProduct, GetAllBlogs } = useContext(ProductContent);

  // console.log("blogs",GetAllBlogs);

  const HandleDelete = (id) => {
    DeleteProduct.mutate(id)
  }


  const [EditProduct, setEditProduct] = useState(false)
  const [editproduct, seteditproduct] = useState(null)

  const handleEditClick = (item) => {
    seteditproduct(item)
    setEditProduct((previsEditMadel) => !previsEditMadel);
  }

  const colorMap = {
    '2023-12-06T08:33:58.725Z': 'green',
    'out of stock': 'red',
    'coming soon': 'rgba(209, 192, 39, 1)',
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchQuery, 500);
  const [colors, setColors] = useState('black');
  const [pagenumber, setpagenumber] = useState(0);
  const bookpage = 7;





  useEffect(() => {

    const newFilteredProducts = GetAllProduct?.data?.filter((item) => {
      return (
        debouncedSearchTerm &&
        Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
          } else if (Array.isArray(value)) {
            return value.some(
              (subValue) =>
                typeof subValue === 'string' &&
                subValue.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
          } else if (typeof value === 'object' && value !== null) {
            return Object.values(value).some(
              (subValue) =>
                typeof subValue === 'string' &&
                subValue.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
          }
          return false;
        })
      );
    });

    setFilteredProducts(newFilteredProducts);
  }, [debouncedSearchTerm, GetAllProduct]);

  useEffect(() => {
    // Set the color based on the product status
    const newColors = GetAllProduct?.data?.map(item => colorMap[item?.status] || 'black');
    setColors(newColors);
  }, []);

  const pageVisited = pagenumber * bookpage;
  // const display = filteredProducts?.slice(pageVisited, pageVisited + bookpage);
  const display =  debouncedSearchTerm === '' ? GetAllProduct?.data?.slice(pageVisited, pageVisited + bookpage) : filteredProducts?.slice(pageVisited, pageVisited + bookpage)


  const changepage = ({ selected }) => {
    setpagenumber(selected);
  };



  return (
    <div className='allproduct_parent'>
      {EditProduct && <Edit_product handleEditClick={handleEditClick} item={editproduct} />}
      {/* <div><h2 className='add_product_title'>all product</h2></div> */}
      <div className='allproduct_main'>

        <div className='allproduct_text_container'>
          <h2>All product</h2>
          <div className='cat_search'>
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
        
              <th className='allproduct_theader_th l'>product name</th>
              <th className='allproduct_theader_th'>price</th>
              <th className='allproduct_theader_th'>category</th>
              <th className='allproduct_theader_th'>brand</th>
              <th className='allproduct_theader_th'>quantity in stock</th>
              <th className='allproduct_theader_th'>Color</th>
              <th className='allproduct_theader_th'>action</th>


            </thead>
            <tbody>
              {debouncedSearchTerm !== '' && display?.length === 0 && (
                <tr>
                  <td colSpan='7'>
                    <p style={{ color: 'red' }}>No products found matching "{searchQuery}"</p>
                  </td>
                </tr>
              )}

              {debouncedSearchTerm === '' &&
                display?.map((item, index) => (
                  <tr key={item?._id}>
                    <td className='product_name_td_1'>
                      <div className='product_name_td_1 l'>
                        <div className='product_name_td_img_container'>
                          <img src={item?.productImage[0]} alt="" className='product_name_td_img' />
                        </div>
                        <div className='product_name_td_la'>
                          <h1 className='product_name_td_h1'>{item?.productName}</h1>
                        </div>
                      </div>
                    </td>
                    <td className='product_name_td_1'>{item?.price}</td>
                    <td className='product_name_td_1'>{item?.category?.categoryName}</td>
                    <td className='product_name_td_1'>{item?.brand?.brandName}</td>
                    <td className='product_name_td_1'>{item?.stock_quantity}</td>
                    <td className='product_name_td_1' style={{ color: item?.color?.colorName }}>{item?.color?.colorName}</td>
                    <td className='product_name_td_1'>
                      <div className='product_name_td_1_action'>
                      <button className='trach_button_E' onClick={() => handleEditClick(item)}><FaPencilAlt className='trash' /></button>
                      <button className='trach_button' onClick={() => HandleDelete(item?._id)}><FaRegTrashAlt className='trash' /></button>
                      </div>
                    </td>

                  </tr>
                ))}

              {debouncedSearchTerm !== '' &&
                display?.map((item, index) => (
                  <tr key={item?._id}>
                    <td className='product_name_td_1'>
                      <div className='product_name_td_1 l'>
                        <div className='product_name_td_img_container'>
                          <img src={item?.productImage[0]} alt="" className='product_name_td_img' />
                        </div>
                        <div className='product_name_td_la'>
                          <h1 className='product_name_td_h1'>{item?.productName}</h1>
                        </div>
                      </div>
                    </td>
                    <td className='product_name_td_1'>{item?.price}</td>
                    <td className='product_name_td_1'>{item?.category?.categoryName}</td>
                    <td className='product_name_td_1'>{item?.brand?.brandName}</td>
                    <td className='product_name_td_1'>{item?.stock_quantity}</td>
                    <td className='product_name_td_1' style={{ color: item?.color?.colorName }}>{item?.color?.colorName}</td>
                    <td className='product_name_td_1'>
                      <button className='trach_button_E' onClick={() => handleEditClick(item)}><FaPencilAlt className='trash' /></button>
                      <button className='trach_button' onClick={() => HandleDelete(item?._id)}><FaRegTrashAlt className='trash' /></button>

                    </td>

                  </tr>
                ))}

              
            </tbody>
          </table>

        </div>


      </div>
      <ReactPaginate
        pageCount={Math.ceil(GetAllProduct?.data?.length / bookpage)}
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
  )
}

export default All_product