import uuid from 'uuid';
import { Users } from '../db/models';
import cipher from '../helpers/cipher';
import generateToken from '../helpers/generateToken';


class UserController {
  static async registerAccount(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        status,
      } = req.body;
      console.log('********', firstName)
      const existingEmail = await Users.findOne({
        where: {
          email,
        },
      }, { attributes: ['userId', 'firstName', 'lastName', 'email'] });

      if (existingEmail) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exits',
        });
      }

      const userPassword = cipher.hashPassword(password);

      const user = await Users.create({
        userId: uuid(),
        firstName,
        lastName,
        email,
        password: userPassword,
        status,
      });
      delete user.dataValues.password;
      const userToken = generateToken(email);
      return res.status(201).json({
        status: 201,
        token: userToken,
        message: 'User has been created',
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;

      const findEmail = await Users.findOne({
        where: {
          email,
        },
      }, { attributes: ['email', 'password'] });

      if (!findEmail) {
        return res.status(409).json({
          status: 409,
          message: 'email or password does not exist',
        });
      }

      if (cipher.comparePassword(password, findEmail.password)) {
        const userToken = generateToken(email);
        return res.status(200).json({
          status: 200,
          email,
          message: 'User is logged in',
          token: userToken,
        });
      }
      return res.status(401).json({ status: 401, error: 'incorrect password or email' });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default UserController;
