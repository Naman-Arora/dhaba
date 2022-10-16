// dependencies
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
// connect to database
import {mongoURI} from './configsecret.js';
mongoose.connect(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Create Model
const Schema = mongoose.Schema;


const User = new Schema({
  username: String,
  password: String,
});
// Export Model
User.plugin(passportLocalMongoose);

export default mongoose.model('userData', User, 'userData');