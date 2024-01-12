import React, { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';

function Edit_blogs({ handleEditClick, item }) {

  const { handleSubmit, control,register } = useForm();

  const [files, setFiles] = useState([])
  const defaultValues = {
    title: item.title,
    description: item.description,
    category: item.category,

    BrandId: item._id, // Assuming 'item' contains the existing category data
    // Add other fields as needed
  };


  const { EditBlog, GetAllCategories } = useContext(ProductContent)
  const id = item._id
  const onSubmit = (data) => {
    EditBlog.mutate({ data, images: files, id })

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
            name="title"
            control={control}
            defaultValue={defaultValues.title}
            render={({ field }) => (
              <input type="text" placeholder='Title*' {...field} />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue={defaultValues.description}
            render={({ field }) => (
              <input type="text" placeholder='description*' {...field} />
            )}
          />
          <Controller
            name="categoryId"
            control={control}
            defaultValue={defaultValues.category}
            render={({ field }) => (
              <select className="upload_form_input" {...register('categoryId', { required: true })}>
                <option>product category</option>
                {GetAllCategories?.data?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
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

export default Edit_blogs






