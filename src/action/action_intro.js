import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8083/NoticeAPI/introduce';

export const ANYBODY_LOAD_INTRO_ACCORDION = 'ANYBODY_LOAD_INTRO_ACCORDION';
export const ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS = 'ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS';
export const ANYBODY_LOAD_INTRO_ACCORDION_FAILURE = 'ANYBODY_LOAD_INTRO_ACCORDION_FAILURE';
export const RESET_ANYBODY_LOAD_INTRO_ACCORDION = 'RESET_ANYBODY_LOAD_INTRO_ACCORDION';

export const ADMIN_LOAD_INTRO_TITLES = 'ADMIN_LOAD_INTRO_TITLES';
export const ADMIN_LOAD_INTRO_TITLES_SUCCESS = 'ADMIN_LOAD_INTRO_TITLES_SUCCESS';
export const ADMIN_LOAD_INTRO_TITLES_FAILURE = 'ADMIN_LOAD_INTRO_TITLES_FAILURE';
export const RESET_ADMIN_LOAD_INTRO_TITLES = 'RESET_ADMIN_LOAD_INTRO_TITLES';

export const ADMIN_CREATE_INTRO_TITLE = 'ADMIN_CREATE_INTRO_TITLE';
export const ADMIN_CREATE_INTRO_TITLE_SUCCESS = 'ADMIN_CREATE_INTRO_TITLE_SUCCESS';
export const ADMIN_CREATE_INTRO_TITLE_FAILURE = 'ADMIN_CREATE_INTRO_TITLE_FAILURE';

export const ADMIN_UPDATE_INTRO_TITLE = 'ADMIN_UPDATE_INTRO_TITLE';
export const ADMIN_UPDATE_INTRO_TITLE_SUCCESS = 'ADMIN_UPDATE_INTRO_TITLE_SUCCESS';
export const ADMIN_UPDATE_INTRO_TITLE_FAILURE = 'ADMIN_UPDATE_INTRO_TITLE_FAILURE';

export const RESET_ADMIN_SAVE_INTRO_TITLE = 'RESET_ADMIN_SAVE_INTRO_TITLE';

export const ADMIN_REMOVE_INTRO_TITLE_MULTI = 'ADMIN_REMOVE_INTRO_TITLE_MULTI';
export const ADMIN_REMOVE_INTRO_TITLE_MULTI_SUCCESS = 'ADMIN_REMOVE_INTRO_TITLE_MULTI_SUCCESS';
export const ADMIN_REMOVE_INTRO_TITLE_MULTI_FAILURE = 'ADMIN_REMOVE_INTRO_TITLE_MULTI_FAILURE';

export const RESET_ADMIN_REMOVE_INTRO_TITLE = 'RESET_ADMIN_REMOVE_INTRO_TITLE';

export const ADMIN_LOAD_DETAIL_LIST = 'ADMIN_LOAD_DETAIL_LIST';
export const ADMIN_LOAD_DETAIL_LIST_SUCCESS = 'ADMIN_LOAD_DETAIL_LIST_SUCCESS';
export const ADMIN_LOAD_DETAIL_LIST_FAILURE = 'ADMIN_LOAD_DETAIL_LIST_FAILURE';
export const RESET_ADMIN_LOAD_DETAIL_LIST = 'RESET_ADMIN_LOAD_DETAIL_LIST';

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

export function adminLoadIntroTitles(){
    const request = axios({
        url : `${ROOT_URL}/intros`,
        method : 'get'
    });
    return {
        type : ADMIN_LOAD_INTRO_TITLES,
        payload : request
    }
}

export function adminLoadIntroTitlesSuccess(intros){
    return {
        type : ADMIN_LOAD_INTRO_TITLES_SUCCESS,
        payload : intros.data
    }
}

export function adminLoadIntroTitlesFailure(error){
    return {
        type : ADMIN_LOAD_INTRO_TITLES_FAILURE,
        payload : error
    }
}

export function resetAdminLoadIntroTitles(){
    return {
        type : RESET_ADMIN_LOAD_INTRO_TITLES
    }
}

export function adminCreateIntroTitle(introForm, writer){
    const request = axios({
        url : `${ROOT_URL}/intro/${writer}`,
        method : 'post',
        data : introForm
    });
    return {
        type : ADMIN_CREATE_INTRO_TITLE,
        payload : request
    }
}

export function adminCreateIntroTitleSuccess(message){
    return {
        type : ADMIN_CREATE_INTRO_TITLE_SUCCESS,
        payload : message.data
    }
}

export function adminCreateIntroTitleFailure(error){
    return {
        type : ADMIN_CREATE_INTRO_TITLE_FAILURE,
        payload : error
    }
}

export function adminUpdateIntroTitle(introForm, writer){
    const request = axios({
        url : `${ROOT_URL}/intro/${writer}`,
        method : 'put',
        data : introForm
    });
    return {
        type : ADMIN_UPDATE_INTRO_TITLE,
        payload : request
    }
}

export function adminUpdateIntroTitleSuccess(message){
    return {
        type : ADMIN_UPDATE_INTRO_TITLE_SUCCESS,
        payload : message.data
    }
}

export function adminUpdateIntroTitleFailure(error){
    return {
        type : ADMIN_UPDATE_INTRO_TITLE_FAILURE,
        payload : error
    }
}

export function resetAdminSaveIntroTitle(){
    return {
        type : RESET_ADMIN_SAVE_INTRO_TITLE
    }
}

export function adminRemoveIntroTitleMulti(ids){
    const request = axios({
        url : `${ROOT_URL}/intros`,
        method : 'delete',
        data : ids
    });
    return {
        type : ADMIN_REMOVE_INTRO_TITLE_MULTI,
        payload : request
    }
}

export function adminRemoveIntroTitleMultiSuccess(message){
    return {
        type : ADMIN_REMOVE_INTRO_TITLE_MULTI_SUCCESS,
        payload : message.data
    }
}

export function adminRemoveIntroTitleMultiFailure(error){
    return {
        type : ADMIN_REMOVE_INTRO_TITLE_MULTI_FAILURE,
        payload : error
    }
}

export function resetAdminRemoveIntroTitle(){
    return {
        type : RESET_ADMIN_REMOVE_INTRO_TITLE
    }
}

export function adminLoadDetailList(introId){
    const request = axios({
        url : `${ROOT_URL}/details/${introId}`,
        method : 'get'
    });
    return {
        type : ADMIN_LOAD_DETAIL_LIST,
        payload : request
    }
}

export function adminLoadDetailListSuccess(details){
    return {
        type : ADMIN_LOAD_DETAIL_LIST_SUCCESS,
        payload : details.data
    }
}

export function adminLoadDetailListFailure(error){
    return {
        type : ADMIN_LOAD_DETAIL_LIST_FAILURE,
        payload : error
    }
}

export function resetAdminLoadDetailList(){
    return {
        type : RESET_ADMIN_LOAD_DETAIL_LIST
    }
}