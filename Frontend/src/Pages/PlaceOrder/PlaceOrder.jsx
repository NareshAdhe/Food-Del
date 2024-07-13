import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const PlaceOrder = () => {

  const { getTotalCartAmount, url, food_list, cartItems, token } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      items: orderItems,
      address: data,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/api/order/place",orderData, { headers: { token } });
    if (response.data.success) {
      const session_url = response.data.session_url;
      window.location.replace(session_url);
    }
    else {
      alert(response.data.message);
    }
  }

  useEffect(() => {
    if (getTotalCartAmount() === 0) {
      navigate("/cart");
      toast.error("Cart Is Empty");
    }
  },[]);

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} value={data.email} name='email' type="text" placeholder='Email' />
        <input required onChange={onChangeHandler} value={data.street} name='street' type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.city} name='city' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} value={data.state} name='state' type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.zipcode} name='zipcode' type="text" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} value={data.country} name='country' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} value={data.phone} name='phone' type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')} type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder