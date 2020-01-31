import uuid from 'uuid';
import { Trip, Users } from '../db/models';

let BusArrivalTime; let busToArrive;
const switcher = (location) => {
  if (location === 'stadium') {
    BusArrivalTime = '30 minutes';
    busToArrive = 'RAC 7';
  }
  if (location === 'gisimenti') {
    BusArrivalTime = '20 minutes';
    busToArrive = 'RAC 9';
  }
};
export default class TripController {
  static async createTrip(req, res) {
    try {
      const { location, destination } = req.body;
      const tripId = uuid();
      const { userEmail } = req.payload;
      const userIdFromToken = await Users.findOne({
        where: {
          email: userEmail,
        },
      }, { attributes: ['user_id'] });
      const { user_id } = userIdFromToken;
      const tripExist = await Trip.findOne({
        where: {
          user_id,
        },
      });
      if (tripExist) {
        return res.status(400).json({
          status: 400,
          message: 'Trip already exist',
        });
      }
      switcher(location);
      console.log('......',location)
      await Trip.create({
        user_id,
        tripId,
        destination,
        location,
        BusArrivalTime,
        busToArrive,
      });

      const data = {
        user_id,
        tripId,
        destination,
        location,
        BusArrivalTime,
        busToArrive,
      };
      return res.status(201).json({
        status: 200,
        message: ' Trip created successfully',
        data,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteTrip(req, res) {
    try {
      await Trip.destroy({
        where: {
          tripId: req.tripInfo,
        },
      });
      return res.status(200).send({
        status: 200,
        message: 'Trip deleted successfully',
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'server error',
      });
    }
  }

  static async viewTrip(req, res) {
    try {
      const trip = await Trip.findOne({
        where: {
          tripId: req.tripInfo,
        },
      });
      delete trip.dataValues.id;
      return res.status(200).json({
        status: 200,
        message: 'Trip Details',
        data: trip,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  static async viewPassenger(req, res) {
    try {
      if (req.userStatus !== 'driver') {
        return res.status(401).json({ status: 401, error: 'Only driver are allowed to perform this action' });
      }
      const status = 'passenger';
      const allPassengers = await Users.findAll({
        where: {
          status,
        },
        attributes: ['user_id', 'first_name', 'last_name', 'email', 'status'],
        raw: true,

      });
      return res.status(200).json({
        status: 200,
        message: 'All passengers',
        data: allPassengers,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateTrip(req, res) {
    try {
      const { location, destination } = req.body;
      switcher(location);
      await Trip.update({
        destination,
        location,
        BusArrivalTime,
        busToArrive,
      },
      {
        where: { tripId: req.tripInfo },
      });
      const trip = await Trip.findOne({
        where: {
          tripId: req.tripInfo,
        },
      });
      return res.status(201).json({ status: 201, message: 'Trip modified successfully', trip });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
