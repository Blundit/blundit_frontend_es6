import { combineReducers } from 'redux';

import User from './user';
import Claims from './claims';
import Predictions from './predictions';
import Experts from './experts';

export default combineReducers({
  User,
  Claims,
  Predictions,
  Experts
});