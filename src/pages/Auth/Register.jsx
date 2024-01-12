import React, { useContext, useState } from 'react';
import Input from '../../components/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn, faEnvelope, faLocation, faLock, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContent } from '../../components/Context/UserProvider';
import Meta from '../../components/Meta';
import BreadCrumb from '../../components/BreadCrumb';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import phone input styles
import css from '../../components/input/style.module.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { RegisterMutation } = useContext(UserContent);

  // Validation function for phone number
  const isPhoneNumberValid = (value) => /^\d{10}$/.test(value);

  const onSubmit = async (body) => {

    RegisterMutation.mutate(body);
  };

  return (
    <>
      <Meta title={"Register"} />
      <BreadCrumb title='Register' />
      <div className='home-wrapper-2' style={{ paddingTop: '25px', paddingBottom: '25px' }}>
        <div className='sign bg-white'>
          <h2 className='mb-3'>Register</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input icon={<FontAwesomeIcon icon={faChessPawn} className='faicon' />} name='fullName' placeholder='Full Name' register={register("fullName", { required: true })} />
              {errors.fullName && <p style={{ color: 'red', fontSize: 'small' }}>Full name is required</p>}
            </div>
            <div>
              <Input icon={<FontAwesomeIcon icon={faEnvelope} className='faicon' />} name='email' placeholder='Email' register={register("email", { required: true, pattern: /^\S+@\S+$/i })} />
              {errors.email && <p style={{ color: 'red', fontSize: 'small' }}>Email is required and must be valid</p>}
            </div>
            <div>
              <Input
                icon={<FontAwesomeIcon icon={faPhoneAlt} className="faicon" />}
                name="phone"
                placeholder="Your phone number eg(0755555555)"
                register={register("phone", {
                  required: "Phone number is required",
                  validate: (value) =>
                    isPhoneNumberValid(value) ||
                    "Phone number must be 10 digits long and contain only numbers",
                })}
              />
              {errors.phone && (
                <p style={{ color: 'red', fontSize: 'small' }}>{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Input name='location' placeholder='Location' icon={<FontAwesomeIcon icon={faLocation} className='faicon' />} register={register("location", { required: true })} />
              {errors.location && <p style={{ color: 'red', fontSize: 'small' }}>Location is required</p>}
            </div>
            <div>
              <Input type='password' icon={<FontAwesomeIcon icon={faLock} className='faicon' />} name='password' placeholder='Password' register={register("password", { required: true })} />
              {errors.password && <p style={{ color: 'red', fontSize: 'small' }}>Password is required and must be strong</p>}
              <Input type='password' icon={<FontAwesomeIcon icon={faLock} className='faicon' />} name='repassword' placeholder='Retype Password' register={register("repassword", { required: true, validate: (val) => val === watch('password') || "Passwords do not match" })} />
              {errors.repassword && <p style={{ color: 'red', fontSize: 'small' }}>Passwords do not match</p>}
            </div>
            <div>
              <button className='button' type='submit'>Register</button>
            </div>
            <Link to="/login"><span style={{ color: 'blue' }}>or Login</span></Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
