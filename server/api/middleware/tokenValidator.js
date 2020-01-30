import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const authCheck = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'No token provided',
    });
  }

  try {
    const decodePassword = jwt.verify(token, process.env.key);
    req.payload = decodePassword;
    return next();
  } catch (ex) {
    return res.status(401).json({
      status: 401,
      error: 'Please enter valid token',
    });
  }
};


export default authCheck;
