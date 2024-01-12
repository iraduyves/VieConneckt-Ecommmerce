import React, { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';

function Edit_brand({ handleEditClick, item }) {
  const { handleSubmit, control } = useForm();
  const [files, setFiles] = useState([])
  const defaultValues = {
    BrandName: item.brandName, // Assuming 'item' contains the existing category data
    BrandId: item._id, // Assuming 'item' contains the existing category data
    // Add other fields as needed
  };

  const { EditBrand } = useContext(ProductContent)
  const id = item._id
  const onSubmit = (data) => {
    EditBrand.mutate({data,images: files,id })

    // console.log(data, files, id);

  }
  return (
    <div className='create_big_container'>
      <div className='close_container'>
        <button onClick={handleEditClick}><IoCloseSharp className='close_icon' /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='create_min_container'>
          <Controller
            name="BrandName"
            control={control}
            defaultValue={defaultValues.BrandName}
            render={({ field }) => (
              <input type="text" placeholder='brand name*' {...field} />
            )}
          />
          <div className='Brand_Existing_image'>
            <p>Existing Image:</p>
            <img src={item?.image} alt={item.category} />
          </div>
          <Controller
            name="BrandImage"
            control={control}
            render={({ field }) => (
              <input type="file" placeholder='Upload brand img' {...field} onChange={e => {
                setFiles(() => e.target.files)
              }} />
            )}
          />
          <button type="submit"  >Save</button>
        </div>
      </form>
    </div>
  )
}

export default Edit_brand
