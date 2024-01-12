import React, { useContext, useState, useCallback, useEffect } from 'react'
import { NavLink, Link, useNavigate, Navigate, useSearchParams, useLocation } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { ProductContent } from './Context/ProductProvider';
// import Category from '../vconnect/Category';
import './hoveer.css';
import { useDebounce } from 'use-debounce';


const Header = ({ selectedCategory, setSelectedCategory }) => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState(null);
  let userr = JSON.parse(localStorage.getItem("isLoggedIn"));
  let token = userr?.access_token;
  let userData = userr?.user;
  const { GetCarts, GetAllProduct, GetProductByBrand } = useContext(ProductContent)
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const [debouncedSearchTerm] = useDebounce(selectedCategory, 500);

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault()
    localStorage?.removeItem('isLoggedIn')
    window.location.assign('/login')
  }
  const uniqueCategoryNames = new Set(
    GetAllProduct?.data?.map(product => product?.category?.categoryName)
  );

  const productTags = Array.from(uniqueCategoryNames);

  const handleCategoryChange = (category) => {

    setSelectedCategory(category);
  };

  const setHeader = useCallback(({ selectedCategory }) => {
    selectedCategory ? SetURLSearchParams({ selectedCategory }) : SetURLSearchParams({})
  }, [SetURLSearchParams])

  const handleSearch = useCallback(() => {
    // navigate(`/ourstore?selectedCategory=${selectedCategory}}`)
    navigate(`/ourstore?selectedCategory=${selectedCategory}&setSelectedCategory=${setSelectedCategory}`)
  }, [navigate, selectedCategory, setSelectedCategory])

  useEffect(() => {
    if (pathname !== "/ourstore") return

    setHeader({ selectedCategory: debouncedSearchTerm })
  }, [pathname, debouncedSearchTerm, setHeader, handleSearch])

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a href="tel:+250 7576545678" className="text-white">
                  +250 7576545678
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center" style={{ rowGap: "0.5rem" }}>
            <div className="col-2 logo">
              <img
                src="/viconnect/viconnect_logo.png"
                alt=""
                className="img_logo"
                onClick={() => {
                  window.location.href = "/";
                }}
              />
              <p className="logo_p">
                <span className="logo_part2">Vi Conn</span>
                <span className="logo_part3">ect Shop</span>
              </p>
            </div>
            <div className="col-4">
              <div class="input-group ">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here.... "
                  aria-label="Search Product Here...."
                  aria-describedby="basic-addon1"
                  value={selectedCategory}
                  onChange={(e) => {
                    if (pathname !== "/ourstore") handleSearch()
                    setSelectedCategory(e.target.value)
                  }}
                />
                <span class="input-group-text p-3" id="basic-addon1">
                  <BsSearch
                    className="fs-6"
                    style={{ color: "white" }}
                    onClick={() => {
                      handleSearch(selectedCategory);
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* <div className="headerupperlinks">
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <HiArrowPathRoundedSquare className="header-icon" />
                    <p className="mb-0">
                      {" "}
                      Compare <br /> Products
                    </p>
                  </Link>
                </div> */}
                <div className="headerupperlinks">
                  <Link
                    to="/pay"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FaRegHeart className="header-icon" />
                    <p className="mb-0">
                      {" "}
                      Un payed  <br /> Orders
                    </p>
                  </Link>
                </div>
                <div className="headerupperlinks">
                  {token ? (
                    <Link
                      to="user_profile"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <CgProfile className="header-icon" />

                      <p className="mb-0">
                        {userData.email}
                        <br />
                        My Profile
                      </p>
                    </Link>
                  ) : (
                    <Link
                      to="login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <CgProfile className="header-icon" />

                      <p className="mb-0">
                        Login
                        <br />
                        Or Register
                      </p>
                    </Link>
                  )}
                </div>
                <div className="headerupperlinks">
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FaShoppingCart className="header-icon" />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-danger">
                        {GetCarts?.data?.length}
                      </span>
                      <p className="mb-0">
                        {GetCarts?.data
                          ?.map((item) => {
                            const product = GetAllProduct.data?.filter(
                              (i) => i._id === item.product?._id
                            )[0];
                            return { ...item, product };
                          })
                          .reduce(
                            (sum, i) => sum + (i?.product?.price || 0),
                            0
                          )}{" "}
                        RWF
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="/images/menu.svg" alt="" />
                    <span className="me-5 d-inline-block">Shop Categories</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {productTags.map((category, index) => (
                      <li>
                        <Link
                          className="dropdown-item text-white"
                          to={`/ourstore?selectedCategory=${selectedCategory}&setSelectedCategory=${setSelectedCategory}`}
                          key={index}
                          onClick={() => handleCategoryChange(category)}
                        >
                          {" "}
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/ourstore">Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contacts</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header