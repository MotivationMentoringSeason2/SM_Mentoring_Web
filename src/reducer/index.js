import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './reducer_account';
import profileReducer from './reducer_profile';
import departmentReducer from './reducer_department';
import timetableReducer from './reducer_timetable';
import noticeReducer from './reducer_notice';
import introReducer from './reducer_intro';
import calendarReducer from './reducer_calendar';
import mentoReducer from './reducer_mento';
import integrateFileReducer from './reducer_integrate_file';

export const rootReducer = combineReducers({
    form : formReducer,
    account : accountReducer,
    profile : profileReducer,
    department : departmentReducer,
    timetable : timetableReducer,
    notice : noticeReducer,
    intro : introReducer,
    calendar : calendarReducer,
    mento : mentoReducer,
    integrateFile : integrateFileReducer
});