import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// import routes
import routes from './routes/users';
import centerRoutes from './routes/centers';
import eventRoutes from './routes/events';

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

app.use('/', express.static(path.join(__dirname, 'client/build')));

// use imported routes
app.use('/api/v1', routes);
app.use('/api/v1', centerRoutes);
app.use('/api/v1', eventRoutes);

app.use((req, res) =>
  res.status(404).json({
    success: false,
    message: 'Route does not exist'
  })
);

app.get('/bundle.js', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/build/bundle.js')
));

// Always return the main index.html, so react-router renders
// the route in the client
app.get('/*', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'client/build/index.html'))
);


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export default app;
