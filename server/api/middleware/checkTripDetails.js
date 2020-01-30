import Response from '../helpers/responsesHandler';
import { Users, Trip } from '../db/models';

export default class TripDetails {
  static async findUserInToken(req, res, next) {
    const { userEmail } = req.payload;
    const userIdFromToken = await Users.findOne({
      where: {
        email: userEmail,
      },
    },
    // eslint-disable-next-line function-paren-newline
    );
    const { user_id } = userIdFromToken;


    if (!user_id) {
      return Response.errorResponse(res, 404, 'You do not own this trip');
    }
    req.userDetails = user_id;
    return next();
  }

  static async findTrip(req, res, next) {
    const { tripId } = req.params;
    const tripDetails = await Trip.findOne({
      where: {
        tripId,
      },
    },
    {
      attributes: ['user_id, tripId'],
    });
    if (!tripDetails) {
      return Response.errorResponse(res, 404, 'Trip was not found');
    }
    const compareDetails = tripDetails.user_id === req.userDetails
    if (!compareDetails) {
      return Response.errorResponse(res, 404, 'Does not belong to you');
    }
    req.tripInfo = tripId;
    return next();
  }
}
