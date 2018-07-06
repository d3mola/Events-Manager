import userRoutes from './users';
import centerRoutes from './centers';
import eventRoutes from './events';

const routes = (app) => {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', centerRoutes);
  app.use('/api/v1', eventRoutes)
}
 export default routes;