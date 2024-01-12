import React, { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';


function Edit_Color({handleEditClick,item}) {
                  const [colorName,setcolorName]= useState()              
                  const defaultValues = {
                  colorName: item.colorName  , // Assuming 'item' contains the existing category data
                    // Add other fields as needed
                  };
                  const { EditColor } = useContext(ProductContent)
                  const id = item._id
                  
                  const onSubmit = (colorName, event) => {
                  event.preventDefault();
                  EditColor.mutate({colorName,id })
                  
                    // console.log("qqqqqqqqqqqqqqqqqqqqqq",colorName,id);
                   };
  return (
                  <div className='create_big_container'>
                  <div className='close_container'>
                 <button onClick={handleEditClick}><IoCloseSharp className='close_icon' /></button> 
          </div>
                <form onSubmit={(event) => onSubmit(colorName, event)}>

                <div className='create_min_container'>
                <div className='Exist_color' style={{
                  background:item.colorName,
            border: `1px solid ${item.colorName}`
          }}>Existing color: {item.colorName}</div>
          
          <div className='new_color' style={{
            background:colorName,
            border: `1px solid ${colorName}`
          }}>New color: {colorName}</div>
                    
                      <input type="text" 
                      defaultValue={defaultValues.colorName}
                      onChange={(e)=> setcolorName(e.target.value)}
                      placeholder='Category name*' />
                    
             
                  <button type="submit">Save</button>
                </div>
              </form>
              </div>
  )
}

export default Edit_Color
