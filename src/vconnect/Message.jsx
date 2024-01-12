import React, { useContext, useState } from 'react'
import Message_replay from './Message_replay'
import { ProductContent } from '../components/Context/ProductProvider';

function Message() {
  const { GetMessages } = useContext(ProductContent);
  
  // console.log("GetMessagesGetMessages:",GetMessages.data)
  const [CreateBrand, setCreateBrand]= useState(false)
  const [editbrand,seteditbrand] = useState(null)

  
  const handleCreateClick = (item) => {
    seteditbrand(item);
    setCreateBrand((previsEditMadel) => !previsEditMadel);
  }
  return (
    <div className='message_main_container'>
      
      <div className='message_min_container'>
        <div className='message_1'>
          <div className='message_title'>
            <h2>Messages</h2>
          </div>
          <div className='message_3'>
            
          {GetMessages?.data?.map((item, index) => (
            
          <div className='message_0' onClick={() => handleCreateClick(item)}>
            
            <div className='message_top'>
              <div className='message_profille'>
                <p>{item.email}</p>
              </div>
              <div className='message_time'>
                <p></p>
              </div>
            </div>
            <div className='message_down'>
              <p className='message_text'>{item.comment}</p>
            </div>
          </div>
           ))};
         

        </div>
          </div>
          
        <div className='message_2'>
          <div className='message'>
                        {CreateBrand && <Message_replay handleCreateClick = {handleCreateClick} item={editbrand}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message

