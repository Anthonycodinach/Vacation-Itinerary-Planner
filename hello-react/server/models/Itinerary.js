const { Schema, model } = require('mongoose');

const itinerarySchema = new Schema({
   
    username: {
        type: String,
        required: true,
        trim: true,
    },   
    location: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: String,
        required: true,
        trim: true,
    },
    endDate: {
        type: String,
        required: true,
        trim: true,
    },
    guests: {
        type: Number,
        required: false,
        trim: true,
    },
    airbnbname: {
        type: String,
        required: false,
        trim: true,
    },
    airbnbCheckInDate: {
        type: String,
        required: false,
        trim: true,
    },
    airbnbCheckOutDate: {
        type: String,
        required: false,
        trim: true,
    },
    airbnbguests: {
        type: Number,
        required: false,
        trim: true,
    },
    airbnbId: {
        type: Number,
        required: false,
        trim: true,
    },
    airbnbphoto: {
        type: String,
        required: false,
        trim: true,
    },
    restaurants:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Restaurants'
          }
          ],
    experiences: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Experiences'
          }
      ],
});

const Itinerary = model('Itinerary', itinerarySchema);


module.exports = Itinerary;