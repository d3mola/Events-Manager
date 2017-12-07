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

// app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use( (req, res, next) =>{
  // '*' is not good for production. Only if the API consumable is for public use.
  res.header('Access-Control-Allow-Origin', '*'); //allow another domain use ur api.
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

// use imported routes
app.use('/api/v1', routes);
app.use('/api/v1', centerRoutes);
app.use('/api/v1', eventRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export default app;
