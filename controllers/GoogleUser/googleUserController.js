import jwt from "jsonwebtoken";
import GoogleUser from "../../models/GoogleUser/googleUserModel.js"

// export const home = (req, res) => {
//   res.send('<a href="/auth/google">Login with Google</a>');
// };

// export const googleAuth = (req, res) => {
//   res.send("Redirecting to Google...");
// };

// export const googleCallback = (req, res) => {
//   res.redirect("/profile");
// };

// export const profile = (req, res) => {
//   if (!req.user) return res.redirect("/");
//   res.send(`
//     <h1>Welcome ${req.user.displayName}</h1>
//     <img src="${req.user.photo}" width="100"/>
//     <p>Email: ${req.user.email}</p>
//     <a href="/logout">Logout</a>
//   `);
// };

// export const logout = (req, res) => {
//   req.logout(() => {
//     res.redirect("/");
//   });
// };

// const googleSuccess = async (req, res) => {
//   if (!req.user) return res.redirect(`${process.env.CLIENT_URL}/`);

//   const token = jwt.sign(
//     { id: req.user._id, email: req.user.email },
//     process.env.SECRET_KEY,
//     { expiresIn: "1d" }
//   );

//   res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
// };

const googleSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const fullName = req.user.displayName || req.user.name || "";
    const [firstName = "", lastName = ""] = fullName.split(" ");

    let user = await GoogleUser.findOne({ email: req.user.email });

    if (!user) {
      user = await GoogleUser.create({
        firstName,
        lastName,
        name: fullName,
        email: req.user.email,
        googleId: req.user.id,
        avatar: req.user.picture,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during Google authentication",
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};

export {
  googleSuccess,
  logoutUser
}