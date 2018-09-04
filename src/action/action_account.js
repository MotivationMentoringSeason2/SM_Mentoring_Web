import axios from 'axios';

export const GUEST_LOGIN_PROCESS = 'GUEST_LOGIN_PROCESS';
export const GUEST_LOGIN_SUCCESS = 'GUEST_LOGIN_SUCCESS';
export const GUEST_LOGIN_FAILURE = 'GUEST_LOGIN_FAILURE';

export const USER_FETCH_PRINCIPAL = 'USER_FETCH_PRINCIPAL';
export const USER_FETCH_PRINCIPAL_SUCCESS = 'USER_FETCH_PRINCIPAL_SUCCESS';
export const USER_FETCH_PRINCIPAL_FAILURE = 'USER_FETCH_PRINCIPAL_FAILURE';
export const RESET_USER_FETCH_PRINCIPAL = 'RESET_USER_FETCH_PRINCIPAL';

const ROOT_URL = 'http://127.0.0.1:8081/AccountAPI';

export function guestLoginProcess(loginForm){
    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/guest/login`,
        data : loginForm
    });
    return {
        type : GUEST_LOGIN_PROCESS,
        payload : request
    }
}

export function guestLoginSuccess(userToken){
    const request = axios.get(`${ROOT_URL}/common/principal`, {
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
        }
    );
    return {
        type : GUEST_LOGIN_SUCCESS,
        payload : request.then(access => {
            return access.data
        })
    }
}

export function guestLoginFailure(error){
    return {
        type : GUEST_LOGIN_FAILURE,
        payload : error
    }
}

export function userFetchPrincipal(userToken){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/common/principal`,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : USER_FETCH_PRINCIPAL,
        payload : request
    }
}

export function userFetchPrincipalSuccess(principal){
    return {
        type : USER_FETCH_PRINCIPAL_SUCCESS,
        payload : principal.data
    }
}

export function userFetchPrincipalFailure(error){
    return {
        type : USER_FETCH_PRINCIPAL_FAILURE,
        payload : error
    }
}

export function resetUserFetchPrincipal(){
    return {
        type : RESET_USER_FETCH_PRINCIPAL
    }
}

