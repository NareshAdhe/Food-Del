import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { toast} from 'react-toastify';
import axios from 'axios'

const Verify = () => {

    const {url,token} = useContext(StoreContext);
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment= async () => {
        let response = await axios.post(url+"/api/order/verify",{success,orderId},{headers:{token}});
        if (response.data.success) {
            navigate("/myorders");
            toast.success("Order Placed Successfully");
        }
        else{
            navigate("/");
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    },[]);

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify