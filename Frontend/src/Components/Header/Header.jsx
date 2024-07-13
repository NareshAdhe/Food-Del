import React, { useEffect } from 'react'
import './Header.css'
import gsap from 'gsap'
const Header = () => {

    useEffect(() => {
        let tl = gsap.timeline();
        tl.from(".header-contents h2,.header-contents p,.header-contents button",{
            x: -100,
            opacity:0,
            delay:2,
            duration:0.3,
            stagger:.2
        });
    },[])

    return (
        <div className="header">
            <div className="header-contents">
                <h2>Order your favourite food here</h2>
                <p>Choose From a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings ans elevate your dining experience, one delicious meal at a time.</p>
                <button>View Menu</button>
            </div>
        </div>
    )
}

export default Header