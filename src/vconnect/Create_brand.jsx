import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';

function Create_brand({ handleCreateClick }) {
  const [files, setFiles] = useState([])
  const { handleSubmit, control } = useForm();

  const { CreateBrand } = useContext(ProductContent)
  const onSubmit = (data) => {
    CreateBrand.mutate({data,images: files})
  }
  return (
    <div className='create_big_container'>
      <div className='close_container'>
        <button onClick={handleCreateClick}><IoCloseSharp className='close_icon' /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='create_min_container'>
          <Controller
            name="BrandName"
            control={control}
            render={({ field }) => (
              <input type="text" placeholder='Brand name*' {...field} {...field}/>
                    )}
          />
          <Controller
            name="BrandImage"
            control={control}
            render={({ field }) => (
              <input type="file" placeholder='Upload brand img' {...field}  onChange={e => {
                setFiles(() => e.target.files)
              }}/>
            )}
          />
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create_brand
