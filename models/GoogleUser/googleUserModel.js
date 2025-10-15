import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  name: String,
  displayName: String,
  email: String,
  picture: String,
  createdAt: { type: Date, default: Date.now }
});

const GoogleUser = mongoose.model("GoogleUser", userSchema);
export default GoogleUser;
