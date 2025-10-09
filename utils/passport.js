import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import GoogleUser from "../models/GoogleUser/googleUserModel.js";
import dotenv from 'dotenv' 

dotenv.config()


const configurePassport = async () => {
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await GoogleUser.findOne({ googleId: profile.id });

        if (!user) {
          user = await GoogleUser.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });
        }

        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => GoogleUser.findById(id).then(user => done(null, user)));

}

export default configurePassport


