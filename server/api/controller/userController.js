import uuid from 'uuid';
import { Users } from '../db/models';
import cipher from '../helpers/cipher';
import { generateToken } from '../helpers/generateToken';


class UserController {
  static async registerAccount(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        status,
        busNo,
      } = req.body;

      const existingEmail = await Users.findOne({
        where: {
          email,
        },
      }, { attributes: ['user_id', 'first_name', 'last_name', 'email'] });

      if (existingEmail) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exits',
        });
      }

      const userPassword = cipher.hashPassword(password);

      const user = await Users.create({
        user_id: uuid(),
        first_name: firstName,
        last_name: lastName,
        email,
        password: userPassword,
        status,
        bus_no: busNo,
      });

      return res.status(201).json({
        status: 201,
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
          message: 'Email or password does not exist',
        });
      }

      if (cipher.decodePassword(password, findEmail.password)) {
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
