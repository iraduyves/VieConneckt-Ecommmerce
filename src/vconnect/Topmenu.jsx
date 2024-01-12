import React, { useContext } from 'react'
import { useState } from 'react';

import { FiMenu } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RiEqualizerFill } from "react-icons/ri";
import { TbShoppingCartUp } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import { ProductContent } from '../components/Context/ProductProvider';




function Topmenu({ handleChangeClick }) {
  const {GetProfille} = useContext(ProductContent)

  const [modele, setmodels] = useState(false)
  let user = JSON.parse(localStorage.getItem("isLoggedIn"));
  let userData = user?.user;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Navigate to the 'Allproduct' route with the search term as a query parameter
    navigate(`/Dashboard/${searchTerm}`);
  };
  // const [filteredProducts, setFilteredProducts] = useState(product);

  // const handleSearch = () => {
  //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //   const filtered = product.filter((item) =>
  //     item.name.toLowerCase().includes(lowerCaseSearchTerm)
  //   );
  //   setFilteredProducts(filtered);
  // };
  const logout = (e) => {
    e.preventDefault()
    localStorage?.removeItem('isLoggedIn')
    window.location.assign('/login')
}
  return (
    <div className="topmen_contaioner">
      <div className="topmenu-logo">
        <img src="/viconnect/viconnect_logo.png" alt="" className="img_logo" onClick={() => { window.location.href = "/"; }}/>
        <p className="logo_p">
          <span className="logo_part2">Vi Conn</span>
          <span className="logo_part3">ect Shop</span>
        </p>
      </div>
      <div className="topmenu_right">
        <div className="menu_icon">
          <FiMenu className="menu_icon_l" onClick={handleChangeClick} />
        </div>
        {/* <div className="search_container">
          <form>
            <input
              type="text"
              placeholder="search here..."
              className="search_input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='search_button'
              type='button'
              onClick={handleSearch}
            ><IoSearch className='search_icon' /></button>
          </form>
        </div>
        <div className='filters_container'>
          <button className='filter_button'>
            <span><RiEqualizerFill className='filter_icon' /></span>
            <span className='filter_text'>filter</span>
          </button>
        </div> */}
        <div className='big_notification'  >
          {/* <NavLink to="orders" className="link">
            <div className='notification'>
              <div> <TbShoppingCartUp className='notification_shopping_icon' /></div>
              <div className='notfication_count'><p className='notfication_count_p'>10</p></div>
            </div>
          </NavLink> */}
          {/* <div className='notification'>
            <div> <FaUserPlus className='notification_shopping_icon' /></div>
            <div className='notfication_count'><p className='notfication_count_p'>15</p></div>
          </div> */}
          
            
          
          <div className='profile_cintainer' onClick={() => setmodels(!modele)}>
            <div className='profile_img_cintainer'><img src={GetProfille.data?.profileImage} alt="" className='profile_img' /></div>
            <div className='profile_texts'>
              <h2 className='profile_texts_name'>{GetProfille.data?.userName}</h2>
              <p className='profile_texts_role'>admin</p>
            </div>
            
          </div>
          {modele &&  <button onClick={logout} className="topmen_logout"><span className='icon'><BiLogOutCircle className='Icon_l' /></span><span className='logout_text'>LogOut</span></button>}
          
        </div>
      </div>
    </div>
  );
}

export default Topmenu