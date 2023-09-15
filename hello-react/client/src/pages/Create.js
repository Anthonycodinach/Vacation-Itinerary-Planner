
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';

const Create = ({ profileId }) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState('');

  const [createItinerary, { error }] = useMutation(CREATE_ITINERARY);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await createItinerary({
        variables: { profileId, location, startDate, endDate, guests },
      });
      console.log(data)

      setLocation('');
      setStartDate('');
      setEndDate('');
      setGuests('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Endorse some more skills below.</h4>

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
             <input
              placeholder="Just you, or do you not have any friends?"
              value={guests}
              className="form-input w-100"
              onChange={(event) => setGuests(event.target.value)}
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

