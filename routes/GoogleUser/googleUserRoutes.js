// import express from "express";
// import passport from "passport";
// import {
//   home,
//   googleAuth,
//   googleCallback,
//   profile,
//   logout,
// } from "../../controllers/GoogleUser/googleUserController.js";

// const router = express.Router();

// router.get("/", home);

// router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }), googleAuth);

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   googleCallback
// );

// router.get("/profile", profile);

// router.get("/logout", logout);

// export default router;

import express from "express"
import passport from "passport";
import { googleSuccess, logoutUser } from "../../controllers/GoogleUser/googleUserController.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleSuccess
);

router.get("/logout", logoutUser);

export default router;
