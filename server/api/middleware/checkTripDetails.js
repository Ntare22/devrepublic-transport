/* eslint-disable camelcase */
// import Response from '../helpers/responsesHandler';
import db from '../db/models';

export default class TripDetails {
  static async findUserInToken(req, res, next) {
    const { userEmail } = req.payload;
    const userIdFromToken = await db.Users.findOne({
      where: {
        email: userEmail,
      },
    });
    const { userId, status } = userIdFromToken;
    // console.log('USER ID', userIdFromToken)
    if (!userId) {
      return res.status(404).json({
        status: 404,
        error: 'You do not own this trip',
      });
    }
    req.userDetails = userId;
    req.userStatus = status;
    return next();
  }

  static async findTrip(req, res, next) {
    const { tripId } = req.params;
    const tripDetails = await db.Trip.findOne({
      where: {
        tripId,
      },
    },
    {
      attributes: ['userId, tripId'],
    });
    if (!tripDetails) {
      return res.status(404).json({
        status: 404,
        error: 'Trip was not found',
      });
    }
    const compareDetails = tripDetails.userId === req.userDetails;
    if (!compareDetails) {
      return res.status(404).json({
        status: 404,
        error: 'Does not belong to you',
      });
    }
    req.tripInfo = tripId;
    return next();
  }
}
