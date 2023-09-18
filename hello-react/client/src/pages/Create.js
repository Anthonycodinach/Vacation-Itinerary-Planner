import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_ITINERARY } from '../utils/mutations';



const Create = ({ }) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);

  const [createItinerary, { error }] = useMutation(CREATE_ITINERARY);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    
    try {
      const data = await createItinerary({
        variables: { location: location, startDate: startDate, endDate: endDate, guests: parseInt(guests) },
      });
      console.log(data)

      setLocation('');
      setStartDate('');
      setEndDate('');
      setGuests(1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      {/* {Auth.loggedIn() ? ( */}
      <form
        className="modalForm"
        onSubmit={handleFormSubmit}
      >
        <div className="modalFormContainer">
          <div className='modalFormInputContainer'>
            <label>Where To?</label>
            <input
              value={location}
              className="modalFormInput"
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>How Many Guests</label>
            <input
              type='number'
              value={guests}
              className="modalFormInput"
              onChange={(event) => setGuests(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>Departure Date</label>
            <input
              type='date'
              value={startDate}
              className="modalFormInput"
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>Return Date</label>
            <input
              type='date'
              value={endDate}
              className="modalFormInput"
              onChange={(event) => setEndDate(event.target.value)}

            />
          </div>
          <div className="modalFormInputContainer">
            <button className="modalFormInputButton" type="submit">
              <a href='/profile/trip'>
                Create your perfect trip itinerary
              </a>
            </button>
          </div>
        </div>
        {error && (
          <div className="">
            {error.message}
          </div>
        )}
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

export default Create;
