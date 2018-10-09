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

export const ANYBODY_LOAD_POST_MODEL = 'ANYBODY_LOAD_POST_MODEL';
export const ANYBODY_LOAD_POST_MODEL_SUCCESS = 'ANYBODY_LOAD_POST_MODEL_SUCCESS';
export const ANYBODY_LOAD_POST_MODEL_FAILURE = 'ANYBODY_LOAD_POST_MODEL_FAILURE';
export const RESET_ANYBODY_LOAD_POST_MODEL = 'RESET_ANYBODY_LOAD_POST_MODEL';

export const ANYBODY_SAVE_EDITED_POST = 'ANYBODY_SAVE_EDITED_POST';
export const ANYBODY_SAVE_EDITED_POST_SUCCESS = 'ANYBODY_SAVE_EDITED_POST_SUCCESS';
export const ANYBODY_SAVE_EDITED_POST_FAILURE = 'ANYBODY_SAVE_EDITED_POST_FAILURE';
export const RESET_ANYBODY_SAVE_EDITED_POST = 'RESET_ANYBODY_SAVE_EDITED_POST';

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

export function anybodyLoadPostModel(postId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/post/model/${postId}`,
    });
    return {
        type : ANYBODY_LOAD_POST_MODEL,
        payload : request
    }
}

export function anybodyLoadPostModelSuccess(model){
    return {
        type : ANYBODY_LOAD_POST_MODEL_SUCCESS,
        payload : model.data
    }
}

export function anybodyLoadPostModelFailure(error){
    return {
        type : ANYBODY_LOAD_POST_MODEL_FAILURE,
        payload : error
    }
}

export function resetAnybodyLoadPostModel(){
    return {
        type : RESET_ANYBODY_LOAD_POST_MODEL
    }
}

export function anybodySaveEditedPost(postForm, postId, writer){
    const request = postId === 0 ?
        axios({
            method : 'post',
            url : `${ROOT_URL}/post/${writer}`,
            data : postForm
        }) : axios({
            method : 'put',
            url : `${ROOT_URL}/post/${postId}`,
            data : postForm
        });
    return {
        type : ANYBODY_SAVE_EDITED_POST,
        payload : request
    }
}

export function anybodySaveEditedPostSuccess(post){
    return {
        type : ANYBODY_SAVE_EDITED_POST_SUCCESS,
        payload : post.data
    }
}

export function anybodySaveEditedPostFailure(error){
    return {
        type : ANYBODY_SAVE_EDITED_POST_FAILURE,
        payload : error
    }
}

export function resetAnybodySaveEditedPost(){
    return {
        type : RESET_ANYBODY_SAVE_EDITED_POST
    }
}