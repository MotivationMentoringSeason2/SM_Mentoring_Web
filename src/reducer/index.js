import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './reducer_account';
import profileReducer from './reducer_profile';
import departmentReducer from './reducer_department';
import timetableReducer from './reducer_timetable';
import noticeReducer from './reducer_notice';
export const rootReducer = combineReducers({
    form : formReducer,
    account : accountReducer,
    profile : profileReducer,
    department : departmentReducer,
    timetable : timetableReducer,
    notice : noticeReducer
});