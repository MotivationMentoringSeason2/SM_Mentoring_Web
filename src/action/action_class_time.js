import axios from 'axios';

export const ANYBODY_LOAD_CLASS_TIMES = 'ANYBODY_LOAD_CLASS_TIMES';
export const ANYBODY_LOAD_CLASS_TIMES_SUCCESS = 'ANYBODY_LOAD_CLASS_TIMES_SUCCESS';
export const ANYBODY_LOAD_CLASS_TIMES_FAILURE = 'ANYBODY_LOAD_CLASS_TIMES_FAILURE';
export const RESET_ANYBODY_LOAD_CLASS_TIMES = 'RESET_ANYBODY_LOAD_CLASS_TIMES';

export const MENTO_LOAD_CLASS_TIME_MODEL = 'MENTO_LOAD_CLASS_TIME_MODEL';
export const MENTO_LOAD_CLASS_TIME_MODEL_SUCCESS = 'MENTO_LOAD_CLASS_TIME_MODEL_SUCCESS';
export const MENTO_LOAD_CLASS_TIME_MODEL_FAILURE = 'MENTO_LOAD_CLASS_TIME_MODEL_FAILURE';
export const RESET_MENTO_LOAD_CLASS_TIME_MODEL = 'RESET_MENTO_LOAD_CLASS_TIME_MODEL';

export const MENTO_CREATE_CLASS_TIME = 'MENTO_CREATE_CLASS_TIME';
export const MENTO_CREATE_CLASS_TIME_SUCCESS = 'MENTO_CREATE_CLASS_TIME_SUCCESS';
export const MENTO_CREATE_CLASS_TIME_FAILURE = 'MENTO_CREATE_CLASS_TIME_FAILURE';

export const MENTO_UPDATE_CLASS_TIME = 'MENTO_UPDATE_CLASS_TIME';
export const MENTO_UPDATE_CLASS_TIME_SUCCESS = 'MENTO_UPDATE_CLASS_TIME_SUCCESS';
export const MENTO_UPDATE_CLASS_TIME_FAILURE = 'MENTO_UPDATE_CLASS_TIME_FAILURE';

export const RESET_MENTO_SAVE_CLASS_TIME = 'RESET_MENTO_SAVE_CLASS_TIME';

export const MENTO_DELETE_CLASS_TIMES = 'MENTO_DELETE_CLASS_TIMES';
export const MENTO_DELETE_CLASS_TIMES_SUCCESS = 'MENTO_DELETE_CLASS_TIMES_SUCCESS';
export const MENTO_DELETE_CLASS_TIMES_FAILURE = 'MENTO_DELETE_CLASS_TIMES_FAILURE';
export const RESET_MENTO_DELETE_CLASS_TIMES = 'RESET_MENTO_DELETE_CLASS_TIMES';

export const ADMIN_UPDATE_SCHEDULE_MESSAGE = 'ADMIN_UPDATE_SCHEDULE_MESSAGE';
export const ADMIN_UPDATE_SCHEDULE_MESSAGE_SUCCESS = 'ADMIN_UPDATE_SCHEDULE_MESSAGE_SUCCESS';
export const ADMIN_UPDATE_SCHEDULE_MESSAGE_FAILURE = 'ADMIN_UPDATE_SCHEDULE_MESSAGE_FAILURE';
export const RESET_ADMIN_UPDATE_SCHEDULE_MESSAGE = 'RESET_ADMIN_UPDATE_SCHEDULE_MESSAGE';

const ROOT_URL = 'http://127.0.0.1:8082/MentoAPI';

export function anybodyLoadClassTimes(teamId){
    const request = axios({
        url : `${ROOT_URL}/schedules/${teamId}`,
        method : 'get'
    });
    return {
        type : ANYBODY_LOAD_CLASS_TIMES,
        payload : request
    }
}

export function anybodyLoadClassTimesSuccess(timeList){
    return {
        type : ANYBODY_LOAD_CLASS_TIMES_SUCCESS,
        payload : timeList.data
    }
}

