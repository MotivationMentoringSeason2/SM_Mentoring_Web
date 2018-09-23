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