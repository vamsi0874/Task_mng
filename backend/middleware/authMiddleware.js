import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = (req, res, next) => {
 
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decoded',decoded);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// export const checkRole = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(403).json({ message: 'Access denied: insufficient role' });
//     }
//     next();
//   };
// };

export const adminOnly = async (req, res, next) => {
   const userRole = await User.findById(req.user.userId).select("role");
  if (userRole.role !== "admin") {
    return res.status(403).json({ message: "Access denied: insufficient role" });
  }
  next();
} 