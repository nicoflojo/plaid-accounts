import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorsReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});