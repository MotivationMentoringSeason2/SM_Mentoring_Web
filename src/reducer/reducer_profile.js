import {
    USER_SAVE_PROFILE, USER_SAVE_PROFILE_SUCCESS, USER_SAVE_PROFILE_FAILURE, RESET_USER_SAVE_PROFILE,
    USER_RELEASE_PROFILE, USER_RELEASE_PROFILE_SUCCESS, USER_RELEASE_PROFILE_FAILURE, RESET_USER_RELEASE_PROFILE
} from "../action/action_profile";

const INITIAL_STATE = {
    saveStatus : {
        message : null, loading : false, error : null
    },
    releaseStatus : {
        message : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case USER_SAVE_PROFILE :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case USER_SAVE_PROFILE_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case USER_SAVE_PROFILE_FAILURE :
                error = action.payload.data || { message : action.payload };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_USER_SAVE_PROFILE :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        case USER_RELEASE_PROFILE :
            return { ...state, releaseStatus : { message : null, loading : true, error : null }};
        case USER_RELEASE_PROFILE_SUCCESS :
            return { ...state, releaseStatus : { message : action.payload, loading : false, error : null }};
        case USER_RELEASE_PROFILE_FAILURE :
            error = action.payload.data || { message : action.payload };
            return { ...state, releaseStatus : { message : null, loading : false, error : error }};
        case RESET_USER_RELEASE_PROFILE :
            return { ...state, releaseStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}