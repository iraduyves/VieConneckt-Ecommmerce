import React,{ useContext } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";

import { useState } from 'react';
import { ProductContent } from '../components/Context/ProductProvider';


function Edit_product({handleEditClick,item}) {
const { register, handleSubmit, errors } = useForm();
const [files, setFiles] = useState([])
                
const { GetAllBrands, GetAllCategories, GetAllColours, CreateProduct, EditProduct } = useContext(ProductContent)

const defaultValues = {
  img: item?.productImage[0],
  productName: item?.productName,
  price: item?.price,
  categoryName: item?.category?.categoryName,
  brandName: item?.brand?.brandName,
  stock: item?.stock_quantity,
  color: item?.color?.colorName,
  description:item?.description,
   
};                


const onSubmit = (data) => {

  const id=item._id;

  EditProduct.mutate({data, images: files,id})
    // console.log(data,files)
  // console.log(data,item._id);      
}
  return (
                  <div className='edit_big_container'>
                  <div className='close_container'>
                 <button onClick={handleEditClick}><IoCloseSharp className='close_icon' /></button> 
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="Editproduct_form_main_container">
            <div className="Edit_form_top_side">
              <img src={defaultValues.img} alt="" />
            <label className=" label"for="file">
              <input
                type="file"
                className="Edit_upload"
                placeholder="upload all product image"
                multiple
                onChange={e => {
                  setFiles(() => e.target.files)
                }}
              />
              <p><FaCloudUploadAlt className='Upload_icon' />Uploade here</p></label>
            </div>
            <div className="edit_form_buttom_side">
              <div className="edit_form_left_side">
                <input
                  type="text"
                  defaultValue={defaultValues.productName}
                  placeholder="Product Name"
                  className="edit_upload_form_input"
                  {...register('productName', { required: true })}
                />
                {errors && errors.productName && <span>This field is required</span>}

                <select 
                className="edit_upload_form_input" 
                {...register('brand', { required: true })}
                defaultValue={defaultValues.brandName}
                >
                  <option
                  
                  >product brand</option>
                  {GetAllBrands.data?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.brandName}
                    </option>
                  ))}
                </select>

               


              </div>
              <div className="edit_form_right_side">
                <select 
                className="edit_upload_form_input" 
                {...register('categoryId', { required: true })}
                defaultValue={defaultValues.categoryName}
                >
                  <option>product category</option>
                  {GetAllCategories?.data?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>

                <select 
                className="edit_upload_form_input" 
                {...register('color', { required: true })} placeholder=''
                defaultValue={defaultValues.color}
                >
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

                <div className="edit_right_botton_l2">
                  <input
                  defaultValue={defaultValues.stock}
                    type="text"
                    placeholder="Product quantity"
                    className="edit_upload_form_input_l2"
                    {...register('stock_quantity', { required: true })}
                  />
                  {errors && errors.stock_quantity && <span>This field is required</span>}

                  <input
                  defaultValue={defaultValues.price}
                    type="text"
                    placeholder="Product price"
                    className="edit_upload_form_input_l2"
                    {...register('price', { required: true })}
                  />
                  {errors && errors.price && <span>This field is required</span>}
                  
                  <textarea
                  defaultValue={defaultValues.description}
                  name="descreaption"
                  cols="30"
                  rows="6"
                  placeholder="product description"
                  className="edit_form_product_descreaption"
                  {...register('description', { required: true })}
                ></textarea>
                {errors && errors.description && (
                  <span>This field is required</span>
                )}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className='button'>update</button>
        </form>
              </div>
  )
}

export default Edit_product
