import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
const Order = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async (req, res) => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else {
      toast.error(success.data.message);
    }
  }


  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
      console.log(response.data.success);
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='orders add'>
      <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div className="order-item-food">
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + "X" + item.quantity + ", "
                  }
                })}</p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}.00</p>
              <select onChange={(event) => statusHandler(event,order._id)} value={order.status} >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Order