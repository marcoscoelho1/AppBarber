import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import barbershop from './barbershop/reducer';

export default combineReducers({
  auth,
  barbershop,
  user,
});
