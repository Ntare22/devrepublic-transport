import uuid from 'uuid';
import db from '../db/models';

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
      const userIdFromToken = await db.Users.findOne({
        where: {
          email: userEmail,
        },
      }, { attributes: ['userId'] });
      const { userId } = userIdFromToken;
      const tripExist = await db.Trip.findOne({
        where: {
          userId,
          destination,
        },
      });
      if (tripExist) {
        return res.status(400).json({
          status: 400,
          message: 'Trip already exist',
        });
      }
      switcher(location);
      await db.Trip.create({
        userId,
        tripId,
        destination,
        location,
        BusArrivalTime,
        busToArrive,
      });

      const data = {
        userId,
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
      await db.Trip.destroy({
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
      const trip = await db.Trip.findOne({
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
      const allPassengers = await db.Users.findAll({
        where: {
          status,
        },
        attributes: ['userId', 'firstName', 'lastName', 'email', 'status'],
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
      await db.Trip.update({
        destination,
        location,
        BusArrivalTime,
        busToArrive,
      },
      {
        where: { tripId: req.tripInfo },
      });
      const trip = await db.Trip.findOne({
        where: {
          tripId: req.tripInfo,
        },
      });
      return res.status(201).json({ status: 201, message: 'Trip modified successfully', trip });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async viewAll(req, res) {
    try {
      const trip = await db.Trip.findAll({
        where: {
          userId: req.userDetails,
        },
      });
      return res.status(200).json({
        status: 200,
        message: 'All Trips Details',
        data: trip,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
