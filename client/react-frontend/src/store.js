import { createStore, applyMiddlewear, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};
const middlewear = [thunk];

const store = createStore(
  () => [],
  initialState,
  compose(
    applyMiddlewear(...middlewear),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;