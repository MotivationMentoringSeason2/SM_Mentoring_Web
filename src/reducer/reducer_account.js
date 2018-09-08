import {
    GUEST_LOGIN_PROCESS, GUEST_LOGIN_SUCCESS, GUEST_LOGIN_FAILURE, RESET_GUEST_LOGIN,
    GUEST_FIND_IDENTITY, GUEST_FIND_IDENTITY_SUCCESS, GUEST_FIND_IDENTITY_FAILURE, RESET_GUEST_FIND_IDENTITY,
    GUEST_CREATE_ACCOUNT, GUEST_CREATE_ACCOUNT_SUCCESS, GUEST_CREATE_ACCOUNT_FAILURE, RESET_GUEST_CREATE_ACCOUNT,
    USER_FETCH_PRINCIPAL, USER_FETCH_PRINCIPAL_SUCCESS, USER_FETCH_PRINCIPAL_FAILURE, RESET_USER_FETCH_PRINCIPAL,
    USER_FETCH_SIGN_FORM, USER_FETCH_SIGN_FORM_SUCCESS, USER_FETCH_SIGN_FORM_FAILURE, RESET_USER_FETCH_SIGN_FORM,
    USER_UPDATE_SIGN_FORM, USER_UPDATE_SIGN_FORM_SUCCESS, USER_UPDATE_SIGN_FORM_FAILURE, RESET_USER_UPDATE_SIGN_FORM,
    ADMIN_FETCH_ACCOUNT_LIST, ADMIN_FETCH_ACCOUNT_LIST_SUCCESS, ADMIN_FETCH_ACCOUNT_LIST_FAILURE, RESET_ADMIN_FETCH_ACCOUNT_LIST,
    USER_LOGOUT_PROCESS
} from "../action/action_account";

const INITIAL_STATE = {
    accessAccount : {
        principal : null, loading : false, error : null
    },
    accessSignForm : {
        model : null, loading : false, error : null
    },
    findStatus : {
        message : null, loading : false, error : null
    },
    signStatus : {
        message : null, loading : false, error : null
    },
    loginStatus : {
        loading : false, error : null
    },
    accountList : {
        accounts : [], pagination : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case GUEST_LOGIN_PROCESS :
            return { ...state, loginStatus : { loading : true, error : null }};
        case GUEST_LOGIN_SUCCESS :
            return { ...state, loginStatus : { loading : false, error : null }, accessAccount : { principal : action.payload, loading : false, error : null }};
        case GUEST_LOGIN_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, loginStatus : { loading : false, error : error }};
        case RESET_GUEST_LOGIN :
            return { ...state, loginStatus : { loading : false, error : null }};

        case GUEST_FIND_IDENTITY :
            return { ...state, findStatus : { message : null, loading : true, error : null }};
        case GUEST_FIND_IDENTITY_SUCCESS :
            return { ...state, findStatus : { message : action.payload, loading : false, error : null }};
        case GUEST_FIND_IDENTITY_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, findStatus : { message : null, loading : false, error : error }};
        case RESET_GUEST_FIND_IDENTITY :
            return { ...state, findStatus : { message : null, loading : false, error : null }};

        case GUEST_CREATE_ACCOUNT :
        case USER_UPDATE_SIGN_FORM :
            return { ...state, signStatus : { message : null, loading : true, error : null }};
        case GUEST_CREATE_ACCOUNT_SUCCESS :
        case USER_UPDATE_SIGN_FORM_SUCCESS :
            return { ...state, signStatus : { message : action.payload, loading : false, error : null }};
        case GUEST_CREATE_ACCOUNT_FAILURE :
        case USER_UPDATE_SIGN_FORM_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, signStatus : { message : null, loading : false, error : error }};
        case RESET_GUEST_CREATE_ACCOUNT :
        case RESET_USER_UPDATE_SIGN_FORM :
            return { ...state, signStatus : { message : null, loading : false, error : null }};

        case USER_FETCH_PRINCIPAL :
            return { ...state, accessAccount : { principal : null, loading : true, error : null }};
        case USER_FETCH_PRINCIPAL_SUCCESS :
            return { ...state, accessAccount : { principal : action.payload, loading : false, error : null }};
        case USER_FETCH_PRINCIPAL_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, accessAccount : { principal : null, loading : false, error : error }};
        case RESET_USER_FETCH_PRINCIPAL :
        case USER_LOGOUT_PROCESS :
            return { ...state, accessAccount : { principal : null, loading : false, error : null }};

        case USER_FETCH_SIGN_FORM :
            return { ...state, accessSignForm : { model : null, loading : true, error : null }};
        case USER_FETCH_SIGN_FORM_SUCCESS :
            return { ...state, accessSignForm : { model : action.payload, loading : false, error : null }};
        case USER_FETCH_SIGN_FORM_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, accessSignForm : { model : null, loading : false, error : error }};
        case RESET_USER_FETCH_SIGN_FORM :
            return { ...state, accessSignForm : { model : null, loading : false, error : null }};

        case ADMIN_FETCH_ACCOUNT_LIST :
            return { ...state, accountList : { accounts : [], pagination : null, loading : true, error : null }};
        case ADMIN_FETCH_ACCOUNT_LIST_SUCCESS :
            return { ...state, accountList : { accounts : action.payload && (action.payload.accounts || []), pagination : action.payload && action.payload.accountPagination, loading : false, error : null }};
        case ADMIN_FETCH_ACCOUNT_LIST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, accountList : { accounts : [], pagination : null, loading : false, error : error }};
        case RESET_ADMIN_FETCH_ACCOUNT_LIST :
            return { ...state, accountList : { accounts : [], pagination : null, loading : false, error : null }};

        default :
            return state;
    }
}