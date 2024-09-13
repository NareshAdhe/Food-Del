import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';
import { ShimmerThumbnail } from "react-shimmer-effects";
import axios from 'axios';

const FoodDisplay = ({ category }) => {
    const { food_list, setFoodList, url } = useContext(StoreContext);
    const [loading, setLoading] = useState(true);
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success) {
                setLoading(false);
                setFoodList(response.data.data);
            }
            else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchFoodList();
    }, []);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {loading ? Array.from({ length: 16 }).map((ele, ind) => (
                    <ShimmerThumbnail key={ind} height={300} />
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