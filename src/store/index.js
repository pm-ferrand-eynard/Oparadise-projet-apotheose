import { createStore, applyMiddleware, compose } from 'redux';
import authMiddleware from './middlewares/userToken';
import getdatasAPI from './middlewares/getdatasAPI';
// import loggedMiddleware from './middlewares/loggedMiddleware';

import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
  // Middlewares ici =>
    // loggedMiddleware,
    authMiddleware,
    getdatasAPI,
  ),
);

const store = createStore(reducer, enhancers);

export default store;
