import React, { useEffect, useState } from 'react'
import './Trip.css'
import caret from './assets/Icons/caret.svg'
import caretRight from './assets/Icons/caretRight.svg'
import miami from './assets/cityImages/Miami.jpg'
import { useParams } from "react-router-dom"
import x from './assets/Icons/X.svg'
import naples from './assets/cityImages/Naples.jpg'
import botanical from './assets/Images/naples/botanicalGardens.png'
import campiellos from './assets/Images/naples/campiellos.jpeg'
import historic from './assets/Images/naples/historic.jpg'
import rookeryBay from './assets/Images/naples/rookeryBay.jpg'
import sunsetCruise from './assets/Images/naples/sunsetCruise.jpg'
import theBayHouse from './assets/Images/naples/theBayHouse.jpg'
import theTurtleClub from './assets/Images/naples/theTurtleClub.jpg'
import vanderbiltBeach from './assets/Images/naples/vanderbiltBeach.jpg'


// function Trip() { 
//     let { id } = useParams();
// }

import PropertyDetail from '../components/propertyDetail';
import property from '../components/API';
import SearchForm from '../components/Search/SearchForm';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation, gql } from '@apollo/client';
import { ADD_AIRBNB_TO_ITINERARY } from '../../src/utils/mutations'

function ItemHolder(props) {
    return (
        <div className='itemHolderContainer'>
            <img className='itemHolderImage' src={props.image}></img>
            <div className='itemHolderText'>
                <h1 className="itemHolderSubText" >{props.line1}</h1>
                <p className='itemHolderSubText' >{props.line2}</p>
                <p className='itemHolderSubText' >{props.line3}</p>
                <button
                    className='itemHolderButton'
                > Remove
                </button>
            </div>
        </div>
    )
}

