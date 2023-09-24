const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Profile {
    _id: ID
    username: String!
    email: String
    password: String!
  }

  type Itinerary {
    _id: ID
    username: String
    location: String
    guests: Int
    startDate: String
    endDate: String
    airbnbId: String
    airbnbphoto:String
    airbnbname: String
    airbnbCheckInDate: String
    airbnbCheckOutDate: String
    airbnbguests: Int
    airbnbprice: String
    restaurants: [String]
    experiences: [String]
  }

  type Restaurants {
    _id: ID
    name: String!
    cuisine: String
    location: String!
    reservationDate: String!
    reservationTime: String!
    guests: Int
  }

  type Experiences {
    _id: ID
    name: String!
    location: String!
    date: String!
    time: String!
    guests: Int
  }


  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    allProfiles: [Profile]!
    findProfile(username: String!): Profile
    allItineraries: [Itinerary]!
    userItinerary(username: String!): [Itinerary]
    getItineraryDetails(_id: ID!): Itinerary
    restaurantsByLocation(location: String!): [Restaurants]

    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    removeProfile: Profile
    createItinerary(username: String!, location: String!, startDate: String!, endDate: String!, guests: Int): Itinerary
    createRestaurant(name: String!, cuisine: String!, location: String!, reservationDate: String!, reservationTime: String!, guests: Int): Restaurants
    createEx(name: String!, location: String!, date: String!, time: String!, guests: Int): Experiences
    addRestaurantToItinerary(
      itineraryId: ID!
      restaurantId: ID!
    ): Itinerary
    addExToItinerary(
      itineraryId: ID!
      exId: ID!
    ): Itinerary
    addAirbnbToItinerary(
      _id: ID!,
      airbnbId: String,
      airbnbname: String,
      airbnbphoto: String,
      airbnbCheckInDate: String,
      airbnbCheckOutDate: String,
      airbnbguests: Int
      airbnbprice: String
    ): Itinerary
    deleteItinerary(itineraryId: ID!): Itinerary
    deleteRestaurant(restaurantId: ID!): Restaurants
    deleteEx(exId: ID!): Experiences
 
  }
`;

module.exports = typeDefs;