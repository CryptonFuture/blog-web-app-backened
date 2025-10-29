import mongoose from 'mongoose';

const facebookUserSchema = new mongoose.Schema({
  facebookId: { type: String, index: true, unique: true, sparse: true },
  name: String,
  email: { type: String, index: true, sparse: true },
  avatar: String,
  provider: String, 
  createdAt: { type: Date, default: Date.now },
  
});

const FacebookUser = mongoose.model("FacebookUser", facebookUserSchema);
export default FacebookUser;
