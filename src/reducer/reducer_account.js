import {
    GUEST_LOGIN_PROCESS, GUEST_LOGIN_SUCCESS, GUEST_LOGIN_FAILURE
} from "../action/action_account";

const INITIAL_STATE = {
    accessAccount : {
        principal : null, loading : false, error : null
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
            error = action.payload.data || { message : action.payload.data };
            return { ...state, accessAccount : { principal : null, loading : false, error : error }};
        default :
            return state;
    }
}