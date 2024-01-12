import { useContext, useState, useEffect } from "react";
import React from "react";
import "./Checkout.css";
import { ProductContent } from "../Context/ProductProvider";
import { useForm } from "react-hook-form";

function MtnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="145 65 270 270" style={{ width: "2rem", height: "2rem" }}><path d="m145 65h270v270h-270z" fill="#fff" /><path d="m158.163 78.136h243.702v243.702h-243.702z" fill="#ffcb05" /><g fill-rule="nonzero"><path d="m394.237 199.285c0 26.014-51.138 47.101-114.21 47.101-63.086 0-114.224-21.087-114.224-47.101 0-26.015 51.138-47.088 114.224-47.088 63.072 0 114.21 21.073 114.21 47.088" fill="#00678f" /><path d="m206.844 222.532 11.812-47.102h18.873v27.432l12.407-27.432h19.48l-11.799 47.101h-12.406l7.073-30.401-14.755 30.401h-10.017v-30.401l-7.695 30.401h-12.974z" fill="#fff" /><path d="m273.237 223.126 1.768-6.561h13.581l-1.782 6.561h-13.568z" fill="#ed1d24" /><path d="m303.625 222.532 11.799-47.102h13.581l5.913 25.056 6.48-25.056h12.393l-11.799 47.101h-12.987l-6.494-25.636-6.493 25.636h-12.393z" fill="#fff" /><path d="m273.237 175.43-2.957 11.934h12.406l-6.682 25.88h13.567l6.697-25.88h12.392l2.943-11.934h-38.367z" fill="#ffcb05" /></g></svg>
  )
}

function Pay() {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const [id, setId] = useState("");
  const { GetOrders, MakePayment, GetAllProduct } = useContext(ProductContent);
  console.log(GetOrders);

  const handleSummaryClick = (item) => {
    setAmount(item.totalOrderPrice);
    setId(item._id);
  };

  console.log("amount", amount);
  console.log("id", id);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    MakePayment.mutate({ data, id })
    console.log(id, data, amount);
  };



  return (
    <>
      <div className="container-xxl mt-4">
        <h2 className='d-flex gap-2' style={{ alignItems: 'center' }}>
          CHECKOUT <MtnIcon />
        </h2>
        <div className="pay">
          <div className="pay-form">
            {" "}
            <form

              onSubmit={handleSubmit(onSubmit)}
              style={{
                marginTop: "45px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "10px",
                maxWidth: "500px", // Added maximum width for better responsiveness
                margin: "0 auto", // Center the form horizontally
              }}
            >
              <label
                htmlFor="number"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Mobile  Phone Number:
              </label>
              <input
                type="text"
                id="number"
                name="number"

                {...register('number', { required: true })}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <label
                htmlFor="amount"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                total amount:
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                {...register('amount')}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#2A7B37",
                  color: "#fff",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Pay Now
              </button>
            </form>
          </div>
          <div className="pay-checkout">
            <div className="checkout-summary">
              <h3>Your Latest 3 unpayed orders:</h3>


              <div style={{ marginBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "20px" }}>Choose any by clicking on it </span>
                  {/* <span
                    style={{
                      marginLeft: "20rem",
                      alignItems: "flex-end",
                      color: "#2A7B37",
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "normal",
                      textTransform: "capitalize",
                    }}
                  >
                    {/* {item?.totalOrderPrice} RWF 
                    {/* {GetOrders?.data?.map((item) => {
                          const product = GetAllProduct.data?.filter(i => i._id === item.product?._id)[0]
                          return { ...item, product }
                        }).reduce((sum, i) => (sum + (i?.product?.price || 0)), 0)} RWF 
                  </span> */}
                </div>
                <br />
                {GetOrders?.data
                  ?.filter(item => item?.orderStatus === 'Pending')?.reverse()?.slice(0, 3)
                  .map((item, index) => (
                    <div className="pay-summary" onClick={() => handleSummaryClick(item)} key={item._id}>

                      <div className="pay-product">
                        <span className="pay-heading">Product Name: </span>
                        <span>{item?.products[0]?.productName} </span>
                      </div>
                      <br />
                      <div className="pay-product">
                        <span className="pay-heading">Quantity: </span>
                        <span>{item?.quantity}</span>
                      </div>
                      <br />
                      <div className="pay-product">
                        <span className="pay-heading">Unity price: </span>
                        <span>{item?.products[0]?.price} RWF</span>
                      </div>
                      <br />
                      <div className="pay-product">
                        <span className="pay-heading">Total item price: </span>
                        <span>{item?.totalOrderPrice} RWF</span>
                      </div>

                      <br />
                    </div>
                  ))}
              </div>

              <div />
            </div>

          </div>
        </div>
      </div>

    </>
  );
}

export default Pay;
