import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './api/routes/authRoutes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to devRepublic transport',
}));

app.use('/api/auth', authRouter);

app.listen(port, () => `Server is running on PORT ${port}`);

export default app;
