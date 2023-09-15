import { gql } from '@apollo/client';


export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
    }
  }
  `;

export const QUERY_ITINERARIES = gql`
query allItineraries {
  itineraries {
    _id
    location
    startDate
    endDate
    guests
    airbnbAddress
    airbnbCheckInDate
    airbnbCheckOutDate
    restaurants
    experiences
  }
}
`;

export const QUERY_ONE_ITINERARY = gql`
  query singleProfile($profileId: ID! $itineraryId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const GET_ITINERARIES = gql`
  query getItineraries($userId: ID!) {
    itineraries(userId: $userId) {
      id
      title
      description
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($userId: ID!) {
    userProfile(userId: $userId) {
      id
      username
      email
    }
  }
`;

export const GET_USER_ITINERARY =gql`
query getUserItineraries($userId: ID!) {
  userItineraries(userId: $userId) {
    id
    title
    description
  }
}
`
;

export const GET_ITINERARY_DETAILS = gql`
query getItineraryDetails($itineraryId: ID!) {
  itineraryDetails(itineraryId: $itineraryId) {
    id
    title
    description
    destinations {
      id
      location
      startDate
      endDate
    }
    restaurantReservations {
      id
      restaurantName
      reservationDate
      numberOfGuests
    }
    bnbReservations {
      id
      bnbName
      checkInDate
      checkOutDate
    }
  }
}
`
;

export const GET_BNB_RESERVATION = gql`
query getBnbReservations($itineraryId: ID!) {
  bnbReservations(itineraryId: $itineraryId) {
    id
    bnbName
    checkInDate
    checkOutDate
  }
}
`
;
export const Get_Resturant_Reservations =gql`
query getRestaurantReservations($itineraryId: ID!) {
  restaurantReservations(itineraryId: $itineraryId) {
    id
    restaurantName
    reservationDate
    numberOfGuests
  }
}
`
;
export const GET_USER_Reservations =gql`
query getUserReservations($itineraryId: ID!) {
  userReservations(itineraryId: $itineraryId) {
    id
    reservationType
    reservationDetails {
      ... on RestaurantReservation {
        id
        restaurantName
        reservationDate
        numberOfGuests
      }
      ... on BnbReservation {
        id
        bnbName
        checkInDate
        checkOutDate
      }
    }
  }
}
`
;
