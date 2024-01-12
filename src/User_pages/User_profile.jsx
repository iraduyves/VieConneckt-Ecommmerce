import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ProductContent } from '../components/Context/ProductProvider';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';


function User_profile() {


  let userr = JSON.parse(localStorage.getItem("isLoggedIn"));
  const { GetProfille } = useContext(ProductContent);

  const logout = (e) => {
    e.preventDefault()
    localStorage?.removeItem('isLoggedIn')
    window.location.assign('/login')
  }
  return (
    <>
      <Meta title={"User Profile"} />
      <BreadCrumb title="User Profile" />
      <div className='profile home-wrapper-2 py-5'>
        <div className='user_profile_min_container'>
          <div className='user_profile_min_container_left'>
            <div className='top_profile'>
              <div className="profile_image">
                <img src={GetProfille?.data?.profileImage} alt="" />
              </div>
              <div className="profile_name">
                <p>{GetProfille?.data?.userName}</p>
              </div>
            </div>
            <div className='profile_navigation'>
              <div className="navigation_container">
                <ul>
                  <li><NavLink to="" className="navigator">My profile</NavLink></li>
                  <li><NavLink to="my_order" className="navigator">My order</NavLink></li>
                  {/* <li><NavLink to="" className="navigator">My wishlist</NavLink></li> */}
                  {/* <li><NavLink to="" className="navigator">Notification</NavLink></li> */}
                  <li><NavLink to="" className="navigator">settings</NavLink></li>

                </ul>
              </div>
              <div className="log_out_container">
                <button onClick={logout} >
                  Logout
                </button>
              </div>

            </div>
          </div>
          <div className='user_profile_min_container_right'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default User_profile
