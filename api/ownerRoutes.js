import express from 'express'; // server software
import mongoose from 'mongoose';
const ownerRouter = express.Router();
import passport from 'passport';  // authentication
import foodTruckSchema from './ownerSchema.js';
import User from './user.js'; // User Model

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// middleware that is specific to this router
ownerRouter.use((req, res, next) => {
  if (req.user === null) {
    res.send("Not Authenticated");
  }
  next();
});
// define the home page route
ownerRouter.post('/update', async (req, res) => {
    
    
    const truckModel = mongoose.model('foodTruck', foodTruckSchema);
    console.log(truckModel);
    console.log(req.user.username);
    
    const curDoc = await truckModel.findOne({"username": req.user.username}).exec();
    if (curDoc === null) {
      res.sendStatus(404);
    }
    const newName = req.body.newName || curDoc.name;
    const newHours = req.body.newHours || curDoc.hours;
    const newLocation = req.body.newLocation || curDoc.location;
    const newMenu = req.body.newMenu || curDoc.menu;
    const newDescription = req.body.newDescription || curDoc.description;
    const newPhotoURL = req.body.newPhotoURL || curDoc.photoURL;
    console.log(curDoc);
    curDoc.name = newName;
    curDoc.hours = newHours;
    curDoc.location = newLocation;
    curDoc.menu = newMenu;
    curDoc.description = newDescription;
    curDoc.photoURL = newPhotoURL;
    console.log(curDoc);
    await curDoc.save();
    res.send(200);
  });

  ownerRouter.get('/getCurrent', async (req, res) => {
    const truckModel = mongoose.model('foodTruck', foodTruckSchema);
    const curDoc = await truckModel.findOne({"username": req.user.username}).exec();
    res.json(curDoc);
  });

export default ownerRouter;