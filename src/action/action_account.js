import axios from 'axios';
import queryString from 'query-string';
import { ACCOUNT_URL } from './distribute_urls';

export const GUEST_LOGIN_PROCESS = 'GUEST_LOGIN_PROCESS';
export const GUEST_LOGIN_SUCCESS = 'GUEST_LOGIN_SUCCESS';
export const GUEST_LOGIN_FAILURE = 'GUEST_LOGIN_FAILURE';
export const RESET_GUEST_LOGIN = 'RESET_GUEST_LOGIN';

export const GUEST_FIND_IDENTITY = 'GUEST_FIND_IDENTITY';
export const GUEST_FIND_IDENTITY_SUCCESS = 'GUEST_FIND_IDENTITY_SUCCESS';
export const GUEST_FIND_IDENTITY_FAILURE = 'GUEST_FIND_IDENTITY_FAILURE';
export const RESET_GUEST_FIND_IDENTITY = 'RESET_GUEST_FIND_IDENTITY';

export const GUEST_FIND_PASSWORD = 'GUEST_FIND_PASSWORD';
export const GUEST_FIND_PASSWORD_SUCCESS = 'GUEST_FIND_IDENTITY_SUCCESS';
export const GUEST_FIND_PASSWORD_FAILURE = 'GUEST_FIND_IDENTITY_FAILURE';
export const RESET_GUEST_FIND_PASSWORD = 'RESET_GUEST_FIND_PASSWORD';

export const GUEST_CREATE_ACCOUNT = 'GUEST_CREATE_ACCOUNT';
export const GUEST_CREATE_ACCOUNT_SUCCESS = 'GUEST_CREATE_ACCOUNT_SUCCESS';
export const GUEST_CREATE_ACCOUNT_FAILURE = 'GUEST_CREATE_ACCOUNT_FAILURE';
export const RESET_GUEST_CREATE_ACCOUNT = 'RESET_GUEST_CREATE_ACCOUNT';

export const USER_FETCH_PRINCIPAL = 'USER_FETCH_PRINCIPAL';
export const USER_FETCH_PRINCIPAL_SUCCESS = 'USER_FETCH_PRINCIPAL_SUCCESS';
export const USER_FETCH_PRINCIPAL_FAILURE = 'USER_FETCH_PRINCIPAL_FAILURE';
export const RESET_USER_FETCH_PRINCIPAL = 'RESET_USER_FETCH_PRINCIPAL';

export const USER_FETCH_SIGN_FORM = 'USER_FETCH_SIGN_FORM';
export const USER_FETCH_SIGN_FORM_SUCCESS = 'USER_FETCH_SIGN_FORM_SUCCESS';
export const USER_FETCH_SIGN_FORM_FAILURE = 'USER_FETCH_SIGN_FORM_FAILURE';
export const RESET_USER_FETCH_SIGN_FORM = 'RESET_USER_FETCH_SIGN_FORM';

export const USER_UPDATE_SIGN_FORM = 'USER_UPDATE_SIGN_FORM';
export const USER_UPDATE_SIGN_FORM_SUCCESS = 'USER_UPDATE_SIGN_FORM_SUCCESS';
export const USER_UPDATE_SIGN_FORM_FAILURE = 'USER_UPDATE_SIGN_FORM_FAILURE';
export const RESET_USER_UPDATE_SIGN_FORM = 'RESET_USER_UPDATE_SIGN_FORM';

export const ADMIN_FETCH_ACCOUNT_LIST = 'ADMIN_FETCH_ACCOUNT_LIST';
export const ADMIN_FETCH_ACCOUNT_LIST_SUCCESS = 'ADMIN_FETCH_ACCOUNT_LIST_SUCCESS';
export const ADMIN_FETCH_ACCOUNT_LIST_FAILURE = 'ADMIN_FETCH_ACCOUNT_LIST_FAILURE';
export const RESET_ADMIN_FETCH_ACCOUNT_LIST = 'RESET_ADMIN_FETCH_ACCOUNT_LIST';

export const ADMIN_FETCH_ACCOUNT_VIEW = 'ADMIN_FETCH_ACCOUNT_VIEW';
export const ADMIN_FETCH_ACCOUNT_VIEW_SUCCESS = 'ADMIN_FETCH_ACCOUNT_VIEW_SUCCESS';
export const ADMIN_FETCH_ACCOUNT_VIEW_FAILURE = 'ADMIN_FETCH_ACCOUNT_VIEW_FAILURE';
export const RESET_ADMIN_FETCH_ACCOUNT_VIEW = 'RESET_ADMIN_FETCH_ACCOUNT_VIEW';

