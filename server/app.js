import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
// import cors from 'cors';

// import routes
import routes from './routes/users';
import centerRoutes from './routes/centers';
import eventRoutes from './routes/events';

// Load .env
dotenv.config();

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // '*' is not good for production.
  // Only if the API consumable is for public use.
  //allow another domain use ur api.
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PUT, DELETE, HEAD'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  next();
});

app.use('/', express.static(path.join(__dirname, 'client/static')));


// use imported routes
app.use('/api/v1', routes);
app.use('/api/v1', centerRoutes);
app.use('/api/v1', eventRoutes);

// Always return the main index.html, so react-router renders
// the route in the client
app.get('/*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  res.sendFile(path.join(path.dirname(__dirname), 'client/index.html'));
});

app.get('/bundle.js', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/build/bundle.js')
));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export default app;