const Trip = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [activityModalIsOpen, setActivityModalIsOpen] = useState(false)
    const [restaurantModalIsOpen, setRestaurantModalIsOpen] = useState(false)
    const stripePromise = loadStripe("pk_test_51Nr12cG3HMx6NAFGYTqkC7ydc1MpCyK3OHCJZdsxYWQks9aYqneBjhpNKxxifgY2ZbJIdcNHDgfTG0uMisXWM4zS008wp3C3xw");

    const payment = async (event) => {

        console.log('Payment function called.');
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{
                price: "price_1NrX87G3HMx6NAFGnWWFABDm", // Replace with the ID of your price
                quantity: 5,
            }],
            mode: 'payment',
            successUrl: 'http://localhost:3000/profile/trip#',
            cancelUrl: 'http://localhost:3000',
        });

    };



    //function 
    const CreateTrip = () => {

        const [city, setCity] = useState('');
        const [startDate, setstartDate] = useState(Date);
        const [endDate, setendDate] = useState(Date);
        const [people, setpeople] = useState(Number);
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
            console.log(homes);
        }

        const handleInputChange_city = (e) => setCity(e.target.value);
        const handleInputChange_startDate = (e) => setstartDate(e.target.value);
        const handleInputChange_endDate = (e) => setendDate(e.target.value);
        const handleInputChange_people = (e) => setpeople(e.target.value);
        const [airbnbValues] = useMutation(ADD_AIRBNB_TO_ITINERARY);

        const handleFormSubmit = (e) => {
            e.preventDefault()
            query.city = { city }
            query.startDate = { startDate }
            query.endDate = { endDate }
            query.people = { people }
            console.log(query)
            searchProperty(query);
        };

        const payment = () => { }

        const handleFormAdd = (e) => {
            e.preventDefault()
            setlistingId(e.target.value);
            console.log(listingId);



            airbnbValues({
                variables: {
                    _id: 1234,
                    guests: query.people,
                    airbnbName: query.name,
                    airbnbCheckInDate: query.startDate,
                    airbnbCheckOutDate: query.endDate
                }
            })

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
                                city={city}
                                handleInputChange_city={handleInputChange_city}
                                startDate={startDate}
                                handleInputChange_startDate={handleInputChange_startDate}
                                endDate={endDate}
                                handleInputChange_endDate={handleInputChange_endDate}
                                people={people}
                                handleInputChange_people={handleInputChange_people}
                                handleFormSubmit={handleFormSubmit}
                            />

                            <div heading={'List Of Properties'}>
                                {listing ? (
                                    <PropertyDetail
                                        list={homes}
                                        handleFormAdd={handleFormAdd}
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
                        <div className='menuMainInfoImageContainer'>
                            <img src={naples} className='menuMainInfoImage'></img>
                            <div className='menuMainInfoImageCard'>

                                <h1>Trip To Naples</h1>
                                <p>From 9/22/2023 To 9/27/2023</p>

                            </div>
                        </div>
                        <div className='menuMainInfoItemShaded'>
                            <h1 className='menuMainInfoTitle'>Overview</h1>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Restaurants"
                            >
                                <ItemHolder
                                    image={theBayHouse}
                                    line1='The Bay House'
                                    line2='$$$ - Seafood restaurant'
                                    line3='Dinner at 7:30'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={theTurtleClub}
                                    line1='The Turtle Club'
                                    line2='$$$ - Restaurant'
                                    line3='Dinner at 7:00'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={campiellos}
                                    line1='Campiello'
                                    line2='$$$ - Italian restaurant'
                                    line3='Dinner at 6:45'
                                >
                                </ItemHolder>

                            </MenuMainOverviewItem>
                            <button className='addNewAccomodationsButton' onClick={() => { setRestaurantModalIsOpen((prevState) => !prevState) }}>Add New Restaurants</button>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Activities"
                            >
                                <ItemHolder
                                    image={historic}
                                    line1='Explore Historic District'
                                    line2="A delightful fusion of Old Florida charm, upscale boutiques, and gourmet dining."
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={botanical}
                                    line1='Naples Botanical Gardens'
                                    line2='A captivating oasis of diverse plant collections and serene pathways in Naples, Florida.'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={sunsetCruise}
                                    line1='Sunset Cruise'
                                    line2='Offering mesmerizing Gulf of Mexico views as the sun sets, creating a memorable and romantic experience.'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={rookeryBay}
                                    line1='Rookery Bay Reserve'
                                    line2='A coastal sanctuary known for its diverse ecosystems and abundant wildlife.'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={vanderbiltBeach}
                                    line1='Vanderbilt Beach'
                                    line2='A popular Gulf of Mexico spot with soft white sands and clear waters for relaxation.'
                                >
                                </ItemHolder>
                            </MenuMainOverviewItem>
                            <button className='addNewAccomodationsButton' onClick={() => { setActivityModalIsOpen((prevState) => !prevState) }}>Add New Activities</button>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Accomodations"
                            >
                                <ItemHolder
                                    image={naples}
                                    line1='Big House'
                                    line2='Naples'
                                    line3='Free'
                                >
                                </ItemHolder>
                                <button className='payAccomodationsButton' onClick={payment}>Pay for Accomodations</button>
                            </MenuMainOverviewItem>
                            <button className='addNewAccomodationsButton' onClick={() => { setModalIsOpen((prevState) => !prevState) }}>Add New Accomodations</button>
                        </div>
                        <div className='menuMainInfoItemShaded'>
                            <h1 className='menuMainInfoTitle'>Itinerary</h1>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Day 1"
                            >
                                <ItemHolder
                                    image={vanderbiltBeach}
                                    line1='Vanderbilt Beach'
                                    line2='A popular Gulf of Mexico spot with soft white sands and clear waters for relaxation.'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={rookeryBay}
                                    line1='Rookery Bay Reserve'
                                    line2='A coastal sanctuary known for its diverse ecosystems and abundant wildlife.'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={theBayHouse}
                                    line1='The Bay House'
                                    line2='$$$ - Seafood restaurant'
                                    line3='Dinner at 7:30'
                                >
                                </ItemHolder>

                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Day 2"
                            >
                                <ItemHolder
                                    image={historic}
                                    line1='Explore Historic District'
                                    line2="A delightful fusion of Old Florida charm, upscale boutiques, and gourmet dining."
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={botanical}
                                    line1='Naples Botanical Gardens'
                                    line2='A captivating oasis of diverse plant collections and serene pathways in Naples, Florida.'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={theTurtleClub}
                                    line1='The Turtle Club'
                                    line2='$$$ - Restaurant'
                                    line3='Dinner at 7:00'
                                >
                                </ItemHolder>

                            </MenuMainOverviewItem>
                        </div>
                        <div className='menuMainInfoItem'>
                            <MenuMainOverviewItem
                                title="Day 3"
                            >
                                <ItemHolder
                                    image={sunsetCruise}
                                    line1='Sunset Cruise'
                                    line2='Offering mesmerizing Gulf of Mexico views as the sun sets, creating a memorable and romantic experience.'
                                >
                                </ItemHolder>
                                <ItemHolder
                                    image={campiellos}
                                    line1='Campiello'
                                    line2='$$$ - Italian restaurant'
                                    line3='Dinner at 6:45'
                                >
                                </ItemHolder>
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