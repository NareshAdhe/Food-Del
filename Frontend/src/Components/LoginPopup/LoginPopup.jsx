import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'
import { toast} from 'react-toastify';
const LoginPopup = ({setShowLogin}) => {
    const [currentState,setCurrentState] = useState("Sign Up");
    const {setToken,url} = useContext(StoreContext);
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({...data,[name]:value}));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(currentState === "Login"){
            newUrl += '/api/user/login'
        }
        else{
            newUrl += '/api/user/register'
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false);
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }
    }

  return (
    <div className='login-popup' onSubmit={onLogin}>
        <form action="" className="login-popup-container" autoComplete='off'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' name='name' required />}
                <input onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' name='email' required />
                <input onChange={onChangeHandler} value={data.password} type="password" placeholder='password' name='password' required />
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create Acocount":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currentState==="Login"
            ?<p>Create a new account? <span  onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
            :<p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login Here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup