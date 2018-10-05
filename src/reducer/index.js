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
import mentiReducer from './reducer_menti';
import integrateFileReducer from './reducer_integrate_file';
import classTimeReducer from './reducer_class_times';
import reportReducer from './reducer_report';
import semesterReducer from './reducer_semester';

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
    menti : mentiReducer,
    integrateFile : integrateFileReducer,
    classTime : classTimeReducer,
    report : reportReducer,
    semester : semesterReducer
});