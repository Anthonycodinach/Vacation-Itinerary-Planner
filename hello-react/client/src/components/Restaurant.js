import React, { useState } from 'react'
import miami from '../../src/newPages/assets/cityImages/Miami.jpg'
import { GET_USER_REST } from '../utils/queries';
import { useQuery } from '@apollo/client';

const RestaurantReservation = (props) => {

    const {loading, data} = useQuery(GET_USER_REST);

    if (loading) {
        return <h1> Loading... </h1>
    }

    const restaurantList = data?.userRests;

    console.log(data)

    return (
        <div class="tripsItem">
            {restaurantList.map((item, index) => ( 
            <div>
                <div class="profileImageContainer">
                    <img 
                    class="profileImage zoom" 
                    src={miami} 
                    trip={item._id}
                    key={`pic-${index}`}
                    />
                </div>
                <div class="profileTripOverview">
                    <h1 className='zoom' key={`loc-${index}`}>{item.name} </h1>
                    <h2 key={`sDate-${index}`}>{item.reservationDate}: {item.reservationTime} </h2>
                    <p class="profileTripAbout">{item.cuisine}</p>
                    <p class="profileTripAbout"> Party size: {item.guests}</p>

                </div>
            </div>
            ))}
        </div>
    )
}

export default RestaurantReservation