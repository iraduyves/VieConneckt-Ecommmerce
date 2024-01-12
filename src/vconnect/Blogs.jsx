
import React,{ useState, useEffect, useContext } from 'react'
import ReactPaginate from 'react-paginate';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoChevronForwardSharp } from "react-icons/io5";


import Create_brand from './Create_brand';

import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import ProductProvider, { ProductContent } from '../components/Context/ProductProvider';
import Edit_blogs from './Edit_blogs';
import Create_Blog from './Create_Blog';

function Blogs() {
                
                    const {GetBlogs,DeleteBlog} = useContext(ProductContent)
                  
                  const [EditBrand,setEditBrand] = useState(false)
                  const [editbrand,seteditbrand] = useState(null)
                  const [CreateBrand, setCreateBrand]= useState(false)
                    const[pagenumber,setpagenumber] = useState(0);
                  const bookpage = 15;
                  const pageVisited = pagenumber*bookpage;
                  const display = GetBlogs?.data?.slice(pageVisited,pageVisited+bookpage);
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
                    DeleteBlog.mutate(id)
                  }
                    return (
                      <div>
                        {CreateBrand && <Create_Blog handleCreateClick = {handleCreateClick}/>}
                        {EditBrand && <Edit_blogs handleEditClick = {handleEditClick} item={editbrand}/>}
                        <div className='allcategory_main'>
                                    
                                    <div className='category_product_x_l1'>
                                           <h2>All Blogs</h2> 
                                             <button className="Create_new_category" onClick={handleCreateClick}>Create New Blog</button>        
                                    </div>
                                    <div className="category_display_container">
                  
                                      {display?.map((item, index) => (          
                                       <div className="blogs_display">
                                        <div className='Blogs_icon'>
                                            <img src={item?.image} alt="" />
                                          </div>
                                        <div className='Blogs_action_and_icon'>
                                        <div className='Blogs_text'>
                                          <p>Title: <span>{item.title}</span></p>
                                        <p>Views: <span>{item.numViews}</span></p>
                                        <p>Description: <span>{item.description}</span></p>
                                        
                                        </div>
                                          <div className='blogs_action'>
                                          <div className='brand_edit'>
                                          <button onClick={() => handleEditClick(item)}><FaPencilAlt className='icon' /></button>
                                          </div>
                                          <div className='brand_delete'>
                                          <button><GoTrash className='icon' onClick={()=>HandleDelete(item._id)}/></button>
                                          </div>
                                          <div className='brand_edit'>
                                          <button onClick={() => window.location.href=`blogs/${item._id}`} className="blog_more_button"><IoChevronForwardSharp className='blog_more' /></button>
                                          </div>
                                          </div>
                                         
                                          
                                        </div>
                                       </div>
                                       
                                      ))}      
                                                 
                                    </div>
                               
                                    
                        </div>
                        <div className="order_pagination">
                        <ReactPaginate 
                        pageCount={Math.ceil(GetBlogs?.data?.length /bookpage)}
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
                  
 export default Blogs
                  
