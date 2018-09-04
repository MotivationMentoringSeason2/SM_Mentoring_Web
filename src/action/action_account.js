import axios from 'axios';

export const GUEST_LOGIN_PROCESS = 'GUEST_LOGIN_PROCESS';
export const GUEST_LOGIN_SUCCESS = 'GUEST_LOGIN_SUCCESS';
export const GUEST_LOGIN_FAILURE = 'GUEST_LOGIN_FAILURE';

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