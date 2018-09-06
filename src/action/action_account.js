import axios from 'axios';

export const GUEST_LOGIN_PROCESS = 'GUEST_LOGIN_PROCESS';
export const GUEST_LOGIN_SUCCESS = 'GUEST_LOGIN_SUCCESS';
export const GUEST_LOGIN_FAILURE = 'GUEST_LOGIN_FAILURE';

export const GUEST_FIND_IDENTITY = 'GUEST_FIND_IDENTITY';
export const GUEST_FIND_IDENTITY_SUCCESS = 'GUEST_FIND_IDENTITY_SUCCESS';
export const GUEST_FIND_IDENTITY_FAILURE = 'GUEST_FIND_IDENTITY_FAILURE';
export const RESET_GUEST_FIND_IDENTITY = 'RESET_GUEST_FIND_IDENTITY';

export const GUEST_CREATE_ACCOUNT = 'GUEST_CREATE_ACCOUNT';
export const GUEST_CREATE_ACCOUNT_SUCCESS = 'GUEST_CREATE_ACCOUNT_SUCCESS';
export const GUEST_CREATE_ACCOUNT_FAILURE = 'GUEST_CREATE_ACCOUNT_FAILURE';
export const RESET_GUEST_CREATE_ACCOUNT = 'RESET_GUEST_CREATE_ACCOUNT';

export const USER_FETCH_PRINCIPAL = 'USER_FETCH_PRINCIPAL';
export const USER_FETCH_PRINCIPAL_SUCCESS = 'USER_FETCH_PRINCIPAL_SUCCESS';
export const USER_FETCH_PRINCIPAL_FAILURE = 'USER_FETCH_PRINCIPAL_FAILURE';
export const RESET_USER_FETCH_PRINCIPAL = 'RESET_USER_FETCH_PRINCIPAL';

export const USER_LOGOUT_PROCESS = 'USER_LOGOUT_PROCESS';

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

export function guestFindIdentity(findForm){
    const request = axios({
        url : `${ROOT_URL}/guest/account/identity`,
        data : findForm,
        method : 'post'
    });
    return {
        type : GUEST_FIND_IDENTITY,
        payload : request
    }
}

export function guestFindIdentitySuccess(message){
    return {
        type : GUEST_FIND_IDENTITY_SUCCESS,
        payload : message.data
    }
}

export function guestFindIdentityFailure(error){
    return {
        type : GUEST_FIND_IDENTITY_FAILURE,
        payload : error
    }
}

export function resetGuestFindIdentity(){
    return {
        type : RESET_GUEST_FIND_IDENTITY
    }
}


export function guestCreateAccount(type, formData){
    const request = axios({
        url : `${ROOT_URL}/guest/sign/${type}`,
        data : formData,
        method : 'post'
    });
    return {
        type : GUEST_CREATE_ACCOUNT,
        payload : request
    }
}

export function guestCreateAccountSuccess(message){
    return {
        type : GUEST_CREATE_ACCOUNT_SUCCESS,
        payload : message.data
    }
}

export function guestCreateAccountFailure(error){
    return {
        type : GUEST_CREATE_ACCOUNT_FAILURE,
        payload : error
    }
}

export function resetGuestCreateAccount(){
    return {
        type : RESET_GUEST_CREATE_ACCOUNT
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

export function userLogoutProcess(userToken){
    localStorage.removeItem('jwtToken');
    const request = axios.delete(`${ROOT_URL}/common/logout`, {
        headers:
            {
                'Authorization': `Bearer ${userToken}`
            }
        }
    );
    return {
        type : USER_LOGOUT_PROCESS,
        payload : request
    }
}

