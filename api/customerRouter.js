import express from 'express'; // server software
import mongoose from 'mongoose';
import passport from 'passport';  // authentication
import foodTruckSchema from './ownerSchema.js';
import User from './user.js'; // User Model

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const customerRouter = express.Router();

// middleware that is specific to this router

// define the home page route
customerRouter.get('/getAll', async (req, res) => {
    
    
    const truckModel = mongoose.model('foodTruck', foodTruckSchema);
    const curDoc = await truckModel.find({}).exec();
    if (curDoc === null) {
      res.sendStatus(404);
    }
    res.json(curDoc);
    //res.send(200);
  });
customerRouter.get('/getOne/:truckName', async (req, res) => {
    const truckName = req.params.truckName;
    console.log(truckName);
    console.log(req.params);

    const truckModel = mongoose.model('foodTruck', foodTruckSchema);
    const curDoc = await truckModel.find({'name': truckName}).exec();
    console.log(curDoc);
    if (curDoc === null) {
        res.sendStatus(404);
    }
    else {
        res.json(curDoc);
    }

});

export default customerRouter;