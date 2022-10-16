import mongoose from 'mongoose';

const foodTruckSchema = new mongoose.Schema({
    name: String,
    username: String, 
    hours: [{open: Number, close: Number }],
    location: {
      lat: Number,
      lng: Number
    },
    menu: [{
      catName: String,
      items: [{
        name: String,
        description: String,
        price: Number,
        photoURL: String
    }]
    }],
    description: String,
    photoURL: String
  });
export default foodTruckSchema;