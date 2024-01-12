import React from 'react'
import { BsSearch,BsLinkedin,BsYoutube,BsInstagram, BsGithub } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import "./hoveer.css";


const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" style={{ width: "40px" }}/>
                <h3 className='mb-0 text-white'>Sign Up for Newsletter</h3>
              </div>
            </div>
            <div className="col-7">
              <div class="input-group ">
                <input type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label=" Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl d-flex flex-wrap gap-y-2">
          <div className="col-4">
            <h4 className='text-white mb-2'>Contact us</h4>
            <div>
              <address className='text-white'>
                Hno: 345 Near City market ,<br/> Downtown Kigali city <br/>
                PinCode:34543665456
              </address>
              <a href="tel:+250 7576545678" className='mt-4 d-block mb-2 text-white'>
                +250 7576545678
              </a>
              <a href="viconnektshop@gmail.com" className='mt-2 d-block mb-0  text-white'>
              viconnektshop@gmail.com
              </a>
              <div className="social-icons d-flex align-items-center gap-30 mt-4">
                <a href="/" className='text-white'>
                  <BsLinkedin className='fs-4'/>
                </a>
                <a href="/" className='text-white'>
                  <BsInstagram className='fs-4'/>
                </a>
                <a href="/" className='text-white'>
                  <BsGithub className='fs-4'/>
                </a>
                <a href="/" className='text-white'>
                  <BsYoutube className='fs-4'/>
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <h4 className='text-white mb-2'>Information</h4>
            <div className='footer-links d-flex flex-column'>
              <Link className='text-white py-1 mb-1'>Privacy Policy</Link>
              <Link className='text-white py-1 mb-1'>Refund Policy</Link>
              <Link className='text-white py-1 mb-1'>Refund Policy</Link>
              <Link className='text-white py-1 mb-1'>Terms and conditions</Link>
            </div>
          </div>
          <div className="col-3">
            <h4 className='text-white mb-2'>Acounts</h4>
            <div className='footer-links d-flex flex-column'>
              <Link className='text-white py-1 mb-1'>ABout Us</Link>
              <Link className='text-white py-1 mb-1'>Faq</Link>
              <Link className='text-white py-1 mb-1'>Contact</Link>
            </div>
          </div>
          <div className="col-2">
            <h4 className='text-white mb-2'>Quick Links</h4>
            <div className='footer-links d-flex flex-column'>
              <Link to="contact" className='text-white py-1 mb-1'>contact</Link>
              <Link to="ourstore" className='text-white py-1 mb-1'>our Store</Link>
              <Link to="cart" className='text-white py-1 mb-1'>Cart</Link>
              <Link to="login" className='text-white py-1 mb-1'>Login/Register</Link>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">&copy; {new Date().getFullYear()}; Powered by Klab</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer