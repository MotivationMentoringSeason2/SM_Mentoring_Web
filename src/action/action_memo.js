import axios from 'axios';
import queryString from 'query-string';

export const MEMO_POST_PROCESS = 'MEMO_POST_PROCESS';

const ROOT_URL = 'http://127.0.0.1:8081/AccountAPI';

export function MemoPostProcess(loginForm){
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