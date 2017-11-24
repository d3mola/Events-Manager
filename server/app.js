import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// import routes
import routes from './routes/users';
import centerRoutes from './routes/centers';
import eventRoutes from './routes/events';

// Load .env
dotenv.config();

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use imported routes
app.use('/api/v1', routes);
app.use('/api/v1', centerRoutes);
app.use('/api/v1', eventRoutes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  success: true,
  message: 'Welcome to the our CATCH ALL ROUTE',
}));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export default app;
