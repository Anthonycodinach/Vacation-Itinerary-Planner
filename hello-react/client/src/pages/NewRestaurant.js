import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_RESTAURANT_TO_ITINERARY, CREATE_RESTAURANT } from '../utils/mutations';
import Auth from '../utils/auth';

const CreateNewRestaurant = ({  }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [reservationDate, setReservationDate] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [guests, setGuests] = useState(1);

    const [createRestaurant, options] = useMutation(CREATE_RESTAURANT);
    const [addRestaurantToItinerary, addRestaurantOptions] = useMutation(ADD_RESTAURANT_TO_ITINERARY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const addRestaurantData = await createRestaurant({
                variables: { name: name, location: location, cuisine: cuisine, reservationDate: reservationDate, reservationTime: reservationTime, guests: parseInt(guests) },
            });
            console.log(addRestaurantData)

            // const data = await addRestaurantToItinerary({
            //     variables: { itineraryId: itineraryId, restaurantId: restaurantId },
            // });
            // console.log(data)
           

            setLocation('');
            setCuisine('');
            setReservationTime('');
            setGuests(1);
            setReservationDate('');
            setName('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h4>Add a restaurant reservation to your trip itinerary!</h4>

           {/* {Auth.loggedIn() ? ( */}
      <form
        className="modalForm"
        onSubmit={handleFormSubmit}
      >
        <div className="modalFormContainer">
          <div className='modalFormInputContainer'>
            <label> Restaurant Name</label>
            <input
              value={name}
              className="modalFormInput"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label> Party Size </label>
            <input
              type='number'
              value={guests}
              className="modalFormInput"
              onChange={(event) => setGuests(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>Reservation Date</label>
            <input
              type='date'
              value={reservationDate}
              className="modalFormInput"
              onChange={(event) => setReservationDate(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>Reservation Time</label>
            <input
              type='time'
              value={reservationTime}
              className="modalFormInput"
              onChange={(event) => setReservationTime(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>Cuisine</label>
            <input
              value={cuisine}
              className="modalFormInput"
              onChange={(event) => setCuisine(event.target.value)}
            />
          </div>
            <div className='modalFormInputContainer'>
            <label>Location</label>
            <input
              value={location}
              className="modalFormInput"
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div className="modalFormInputContainer">
            <button 
            className="modalFormInputButton" 
            type="submit">
              Add to trip
            </button>
          </div>
        </div>
        {/* {error && (
          <div className="">
            {error.message}
          </div>
        )} */}
      </form>
      {/* ) : (
        <p>
          You need to be logged in to create an itinerary. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )} */}
    </div>
  );
};

export default CreateNewRestaurant;
