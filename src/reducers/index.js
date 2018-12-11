import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import SelectPopokReducer from './SelectPopokReducer';

export default combineReducers({
  blackpink:()=>'lisa',
  auth: AuthReducer,
  selectedProduk: SelectPopokReducer
});

