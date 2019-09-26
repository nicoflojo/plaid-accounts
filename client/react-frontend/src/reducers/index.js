import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorsReducers'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});