// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Authentication required' });
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();   
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     next(error);
//   }
// };

// module.exports = authMiddleware;
//-----------------------------------------------------------
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Authorization token is missing",  
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Attach user ID to the request object
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
    return;
  }
};

module.exports = { authMiddleware };