export function anybodyLoadClassTimesFailure(error){
    return {
        type : ANYBODY_LOAD_CLASS_TIMES_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadClassTimes(){
    return {
        type : RESET_ANYBODY_LOAD_CLASS_TIMES
    }
}

export function mentoLoadClassTimeModel(scheduleId){
    const request = axios({
        url : `${ROOT_URL}/schedule/model/${scheduleId}`,
        method : 'get'
    });
    return {
        type : MENTO_LOAD_CLASS_TIME_MODEL,
        payload : request
    }
}

export function mentoLoadClassTimeModelSuccess(model){
    return {
        type : MENTO_LOAD_CLASS_TIME_MODEL_SUCCESS,
        payload : model.data
    }
}

export function mentoLoadClassTimeModelFailure(error){
    return {
        type : MENTO_LOAD_CLASS_TIME_MODEL_FAILURE,
        payload : error
    }
}

export function resetMentoLoadClassTimeModel(){
    return {
        type : RESET_MENTO_LOAD_CLASS_TIME_MODEL
    }
}

export function mentoCreateClassTime(teamId, scheduleForm){
    const request = axios({
        url : `${ROOT_URL}/schedule/${teamId}`,
        method : 'post',
        data : scheduleForm
    });
    return {
        type : MENTO_CREATE_CLASS_TIME,
        payload : request
    }
}

export function mentoCreateClassTimeSuccess(message){
    return {
        type : MENTO_CREATE_CLASS_TIME_SUCCESS,
        payload : message.data
    }
}

export function mentoCreateClassTimeFailure(error){
    return {
        type : MENTO_CREATE_CLASS_TIME_FAILURE,
        payload : error
    }
}

export function mentoUpdateClassTIme(teamId, scheduleId, scheduleForm){
    const request = axios({
        url : `${ROOT_URL}/schedule/${teamId}/${scheduleId}`,
        method : 'put',
        data : scheduleForm
    });
    return {
        type : MENTO_UPDATE_CLASS_TIME,
        payload : request
    }
}

export function mentoUpdateClassTimeSuccess(message){
    return {
        type : MENTO_UPDATE_CLASS_TIME_SUCCESS,
        payload : message.data
    }
}

export function mentoUpdateClassTimeFailure(error){
    return {
        type : MENTO_UPDATE_CLASS_TIME_FAILURE,
        payload : error
    }
}

export function resetMentoSaveClassTime(){
    return {
        type : RESET_MENTO_SAVE_CLASS_TIME
    }
}

export function mentoDeleteClassTimes(ids){
    const request = axios({
        url : `${ROOT_URL}/schedules`,
        method : 'delete',
        data : ids
    });
    return {
        type : MENTO_DELETE_CLASS_TIMES,
        payload : request
    }
}

export function mentoDeleteClassTimesSuccess(message){
    return {
        type : MENTO_DELETE_CLASS_TIMES_SUCCESS,
        payload : message.data
    }
}

export function mentoDeleteClassTimesFailure(error){
    return {
        type : MENTO_DELETE_CLASS_TIMES_FAILURE,
        payload : error
    }
}

export function resetMentoDeleteClassTimes(){
    return {
        type : RESET_MENTO_DELETE_CLASS_TIMES
    }
}

export function adminUpdateScheduleMessage(scheduleId, messageForm){
    const request = axios({
        url : `${ROOT_URL}/schedule/confirm/${scheduleId}`,
        method : 'put',
        data : messageForm
    });
    return {
        type : ADMIN_UPDATE_SCHEDULE_MESSAGE,
        payload : request
    }
}

export function adminUpdateScheduleMessageSuccess(message) {
    return {
        type : ADMIN_UPDATE_SCHEDULE_MESSAGE_SUCCESS,
        payload : message.data
    }
}

export function adminUpdateScheduleMessageFailure(error){
    return {
        type : ADMIN_UPDATE_SCHEDULE_MESSAGE_FAILURE,
        payload : error
    }
}

export function resetAdminUpdateScheduleMessage(){
    return {
        type : RESET_ADMIN_UPDATE_SCHEDULE_MESSAGE
    }
}