import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './api/routes/authRoutes';
import tripRouter from './api/routes/tripRoute';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to devRepublic transport',
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', tripRouter);
app.listen(port, () => `Server is running on PORT ${port}`);

export default app;