export const ADMIN_EXECUTE_SETTING_CHAIRMAN = 'ADMIN_EXECUTE_SETTING_CHAIRMAN';
export const ADMIN_EXECUTE_SETTING_CHAIRMAN_SUCCESS = 'ADMIN_EXECUTE_SETTING_CHAIRMAN_SUCCESS';
export const ADMIN_EXECUTE_SETTING_CHAIRMAN_FAILURE = 'ADMIN_EXECUTE_SETTING_CHAIRMAN_FAILURE';
export const RESET_ADMIN_EXECUTE_SETTING_CHAIRMAN = 'RESET_ADMIN_EXECUTE_SETTING_CHAIRMAN';

export const ADMIN_EXECUTE_EXCEL_UPLOADING = 'ADMIN_EXECUTE_EXCEL_UPLOADING';
export const ADMIN_EXECUTE_EXCEL_UPLOADING_SUCCESS = 'ADMIN_EXECUTE_EXCEL_UPLOADING_SUCCESS';
export const ADMIN_EXECUTE_EXCEL_UPLOADING_FAILURE = 'ADMIN_EXECUTE_EXCEL_UPLOADING_FAILURE';
export const RESET_ADMIN_EXECUTE_EXCEL_UPLOADING = 'RESET_ADMIN_EXECUTE_EXCEL_UPLOADING';

export const ADMIN_EXECUTE_CHANGE_STUDENT_STATUS = 'ADMIN_EXECUTE_CHANGE_STUDENT_STATUS';
export const ADMIN_EXECUTE_CHANGE_STUDENT_STATUS_SUCCESS = 'ADMIN_EXECUTE_CHANGE_STUDENT_STATUS_SUCCESS';
export const ADMIN_EXECUTE_CHANGE_STUDENT_STATUS_FAILURE = 'ADMIN_EXECUTE_CHANGE_STUDENT_STATUS_FAILURE';
export const RESET_ADMIN_EXECUTE_CHANGE_STUDENT_STATUS = 'RESET_ADMIN_EXECUTE_CHANGE_STUDENT_STATUS';

export const USER_LOGOUT_PROCESS = 'USER_LOGOUT_PROCESS';

const ROOT_URL = ACCOUNT_URL

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

