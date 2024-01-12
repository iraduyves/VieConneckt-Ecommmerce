import React, { useContext, useState } from 'react'

import { ProductContent } from '../components/Context/ProductProvider';
import CreateColor from './CreateColor';
import Edit_Color from './Edit_Color';
import { FaPencilAlt } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

function Colors() {
 const { GetColor,DeleteColor } = useContext(ProductContent);
// console.log("ddddddddddddddddddd",GetColor.data);
const [Createcolor,setCreateCalor] = useState(false);
const [editcolor,seteditcolor] = useState(null)
const [EditColor,setEditColor] = useState(false)

const HandleDelete = (id) => {
  DeleteColor.mutate(id)
}


const handleCreateClick = () => {
                  setCreateCalor((previsEditMadel) => !previsEditMadel);
                }
 const handleEditClick = (item) => {
                  seteditcolor(item)
                  setEditColor((previsEditMadel) => !previsEditMadel);
                }
  return (
    <div className='color_main_container'>
       {Createcolor && <CreateColor handleCreateClick = {handleCreateClick}/>}
       {EditColor && <Edit_Color handleEditClick = {handleEditClick} item={editcolor}/>}
      
                   <div className='category_product_x_l1'>
                         <h2>all Colors</h2> 
                           <button className="Create_new_category" onClick={handleCreateClick}>Create New Color</button>        
                  </div>
      <div className="color_container">
                  {GetColor?.data?.map((item)=>(
           <div className='color_l1' style={{
            border: `1px solid ${item.colorName}`
          }}>
           <div className='color'style={{backgroundColor:item.colorName}}>{item.colorName}</div>
           <div className='color_action'>
                        <div className='color_edit'>
                        <button onClick={() => handleEditClick(item)}><FaPencilAlt className='color_icon' /></button>
                        </div>
                        <div className='color_delete'>
                        <button><GoTrash className='color_icon' onClick={()=>HandleDelete(item._id)}/></button>
                        </div>
          </div>
          
           </div>                        
                  ))}
      
      </div>
    </div>
  )
}

export default Colors
