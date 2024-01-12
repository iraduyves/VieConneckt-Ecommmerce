import React, { useContext } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Login from './Auth/Login'
import Input from '../components/input'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faPhone, faHouse } from '@fortawesome/free-solid-svg-icons'
import { useForm, } from 'react-hook-form';
import TextArea from '../components/input/TextArea'
import { ProductContent } from '../components/Context/ProductProvider'

const Contact = () => {
  const {Createmessage} = useContext(ProductContent)

  let location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
     console.log(data);
     Createmessage.mutate(data)

     
   }
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title='Contact Us' />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                title='location'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31899.93004615045!2d30.064100349999983!3d-1.9569800499999965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42936c4fc0b%3A0x8c6a59bcc69b83fb!2sNyarugenge%2C%20Kigali!5e0!3m2!1sen!2srw!4v1701249290583!5m2!1sen!2srw"
                width="600"
                height="450"
                className='border-0 w-100'
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* <Login/> */}
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between  gap-30">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                      <Input type='text' icon={<><FontAwesomeIcon icon={faUser} className='faicon ' /></>} name='name' placeholder='Name' register={register("name", { required: true })} />
                    </div>
                    <div className='mb-4'>
                      <Input type='text' icon={<><FontAwesomeIcon icon={faEnvelope} className='faicon' /></>} name='email' placeholder='Email' register={register("email", { required: true })} />
                    </div>
                    <div className='mb-4'>
                      <Input type='text' icon={<><FontAwesomeIcon icon={faPhone} className='faicon' /></>} name='mobile' placeholder='Phone Number' register={register("mobile", { required: true })} />
                    </div>
                    <div className='mb-4'>
                      <TextArea type='text' icon={<><FontAwesomeIcon icon={faEnvelope} className='faicon' /></>} name='comment' placeholder='Your Message ' register={register("comment", { required: true })} />
                    </div>
                    <div style={{ width: '100%', alignItems: "center" }}>
                      <button type='submit' className='button' style={{ width: '100%' }}>Submit</button>
                      {/* {load ? (Notiflix.Loading.standard('Loading...', {backgroundColor: 'rgba(0,0,0,0.8)',}) ):"Signup"} */}
                    </div>
                  </form>
                </div>
                <div >
                  <h3 className="contact-title mb-4">Get In Touch</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FontAwesomeIcon icon={faHouse} className='fs-5' />
                        <address className='mb-0'>
                          Hno:277 , Near Downtown , Kigali city , Rwanda
                          Kigali city
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FontAwesomeIcon icon={faPhone} className='fs-5' />
                        <a href="tel : + 250 698765498765">+ 250 698765498765</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FontAwesomeIcon icon={faEnvelope} className='fs-5' />
                        <a href="mailto: viconnekt@gmail.com">viconnekt@gmail.com</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <FontAwesomeIcon icon={faEnvelope} className='fs-5' />
                        <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact