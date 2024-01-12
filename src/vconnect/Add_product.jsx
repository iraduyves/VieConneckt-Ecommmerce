import React, { useContext } from 'react'
import { IoCloudUploadSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { ProductContent } from '../components/Context/ProductProvider';
import { useState } from 'react';


function Add_product() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [files, setFiles] = useState([])

  const { GetAllBrands, GetAllCategories, GetAllColours, CreateProduct, CreateCategory } = useContext(ProductContent)
  // console.log(GetAllCategories)
  
  const onSubmit = (data) => {
    
    CreateProduct.mutate({data, images: files})
    // console.log(data,files);
  };
  
  return (
    <div className='add_product_main'>

      <div className="add_product_min">
        <div>
          <h1 className='add_product_title'>Add New Product</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="addproduct_form_main_container">
            <div className="form_top_side">
              <input
                type="file"
                name='image'
                className="upload"
                placeholder="upload all product image"
                multiple
                {...register('image', { required: true })}
                onChange={e => {
                  setFiles(() => e.target.files)
                }}
              />
              {errors?.image && <p style={{ color: 'red', fontSize: 'small' }} >This field is required</p>}
            </div>
            <div className="form_buttom_side">
              <div className="form_left_side">
                <input
                  type="text"
                  name='productName'
                  placeholder="Product Name"
                  className="upload_form_input"
                  {...register('productName', { required: true })}
                />
                {errors?.productName && <p style={{ color: 'red', fontSize: 'small' }} >This field is required</p>}

                <select className="upload_form_input" name='brandId' {...register('brandId', { required: true })}>
                  <option>product brand</option>
                  {GetAllBrands.data?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.brandName}
                    </option>
                  ))}

                </select>
                {errors?.brandId && <p style={{ color: 'red', fontSize: 'small' }} >This field is required</p>}

                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  placeholder="product description"
                  className="form_product_descreaption"
                  {...register('description', { required: true })}
                ></textarea>
                {errors && errors.description && (
                  <span style={{ color: 'red', fontSize: 'small' }}>This field is required</span>
                )}


              </div>
              <div className="form_right_side">
                <select className="upload_form_input"name='categoryId' {...register('categoryId', { required: true })}>
                  <option>product category</option>
                  {GetAllCategories?.data?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
                {errors?.categoryId && <p style={{ color: 'red', fontSize: 'small' }} >This field is required</p>}

                <select className="upload_form_input" name='colorId' {...register('colorId', { required: true })} placeholder=''>
                  <option>product colour</option>
                  {GetAllColours?.data?.map((item, index) => (
                    <option
                      key={index}
                      value={item._id}
                      style={{ height: '10px', width: '300px', background: item.colorName }}
                    >
                      {item.colorName}
                    </option>
                  ))}
                </select>
                {errors?.colorId && <p style={{ color: 'red', fontSize: 'small' }} >This field is required</p>}
                <div className="right_botton_l2">
                  <input
                    type="text"
                    name='stock_quantity '
                    placeholder="Product quantity"
                    className="upload_form_input_l2"
                    {...register('stock_quantity', { required: true })}
                  />
                  {errors?.stock_quantity && <p style={{ color: 'red', fontSize: 'small' }} >This field is required</p>}

                  <input
                    type="text"
                    name='price'
                    placeholder="Product price"
                    className="upload_form_input_l2"
                    {...register('price', { required: true })}
                    />
                    {errors?.price&& <p style={{ color: 'red', fontSize: 'small' }} >This field is required</p>}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className='button'>add</button>
        </form>
      </div>
    </div>
  )
}

export default Add_product
