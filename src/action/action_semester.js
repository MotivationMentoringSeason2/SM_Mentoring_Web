import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8082/MentoAPI';

export const ADMIN_LOAD_SEMESTER_LIST = 'ADMIN_LOAD_SEMESTER_LIST';
export const ADMIN_LOAD_SEMESTER_LIST_SUCCESS = 'ADMIN_LOAD_SEMESTER_LIST_SUCCESS';
export const ADMIN_LOAD_SEMESTER_LIST_FAILURE = 'ADMIN_LOAD_SEMESTER_LIST_FAILURE';
export const RESET_ADMIN_LOAD_SEMESTER_LIST = 'RESET_ADMIN_LOAD_SEMESTER_LIST';

export const ADMIN_CREATE_SEMESTER = 'ADMIN_CREATE_SEMESTER';
export const ADMIN_CREATE_SEMESTER_SUCCESS = 'ADMIN_CREATE_SEMESTER_SUCCESS';
export const ADMIN_CREATE_SEMESTER_FAILURE = 'ADMIN_CREATE_SEMESTER_FAILURE';
export const RESET_ADMIN_SAVE_SEMESTER = 'RESET_ADMIN_SAVE_SEMESTER';

export function adminLoadSemesterList(){
    const request = axios({
        url : `${ROOT_URL}/semesters`,
        method : 'get'
    });
    return {
        type : ADMIN_LOAD_SEMESTER_LIST,
        payload : request
    }
}

export function adminLoadSemesterListSuccess(semesters){
    return {
        type : ADMIN_LOAD_SEMESTER_LIST_SUCCESS,
        payload : semesters.data
    }
}

export function adminLoadSemesterListFailure(error){
    return {
        type : ADMIN_LOAD_SEMESTER_LIST_FAILURE,
        payload : error
    }
}

export function resetAdminLoadSemesterList(){
    return {
        type : RESET_ADMIN_LOAD_SEMESTER_LIST
    }
}

export function adminCreateSemester(semesterForm){
    const request = axios({
        url : `${ROOT_URL}/semester`,
        method : 'post',
        data : semesterForm
    });
    return {
        type : ADMIN_CREATE_SEMESTER,
        payload : request
    }
}

export function adminCreateSemesterSuccess(message){
    return {
        type : ADMIN_CREATE_SEMESTER_SUCCESS,
        payload : message.data
    }
}

export function adminCreateSemesterFailure(error){
    return {
        type : ADMIN_CREATE_SEMESTER_FAILURE,
        payload : error
    }
}

export function resetAdminCreateSemester(){
    return {
        type : RESET_ADMIN_SAVE_SEMESTER
    }
}
