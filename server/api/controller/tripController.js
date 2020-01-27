import { Trip } from '../db/models';
import Response from '../helpers/responsesHandler';

export default class TripController {
  static async createTrip(req, res) {
    try {
      const { location, destination } = req.body;
      const BusArrivalTime = ['20 minutes', '30 minutes', '15 minutes'];
      const busToArrive = ['RAC 6', 'RAC 7', 'RAC 8'];
      if (location === 'stadium') {
        const TripDetails = await Trip.create({
          destination,
          location,
          BusArrivalTime: BusArrivalTime[0],
          busToArrive: busToArrive[0],
        });
        return Response.sucessResponse(res, 201, ' Trip created successfully', TripDetails);
      }
      if (location === 'gisimenti') {
        const TripDetails = await Trip.create({
          destination,
          location,
          BusArrivalTime: `${BusArrivalTime[1]}`,
          busToArrive: `${busToArrive[1]}`,
        });
        return Response.sucessResponse(res, 201, ' Trip created successfully', TripDetails);
      }
      if (location === 'chez-lando') {
        const TripDetails = await Trip.create({
          destination,
          location,
          BusArrivalTime: BusArrivalTime[2],
          busToArrive: busToArrive[2],
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
