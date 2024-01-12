import React, { useContext, useState } from 'react';
import Input from '../../components/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faXmark,faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { UserContent } from '../../components/Context/UserProvider';
import Notiflix, { Notify } from 'notiflix';
import axios from 'axios'
import Meta from '../../components/Meta';
import BreadCrumb from '../../components/BreadCrumb';



const ResetPassword = () => {
    const navigate =useNavigate()

    const { LoginMutation } = useContext(UserContent);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    
    const onSubmit=() =>{
        Notiflix.Notify.success ('Sucessfully Updated Passworld')
        navigate('/login')
    }

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title='Reset Password' />
      <div style={{ paddingTop: '25px', paddingBottom: '25px' }} className='home-wrapper-2'>
        <div className='sign bg-white'>
            <div className='d-flex justify-content-between'>

          <h1 className='mb-4'>Reset Password</h1>
          <Link to="/login"> <FontAwesomeIcon icon={faXmark} className='faicon' style={{fontSize:'30px'}}/></Link>
            </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input icon={<><FontAwesomeIcon icon={faLock} className='faicon' /></>} name='password' placeholder='Enter New password' register={register("password", { required: true, pattern: /^\S+@\S+$/i })} />
              <div >{errors.password && <p style={{ color: 'red', fontSize: 'small' }} >password is required and must be valid</p>} </div>
            </div>
            <div>
              <Input icon={<><FontAwesomeIcon icon={faLock} className='faicon' /></>} name='repassword' placeholder='Confirm Password' register={register("repassword", { required: true, pattern: /^\S+@\S+$/i })} />
              <div >{errors.repassword && <p style={{ color: 'red', fontSize: 'small' }} >password is required and must be valid</p>} </div>
            </div>
            <div>
              <button className='button' >Update</button>

              {/* {load ? (Notiflix.Loading.standard('Loading...', {backgroundColor: 'rgba(0,0,0,0.8)',}) ):"Signup"} */}
            </div>
          </form>
        </div>

      </div>
    </>
  )
}
export default ResetPassword