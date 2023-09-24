import { gql } from '@apollo/client';


export const QUERY_SINGLE_PROFILE = gql`
  query findProfile($username: String!) {
    findProfile (username: $username) {
      username
    }
  }
`;

export const QUERY_PROFILES = gql`
  query allProfiles {
    profile {
      _id
    }
  }
  `;

export const QUERY_ITINERARIES = gql`
query allItineraries {
  itineraries {
    _id
    username
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

export const GET_USER_ITINERARIES = gql`
  query userItinerary($username: String!) {
    userItinerary(username: $username) {
    _id
    username
    location
    startDate
    endDate
    guests
    airbnbname
    airbnbCheckInDate
    airbnbCheckOutDate
    restaurants
    experiences
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

export const GET_ITINERARY_DETAILS = gql`
query getItineraryDetails($_id: ID!) {
  getItineraryDetails(_id: $_id) {
    _id
    username
    location
    startDate
    endDate
    guests
    airbnbId
    airbnbname
    airbnbphoto
    airbnbCheckInDate
    airbnbCheckOutDate
    airbnbguests
    airbnbprice
    restaurants
    experiences
    }
  }
`;

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
