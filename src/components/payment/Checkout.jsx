import React, { useState } from "react";
import "../payment/Checkout.css";
import { Link } from "react-router-dom";

function Checkout() {
  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="checkout-all">
        <h2>Checkout Details</h2>
        <div className="checkout">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="recipientName">
                Sender Name:
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="recipientName">
                Phone number:
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="addressLine1">
                Address of Shipping:
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="addressLine2">
                Street Address:
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="city">
                District:
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <Link to="/pay">
                <button type="submit">Submit</button>
              </Link>
            </form>
          </div>
          {/* <div className="checkout-summary">
            <h1>Checkout Summary</h1>
            <div className="cart-items"></div>
            <div className="subtotal">Subtotal: </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Checkout;
