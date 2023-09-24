import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_AIRBNB_TO_ITINERARY } from '../utils/mutations';

const Create = ({ profileId }) => {
  const [name, setName] = useState('');
  const [checkInDate, setCheckIn] = useState('');
  const [checkOutDate, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const [createItinerary, { error }] = useMutation(ADD_AIRBNB_TO_ITINERARY);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await createItinerary({
        variables: { profileId, name, airbnbCheckInDate, airbnbCheckOutDate, guests },
      });
      console.log(data)

      setName('');
      setStartDate('');
      setEndDate('');
      setGuests('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Where you headed?"
              value={location}
              className="form-input w-100"
              onChange={(event) => setLocation(event.target.value)}
            />
            <input
              placeholder="Just you, or do you not have any friends?"
              value={guests}
              className="form-input w-100"
              onChange={(event) => setGuests(event.target.value)}
            />
             <input
              placeholder="When does it start?"
              value={startDate}
              className="form-input w-100"
              onChange={(event) => setStartDate(event.target.value)}
            />
             <input
              placeholder="When does it end?"
              value={endDate}
              className="form-input w-100"
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Create your perfect trip itinerary
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to create an itinerary. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default Create;
