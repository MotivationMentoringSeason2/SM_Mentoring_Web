import axios from 'axios';

const COMMON_ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/common';

export const FETCH_ACCOUNT_TIMETABLE = 'FETCH_ACCOUNT_TIMETABLE';
export const FETCH_ACCOUNT_TIMETABLE_SUCCESS = 'FETCH_ACCOUNT_TIMETABLE_SUCCESS';
export const FETCH_ACCOUNT_TIMETABLE_FAILURE = 'FETCH_ACCOUNT_TIMETABLE_FAILURE';
export const RESET_FETCH_ACCOUNT_TIMETABLE = 'RESET_FETCH_ACCOUNT_TIMETABLE';

export function fetchAccountTimetable(userToken){
    const request = axios({
        method : 'get',
        url : `${COMMON_ROOT_URL}/available_times`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : FETCH_ACCOUNT_TIMETABLE,
        payload : request
    }
}

export function fetchAccountTimetableSuccess(timetables){
    return {
        type : FETCH_ACCOUNT_TIMETABLE_SUCCESS,
        payload : timetables.data
    }
}

export function fetchAccountTimetableFailure(error){
    return {
        type : FETCH_ACCOUNT_TIMETABLE_FAILURE,
        payload : error
    }
}

export function resetFetchAccountTimetable(){
    return {
        type : RESET_FETCH_ACCOUNT_TIMETABLE
    }
}