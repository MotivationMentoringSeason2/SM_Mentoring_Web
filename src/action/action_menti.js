import axios from 'axios';

import { MENTO_URL } from "./distribute_urls";

const ROOT_URL = `${MENTO_URL}/mentoring`;

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

export const MENTO_LOAD_MENTI_LIST = 'MENTO_LOAD_MENTI_LIST';
export const MENTO_LOAD_MENTI_LIST_SUCCESS = 'MENTO_LOAD_MENTI_LIST_SUCCESS';
export const MENTO_LOAD_MENTI_LIST_FAILURE = 'MENTO_LOAD_MENTI_LIST_FAILURE';
export const RESET_MENTO_LOAD_MENTI_LIST = 'RESET_MENTO_LOAD_MENTI_LIST';

export const MENTI_LOAD_MENTORING_TOKEN = 'MENTI_LOAD_MENTORING_TOKEN';
export const MENTI_LOAD_MENTORING_TOKEN_SUCCESS = 'MENTI_LOAD_MENTORING_TOKEN_SUCCESS';
export const MENTI_LOAD_MENTORING_TOKEN_FAILURE = 'MENTI_LOAD_MENTORING_TOKEN_FAILURE';
export const RESET_MENTI_LOAD_MENTORING_TOKEN = 'RESET_MENTI_LOAD_MENTORING_TOKEN';

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

export function mentoLoadMentiList(teamId){
    const request = axios({
        url : `${ROOT_URL}/team/persons/${teamId}`,
        method : 'get'
    });
    return {
        type : MENTO_LOAD_MENTI_LIST,
        payload : request
    }
}

export function mentoLoadMentiListSuccess(mentis){
    return {
        type : MENTO_LOAD_MENTI_LIST_SUCCESS,
        payload : mentis.data
    }
}

export function mentoLoadMentiListFailure(error){
    return {
        type : MENTO_LOAD_MENTI_LIST_FAILURE,
        payload : error
    }
}

export function resetMentoLoadMentiList(){
    return {
        type : RESET_MENTO_LOAD_MENTI_LIST
    }
}

export function mentiLoadMentoringToken(identity){
    const request = axios({
        url : `${ROOT_URL}/menti/token/${identity}`,
        method : 'get'
    });
    return {
        type : MENTI_LOAD_MENTORING_TOKEN,
        payload : request
    }
}

export function mentiLoadMentoringTokenSuccess(token){
    return {
        type : MENTI_LOAD_MENTORING_TOKEN_SUCCESS,
        payload : token.data
    }
}

export function mentiLoadMentoringTokenFailure(error){
    return {
        type : MENTI_LOAD_MENTORING_TOKEN_FAILURE,
        payload : error
    }
}

export function resetMentiLoadMentoringToken(){
    return {
        type : RESET_MENTI_LOAD_MENTORING_TOKEN
    }
}