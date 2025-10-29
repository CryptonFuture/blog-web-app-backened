import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"
import GoogleUser from "../models/GoogleUser/googleUserModel.js";
import FacebookUser from "../models/FacebookUser/facebookUserModel.js";

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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function(id, done) {
  try {
    const user = await FacebookUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails', 'picture.type(large)']
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const { id: facebookId, displayName: name, emails, photos } = profile;
      const email = Array.isArray(emails) && emails[0] ? emails[0].value : undefined;
      const avatar = photos && photos[0] && photos[0].value ? photos[0].value : undefined;

      let user = await FacebookUser.findOne({ facebookId });
      if (!user) {
        if (email) {
          user = await FacebookUser.findOne({ email });
        }
      }

      if (user) {
        user.facebookId = user.facebookId || facebookId;
        user.name = user.name || name;
        user.email = user.email || email;
        user.avatar = user.avatar || avatar;
        await user.save();
      } else {
        user = await FacebookUser.create({
          facebookId,
          name,
          email,
          avatar,
          provider: 'facebook'
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

export default configurePassport


