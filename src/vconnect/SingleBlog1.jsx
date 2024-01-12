import React, { useState, useEffect, useContext } from 'react'

import { useParams } from 'react-router-dom';
import ProductProvider, { ProductContent } from '../components/Context/ProductProvider';

import { FaPencilAlt } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoChevronForwardSharp } from "react-icons/io5";
import Edit_blogs from './Edit_blogs';
function SingleBlog1() {
  const { id } = useParams();
  const { GetBlogs, DeleteBlog } = useContext(ProductContent)

  const [EditBrand, setEditBrand] = useState(false)
  const [editbrand, seteditbrand] = useState(null)
  const display = GetBlogs?.data?.filter(item => item._id === id);

  const HandleDelete = (id) => {
    DeleteBlog.mutate(id)
  }
  const handleEditClick = (item) => {
    seteditbrand(item)
    setEditBrand((previsEditMadel) => !previsEditMadel);
  }


  return (
    <div className='sinle_blog'>
      {EditBrand && <Edit_blogs handleEditClick={handleEditClick} item={editbrand} />}
      {display?.map((item, index) => (
        <div className="Single_blogs_display">
          <div className='single_Blogs_icon'>
            <img src={item?.image} alt="" />
          </div>
          <div className='single_Blogs_action_and_icon'>
            <div className='sinle_Blogs_text'>
              <p><span className='single_blog_p'>Title:</span> <span>{item.title}</span></p>
              <p><span className='single_blog_p'>Views:</span>Views: <span>{item.numViews}</span></p>
              <p className='single_blog_p'>Description:</p>
              <p><span>{item.description}</span></p>

            </div>
            <div className='blogs_action'>
              <div className='Single_brand_edit'>
                <button onClick={() => handleEditClick(item)}>Edit</button>
              </div>
              <div className='single_brand_delete'>
                <button onClick={() => HandleDelete(item._id)}>Delete</button>
              </div>

            </div>


          </div>
        </div>
      ))}
    </div>
  )
}

export default SingleBlog1
