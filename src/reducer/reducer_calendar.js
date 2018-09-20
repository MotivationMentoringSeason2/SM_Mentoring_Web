import {
    ANYBODY_LOAD_CALENDAR_LIST, ANYBODY_LOAD_CALENDAR_LIST_SUCCESS, ANYBODY_LOAD_CALENDAR_LIST_FAILURE, RESET_ANYBODY_LOAD_CALENDAR_LIST,
    ADMIN_UPDATE_CALENDAR_ELEMENT, ADMIN_UPDATE_CALENDAR_ELEMENT_SUCCESS, ADMIN_UPDATE_CALENDAR_ELEMENT_FAILURE, RESET_ADMIN_UPDATE_CALENDAR_ELEMENT
} from "../action/action_calendar";

const INITIAL_STATE = {
    calendarList : {
        calendars : [], loading: false, error: null
    },
    saveStatus : {
        message: null, loading: false, error: null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type){
        case ANYBODY_LOAD_CALENDAR_LIST :
            return { ...state, calendarList : { calendars : [], loading : true, error : null }};
        case ANYBODY_LOAD_CALENDAR_LIST_SUCCESS :
            return { ...state, calendarList : { calendars : action.payload, loading : false, error : null }};
        case ANYBODY_LOAD_CALENDAR_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, calendarList : { calendars : [], loading : false, error : error }};
        case RESET_ANYBODY_LOAD_CALENDAR_LIST :
            return { ...state, calendarList : { calendars : [], loading : false, error : null }};

        case ADMIN_UPDATE_CALENDAR_ELEMENT :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case ADMIN_UPDATE_CALENDAR_ELEMENT_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case ADMIN_UPDATE_CALENDAR_ELEMENT_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_ADMIN_UPDATE_CALENDAR_ELEMENT :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}