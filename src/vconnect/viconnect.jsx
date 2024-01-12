import React, { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Topmenu from './Topmenu'
import Sidemenu from './Sidemenu'
import { useState } from 'react'
import { faL } from '@fortawesome/free-solid-svg-icons'

function Viconnect() {

  let userr=JSON.parse(localStorage.getItem("isLoggedIn"));
  let token =userr?.access_token;
  let userData=userr?.user;
  useLayoutEffect(()=>{
    // console.log(userData?.role);
    if(!localStorage?.getItem('isLoggedIn') || userData?.role !=='admin') window.location.href = "/login" 
  })
  const [sidemen, setSidemen] = useState(true);
  const [grid, setGrid] = useState({
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
  });

  const handleChangeClick = () => {
    // If sidemen is true, set grid to expanded state, else reset it
    if (sidemen) {
      setGrid({
        gridColumn: '1 / 3',
        gridRow: '2 / 3',
      });
    } else {
      setGrid({
        gridColumn: '2 / 3',
        gridRow: '2 / 3',
      });
    }

    // Toggle the sidemen state
    setSidemen((prevIsEditModel) => !prevIsEditModel);
  };
  return (
    <div className='parent_container'>
      
    <div className='topmen'><Topmenu handleChangeClick = {handleChangeClick}/></div>
   
    
    {sidemen && <Sidemenu handleChangeClick = {handleChangeClick}/>}
   
    <div className='outlate' style={grid}><Outlet/></div>
    </div>
  )
}

export default Viconnect
