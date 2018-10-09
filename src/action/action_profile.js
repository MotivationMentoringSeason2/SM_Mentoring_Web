import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/common';

export const USER_SAVE_PROFILE = 'USER_SAVE_PROFILE';
export const USER_SAVE_PROFILE_SUCCESS = 'USER_SAVE_PROFILE_SUCCESS';
export const USER_SAVE_PROFILE_FAILURE = 'USER_SAVE_PROFILE_FAILURE';
export const RESET_USER_SAVE_PROFILE = 'RESET_USER_SAVE_PROFILE';

export const USER_RELEASE_PROFILE = 'USER_RELEASE_PROFILE';
export const USER_RELEASE_PROFILE_SUCCESS = 'USER_RELEASE_PROFILE_SUCCESS';
export const USER_RELEASE_PROFILE_FAILURE = 'USER_RELEASE_PROFILE_FAILURE';
export const RESET_USER_RELEASE_PROFILE = 'RESET_USER_RELEASE_PROFILE';

export function userSaveProfile(userToken, photoFile) {
    let formData = new FormData();
    formData.append('file', photoFile);

    const request = axios({
        url: `${ROOT_URL}/profile/saving`,
        method: 'put',
        data: formData,
        headers:
            {
                'Authorization': `Bearer ${userToken}`,
                "Content-Type": "multipart/form-data"
            }
    });

    return {
        type : USER_SAVE_PROFILE,
        payload : request
    }
}

export function userSaveProfileSuccess(message){
    return {
        type : USER_SAVE_PROFILE_SUCCESS,
        payload : message.data
    }
}

export function userSaveProfileFailure(error){
    return {
        type : USER_SAVE_PROFILE_FAILURE,
        payload : error
    }
}

export function resetUserSaveProfile(){
    return {
        type : RESET_USER_SAVE_PROFILE
    }
}

export function userReleaseProfile(userToken){
    const request = axios({
        url: `${ROOT_URL}/profile/releasing`,
        method: 'delete',
        headers:
            {
                'Authorization': `Bearer ${userToken}`
            }
    });
    return {
        type : USER_RELEASE_PROFILE,
        payload : request
    }
}

export function userReleaseProfileSuccess(message){
    return {
        type : USER_RELEASE_PROFILE_SUCCESS,
        payload : message.data
    }
}

export function userReleaseProfileFailure(error){
    return {
        type : USER_RELEASE_PROFILE_FAILURE,
        payload : error
    }
}

export function resetUserReleaseProfile(){
    return {
        type : RESET_USER_RELEASE_PROFILE
    }
}