import React, { useEffect, useState } from 'react'
import { useSwipeable } from "react-swipeable";
import './Profile.css'
import mapIcon from './assets/Icons/map.svg'

import miami from './assets/cityImages/Miami.jpg'
import nyc from './assets/cityImages/NewYorkCity.jpg'
import chicago from './assets/cityImages/Chicago.jpg'
import atlanta from './assets/cityImages/Atlanta.jpg'
import x from './assets/Icons/X.svg'

import Create from '../pages/Create';

import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_USER_ITINERARIES } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Trip = (props) => {
    
    const newItinerary = props.itineraryList;

    if (!props.itineraryList?.length) {
        return null;
    }

    return (
        <div class="tripsItem">
            {newItinerary.map((item, index) => ( 
            <div>
                <div class="profileImageContainer">
                <Link to={`/Profile/Trip/${item._id}`}>
                    <img 
                    class="profileImage zoom" 
                    src={miami} 
                    trip={item._id}
                    key={`pic-${index}`}
                    />
                </Link>
                </div>
                <div class="profileTripOverview">
                    <h1 className='zoom' key={`loc-${index}`}>{item.location} </h1>
                    <h2 key={`sDate-${index}`}>{item.startDate} </h2>
                    <p class="profileTripAbout">Add Comments!</p>
                </div>
            </div>
            ))}
        </div>
    )
}

const Profile = () => {
    
    const username = Auth.getToken2();

        const { data } = useQuery(GET_USER_ITINERARIES, {
            variables: { username: username },
        });

        const itineraryList = data?.userItinerary;

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const CreateTrip = () => {
        
        if (modalIsOpen) {
            return (
                <div>
                <div className='createNewTripBlur'>
                </div>
                <div className='createNewTrip'>
                    <div className='createNewTripInterior'>
                        <h1>New Trip</h1>
                        <a className='closeButton' onClick={() => { setModalIsOpen((prevState) => !prevState)}}>
                            <img src={x} className='closeButtonImage'></img>
                        </a>
                        <Create></Create>
                    </div>
                </div>
            </div>
            )
        }
    
        return (
            <>
            </>
        )
    }

    return (
        <>
            <CreateTrip></CreateTrip>
            <div className='profileMain'>
                <div className='profileCategory'>
                    <div className='profileImageContainer'>
                        <img className='profileImage'></img>
                    </div>
                    <div className='profileItem'>
                        <h1>{username}</h1>
                        <h2>About me!</h2>
                        <p>Hi {username}, Where you want go Next!</p>
                    </div>
                </div>
                <div className='profileCategory border'>
                    <div class="profileItem">
                        <h2>Location</h2>
                        <p>Miami, Florida</p>
                    </div>
                    <div class="profileItem">
                        <h2>Favorite Foods</h2>
                        <p>Indian</p>
                    </div>
                    <div class="profileItem">
                        <h2>Birthday</h2>
                        <p>Sometime</p>
                    </div>
                    <div class="profileItem">
                        <h2>Total Trips</h2>
                        <p>All</p>
                    </div>
                </div>

                <div className='upcomingTripsContainer'>
                    <h1>Upcoming Trips</h1>
                    <button className='profileButton zoom' onClick={() => { setModalIsOpen((prevState) => !prevState)}}><img src={mapIcon}></img>Plan a New Trip</button>
                </div>


                <div className='tripsContainer border'>
                    <Trip itineraryList = {itineraryList} 
                    />
                    <Trip city='Chicago' cityImage={chicago} date="Sep 25th - Sep 27th"></Trip>
                </div>

                <h1 className='subTitle'>Previous Trips</h1>

                <div className='tripsContainer'>
                    <Trip city='Miami' cityImage={miami} date="June 2023"></Trip>
                    <Trip city='Atlanta' cityImage={atlanta} date="August 2022"></Trip>
                </div>
                <div className='border'></div>
            </div>
        </>
    )
}

export default Profile