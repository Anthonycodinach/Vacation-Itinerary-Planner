import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EX_TO_ITINERARY, CREATE_EX } from '../utils/mutations';
import Auth from '../utils/auth';

const CreateEx = ({ }) => {
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(0);

  const [createEx, options] = useMutation(CREATE_EX);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await createEx({
        variables: { name: name, location: location, date: date, time: time, guests: parseInt(guests) },
      });
      console.log(data)

      setLocation('');
      setName('');
      setDate('');
      setTime('');
      setGuests(1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
            <h4>Add an experience to your trip itinerary!</h4>

           {/* {Auth.loggedIn() ? ( */}
      <form
        className="modalForm"
        onSubmit={handleFormSubmit}
      >
        <div className="modalFormContainer">
          <div className='modalFormInputContainer'>
            <label> Activity Title</label>
            <input
              value={name}
              className="modalFormInput"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label> Guests </label>
            <input
              type='number'
              value={guests}
              className="modalFormInput"
              onChange={(event) => setGuests(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>Activity Date</label>
            <input
              type='date'
              value={date}
              className="modalFormInput"
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className='modalFormInputContainer'>
            <label>Activity Time</label>
            <input
              type='time'
              value={time}
              className="modalFormInput"
              onChange={(event) => setTime(event.target.value)}
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

export default CreateEx;
