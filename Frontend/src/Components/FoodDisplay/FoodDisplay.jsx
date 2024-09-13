import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';
import { ShimmerThumbnail } from "react-shimmer-effects";
import axios from 'axios';

const FoodDisplay = ({ category }) => {
    const { food_list,setFoodList,url } = useContext(StoreContext);
    const [loading, setLoading] = useState(true);
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setLoading(false);
        setFoodList(response.data.data);
    }
    useEffect(async () => {
        await fetchFoodList();
    }, []);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {loading ? Array.from({ length: 32 }).map(() => (
                    <ShimmerThumbnail height={300}/>
                )) :
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay