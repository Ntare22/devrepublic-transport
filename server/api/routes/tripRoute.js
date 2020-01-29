import express from 'express';
import TripController from '../controller/tripController';
import validateTrip from '../middleware/tripValidator';
import authCheck from '../middleware/tokenValidator';

const tripRouter = express.Router();

tripRouter.post('/trip', authCheck, validateTrip, TripController.createTrip);

export default tripRouter;