export function resetGuestLogin(){
    return {
        type : RESET_GUEST_LOGIN
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

export function guestFindPassword(findForm){
    const request = axios({
        url : `${ROOT_URL}/guest/account/password`,
        data : findForm,
        method : 'post'
    });
    return {
        type : GUEST_FIND_PASSWORD,
        payload : request
    }
}

export function guestFindPasswordSuccess(message){
    return {
        type : GUEST_FIND_PASSWORD_SUCCESS,
        payload : message.data
    }
}

export function guestFindPasswordFailure(error){
    return {
        type : GUEST_FIND_PASSWORD_FAILURE,
        payload : error
    }
}

export function resetGuestFindPassword(){
    return {
        type : RESET_GUEST_FIND_PASSWORD
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

export function userFetchSignForm(userToken, type){
    const request = axios.get(`${ROOT_URL}/common/sign_form/${type}`, {
        headers:
            {
                'Authorization': `Bearer ${userToken}`
            }
        }
    );
    return {
        type : USER_FETCH_SIGN_FORM,
        payload : request
    }
}

export function userFetchSignFormSuccess(signForm){
    return {
        type : USER_FETCH_SIGN_FORM_SUCCESS,
        payload : signForm.data
    }
}

export function userFetchSignFormFailure(error){
    return {
        type : USER_FETCH_SIGN_FORM_FAILURE,
        payload : error
    }
}

export function resetUserFetchSignForm(){
    return {
        type : RESET_USER_FETCH_SIGN_FORM
    }
}

export function userUpdateSignForm(userToken, type, signForm){
    const request = axios({
        url : `${ROOT_URL}/common/sign_form/${type}`,
        method : 'put',
        data : signForm,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : USER_UPDATE_SIGN_FORM,
        payload : request
    }
}

export function userUpdateSignFormSuccess(message){
    return {
        type : USER_UPDATE_SIGN_FORM_SUCCESS,
        payload : message.data
    }
}

export function userUpdateSignFormFailure(error){
    return {
        type : USER_UPDATE_SIGN_FORM_FAILURE,
        payload : error
    }
}

export function resetUserUpdateSignForm(){
    return {
        type : RESET_USER_UPDATE_SIGN_FORM
    }
}

export function adminFetchAccountList(userToken, pagination){
    const request = axios({
        url : `${ROOT_URL}/admin/account/list?${queryString.stringify(pagination)}`,
        method : 'get',
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : ADMIN_FETCH_ACCOUNT_LIST,
        payload : request
    }
}

export function adminFetchAccountListSuccess(accounts){
    return {
        type : ADMIN_FETCH_ACCOUNT_LIST_SUCCESS,
        payload : accounts.data
    }
}

export function adminFetchAccountListFailure(error){
    return {
        type : ADMIN_FETCH_ACCOUNT_LIST_FAILURE,
        payload : error
    }
}

export function resetAdminFetchAccountList(){
    return {
        type : RESET_ADMIN_FETCH_ACCOUNT_LIST
    }
}

export function adminFetchAccountView(userToken, id){
    const request = axios({
        url : `${ROOT_URL}/admin/account/view/${id}`,
        method : 'get',
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : ADMIN_FETCH_ACCOUNT_VIEW,
        payload : request
    }
}

export function adminFetchAccountViewSuccess(account){
    return {
        type : ADMIN_FETCH_ACCOUNT_VIEW_SUCCESS,
        payload : account.data
    }
}

export function adminFetchAccountViewFailure(error){
    return {
        type : ADMIN_FETCH_ACCOUNT_VIEW_FAILURE,
        payload : error
    }
}

export function resetAdminFetchAccountView(){
    return {
        type : RESET_ADMIN_FETCH_ACCOUNT_VIEW
    }
}

export function adminExecuteSettingChairman(userToken, method, id){
    const request = axios({
        url : `${ROOT_URL}/admin/account/chairman/${method === 'appoint' ? 'appoint' : 'release'}/${id}`,
        method : 'put',
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : ADMIN_EXECUTE_SETTING_CHAIRMAN,
        payload : request
    }
}

export function adminExecuteSettingChairmanSuccess(message){
    return {
        type : ADMIN_EXECUTE_SETTING_CHAIRMAN_SUCCESS,
        payload : message.data
    }
}

export function adminExecuteSettingChairmanFailure(error){
    return {
        type : ADMIN_EXECUTE_SETTING_CHAIRMAN_FAILURE,
        payload : error
    }
}

export function resetAdminExecuteSettingChairman(){
    return {
        type : RESET_ADMIN_EXECUTE_SETTING_CHAIRMAN
    }
}

export function adminExecuteExcelUploading(userToken, excelFile){
    let formData = new FormData();
    formData.append('file', excelFile);

    const request = axios({
        url : `${ROOT_URL}/admin/account/excel/upload`,
        method : 'post',
        data : formData,
        headers :
            {
                'Authorization' : `Bearer ${userToken}`,
                "Content-Type" : "multipart/form-data"
            }
    });

    return {
        type : ADMIN_EXECUTE_EXCEL_UPLOADING,
        payload : request
    }
}

export function adminExecuteExcelUploadingSuccess(message){
    return {
        type : ADMIN_EXECUTE_EXCEL_UPLOADING_SUCCESS,
        payload : message.data
    }
}

export function adminExecuteExcelUploadingFailure(error){
    return {
        type : ADMIN_EXECUTE_EXCEL_UPLOADING_FAILURE,
        payload : error
    }
}

export function resetAdminExecuteExcelUploading(){
    return {
        type : RESET_ADMIN_EXECUTE_EXCEL_UPLOADING
    }
}

export function adminExecuteChangeStudentStatus(userToken, identity, role){
    const request = axios({
        url : `${ROOT_URL}/admin/account/mentoring/${identity}/${role}`,
        method : 'put',
        headers :
            {
                'Authorization' : `Bearer ${userToken}`
            }
    });
    return {
        type : ADMIN_EXECUTE_CHANGE_STUDENT_STATUS,
        payload : request
    }
}

export function adminExecuteChangeStudentStatusSuccess(message){
    return {
        type : ADMIN_EXECUTE_CHANGE_STUDENT_STATUS_SUCCESS,
        payload : message.data
    }
}

export function adminExecuteChangeStudentStatusFailure(error){
    return {
        type : ADMIN_EXECUTE_CHANGE_STUDENT_STATUS_FAILURE,
        payload : error
    }
}

export function resetAdminExecuteChangeStudentStatus(){
    return {
        type : RESET_ADMIN_EXECUTE_CHANGE_STUDENT_STATUS
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
