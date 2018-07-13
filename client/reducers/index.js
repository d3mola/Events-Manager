import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import centersReducer from './centersReducer';
import eventsReducer from './eventsReducer';
import flashMessages from './flashMessages';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  flashMessages,
  authReducer,
  centersReducer,
  eventsReducer,
  router: routerReducer
});

export default rootReducer;
