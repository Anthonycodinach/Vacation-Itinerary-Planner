import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function PropertyDetail(props) {
  let result = props.list;
  const { id } = useParams();

  if (!props.list?.length) {
    return null;

  } else { result = props.list.slice(1);
  console.log(result); }

  

  return (
    <div className="text-center">
      <h1 className='airbnbResults'>Results!</h1>
      {result.map((item, index) => (
        <div className='airbnbListingContainer'>
          <img className='airbnbListingImage' src={item.listing.contextualPictures[0].picture}></img>
          <div className='airbnbListingText'>
            <p className="airbnbListingSubText" id={`nam-${index}`} key={`name-${index}`}>Property Name: {item.listing.name}</p>
            <p className='airbnbListingSubText' id={`cit-${index}`} key={`city-${index}`}>City: {item.listing.city}</p>
            <p className='airbnbListingSubText' id={`pri-${index}`} key={`price-${index}`}>Price: {item.pricingQuote.structuredStayDisplayPrice.primaryLine.accessibilityLabel}</p>
            <button
              className='airbnbListingButton' 
              id={item.listing.id}
              addr={item.listing.contextualPictures[0].picture}
              name={item.listing.name}
              onClick={props.handleFormAdd}
              type="submit"
            > Add to Itinerary
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyDetail;
