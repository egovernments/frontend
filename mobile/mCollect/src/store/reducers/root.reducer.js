import loginReducer from './login.reducer';
import mcformReducer from './mcform.reducer';
import collectReducer from './collect.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
  mcform: mcformReducer,
  login: loginReducer,
  collect: collectReducer,
});
