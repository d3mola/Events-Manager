import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// import routes
import routes from './server/routes/users';
import centerRoutes from './server/routes/centers';
// import routes from './server/routes/index';

// Load .env
dotenv.config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use imported routes
app.use('/api', routes);
app.use('/api', centerRoutes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  success: true,
  message: 'Welcome to the our CATCH ALL ROUTE',
}));

export default app;
