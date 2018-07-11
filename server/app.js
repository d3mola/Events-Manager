import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';

import routes from './routes';
import swaggerDoc from '../server/doc/swagger.json';

// Load .env
dotenv.config();

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

// Using cors
app.use(cors('*'));
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @description Express middleware that serves the static assets
 */
app.use('/', express.static(path.join(__dirname, '../client/build')));

// use the imported routes
routes(app);

/**
 * @description Serves the api documentation
 */
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/**
 * @description Handles incorrect routes
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * 
 * @returns {object} 
 */
app.use('/api/v1/*', (req, res) =>
  res.status(404).json({
    success: false,
    message: 'Route does not exist'
  })
);

/**
 * @description Serves the html file in the build folder to the browser
 * 
 * @param {object} req http request object
 * @param {object} res http response object
 * 
 */
app.get('/*', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/build/index.html'))
);


/**
 * @description Listens for the port
 * 
 * @param {number} port port to lsiten for
 * @param {object} error error
 * 
 */
app.listen(port, (error) => {
  winston.level = 'info';
  if (error) winston.log('info', error);
  winston.log('info', `Server running on port ${port}`);
});

export default app;
