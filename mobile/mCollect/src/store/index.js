import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/root.reducer';
import thunk from 'redux-thunk';

const logger = store => next => action => {
  console.log(action.type);
  //console.group(action.type);
  //console.info('dispatching', action);
  let result = next(action);
  //console.log('next state', store.getState());
  //console.groupEnd();
  return result;
};

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
