import React from 'react'
import Profile_info from './Profile_info'

function Cancer({handleEditClick,editMode,setEdit}) {
  return (
    <div>
      <button className='button_c' onClick={setEdit}>
  Cancer
  </button>
    </div>
  )
}

export default Cancer
