import React, { useContext, useEffect, useState } from 'react';
import Input from '../../components/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { UserContent } from '../../components/Context/UserProvider';
import Notiflix, { Notify } from 'notiflix';
import axios from 'axios'
import Meta from '../../components/Meta';
import BreadCrumb from '../../components/BreadCrumb';



const Login = () => {

  const { LoginMutation } = useContext(UserContent);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (body) => {
      LoginMutation.mutate(body);
  }

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title='Login' />
      <div style={{ paddingTop: '25px', paddingBottom: '25px' }} className='home-wrapper-2'>
        <div className='sign bg-white'>
          <h1>Login</h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input icon={<><FontAwesomeIcon icon={faEnvelope} className='faicon' /></>} name='email' placeholder='email' register={register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            </div>
            <div >{errors.email && <p style={{ color: 'red', fontSize: 'small' }} >Email is required and must be valid</p>} </div>
            <div>
              <Input type='password' icon={<><FontAwesomeIcon icon={faLock} className='faicon' /></>} name='name' placeholder='Password' register={register("password", { required: true })} />
            </div>
            <div>{errors.password && <p style={{ color: 'red', fontSize: 'large' }}>Password is required</p>}</div>
            <div className='d-flex justify-content-between'>
              <Link to="/forgotpassword"> <span style={{ color: 'blue' }}>forgot Password?</span></Link>
              <Link to="/register"> <span style={{ color: 'blue' }}>  Signup?</span></Link>
            </div>

            <div>
              <button className='button' >Login</button>

              {/* {load ? (Notiflix.Loading.standard('Loading...', {backgroundColor: 'rgba(0,0,0,0.8)',}) ):"Signup"} */}
            </div>
          </form>
        </div>

      </div>
    </>
  )
}
export default Login