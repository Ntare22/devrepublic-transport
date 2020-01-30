import express from 'express';
import TripController from '../controller/tripController';
import validateTrip from '../middleware/tripValidator';
import authCheck from '../middleware/tokenValidator';
import TripDetails from '../middleware/checkTripDetails';

const tripRouter = express.Router();

tripRouter.post('/trip', authCheck, validateTrip, TripController.createTrip);
tripRouter.delete('/trip/:tripId', authCheck, TripDetails.findUserInToken, TripDetails.findTrip, TripController.deleteTrip);

tripRouter.get('/specificTrip', TripController.viewTrip);

export default tripRouter;
