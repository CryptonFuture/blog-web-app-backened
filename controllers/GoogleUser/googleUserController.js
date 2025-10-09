import jwt from "jsonwebtoken";

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

const googleSuccess = async (req, res) => {
  if (!req.user) return res.redirect(`${process.env.CLIENT_URL}/`);

  const token = jwt.sign(
    { id: req.user._id, email: req.user.email },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
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