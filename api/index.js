import express from 'express'; // server software
import bodyParser  from 'body-parser'; // parser middleware
import session from 'express-session';  // session middleware
import passport from 'passport';  // authentication
import connectEnsureLogin from 'connect-ensure-login';// authorization
import path from 'path';
import UserDetails from './user.js';
import ownerRouter from './ownerRoutes.js';
import User from './user.js'; // User Model
import foodTruckSchema from './ownerSchema.js';
const app = express();
import {sessionSecret} from './configsecret.js';
import mongoose from 'mongoose';
import customerRouter from './customerRouter.js';
// Configure Sessions Middleware
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {httpOnly: false} // 1 hour
}));
const __dirname = path.resolve();

const dir = __dirname;
// Configure Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Route to Log out
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// Post Route: /login
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user);
  console.log(req.session.passport);
  req.session.user = req.user;
  if (req.user) {
    res.sendStatus(200);
  }
  else {
    res.sendStatus(404);
  }
});

app.post('/signup', async (req, res) => {
  var username1 = req.body.username;
  var password1 = req.body.password;
  //console.log(JSON.stringify(username1) + " " + JSON.stringify(password1));
  const foodTruck = mongoose.model('foodTruck', foodTruckSchema);
  const existing = await foodTruck.findOne({'username': username1}).exec();
  console.log(existing === null);
  if (existing === null) {
    UserDetails.register({ username: username1, active: false }, password1);
    const newJSON = {
      name: "",
      username: username1,
      hours: [{}],
      location: {
        lat: 0,
        lng: 0
      },
      menu: [[{}]],
      description: "",
      photoURL: ""
    };
    await foodTruck.create(newJSON);
    
    res.sendStatus(200);
    req.session.user = req.user;
  }
  else {
    res.sendStatus(409);
  }

});

app.use('/owner', ownerRouter);
app.use('/customer', customerRouter);

// assign port
const port = process.env.PORT || 3001;;
app.listen(port, () => console.log(`This app is listening on port ${port}`));