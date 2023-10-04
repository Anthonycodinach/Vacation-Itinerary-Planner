import React, { useEffect, useState } from 'react'
import './Trip.css'
import caret from './assets/Icons/caret.svg'
import caretRight from './assets/Icons/caretRight.svg'
import miami from './assets/cityImages/Miami.jpg'
import { useParams } from "react-router-dom"
import x from './assets/Icons/X.svg'

import PropertyDetail from '../components/propertyDetail';
import property from '../components/API';
import SearchForm from '../components/Search/SearchForm';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation, gql } from '@apollo/client';
import {ADD_AIRBNB_TO_ITINERARY} from '../../src/utils/mutations'
import { GET_ITINERARY_DETAILS, GET_RESTAURANT_DETAILS, GET_USER_REST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import CreateNewRestaurant from '../pages/NewRestaurant'
import CreateEx from '../pages/NewEx'
import RestaurantReservation from '../components/Restaurant'

const AirbnbAccommodation = (props) => {
    
    const airbnbItem = props.accommodation;
    console.log(airbnbItem);

    if (!airbnbItem.airbnbname?.length) {
        return null;
    }

    return (
        <div class="tripsItem">
            <div>
                <div className="profileImageContainer">
                    <img 
                    className="profileImage zoom" 
                    src={airbnbItem.airbnbphoto}
                    key={(airbnbItem.airbnbId)}
                    />
                </div>
                <div class="profileTripOverview">
                    <h1 className='zoom' >{airbnbItem.location} </h1>
                    <h2 >{airbnbItem.airbnbname} </h2>
                    <h2 >Check In: {airbnbItem.startDate} </h2>
                    <h2 >{airbnbItem.airbnbprice}</h2>
                </div>
            </div>
        </div>
    )
}


const Trip = () => {

    const { id } = useParams();
    //console.log('Itinerary '+id);
    const { data , loading } = useQuery(GET_ITINERARY_DETAILS, {
        variables: { _id: id },
    })

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [activityModalIsOpen, setActivityModalIsOpen] = useState(false)
    const [restaurantModalIsOpen, setRestaurantModalIsOpen] = useState(false)
    const stripePromise = loadStripe("pk_test_51Nr12cG3HMx6NAFGYTqkC7ydc1MpCyK3OHCJZdsxYWQks9aYqneBjhpNKxxifgY2ZbJIdcNHDgfTG0uMisXWM4zS008wp3C3xw");

    if (loading) {
        return <h1> Loading... </h1>
    }

    const payment = async (event) => {
        
        console.log('Payment function called.');
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: "price_1NroUWG3HMx6NAFG0MVe6qg6", // Replace with the ID of your price
                quantity: 5,

            }],
            mode: 'payment',
            successUrl: 'http://localhost:3000/profile/trip#',
            cancelUrl: 'http://localhost:3000/profile/trip#',
        });
    
    };
    
    const CreateTrip = () => {

        const [city, setCity] = useState('');
        const [startDate, setstartDate] = useState('');
        const [endDate, setendDate] = useState('');
        const [people, setpeople] = useState('');
        const [listing, setListing] = useState();
        const [homes, setHomes] = useState();

        const [listingId, setlistingId] = useState();

        const query = {
            city: '',
            startDate: '',
            endDate: '',
            people: ''
        }

        
        const searchProperty = async (query) => {
            const response = await property(query)
            setListing(response)
            console.log(response)
            setHomes(response.data.homes);
            console.log(response.data.homes);
        }

        if (!data) {
        } else {
            if ( city  === '') {
                setCity(data.getItineraryDetails.location);
            }      
            if ( people === '' ) {
                setpeople(data.getItineraryDetails.guests);
            }
            if ( startDate === '' ) {
                setstartDate(data.getItineraryDetails.startDate);
            }
            if ( endDate === '' ) {
                setendDate(data.getItineraryDetails.endDate);
            }}

        const handleInputChange_city = (e) => setCity(e.target.value);
        const handleInputChange_startDate = (e) => setstartDate(e.target.value);
        const handleInputChange_endDate = (e) => setendDate(e.target.value);
        const handleInputChange_people = (e) => setpeople(e.target.value);

        const [airbnbValues] = useMutation(ADD_AIRBNB_TO_ITINERARY);

        const handleFormSubmit = (e) => {
            e.preventDefault()
            query.city =  { city } 
            query.startDate = { startDate }
            query.endDate = { endDate }
            query.people = { people }
            console.log(query)
            searchProperty(query);
        };

        const handleFormAdd = (e) => {
            e.preventDefault()
            // setlistingId(e.target.id);
            // console.log(e);
            // console.log(id);
            // console.log(e.target.id);
            // console.log(e.target.name);
            // console.log(e.target.attributes.addr.value);
            // console.log(people);
            // console.log(startDate);
            // console.log(endDate);

            airbnbValues({
                variables: {
                _id: id,
                airbnbId: e.target.id,
                airbnbphoto: e.target.attributes.addr.value,
                airbnbprice: e.target.attributes.price.value,
                airbnbguests: people,
                airbnbname: e.target.name,
                airbnbCheckInDate: startDate,
                airbnbCheckOutDate: endDate,
                airbnbguests: people
                }
            })

            setModalIsOpen((prevState) => !prevState)
            window.location.reload();
            
        };

             
        if (modalIsOpen) {
                      
            return (
                <div>
                    <div className='createNewTripBlur'>
                    </div>
                    <div className='createNewTripAccomodation'>
                        <div className='createNewTripInterior'>
                            <h1>New Accomodations</h1>
                            <a className='closeButton' onClick={() => { setModalIsOpen((prevState) => !prevState) }}>
                                <img src={x} className='closeButtonImage'></img>
                            </a>

                            <SearchForm
                                city={ city }
                                handleInputChange_city={handleInputChange_city}
                                people={ people }
                                handleInputChange_people={handleInputChange_people}
                                startDate={ startDate }
                                handleInputChange_startDate={handleInputChange_startDate}
                                endDate={ endDate }
                                handleInputChange_endDate={handleInputChange_endDate}
                                
                                handleFormSubmit={handleFormSubmit}
                            />

                            <div heading={'List Of Properties'}>
                                {listing ? (
                                    <PropertyDetail
                                        list={homes}
                                        profileId= {id}
                                    handleFormAdd = { handleFormAdd }
                                    />
                                ) : (
                                    <h3>Pending Results</h3>
                                )}
                            </div>
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

    const CreateActivity = () => {

        if (activityModalIsOpen) {
            return (
                <div>
                    <div className='createNewTripBlur'>
                    </div>
                    <div className='createNewTripAccomodation'>
                        <div className='createNewTripInterior'>
                            <h1>New Activity</h1>
                            <a className='closeButton' onClick={() => { setActivityModalIsOpen((prevState) => !prevState) }}>
                                <img src={x} className='closeButtonImage'></img>
                            </a>
                            <CreateEx></CreateEx>
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

    const CreateRestaurant = () => {

        if (restaurantModalIsOpen) {
            return (
                <div>
                    <div className='createNewTripBlur'>
                    </div>
                    <div className='createNewTripAccomodation'>
                        <div className='createNewTripInterior'>
                            <h1>New Restaurants</h1>
                            <a className='closeButton' onClick={() => { setRestaurantModalIsOpen((prevState) => !prevState) }}>
                                <img src={x} className='closeButtonImage'></img>
                            </a>
                            <CreateNewRestaurant></CreateNewRestaurant>
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


    const MenuMainOverviewItem = (props) => {

        const [active, setActive] = useState(false);
        const [open, setOpen] = useState(false);


        if (active) {
            return (
                <div className='menuMainOverviewItem'>
                    <a href='#' className='menuMainOverviewItemButton' onClick={() => { setOpen((prevState) => !prevState); setActive((prevState) => !prevState) }} >
                        <img src={caret} className='menuMainOverviewIcon'></img>
                    </a>
                    <a>
                        <h1>{props.title}</h1>
                    </a>
                    {open && props.children}
                </div>
            )
        } else

            return (
                <div className='menuMainOverviewItem'>
                    <a href='#' className='menuMainOverviewItemButton' onClick={() => { setOpen((prevState) => !prevState); setActive((prevState) => !prevState) }} >
                        <img src={caretRight} className='menuMainOverviewIcon'></img>
                    </a>
                    <a>
                        <h1>{props.title}</h1>
                    </a>
                    {open && props.children}
                </div>
            )
    }

    const MenuSideBarItem = (props) => {

        const [open, setOpen] = useState(true);
        const [active, setActive] = useState(true);

        if (active) {
            return (
                <div className='menuSideBarItem'>
                    <a href='#' className='menuSideBarIconButton' onClick={() => { setOpen((prevState) => !prevState); setActive((prevState) => !prevState) }} >
                        <img src={caret} className='menuSideBarIcon'></img>
                        <h1>{props.title}</h1>
                    </a>
                    {open && props.children}
                </div>
            )
        } else {

            return (
                <div className='menuSideBarItem'>
                    <a href='#' className='menuSideBarIconButton' onClick={() => { setOpen((prevState) => !prevState); setActive((prevState) => !prevState) }} >
                        <img src={caretRight} className='menuSideBarIcon'></img>
                        <h1>{props.title}</h1>
                    </a>
                    {open && props.children}
                </div>
            )
        }

    }
    
    return (
        
        
        <>
            <CreateActivity></CreateActivity>
            <CreateRestaurant></CreateRestaurant>
            <CreateTrip></CreateTrip>
            <div className='tripMain'>
                <div className='menuMain'>
                    <div className='menuSideBar'>
                        <div className='menuSideBarAI'>
                            <button className='buttonAI'>AI Personal Assistant</button>
                        </div>
                        <MenuSideBarItem
                            title="Overview"
                        >
                            <a>
                                <p>Restaurants</p>
                            </a>
                            <a>
                                <p>Activities</p>
                            </a>
                            <a>
                                <p>Accomodations</p>
                            </a>
                        </MenuSideBarItem>
                        <MenuSideBarItem
                            title="Itinerary"
                        >
                            <p>Day 1</p>
                            <p>Day 2</p>
                            <p>Day 3</p>
                        </MenuSideBarItem>
                        <MenuSideBarItem
                            title="Budget"
                            
                        >
                            <p>Expenses</p>
                        </MenuSideBarItem>
                    </div>
                    <div className='menuMainInfo'>
                    {data && data.getItineraryDetails && (
                        <div className='menuMainInfoImageContainer'>
                            <img src={miami} className='menuMainInfoImage'></img>
                            <div className='menuMainInfoImageCard'>
                            
                                <h1>Trip To {data.getItineraryDetails.location}</h1>
                                <p>From {data.getItineraryDetails.startDate} To {data.getItineraryDetails.endDate}</p>

                            </div>
                        </div>
                    )}
                        <div className='menuMainInfoItemShaded'>
                            <h1 className='menuMainInfoTitle'>Overview</h1>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Restaurants"
                            >
                                 <div className='tripsContainer border'>
                                <RestaurantReservation/>
                                </div>
                                <button className='addNewAccomodationsButton' onClick={() => { setRestaurantModalIsOpen((prevState) => !prevState) }}>Add New Restaurants</button>
                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Activities"
                            >
                                <button className='addNewAccomodationsButton' onClick={() => { setActivityModalIsOpen((prevState) => !prevState) }}>Add New Activities</button>
                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Accomodations"
                            >
                                {data && data.getItineraryDetails && ( 
                                <div className='tripsContainer border'>
                                <AirbnbAccommodation accommodation = {data.getItineraryDetails} />
                                </div>
                            )}
                                <button className='addNewAccomodationsButton' onClick={() => { setModalIsOpen((prevState) => !prevState) }}>Add New Accomodations</button>
                                <button className='addNewAccomodationsButton' onClick={payment}>Pay for Accomodations</button>
                                
                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItemShaded'>
                            <h1 className='menuMainInfoTitle'>Itinerary</h1>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Day 1"
                            >
                                <p>9:15 Massage</p>
                                <p>1:00 Lunch</p>
                                <p>3:00 Homework</p>


                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Day 2"
                            >
                                <a>
                                    <p>Restaurants</p>
                                </a>
                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Day 3"
                            >
                                <a>
                                    <p>Restaurants</p>
                                </a>
                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItemShaded'>
                            <h1 className='menuMainInfoTitle'>Budget</h1>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Breakdown"
                            >
                                <a>
                                    <p>Restaurants</p>
                                </a>
                            </MenuMainOverviewItem>
                        </div>

                    </div>
                </div>
                <div className='overviewMap shadowElement'>

                </div>
            </div>
        </>
    )

}

export default Trip;
