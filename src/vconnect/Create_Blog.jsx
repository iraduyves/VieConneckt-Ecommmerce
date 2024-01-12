import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';


function Create_Blog({ handleCreateClick }) {
  const [files, setFiles] = useState([])
  const { handleSubmit, control, register } = useForm();

  const { CreateBlog,GetAllCategories } = useContext(ProductContent);
  const onSubmit = (data) => {
    CreateBlog.mutate({ data, images: files })

    // console.log(data, files);

  };
  return (
    <div className='create_big_container'>
      <div className='close_container'>
        <button onClick={handleCreateClick}><IoCloseSharp className='close_icon' /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='create_min_container'>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input type="text" placeholder='blogs title*' {...field} {...field} />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input type="text" placeholder='blogs description*' {...field} {...field} />
            )}
          />
          <Controller
            name="categoryId"
            control={control}
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
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                placeholder='Upload image' {...field}
                onChange={e => {
                  setFiles(() => e.target.files)
                }}
              // {...register('categoryName', { required: true })}
              // {...field}
              />
            )}
          />
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create_Blog
