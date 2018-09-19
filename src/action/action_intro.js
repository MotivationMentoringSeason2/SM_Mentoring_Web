import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8083/NoticeAPI/introduce';

export const ANYBODY_LOAD_INTRO_ACCORDION = 'ANYBODY_LOAD_INTRO_ACCORDION';
export const ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS = 'ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS';
export const ANYBODY_LOAD_INTRO_ACCORDION_FAILURE = 'ANYBODY_LOAD_INTRO_ACCORDION_FAILURE';
export const RESET_ANYBODY_LOAD_INTRO_ACCORDION = 'RESET_ANYBODY_LOAD_INTRO_ACCORDION';

export function anybodyLoadIntroAccordion(){
    const request = axios({
        url : `${ROOT_URL}/accordion`,
        method : 'get'
    });
    return {
        type : ANYBODY_LOAD_INTRO_ACCORDION,
        payload : request
    }
}

export function anybodyLoadIntroAccordionSuccess(accordion){
    return {
        type : ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS,
        payload : accordion.data
    }
}

export function anybodyLoadIntroAccordionFailure(error){
    return {
        type : ANYBODY_LOAD_INTRO_ACCORDION_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadIntroAccordion(){
    return {
        type : RESET_ANYBODY_LOAD_INTRO_ACCORDION
    }
}