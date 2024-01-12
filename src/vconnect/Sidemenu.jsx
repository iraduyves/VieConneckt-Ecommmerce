import React from 'react'
import { MdDashboard } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { RiShoppingCartFill } from "react-icons/ri";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { FaRegWindowRestore } from "react-icons/fa";
import { TbBrandBlackberry } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaMessage } from "react-icons/fa6";
import { FaBlog } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { IoColorPaletteSharp } from "react-icons/io5";
import { MdPayments } from "react-icons/md";










import { Link, NavLink } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";


function Sidemenu() {

//   const logout = (e) => {
//     e.preventDefault()
//     localStorage?.removeItem('isLoggedIn')
//     window.location.assign('/login')
// }
  return (
    <div className='sidemen'>
    <div className='topmenu-logo-s'>
      <Link to={'/'}>

<img src="/viconnect/viconnect_logo.png" alt=""  className='img_logo'/>
      </Link>
                        <p><span className='logo_part2'>Vi Conn</span><span className='logo_part3'>ect Shop</span></p>
                  </div>
       <div className='menu_navlist'>
         <div className='menu_navlist_container'>
          <ul className='menu_nav_ul'>
            <li><NavLink to="dashboard" className='navigation'><div><MdDashboard className='navigation_icon'/></div><div className='navigation_text'>Dashboard</div></NavLink></li>
            <li><NavLink to="Allproduct" className='navigation'><div><RiShoppingCartFill className='navigation_icon'/></div><div className='navigation_text'>All product</div></NavLink></li>
            <li><NavLink to="Addproduct" className='navigation'><div><TiPlus className='navigation_icon'/></div><div className='navigation_text'>Add product</div></NavLink></li>
            <li><NavLink to="orders" className='navigation'><div><MdShoppingCartCheckout className='navigation_icon'/></div><div className='navigation_text'>Orders</div></NavLink></li>
            <li><NavLink to="payments" className='navigation'><div><MdPayments className='navigation_icon'/></div><div className='navigation_text'>Payments</div></NavLink></li>
            
            <li><NavLink to="category" className='navigation'><div><FaRegWindowRestore className='navigation_icon'/></div><div className='navigation_text'>Categories</div></NavLink></li>
            <li><NavLink to="brand" className='navigation'><div><SiBrandfolder className='navigation_icon'/></div><div className='navigation_text'>Brands</div></NavLink></li>
            <li><NavLink to="color" className='navigation'><div><IoColorPaletteSharp className='navigation_icon'/></div><div className='navigation_text'>Colors</div></NavLink></li>
            
            <li><NavLink to="message" className='navigation'><div><FaMessage className='navigation_icon'/></div><div className='navigation_text'>Messages</div></NavLink></li>
            <li><NavLink to="blogs" className='navigation'><div><FaBlog className='navigation_icon'/></div><div className='navigation_text'>Blogs</div></NavLink></li>
            <li><NavLink to="users" className='navigation'><div><FaUsers className='navigation_icon'/></div><div className='navigation_text'>Users</div></NavLink></li>
            {/* <li onClick={logout}><NavLink to="users" className='navigation'><div><RiLogoutCircleLine className='navigation_icon'/></div><div className='navigation_text'>Log Out</div></NavLink></li> */}
          
          
          </ul>
         </div>
    </div>
    {/* <div className='logout_container'>
    <button onClick={logout}><span className='icon_c'><BiLogOutCircle className='Icon' /></span><span className='logout_text'>LogOut</span></button>

    </div> */}
    </div>
   
  )
}

export default Sidemenu
