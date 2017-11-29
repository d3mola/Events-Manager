import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

import config from '../webpack.config.dev';

// import routes
import routes from './routes/users';
import centerRoutes from './routes/centers';
import eventRoutes from './routes/events';

// Load .env
dotenv.config();
const compiler = webpack(config);

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use imported routes
app.use('/api/v1', routes);
app.use('/api/v1', centerRoutes);
app.use('/api/v1', eventRoutes);

app.get('/bundle', (req, res) => res.sendFile(path.join(path.dirname(__dirname), 'client/build/bundle.js')));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/signin', express.static(path.join(__dirname, '../client')));

app.use('/signup', express.static(path.join(__dirname, '../client')));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export default app;
