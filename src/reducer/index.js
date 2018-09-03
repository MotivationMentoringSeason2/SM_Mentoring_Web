import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './reducer_account'
export const rootReducer = combineReducers({
    form : formReducer,
    account : accountReducer
});