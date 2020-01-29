import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from '../helpers/responsesHandler';

dotenv.config();
const authCheck = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return Response.errorResponse(res, 401, 'No token provided');
  }

  try {
    const decodePassword = jwt.verify(token, process.env.key);
    req.payload = decodePassword;
    return next();
  } catch (ex) {
    return Response.errorResponse(res, 401, 'Please enter valid token');
  }
};


export default authCheck;
