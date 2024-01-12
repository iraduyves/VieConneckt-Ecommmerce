import React, { useState } from 'react'
import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';


function Createnew_category({handleCreateClick}) {

  const [files, setFiles] = useState([])
  const { handleSubmit, control,register} = useForm();
  const { GetAllBrands, GetAllCategories, GetAllColours, CreateProduct, CreateCategory } = useContext(ProductContent)
  const onSubmit = (data) => {
    CreateCategory.mutate({data, images: files})
    // console.log({data,files});
  };
  return (
    <div className='create_big_container'>
        <div className='close_container'>
       <button onClick={handleCreateClick}><IoCloseSharp className='close_icon' /></button> 
</div>
      <form onSubmit={handleSubmit(onSubmit)}>
    
      <div className='create_min_container'>
        <Controller
          name="categoryName"
          control={control}
          render={({ field }) => (
            <input type="text" placeholder='Category name*' {...field} />
          )}
        />
        <Controller
          name="categoryImage"
          control={control}
          render={({ field }) => (
            <input 
            name="categoryImage"
            type="file" 
            placeholder='Upload category img' 
            onChange={e => {
              setFiles(() => e.target.files)}
              }
               />
          )}
        />
        <button type="submit">Create</button>
      </div>
    </form>
    </div>
  )
}

export default Createnew_category
