import React from 'react'
import ReactPaginate from 'react-paginate';
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect, useContext } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

import Create_brand from './Create_brand';
import Edit_brand from './Edit_brand';

import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import ProductProvider, { ProductContent } from '../components/Context/ProductProvider';

function Brand() {
  const {GetAllBrands,DeleteBrand} = useContext(ProductContent)
// console.log("category:",GetAllBrands?.data);
const [EditBrand,setEditBrand] = useState(false)
const [editbrand,seteditbrand] = useState(null)
const [CreateBrand, setCreateBrand]= useState(false)
  const[pagenumber,setpagenumber] = useState(0);
const bookpage = 15;
const pageVisited = pagenumber*bookpage;
const display = GetAllBrands?.data?.slice(pageVisited,pageVisited+bookpage);
const changepage = ({selected}) =>{
  setpagenumber(selected)
};
const handleCreateClick = () => {
  setCreateBrand((previsEditMadel) => !previsEditMadel);
}
const handleEditClick = (item) => {
  seteditbrand(item)
  setEditBrand((previsEditMadel) => !previsEditMadel);
}

const HandleDelete = (id) => {
  DeleteBrand.mutate(id)
}
  return (
    <div>
      {CreateBrand && <Create_brand handleCreateClick = {handleCreateClick}/>}
      {EditBrand && <Edit_brand handleEditClick = {handleEditClick} item={editbrand}/>}
      <div className='allcategory_main'>
                  
                  <div className='category_product_x_l1'>
                         <h2>All Brand</h2> 
                           <button className="Create_new_category" onClick={handleCreateClick}>Create new brand</button>        
                  </div>
                  <div className="category_display_container">

                    {display?.map((item, index) => (          
                     <div className="brand_display">
                      <div className='brand_icon'>
                          <img src={item?.image} alt="" />
                        </div>
                      <div className='brand_action_and_icon'>
                      <div><p>Name: <span>{item.brandName}</span></p></div>
                        <div className='brand_action'>
                        <div className='brand_edit'>
                        <button onClick={() => handleEditClick(item)}><FaPencilAlt className='icon' /></button>
                        </div>
                        <div className='brand_delete'>
                        <button><GoTrash className='icon' onClick={()=>HandleDelete(item._id)}/></button>
                        </div>
                        </div>
                       
                        
                      </div>
                     </div>
                     
                    ))}      
                               
                  </div>
             
                  
      </div>
      <div className="order_pagination">
      <ReactPaginate 
      pageCount={Math.ceil(GetAllBrands?.data?.length /bookpage)}
      previousLabel = {<TbPlayerTrackPrevFilled />}
      nextLabel = {<TbPlayerTrackNextFilled />}
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

export default Brand
