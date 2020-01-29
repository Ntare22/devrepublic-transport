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

const verifyToken = (req, res) => {
  try {
    const { token } = req.headers;
    return jwt.verify(token, process.env.key);
  } catch (error) {
    return res.status(401).json({ stastu: 401, error: 'there is no such user' });
  }
};

export { generateToken, verifyToken };
