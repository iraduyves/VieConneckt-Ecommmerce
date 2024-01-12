
import React, { useState, useContext } from 'react';
import Change_password from './Change_password';
import { ProductContent } from '../components/Context/ProductProvider';
import Cancer from './Cancer';
import { FaCloudUploadAlt } from "react-icons/fa";



function Profile_info() {


  const { Editprofile, GetProfille, GetOrders } = useContext(ProductContent)




  const [full_Name, setfull_Name] = useState(GetProfille.data?.FullName || '');
  const [role, setrole] = useState(GetProfille.data?.role || '');
  const [Email_address, setEmail_address] = useState(GetProfille.data?.email || '');
  const [Phone_Number, setPhone_Number] = useState(GetProfille.data?.phone || '');
  const [image, setimage] = useState();
  const [gender, setgender] = useState(GetProfille.data?.gender || '');
  const [location, setlocation] = useState(GetProfille.data?.location || '');
  const [userName, setuserName] = useState(GetProfille.data?.userName || '');
  const [Files, setFiles] = useState([])


  const [editMode, setEditMode] = useState(false);
  const [set_password, setSet_password] = useState(false)

  const handleChangeClick = () => {
    setSet_password(!set_password);
  };
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const setEdit = () => {
    onSubmit();
    setEditMode(!editMode);
  }


  const defaultValues = {

    role: GetProfille.data?.role,
    Email_address: GetProfille.data?.email,
    Phone_Number: GetProfille.data?.phone,
    image: GetProfille.data?.profileImage,
    genger: GetProfille.data?.gender,
    location: GetProfille.data?.location,
    userName: GetProfille.data?.userName,
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles(() => e.target.files)
    if (files && files.length > 0) {
      const selectedImage = URL.createObjectURL(files[0]);
      setimage(selectedImage);
      // console.log("selectedImage",selectedImage);
    }
  };



  const onSubmit = () => {

    let profileImag;
    if (image != "") {
      profileImag = image;
    } else {
      profileImag = defaultValues.image;
    }
    const id = GetProfille.data?._id;
    const images = profileImag;

    const data = {
      profileImage: profileImag,
      FullName: full_Name,
      gender: gender,
      location: location,
      phone: Phone_Number,
      userName: userName,
    }

    Editprofile.mutate({ data, images: Files, id });

  }

  return (
    <div className='profile_info_main'>

      <div className='profile_info_min'>
        <div className='profile_info_title'><h1>Customer Profile</h1></div>
        <div className='profile_info_more'>
          <div className='profile_info_more_text'>
            <div className='profile_info_more_text_min'>
              <div className='p'><p className='text1'>Full Name:</p><input type="text"
                className='text2'
                style={editMode ? { borderBottom: '1px solid black' } : {}}
                defaultValue={defaultValues.full_Name}
                readOnly={!editMode}
                value={full_Name}
                onChange={(e) => setfull_Name(e.target.value)}

              /></div>

              <div className='p'><p className='text1'>User Name:</p>
                <input
                  type="text"
                  className='text2'
                  style={editMode ? { borderBottom: '1px solid black' } : {}}
                  readOnly={!editMode}
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}

                /></div>

              <div className='p'><p className='text1'>Email address:</p><input type="text"
                className='text2'

                readOnly={!editMode}
                value={Email_address}
                onChange={(e) => setEmail_address(e.target.value)}
              /></div>
              <div className='p'><p className='text1'>Role:</p><input
                type="text"
                className='text2'

                readOnly={!editMode}
                value={role}
                onChange={(e) => setrole(e.target.value)}
              /></div>
              <div className='p'><p className='text1'>Gender:</p><input
                type="text"
                className='text2'
                style={editMode ? { borderBottom: '1px solid black' } : {}}
                defaultValue={defaultValues.genger}
                readOnly={!editMode}
                value={gender}
                onChange={(e) => setgender(e.target.value)}
              /></div>
              <div className='p'><p className='text1'>Location:</p><input
                type="text"
                className='text2'
                style={editMode ? { borderBottom: '1px solid black' } : {}}
                defaultValue={defaultValues.location}
                readOnly={!editMode}
                value={location}
                onChange={(e) => setlocation(e.target.value)}
              /></div>

              <div className='p'><p className='text1'>Phone Number:</p><input
                type="text"
                className='text2'
                style={editMode ? { borderBottom: '1px solid black' } : {}}
                defaultValue={defaultValues.Phone_Number}
                readOnly={!editMode}
                value={Phone_Number}
                onChange={(e) => setPhone_Number(e.target.value)}
              /></div>
            </div>
            <div className='change_password'>
              <div>{set_password && <Change_password handleChangeClick={handleChangeClick} />} </div>

              <button onClick={handleChangeClick}>
                {set_password ? 'Cancer' : 'change password '}
              </button>

              {/* <p className='text2'>John</p> */}
            </div>
          </div>
          <div className='profile_info_more_image'>
            <h2>profile image</h2>
            <img
              src={image}

              alt="" />
            <div className="Uploade_new_c">
              <label className="uploadnew_label" for="file">
                <input
                  type="file"
                  className='uploadnew'
                  placeholder="upload all product image"
                  multiple
                  readOnly={!editMode}
                  // onChange={e => {setFiles(() => e.target.files)}}

                  onChange={handleFileChange}
                />
                <p><FaCloudUploadAlt className='uploadnew_label_icon' />Uploade here</p></label>
            </div>
          </div>
        </div>
        <div className='profile_info_bottom'>
          <div>
            <p>number of order</p>
            <p>20</p>
          </div>
          <div className='Edit_Cancer_container'>
            {/* {editMode && <Cancer handleChangeClick = {handleChangeClick} editMode={editMode} setEdit={setEdit}/>} */}

            <button className='button_e' onClick={editMode ? onSubmit : handleEditClick}>
              {editMode ? 'Save' : 'Edit Profile'}
            </button>

            {editMode && (
              <button className='button_c' onClick={handleEditClick}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile_info
