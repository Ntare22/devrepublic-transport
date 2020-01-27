import express from 'express';
import TripController from '../controller/tripController';
import validateTrip from '../middleware/tripValidator';

const tripRouter = express.Router();

tripRouter.post('/trip', validateTrip, TripController.createTrip);

export default tripRouter;
