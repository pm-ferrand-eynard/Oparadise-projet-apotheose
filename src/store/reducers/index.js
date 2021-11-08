import { combineReducers } from 'redux';
import userReducer from './user';
import searchReducer from './search';
import signUpReducer from './signUp';
import domSettingsReducer from './domSettings';
import signInReducer from './signIn';
import mapReducer from './map';
import accountReducer from './account';
import offersReducer from './offers';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  signUp: signUpReducer,
  signIn: signInReducer,
  domSettings: domSettingsReducer,
  map: mapReducer,
  account: accountReducer,
  offers: offersReducer,
});

export default rootReducer;