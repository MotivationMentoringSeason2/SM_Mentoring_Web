import {
    FETCH_ACCOUNT_TIMETABLE, FETCH_ACCOUNT_TIMETABLE_SUCCESS, FETCH_ACCOUNT_TIMETABLE_FAILURE, RESET_FETCH_ACCOUNT_TIMETABLE,
    FETCH_ANOTHER_ACCOUNT_TIMETABLE, FETCH_ANOTHER_ACCOUNT_TIMETABLE_SUCCESS, FETCH_ANOTHER_ACCOUNT_TIMETABLE_FAILURE, RESET_FETCH_ANOTHER_ACCOUNT_TIMETABLE,
    EXECUTE_ACCOUNT_SAVE_TIMETABLE, EXECUTE_ACCOUNT_SAVE_TIMETABLE_SUCCESS, EXECUTE_ACCOUNT_SAVE_TIMETABLE_FAILURE, RESET_EXECUTE_ACCOUNT_SAVE_TIMETABLE
} from "../action/action_available_time";

const INITIAL_STATE = {
    singleTimetable : {
        timetables : [], loading : false, error : null
    },
    accountTimetable : {
        timetableElements : [{ day : 'MON', startTime : '09:00', endTime : '09:00' }], loading : false, error : null
    },
    saveStatus : {
        message : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type){
        case FETCH_ACCOUNT_TIMETABLE :
            return { ...state, singleTimetable : { timetables : [], loading : true, error : null }};
        case FETCH_ACCOUNT_TIMETABLE_SUCCESS :
            return { ...state, singleTimetable : { timetables : action.payload, loading : false, error : null }};
        case FETCH_ACCOUNT_TIMETABLE_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, singleTimetable : { timetables : [], loading : false, error : null }};
        case RESET_FETCH_ACCOUNT_TIMETABLE :
            return { ...state, singleTimetable : { timetables : [], loading : false, error : null }};

        case FETCH_ANOTHER_ACCOUNT_TIMETABLE :
            return { ...state, accountTimetable : { timetableElements : [{ day : 'MON', startTime : '09:00', endTime : '09:00' }], loading : true, error : null }};
        case FETCH_ANOTHER_ACCOUNT_TIMETABLE_SUCCESS :
            return { ...state, accountTimetable : { timetableElements : action.payload, loading : true, error : null }};
        case FETCH_ANOTHER_ACCOUNT_TIMETABLE_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, accountTimetable : { timetableElements : [], loading : false, error : null }};
        case RESET_FETCH_ANOTHER_ACCOUNT_TIMETABLE :
            return { ...state, accountTimetable : { timetableElements : [{ day : 'MON', startTime : '09:00', endTime : '09:00' }], loading : true, error : null }};

        case EXECUTE_ACCOUNT_SAVE_TIMETABLE :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case EXECUTE_ACCOUNT_SAVE_TIMETABLE_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case EXECUTE_ACCOUNT_SAVE_TIMETABLE_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_EXECUTE_ACCOUNT_SAVE_TIMETABLE :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}