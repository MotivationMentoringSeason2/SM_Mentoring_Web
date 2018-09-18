import axios from 'axios';
import queryString from "query-string";

export const ANYBODY_LOAD_TYPE = 'ANYBODY_LOAD_TYPE';
export const ANYBODY_LOAD_TYPE_SUCCESS = 'ANYBODY_LOAD_TYPE_SUCCESS';
export const ANYBODY_LOAD_TYPE_FAILURE = 'ANYBODY_LOAD_TYPE_FAILURE';
export const RESET_ANYBODY_LOAD_TYPE = 'RESET_ANYBODY_LOAD_TYPE';

export const ANYBODY_LOAD_POST_LIST = 'ANYBODY_LOAD_POST_LIST';
export const ANYBODY_LOAD_POST_LIST_SUCCESS = 'ANYBODY_LOAD_POST_LIST_SUCCESS';
export const ANYBODY_LOAD_POST_LIST_FAILURE = 'ANYBODY_LOAD_POST_LIST_FAILURE';
export const RESET_ANYBODY_LOAD_POST_LIST = 'RESET_ANYBODY_LOAD_POST_LIST';

const ROOT_URL = 'http://127.0.0.1:8083/NoticeAPI/notice';

export function anybodyLoadPostList(qs){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/posts?${queryString.stringify(qs)}`,
    });
    return {
        type : ANYBODY_LOAD_POST_LIST,
        payload : request
    }
}

export function anybodyLoadPostListSuccess(result){
    return {
        type : ANYBODY_LOAD_POST_LIST_SUCCESS,
        payload : result.data
    }
}

export function anybodyLoadPostListFailure(error){
    return {
        type : ANYBODY_LOAD_POST_LIST_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadPostList(){
    return {
        type : RESET_ANYBODY_LOAD_POST_LIST
    }
}