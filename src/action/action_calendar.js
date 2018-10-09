import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8083/NoticeAPI';

export const ANYBODY_LOAD_CALENDAR_LIST = 'ANYBODY_LOAD_CALENDAR_LIST';
export const ANYBODY_LOAD_CALENDAR_LIST_SUCCESS = 'ANYBODY_LOAD_CALENDAR_LIST_SUCCESS';
export const ANYBODY_LOAD_CALENDAR_LIST_FAILURE = 'ANYBODY_LOAD_CALENDAR_LIST_FAILURE';
export const RESET_ANYBODY_LOAD_CALENDAR_LIST = 'RESET_ANYBODY_LOAD_CALENDAR_LIST';

export const ADMIN_UPDATE_CALENDAR_ELEMENT = 'ADMIN_UPDATE_CALENDAR_ELEMENT';
export const ADMIN_UPDATE_CALENDAR_ELEMENT_SUCCESS = 'ADMIN_UPDATE_CALENDAR_ELEMENT_SUCCESS';
export const ADMIN_UPDATE_CALENDAR_ELEMENT_FAILURE = 'ADMIN_UPDATE_CALENDAR_ELEMENT_FAILURE';
export const RESET_ADMIN_UPDATE_CALENDAR_ELEMENT = 'RESET_ADMIN_UPDATE_CALENDAR_ELEMENT';

export function anybodyLoadCalendarList(){
    const request = axios({
        url : `${ROOT_URL}/calendar/accordion`,
        method : 'get'
    });
    return {
        type : ANYBODY_LOAD_CALENDAR_LIST,
        payload : request
    }
}

export function anybodyLoadCalendarListSuccess(accordion){
    return {
        type : ANYBODY_LOAD_CALENDAR_LIST_SUCCESS,
        payload : accordion.data
    }
}

export function anybodyLoadCalendarListFailure(error){
    return {
        type : ANYBODY_LOAD_CALENDAR_LIST_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadCalendarList(){
    return {
        type : RESET_ANYBODY_LOAD_CALENDAR_LIST
    }
}

export function adminUpdateCalendarElement(calendarForm, writer){
    const request = axios({
        url : `${ROOT_URL}/calendar/${writer}`,
        method : 'put',
        data : calendarForm
    });
    return {
        type : ADMIN_UPDATE_CALENDAR_ELEMENT,
        payload : request
    }
}

export function adminUpdateCalendarElementSuccess(message){
    return {
        type : ADMIN_UPDATE_CALENDAR_ELEMENT_SUCCESS,
        payload : message.data
    }
}

export function adminUpdateCalendarElementFailure(error){
    return {
        type : ADMIN_UPDATE_CALENDAR_ELEMENT_FAILURE,
        payload : error
    }
}

export function resetAdminUpdateCalendarElement(){
    return {
        type : RESET_ADMIN_UPDATE_CALENDAR_ELEMENT
    }
}