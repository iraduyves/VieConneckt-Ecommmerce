import React, { useEffect, useState, useContext } from 'react';
import axios from '../components/configuration/axios';
import { useParams } from 'react-router-dom';
import { ProductContent } from '../components/Context/ProductProvider';
import Notiflix from 'notiflix';


function SingleUser() {
const { id } = useParams();
  // console.log("id",id);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  

  useEffect(() => {
    
    const fetchUserData = async () => {
      Notiflix.Loading.arrows()
      try {
                  let user = JSON.parse(localStorage.getItem("isLoggedIn"));
        const response = await axios.get(`/api/v1/user/viewaUser/${id}`,{
                  headers: {
                      Authorization: `Bearer ${user?.access_token}`,
                  },
              });
        setUser(response.data);
      } catch (error) {
        const errorMessage = error?.response?.data?.error || 'An error occurred getting user data';
        Notiflix.Notify.failure(errorMessage);
      }
    };

    fetchUserData();
    Notiflix.Loading.remove()
  }, [id]);
  const [selectedRole, setSelectedRole] = useState('user');

  // Event handler to update the selected role
  const { EditRole } = useContext(ProductContent);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };
  const onSubmit =()=>{
    // console.log("selectedRole:",selectedRole,id);
    EditRole.mutate({selectedRole,id})
   
  }

  return (
    <div>
      {user ? (
        <div className="user-details">
          <div className="user-image">
            <img src={user.profileImage} alt="User Profile" />
          </div>
          <div className="user-info">
            <h2>User Details</h2>
            <p>Full Name: {user.FullName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Gender: {user.gender}</p>
            <p>Location: {user.location}</p>
            <p>Role: {user.role}</p>
          
            <div className='Edit_Cancer_container role'>
            {/* {editMode && <Cancer handleChangeClick = {handleChangeClick} editMode={editMode} setEdit={setEdit}/>} */}
            {editMode && (
                <div className='sellect_role'>
                <label className='sellect_role_lab'>Select Role:</label>
                <select value={selectedRole} onChange={ (event) => setSelectedRole(event.target.value)} className='sellect_role_sel'>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}
            <div className='edit_role_actions'>
            <button className='button_e' onClick={editMode ? onSubmit : handleEditClick}>
              {editMode ? 'Save' : 'Edit Role'}
            </button>

            {editMode && (
              <button className='button_c' onClick={handleEditClick}>
                Cancel
              </button>
            )}
            </div>
          </div>

            {/* Display other user details as needed */}
          </div>
        </div>
      ) : (
        Notiflix.Loading.arrows()
      )}
   { Notiflix.Loading.remove()}
    </div>
  );
}

export default SingleUser;

