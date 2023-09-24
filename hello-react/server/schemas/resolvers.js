const { AuthenticationError } = require('apollo-server-express');
const { Profile, Itinerary, Restaurants, Experiences, NightLife } = require('../models'); 
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    findProfile: async (parent, { username }) => {
      return Profile.findOne({ username: username });
    },
    allProfiles: async () => {
      return Profile.find();
    },
    allItineraries: async () => {
      return Itinerary.find();
    },
    userItinerary: async (parent, { username }) => {
      return Itinerary.find({ username: username });
    },
    getItineraryDetails: async (parent, { _id }) => {
      return Itinerary.findOne({ _id: _id });
    },
    // Query to get all restaurants in a specific location
    restaurantsByLocation: async (parent, { location }) => {
      return Restaurants.find({ location });
    },
    // allNightLife: async () => {
    //   return NightLife.find();
    // },
    // nightLifeByLocation: async (parent, { location }) => {
    //   return NightLife.find({ location });
    // },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },


    login: async (parent, { username, password }) => {
      const profile = await Profile.findOne({ username });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    createItinerary: async (parent, { username, location, startDate, endDate, guests }) => {
      const itinerary = await Itinerary.create({ username, location, startDate, endDate, guests });
      return itinerary;
    },

    createRestaurant: async (parent, { name, cuisine, location, reservationDate, reservationTime, guests }) => {
      const restaurant = await Restaurants.create({ name, cuisine,  location, reservationDate, reservationTime, guests });
      return restaurant;
    },

    createEx: async (parent, { name, location, date, time, guests }) => {
      const ex = await Experiences.create({ name, location, date, time, guests });
      return ex;
    },

    addRestaurantToItinerary: async (parent, {itineraryId, restaurantId} ) => {
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        {
          $addToSet: { restaurants: restaurantId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return itinerary;
    },

    addAirbnbToItinerary: async (parent, {_id, airbnbId, airbnbphoto, airbnbname, airbnbCheckInDate, airbnbCheckOutDate, airbnbguests} ) => {
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: _id },
        {
          $set: { airbnbId: airbnbId, airbnbphoto: airbnbphoto, airbnbname: airbnbname, airbnbCheckInDate: airbnbCheckInDate, airbnbCheckOutDate: airbnbCheckOutDate, airbnbguests: airbnbguests},
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return itinerary;
    },

    addExToItinerary: async (parent, { itineraryId, exId }) => {
      const itinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        {
          $addToSet: { experiences: exId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return itinerary;
    },
    // createNightLife: async (parent, { name, type, address, description }) => {
    //   const nightlife = await NightLife.create({ name, type, address, description });
    //   return nightlife;
    // },
    
    
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteItinerary: async (parent, { itineraryId }) => {
      const existingItinerary = await Itinerary.findById(itineraryId);
    
      if (!existingItinerary) {
        throw new Error("Itinerary not found");
      }
          await Itinerary.findByIdAndDelete(itineraryId);
    
      return "Itinerary deleted successfully";
    },
    deleteRestaurant: async (parent, { restaurantId }) => {
      const existingRestaurant = await Restaurants.findById(restaurantId);
    
      if (!existingRestaurant) {
        throw new Error("Restaurant not found");
      }
          await Restaurants.findByIdAndDelete(restaurantId);
    
      return "Restaurant deleted successfully";
    },
    deleteEx: async (parent, { exId }) => {
      const existingExperience = await Experiences.findById(exId);
    
      if (!existingExperience) {
        throw new Error("Experience not found");
      }
          await Experiences.findByIdAndDelete(exId);
    
      return "Experience deleted successfully";
    },
  },
};

module.exports = resolvers;
