import React, { useContext } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import Createnew_category from './Createnew_category';
import Edit_category from './Edit_category';

import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { ProductContent } from '../components/Context/ProductProvider';


function Category() {
  const {GetAllCategories, CreateCategory,DeleteCategory } = useContext(ProductContent);
  
  const HandleDelete = (id) => {
    DeleteCategory.mutate(id)
  }
 
const [Createcategory,setCreateCategory] = useState(false)
const [EditCategory,setEditCategory] = useState(false)
const [editcategory,seteditcategory] = useState(null)
const[pagenumber,setpagenumber] = useState(0);
const bookpage = 25;
const pageVisited = pagenumber*bookpage;
const display = GetAllCategories?.data?.slice(pageVisited,pageVisited+bookpage);
const changepage = ({selected}) =>{
  setpagenumber(selected)
};

const handleCreateClick = () => {
  setCreateCategory((previsEditMadel) => !previsEditMadel);
}
const handleEditClick = (item) => {
  seteditcategory(item)
  setEditCategory((previsEditMadel) => !previsEditMadel);
}
  return (
    <div>
       {Createcategory && <Createnew_category handleCreateClick = {handleCreateClick}/>}
       {EditCategory && <Edit_category handleEditClick = {handleEditClick} item={editcategory}/>}
       <div className='allcategory_main'>
                  
                  <div className='category_product_x_l1'>
                         <h2>All Categories</h2> 
                           <button className="Create_new_category" onClick={handleCreateClick}>Create new category</button>        
                  </div>
                  <div className="category_display_container">

                    {display?.map((item, index) => (          
                     <div className="category_display">
                      <div><p>Name: <span>{item.categoryName}</span></p></div>
                      <div className='category_action_and_icon'>
                        <div className='category_action'>
                        <div className='category_edit'>
                        <button onClick={() => handleEditClick(item)}><FaPencilAlt className='icon' /></button>
                        </div>
                        <div className='category_delete'>
                        <button><GoTrash className='icon' onClick={()=>HandleDelete(item._id)}/></button>
                        </div>
                        </div>
                        <div className='category_icon'>
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                     </div>
                     
                    ))}      
                               
                  </div>
             
                  
      </div>
      <div className="order_pagination">
      <ReactPaginate 
      pageCount={Math.ceil(GetAllCategories?.data?.length /bookpage)}
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

export default Category
