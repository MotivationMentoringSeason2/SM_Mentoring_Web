import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8082/MentoAPI/mentoring';

export const STUDENT_LOAD_APPLY_MODEL = 'STUDENT_LOAD_APPLY_MODEL';
export const STUDENT_LOAD_APPLY_MODEL_SUCCESS = 'STUDENT_LOAD_APPLY_MODEL_SUCCESS';
export const STUDENT_LOAD_APPLY_MODEL_FAILURE = 'STUDENT_LOAD_APPLY_MODEL_FAILURE';
export const RESET_STUDENT_LOAD_APPLY_MODEL = 'RESET_STUDENT_LOAD_APPLY_MODEL';

export const STUDENT_APPLY_MENTO = 'STUDENT_APPLY_MENTO';
export const STUDENT_APPLY_MENTO_SUCCESS = 'STUDENT_APPLY_MENTO_SUCCESS';
export const STUDENT_APPLY_MENTO_FAILURE = 'STUDENT_APPLY_MENTO_FAILURE';
export const RESET_STUDENT_APPLY_MENTO = 'RESET_STUDENT_APPLY_MENTO';

export const STUDENT_LOAD_MENTO_CAREERS = 'STUDENT_LOAD_MENTO_CAREERS';
export const STUDENT_LOAD_MENTO_CAREERS_SUCCESS = 'STUDENT_LOAD_MENTO_CAREERS_SUCCESS';
export const STUDENT_LOAD_MENTO_CAREERS_FAILURE = 'STUDENT_LOAD_MENTO_CAREERS_FAILURE';
export const RESET_STUDENT_LOAD_MENTO_CAREERS = 'RESET_STUDENT_LOAD_MENTO_CAREERS';

export const STUDENT_UPDATE_MENTO_INFO = 'STUDENT_UPDATE_MENTO_INFO';
export const STUDENT_UPDATE_MENTO_INFO_SUCCESS = 'STUDENT_UPDATE_MENTO_INFO_SUCCESS';
export const STUDENT_UPDATE_MENTO_INFO_FAILURE = 'STUDENT_UPDATE_MENTO_INFO_FAILURE';
export const RESET_STUDENT_UPDATE_MENTO_INFO = 'RESET_STUDENT_UPDATE_MENTO_INFO';

export const STUDENT_DELETE_MENTO_INFO = 'STUDENT_DELETE_MENTO_INFO';
export const STUDENT_DELETE_MENTO_INFO_SUCCESS = 'STUDENT_DELETE_MENTO_INFO_SUCCESS';
export const STUDENT_DELETE_MENTO_INFO_FAILURE = 'STUDENT_DELETE_MENTO_INFO_FAILURE';
export const RESET_STUDENT_DELETE_MENTO_INFO = 'RESET_STUDENT_DELETE_MENTO_INFO';

export const STUDENT_LOAD_CURRENT_MENTO_TOKEN = 'STUDENT_LOAD_CURRENT_MENTO_TOKEN';
export const STUDENT_LOAD_CURRENT_MENTO_TOKEN_SUCCESS = 'STUDENT_LOAD_CURRENT_MENTO_TOKEN_SUCCESS';
export const STUDENT_LOAD_CURRENT_MENTO_TOKEN_FAILURE = 'STUDENT_LOAD_CURRENT_MENTO_TOKEN_FAILURE';
export const RESET_STUDENT_LOAD_CURRENT_MENTO_TOKEN = 'RESET_STUDENT_LOAD_CURRENT_MENTO_TOKEN';

export const ADMIN_LOAD_MENTO_INFOS = 'ADMIN_LOAD_MENTO_INFOS';
export const ADMIN_LOAD_MENTO_INFOS_SUCCESS = 'ADMIN_LOAD_MENTO_INFOS_SUCCESS';
export const ADMIN_LOAD_MENTO_INFOS_FAILURE = 'ADMIN_LOAD_MENTO_INFOS_FAILURE';
export const RESET_ADMIN_LOAD_MENTO_INFOS = 'RESET_ADMIN_LOAD_MENTO_INFOS';

export function studentLoadApplyModel(identity){
    const request = axios({
        url : `${ROOT_URL}/team/model/${identity}`,
        method : 'get'
    });
    return {
        type : STUDENT_LOAD_APPLY_MODEL,
        payload : request
    }
}

export function studentLoadApplyModelSuccess(model){
    return {
        type : STUDENT_LOAD_APPLY_MODEL_SUCCESS,
        payload : model.data
    }
}

export function studentLoadApplyModelFailure(error){
    return {
        type : STUDENT_LOAD_APPLY_MODEL_FAILURE,
        payload : error
    }
}

export function resetStudentLoadApplyModel(){
    return {
        type : RESET_STUDENT_LOAD_APPLY_MODEL
    }
}

