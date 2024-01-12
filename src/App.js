import React, { useState } from 'react';
import { Counter } from './features/counter/Counter';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login  from './pages/Auth/Login.jsx';
import Register  from './pages/Auth/Register.jsx';
import OurStore from './pages/OurStore.jsx';

import Viconnect from "./vconnect/viconnect.jsx";
// import AppContext  from "./pages/AppProvider";

import "./vconnect/vstyle/viconnect.css";
import "./vconnect/vstyle/Topmenu.css";
import "./vconnect/vstyle/Sidemenu.css";
import "./vconnect/vstyle/Addproduct.css";
import "./vconnect/vstyle/Allproduct.css";
import "./vconnect/vstyle/dashboard_1.css";
import "./vconnect/vstyle/Category.css";
import "./vconnect/vstyle/brand.css";
import "./vconnect/vstyle/Createcategory.css";
import "./vconnect/vstyle/order.css";
import "./vconnect/vstyle/Edit_category.css";
import "./vconnect/vstyle/edit_brand.css";
import "./vconnect/vstyle/Edit_product.css";
import "./User_pages/user_css/user_profile.css";
import "./User_pages/user_css/profile_info.css";
import "./User_pages/user_css/changePassword.css";
import "./vconnect/vstyle/message.css";
import "./vconnect/vstyle/message_replay.css";
import "./vconnect/vstyle/Blogs.css";
import "./vconnect/vstyle/Color.css";
import "./vconnect/vstyle/singleBlog.css";
import "./vconnect/vstyle/SinleUser.css";
import "./vconnect/vstyle/OrderDitail.css";
import "./pages/SingleProduct.css";

import Checkout from "./components/payment/Checkout.jsx";
import Pay from "./components/payment/Pay.jsx";

import Add_product from "./vconnect/Add_product.jsx";
import All_product from "./vconnect/All_product.jsx";
import Dashboard_1 from "./vconnect/Dashboard.jsx";
import Orders from './vconnect/Orders.jsx';
import Category from './vconnect/Category.jsx';
import Brand from './vconnect/Brand.jsx';
import Users from './vconnect/Users.jsx';
import Blog from './pages/Blog.jsx';
import SingleBlog from './pages/SingleBlog.jsx';
import SingleProduct from './pages/SingleProduct.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import ResetPassword from './pages/Auth/ResetPassword.jsx';
import Cart from './pages/Cart.jsx';
import User_profile from './User_pages/User_profile.jsx';
import Profile_info from './User_pages/Profile_info.jsx';
import My_order from './User_pages/My_order.jsx';
import Message from './vconnect/Message.jsx';
import Blogs from './vconnect/Blogs.jsx';
import Colors from './vconnect/Colors.jsx';
import SingleBlog1 from './vconnect/SingleBlog1.jsx';
import Single_User from './vconnect/Single_User.jsx';
import OrderDetails from './vconnect/OrderDetails.jsx';
import Payments from './vconnect/Payments.jsx';
import PaymentDetails from './vconnect/PaymentDetails.jsx';



function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (

   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='ourstore' element={<OurStore selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path='blogs' element={<Blog/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='pay' element={<Pay/>}/>
      <Route path="blog:id" element={<SingleBlog/>}/>
      <Route path="product/:id" element={<SingleProduct/>}/>
      <Route path="forgotpassword" element={<ForgotPassword/>}/>
      <Route path="resetpassword" element={<ResetPassword/>}/>
      <Route path='user_profile' element={<User_profile/>}>
        <Route index element={<Profile_info/>}/>
        <Route path='my_order' element={<My_order/>}/>
      </Route>
    </Route>
  
          <Route path="Dashboard" element={<Viconnect/>} >
          <Route index element={<Dashboard_1/>}/>
           <Route path="Addproduct" element={<Add_product/>}/>
           <Route path="Allproduct" element={<All_product/>}/>
           <Route path="dashboard" element={<Dashboard_1/>}/>
           <Route path="orders" element={<Orders/>}/>
           <Route path="payments" element={<Payments/>}/>
           <Route path="category" element={<Category/>}/>
           <Route path="brand" element={<Brand/>}/>
           <Route path='color' element={<Colors />}/>
           <Route path="message" element={<Message/>}/>
           <Route path="blogs" element={<Blogs/>}/>
           <Route path="blogs/:id" element={<SingleBlog1/>}/>
           <Route path="users" element={<Users/>}/>
           <Route path="users/:id" element={<Single_User/>}/>
           <Route path="orders/:id" element={<OrderDetails/>}/>
           <Route path="payments/:id" element={<PaymentDetails/>}/>
       
           <Route
             path="*"
             element={
               <>
                 <h1>Page not Found</h1>
                 <Link to={"/"}>Back to home</Link>
               </>
             }
           />
           
         </Route>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;