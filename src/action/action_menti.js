import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8082/MentoAPI/mentoring';

export const STUDENT_LOAD_TEAM_LIST = 'STUDENT_LOAD_TEAM_LIST';
export const STUDENT_LOAD_TEAM_LIST_SUCCESS = 'STUDENT_LOAD_TEAM_LIST_SUCCESS';
export const STUDENT_LOAD_TEAM_LIST_FAILURE = 'STUDENT_LOAD_TEAM_LIST_FAILURE';
export const RESET_STUDENT_LOAD_TEAM_LIST = 'RESET_STUDENT_LOAD_TEAM_LIST';

export const STUDENT_APPLY_MENTI = 'STUDENT_APPLY_MENTI';
export const STUDENT_APPLY_MENTI_SUCCESS = 'STUDENT_APPLY_MENTI_SUCCESS';
export const STUDENT_APPLY_MENTI_FAILURE = 'STUDENT_APPLY_MENTI_FAILURE';
export const RESET_STUDENT_APPLY_MENTI = 'RESET_STUDENT_APPLY_MENTI';

export const STUDENT_RELEASE_CURRENT_MENTI = 'STUDENT_RELEASE_CURRENT_MENTI';
export const STUDENT_RELEASE_CURRENT_MENTI_SUCCESS = 'STUDENT_RELEASE_CURRENT_MENTI_SUCCESS';
export const STUDENT_RELEASE_CURRENT_MENTI_FAILURE = 'STUDENT_RELEASE_CURRENT_MENTI_FAILURE';
export const RESET_STUDENT_RELEASE_CURRENT_MENTI = 'RESET_STUDENT_RELEASE_CURRENT_MENTI';

export const STUDENT_LOAD_MENTI_CAREERS = 'STUDENT_LOAD_MENTI_CAREERS';
export const STUDENT_LOAD_MENTI_CAREERS_SUCCESS = 'STUDENT_LOAD_MENTI_CAREERS_SUCCESS';
export const STUDENT_LOAD_MENTI_CAREERS_FAILURE = 'STUDENT_LOAD_MENTI_CAREERS_FAILURE';
export const RESET_STUDENT_LOAD_MENTI_CAREERS = 'RESET_STUDENT_LOAD_MENTI_CAREERS';

export function studentLoadTeamList(identity){
    const request = axios({
        url : `${ROOT_URL}/menti/infos/${identity}`,
        method : 'get'
    });
    return {
        type : STUDENT_LOAD_TEAM_LIST,
        payload : request
    }
}

export function studentLoadTeamListSuccess(appVOs){
    return {
        type : STUDENT_LOAD_TEAM_LIST_SUCCESS,
        payload : appVOs.data
    }
}

export function studentLoadTeamListFailure(error){
    return {
        type : STUDENT_LOAD_TEAM_LIST_FAILURE,
        payload : error
    }
}

export function resetStudentLoadTeamList(){
    return {
        type : RESET_STUDENT_LOAD_TEAM_LIST
    }
}

export function studentApplyMenti(mentiForm){
    const request = axios({
        url : `${ROOT_URL}/menti`,
        method : 'post',
        data : mentiForm
    });
    return {
        type : STUDENT_APPLY_MENTI,
        payload : request
    }
}

export function studentApplyMentiSuccess(message){
    return {
        type : STUDENT_APPLY_MENTI_SUCCESS,
        payload : message.data
    }
}

export function studentApplyMentiFailure(error){
    return {
        type : STUDENT_APPLY_MENTI_FAILURE,
        payload : error
    }
}

export function resetStudentApplyMenti(){
    return {
        type : RESET_STUDENT_APPLY_MENTI
    }
}

export function studentReleaseCurrentMenti(mentiForm){
    const request = axios({
        url : `${ROOT_URL}/menti`,
        method : 'delete',
        data : mentiForm
    });
    return {
        type : STUDENT_RELEASE_CURRENT_MENTI,
        payload : request
    }
}

export function studentReleaseCurrentMentiSuccess(message){
    return {
        type : STUDENT_RELEASE_CURRENT_MENTI_SUCCESS,
        payload : message.data
    }
}

export function studentReleaseCurrentMentiFailure(error){
    return {
        type : STUDENT_RELEASE_CURRENT_MENTI_FAILURE,
        payload : error
    }
}

export function resetStudentReleaseCurrentMenti(){
    return {
        type : RESET_STUDENT_RELEASE_CURRENT_MENTI
    }
}

export function studentLoadMentiCareers(identity){
    const request = axios({
        url : `${ROOT_URL}/mentis/career/${identity}`,
        method : 'get'
    });
    return {
        type : STUDENT_LOAD_MENTI_CAREERS,
        payload : request
    }
}


export function studentLoadMentiCareersSuccess(careers){
    return {
        type : STUDENT_LOAD_MENTI_CAREERS_SUCCESS,
        payload : careers.data
    }
}

export function studentLoadMentiCareersFailure(error){
    return {
        type : STUDENT_LOAD_MENTI_CAREERS_FAILURE,
        payload : error
    }
}

export function resetStudentLoadMentiCareers(){
    return {
        type : RESET_STUDENT_LOAD_MENTI_CAREERS
    }
}