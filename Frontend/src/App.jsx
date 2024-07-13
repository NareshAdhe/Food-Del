import Navbar from "./Components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home"
import Cart from "./Pages/Cart/Cart"
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder"
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Verify from "./Pages/Verify/Verify";
import gsap from "gsap";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className="app">
        <Navbar setShowLogin = {setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<PlaceOrder/>} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
