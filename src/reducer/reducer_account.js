import {
    GUEST_LOGIN_PROCESS, GUEST_LOGIN_SUCCESS, GUEST_LOGIN_FAILURE,
    GUEST_FIND_IDENTITY, GUEST_FIND_IDENTITY_SUCCESS, GUEST_FIND_IDENTITY_FAILURE, RESET_GUEST_FIND_IDENTITY,
    GUEST_CREATE_ACCOUNT, GUEST_CREATE_ACCOUNT_SUCCESS, GUEST_CREATE_ACCOUNT_FAILURE, RESET_GUEST_CREATE_ACCOUNT,
    USER_FETCH_PRINCIPAL, USER_FETCH_PRINCIPAL_SUCCESS, USER_FETCH_PRINCIPAL_FAILURE, RESET_USER_FETCH_PRINCIPAL,
    USER_LOGOUT_PROCESS
} from "../action/action_account";

const INITIAL_STATE = {
    accessAccount : {
        principal : null, loading : false, error : null
    },
    findStatus : {
        message : null, loading : false, error : null
    },
    signStatus : {
        message : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case GUEST_LOGIN_PROCESS :
            return { ...state, accessAccount : { principal : null, loading : true, error : null }};
        case GUEST_LOGIN_SUCCESS :
            return { ...state, accessAccount : { principal : action.payload, loading : false, error : null }};
        case GUEST_LOGIN_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, accessAccount : { principal : null, loading : false, error : error }};

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
            return { ...state, signStatus : { message : null, loading : true, error : null }};
        case GUEST_CREATE_ACCOUNT_SUCCESS :
            return { ...state, signStatus : { message : action.payload, loading : false, error : null }};
        case GUEST_CREATE_ACCOUNT_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, signStatus : { message : null, loading : false, error : error }};
        case RESET_GUEST_CREATE_ACCOUNT :
            return { ...state, signStatus : { message : null, loading : false, error : null }};

        case USER_FETCH_PRINCIPAL :
            return { ...state, accessAccount : { principal : null, loading : true, error : null }};
        case USER_FETCH_PRINCIPAL_SUCCESS :
            return { ...state, accessAccount : { principal : action.payload, loading : false, error : null }};
        case USER_FETCH_PRINCIPAL_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, accessAccount : { principal : null, loading : false, error : error }};
        case USER_LOGOUT_PROCESS :
        case RESET_USER_FETCH_PRINCIPAL :
            return { ...state, accessAccount : { principal : null, loading : false, error : null }};

        default :
            return state;
    }
}