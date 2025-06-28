import jwt from 'jsonwebtoken'
import { secret_key } from '../config.js'

// const verifyToken = async (req, res, next) => {
//     const token = req.body.token || req.body.query || req.headers["authorization"]

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             msg: "A token is required for authentication",
//         })
//     }

//     const bearer = token.split(" ")
//     const bearerToken = bearer[1]

//     const decodedData = jwt.verify(bearerToken, secret_key)
//     req.user = decodedData.user

//     res.status(400).json({
//         success: false,
//         msg: "invalid token",
//     });

//     return next()
// }


const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

export {
    auth
}