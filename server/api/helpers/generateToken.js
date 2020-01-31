import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (email) => {
  const token = jwt.sign({
    userEmail: email,
  }, process.env.key, {
    expiresIn: '1d',
  });
  return token;
};

export default generateToken;
