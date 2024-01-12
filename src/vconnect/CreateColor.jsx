import React, { useState,useContext } from 'react'
import { ProductContent } from '../components/Context/ProductProvider';
import { useForm, Controller } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";


function CreateColor({handleCreateClick}) {
                  const [color,setColors]=useState();

                  const {CreateColor } = useContext(ProductContent)
                  const onSubmit = (color, event) => {
                                    event.preventDefault(); // Prevents the default form submission behavior
                                    
                                    // console.log("jefnvjenvjdkvvkdvkskv ks", color);
                                    CreateColor.mutate({ color });
                                  };
                  return (
                    <div className='create_big_container'>
                        <div className='close_container'>
                       <button onClick={handleCreateClick}><IoCloseSharp className='close_icon' /></button> 
                </div>
                      <form onSubmit={(event) => onSubmit(color, event)}>
                      <div className='create_min_container'>
                    <div className='color_1' style={{backgroundColor:color}}></div>
                                    

                            <input 
                            name='colorName'
                            type="text" 
                            placeholder='Calor name/code*' 
                       
                            onChange={(e) => setColors(e.target.value)}
                            />
        
                        <button type="submit">Create</button>
                      </div>
                    </form>
                    </div>
  )
}

export default CreateColor
