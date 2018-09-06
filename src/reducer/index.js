import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './reducer_account';
import departmentReducer from './reducer_department';
import timetableReducer from './reducer_timetable';
export const rootReducer = combineReducers({
    form : formReducer,
    account : accountReducer,
    department : departmentReducer,
    timetable : timetableReducer
});