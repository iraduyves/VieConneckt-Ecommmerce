import React, { useState, useContext } from 'react';
import { ProductContent } from '../components/Context/ProductProvider';

function Change_password() {
  const {  EditPassword } = useContext(ProductContent);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const isStrongPassword = (password) => {
    // Password must contain an uppercase letter, a lowercase letter,
    // be at least 8 characters long, and contain a symbol
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error messages
    setErrorMessages({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

    // Simple validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessages({
        currentPassword: 'Please fill in all fields.',
        newPassword: '',
        confirmNewPassword: '',
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessages({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: 'New password and confirm new password must match.',
      });
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setErrorMessages({
        currentPassword: '',
        newPassword: 'Password must contain an uppercase letter, a lowercase letter, be at least 8 characters long, and contain a symbol.',
        confirmNewPassword: '',
      });
      return;
    }

    // If validation passes, you can proceed with your form submission logic
    // For example, you can make an API request to update the password
    console.log('Form submitted!');
    const data = {
      currentPassword,
      confirmNewPassword
    }
    console.log('Form submitted!',data);
    EditPassword.mutate(data)
  };

  return (
    <div>
      <div className='change_password_container'>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder='Current password'
            className='inputfield'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {errorMessages.currentPassword && <p className="error-message">{errorMessages.currentPassword}</p>}
          
          <input
            type="password"
            placeholder='New password'
            className='inputfield'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errorMessages.newPassword && <p className="error-message">{errorMessages.newPassword}</p>}
          
          <input
            type="password"
            placeholder='Confirm new password'
            className='inputfield'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {errorMessages.confirmNewPassword && <p className="error-message">{errorMessages.confirmNewPassword}</p>}
          
          <button type='submit' className='Save_l'>Save</button>
        </form>
      </div>
    </div>
  );
}

export default Change_password;
