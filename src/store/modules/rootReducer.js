import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import barbershop from './barbershop/reducer';
import schedule from './schedule/reducer';
import feedback from './feedback/reducer';

const appReducer = combineReducers({
  auth,
  barbershop,
  user,
  schedule,
  feedback,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === '@auth/LOG_OUT') state = undefined;

  return appReducer(state, action);
};
export default rootReducer;