export function studentApplyMento(identity, mentoForm, advFile){
    let formData = new FormData();
    formData.append('applicationModel', new Blob([JSON.stringify(mentoForm)], { type : 'application/json'}));
    formData.append('advFile', advFile);
    const request = axios({
        url : `${ROOT_URL}/team/${identity}`,
        method : 'post',
        data : formData,
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    });
    return {
        type : STUDENT_APPLY_MENTO,
        payload : request
    }
}

export function studentApplyMentoSuccess(message){
    return {
        type : STUDENT_APPLY_MENTO_SUCCESS,
        payload : message.data
    }
}

export function studentApplyMentoFailure(error){
    return {
        type : STUDENT_APPLY_MENTO_FAILURE,
        payload : error
    }
}

export function resetStudentApplyMento(){
    return {
        type : RESET_STUDENT_APPLY_MENTO
    }
}

export function studentLoadMentoCareers(identity){
    const request = axios({
        url : `${ROOT_URL}/teams/career/${identity}`,
        method : 'get'
    });
    return {
        type : STUDENT_LOAD_MENTO_CAREERS,
        payload : request
    }
}

export function studentLoadMentoCareersSuccess(careers){
    return {
        type : STUDENT_LOAD_MENTO_CAREERS_SUCCESS,
        payload : careers.data
    }
}

export function studentLoadMentoCareersFailure(error){
    return {
        type : STUDENT_LOAD_MENTO_CAREERS_FAILURE,
        payload : error
    }
}

export function resetStudentLoadMentoCareers(){
    return {
        type : RESET_STUDENT_LOAD_MENTO_CAREERS
    }
}

export function studentUpdateMentoInfo(identity, mentoForm, advFile){
    let formData = new FormData();
    if(advFile !== null) {
        formData.append('applicationModel', new Blob([JSON.stringify(mentoForm)], {type: 'application/json'}));
        formData.append('advFile', advFile);
    }

    const request = advFile !== null ?
        axios({
            url : `${ROOT_URL}/team/${identity}`,
            method : 'put',
            data : formData,
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }) : axios({
            url : `${ROOT_URL}/team/info/${identity}`,
            method : 'put',
            data : mentoForm
        });
    return {
        type : STUDENT_UPDATE_MENTO_INFO,
        payload : request
    }
}

export function studentUpdateMentoInfoSuccess(message){
    return {
        type : STUDENT_UPDATE_MENTO_INFO_SUCCESS,
        payload : message.data
    }
}

export function studentUpdateMentoInfoFailure(error){
    return {
        type : STUDENT_UPDATE_MENTO_INFO_FAILURE,
        payload : error
    }
}

export function resetStudentUpdateMentoInfo(){
    return {
        type : RESET_STUDENT_UPDATE_MENTO_INFO
    }
}

export function studentDeleteMentoInfo(identity){
    const request = axios({
        url: `${ROOT_URL}/team/cancellation/${identity}`,
        method: 'delete',
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return {
        type : STUDENT_DELETE_MENTO_INFO,
        payload : request
    }
}

export function studentDeleteMentoInfoSuccess(message){
    return {
        type : STUDENT_DELETE_MENTO_INFO_SUCCESS,
        payload : message.data
    }
}

export function studentDeleteMentoInfoFailure(error){
    return {
        type : STUDENT_LOAD_MENTO_CAREERS_FAILURE,
        payload : error
    }
}

export function resetStudentDeleteMentoInfo(){
    return {
        type : RESET_STUDENT_DELETE_MENTO_INFO
    }
}

export function studentLoadCurrentMentoToken(identity){
    const request = axios({
        url : `${ROOT_URL}/team/token/${identity}`,
        method : 'get'
    });
    return {
        type : STUDENT_LOAD_CURRENT_MENTO_TOKEN,
        payload : request
    }
}

export function studentLoadCurrentMentoTokenSuccess(tokenData){
    return {
        type : STUDENT_LOAD_CURRENT_MENTO_TOKEN_SUCCESS,
        payload : tokenData.data
    }
}

export function studentLoadCurrentMentoTokenFailure(error){
    return {
        type : STUDENT_LOAD_CURRENT_MENTO_TOKEN_FAILURE,
        payload : error
    }
}

export function resetStudentLoadCurrentMentoToken(){
    return {
        type : RESET_STUDENT_LOAD_CURRENT_MENTO_TOKEN
    }
}

export function adminLoadMentoInfos(){
    const request = axios({
        url : `${ROOT_URL}/teams/application/admin`,
        method : 'get'
    });
    return {
        type : ADMIN_LOAD_MENTO_INFOS,
        payload : request
    }
}

export function adminLoadMentoInfosSuccess(mentoApps){
    return {
        type : ADMIN_LOAD_MENTO_INFOS_SUCCESS,
        payload : mentoApps.data
    }
}

export function adminLoadMentoInfosFailure(error){
    return {
        type : ADMIN_LOAD_MENTO_INFOS_FAILURE,
        payload : error
    }
}

export function resetAdminLoadMentoInfos(){
    return {
        type : RESET_ADMIN_LOAD_MENTO_INFOS
    }
}