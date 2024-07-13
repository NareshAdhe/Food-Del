import React, { useContext, useEffect,useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify';
import {assets} from "../../assets/assets"
import axios from 'axios';

const MyOrders = () => {

  const {url,token} = useContext(StoreContext);
  const [data,setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    if (response.data.success) {
      setData(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  },[token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index) => {
            return(
             <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>{order.items.map((item,index) => {
                    if (index === order.items.length-1) {
                      return item.name + " x " + item.quantity 
                    }
                    else{
                      return item.name + "X" + item.quantity + ", "
                    }
                    
                  })}</p>
                  <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders