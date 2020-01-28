import uuid from 'uuid';
import { Trip, Users } from '../db/models';
import Response from '../helpers/responsesHandler';

export default class TripController {
  static async createTrip(req, res) {
    try {
      const { location, destination } = req.body;
      const BusArrivalTime = ['20 minutes', '30 minutes', '15 minutes'];
      const busToArrive = ['RAC 6', 'RAC 7', 'RAC 8'];
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
        return Response.errorResponse(res, 400, 'Trip already exist');
      }
      if (location === 'stadium') {
        await Trip.create({
          user_id,
          tripId,
          destination,
          location,
          BusArrivalTime: BusArrivalTime[0],
          busToArrive: busToArrive[0],
        });

        const data = {
          user_id,
          tripId,
          destination,
          location,
          BusArrivalTime: BusArrivalTime[0],
          busToArrive: busToArrive[0],
        };
        return Response.sucessResponse(res, 201, ' Trip created successfully', data);
      }
      if (location === 'gisimenti') {
        const TripDetails = await Trip.create({
          user_id,
          tripId,
          destination,
          location,
          BusArrivalTime: BusArrivalTime[1],
          busToArrive: busToArrive[1],
        });
        return Response.sucessResponse(res, 201, ' Trip created successfully', TripDetails);
      }
      return res.status(400).json({
        error: 'Enter valid loaction input ',
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
