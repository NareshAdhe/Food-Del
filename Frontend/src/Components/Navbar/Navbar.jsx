import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import gsap from 'gsap'
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin}) => {

  const buttonRef = useRef(null);
  const { token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logged Out Successfully");
  }

  return (
    <div className="navbar">
      <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to="/" className={menu === 'Home' ? "active" : ""} onClick={() => setMenu("Home")}>Home</Link>
        <a href='#app-download' className={menu === 'Mobile-App' ? "active" : ""} onClick={() => setMenu("Mobile-App")}>Mobile-App</a>
        <a href='#footer' className={menu === 'Contact Us' ? "active" : ""} onClick={() => setMenu("Contact Us")}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 || !token ? "" : "dot"}></div>
        </div>
        {!token ? <button ref={buttonRef} onClick={() => setShowLogin((true))}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar