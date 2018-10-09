import axios from 'axios';

import { NOTICE_URL } from "./distribute_urls";

export const ANYBODY_UPLOAD_POST_FILES = 'ANYBODY_UPLOAD_POST_FILES';
export const ANYBODY_UPLOAD_POST_FILES_SUCCESS = 'ANYBODY_UPLOAD_POST_FILES_SUCCESS';
export const ANYBODY_UPLOAD_POST_FILES_FAILURE = 'ANYBODY_UPLOAD_POST_FILES_FAILURE';
export const RESET_ANYBODY_UPLOAD_POST_FILES = 'RESET_ANYBODY_UPLOAD_POST_FILES';

export const ANYBODY_UPLOAD_POST_IMAGES = 'ANYBODY_UPLOAD_POST_IMAGES';
export const ANYBODY_UPLOAD_POST_IMAGES_SUCCESS = 'ANYBODY_UPLOAD_POST_IMAGES_SUCCESS';
export const ANYBODY_UPLOAD_POST_IMAGES_FAILURE = 'ANYBODY_UPLOAD_POST_IMAGES_FAILURE';
export const RESET_ANYBODY_UPLOAD_POST_IMAGES = 'RESET_ANYBODY_UPLOAD_POST_IMAGES';

const ROOT_URL = NOTICE_URL;

export function anybodyUploadPostFiles(postId, files){
    let formData = new FormData();
    for(var k=0;k<files.length;k++) {
        formData.append("files", files[k]);
    }

    const request = axios({
        url: `${ROOT_URL}/notice/files/${postId}`,
        method: 'post',
        data: formData,
        headers:
            {
                "Content-Type": "multipart/form-data"
            }
    });
    return {
        type : ANYBODY_UPLOAD_POST_FILES,
        payload : request
    }
}

export function anybodyUploadPostFilesSuccess(message){
    return {
        type : ANYBODY_UPLOAD_POST_FILES_SUCCESS,
        payload : message.data
    }
}

export function anybodyUploadPostFilesFailure(error){
    return {
        type : ANYBODY_UPLOAD_POST_FILES_FAILURE,
        payload : error
    }
}

export function resetAnybodyUploadPostFiles(){
    return {
        type : RESET_ANYBODY_UPLOAD_POST_FILES
    }
}

export function anybodyUploadPostImages(postId, files){
    let formData = new FormData();
    for(var k=0;k<files.length;k++){
        formData.append("files", files[k]);
    }
    const request = axios({
        url: `${ROOT_URL}/notice/images/${postId}`,
        method: 'post',
        data: formData,
        headers:
            {
                "Content-Type": "multipart/form-data"
            }
    });
    return {
        type : ANYBODY_UPLOAD_POST_IMAGES,
        payload : request
    }
}

export function anybodyUploadPostImagesSuccess(message){
    return {
        type : ANYBODY_UPLOAD_POST_IMAGES_SUCCESS,
        payload : message.data
    }
}

export function anybodyUploadPostImagesFailure(error){
    return {
        type : ANYBODY_UPLOAD_POST_IMAGES_FAILURE,
        payload : error
    }
}

export function resetAnybodyUploadPostImages(){
    return {
        type : RESET_ANYBODY_UPLOAD_POST_IMAGES
    }
}