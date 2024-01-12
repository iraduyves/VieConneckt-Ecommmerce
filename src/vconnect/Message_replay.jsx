import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ProductContent } from '../components/Context/ProductProvider';


function Message_replay({handleCreateClick,item}) {
  
  const { handleSubmit, control,register } = useForm();
  const { RespondMessage } = useContext(ProductContent);
  const onSubmit = (data) => {
    let id = item._id;
    data.contactId=id;
    RespondMessage.mutate(data)

  };
  return (
    
      <div className="replay">
                  <div className="replay_top">
                        <p>{item.email}</p>   
                        <p>12 jun 2020</p>         
                  </div>
                  <div className='replay_massages'>
                       <p className='replay_massages_text'>{item.comment}</p>             
                  </div>
                  <div>
                    <div className="replay_message_container">
                      
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                                  <Controller
                                    name="message"
                                    control={control}
                                    render={({ field }) => (
                                      <input type="text" className='replay_massage' placeholder='replay the message*' {...field} {...field}/>
                                            )}
                                  />
                              
                               <button type='submit' className='replay_button'>send</button>
                                
                              </form>
                      {/* <form action="post" className='replay_form'>
                        <input type="text" className='replay_massage' placeholder='replay the message'/>
                        <button className='replay_button'>send</button>
                      </form> */}
                    </div>
                  </div>
      </div>

  )
}

export default Message_replay
