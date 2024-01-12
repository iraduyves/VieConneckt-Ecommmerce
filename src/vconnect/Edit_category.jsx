import React, { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { ProductContent } from '../components/Context/ProductProvider';


function Edit_category({handleEditClick,item}) {
  const [files, setFiles] = useState([]);               
const { handleSubmit, control } = useForm();
const defaultValues = {
  categoryName: item.categoryName  , // Assuming 'item' contains the existing category data
  // Add other fields as needed
};
const { EditCategory } = useContext(ProductContent)
const id = item._id

const onSubmit = (data) => {
  EditCategory.mutate({data,images: files,id })

  // console.log(data, files, id);
 };
  return (
                  <div className='create_big_container'>
                  <div className='close_container'>
                 <button onClick={handleEditClick}><IoCloseSharp className='close_icon' /></button> 
          </div>
                <form onSubmit={handleSubmit(onSubmit)}>
              
                <div className='create_min_container'>
                  <Controller
                    name="categoryName"
                    control={control}
                    defaultValue={defaultValues.categoryName}
                    render={({ field }) => (
                      <input type="text" placeholder='Category name*' {...field} />
                    )}
                  />
                 <div className='Existing_image'>
                 <p>Existing Image:</p>
          <img src={item.image} alt={item.categoryName
} />
                  </div> 
                  <Controller
                    name="categoryImage"
                    control={control}
                    render={({ field }) => (
                      <input type="file" placeholder='Upload category img' {...field} onChange={e => {
                        setFiles(() => e.target.files)
                      }}/>
                    )}
                  />
                  <button type="submit">Save</button>
                </div>
              </form>
              </div>
  )
}

export default Edit_category
