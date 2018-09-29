import {
    ANYBODY_LOAD_CLASS_TIMES, ANYBODY_LOAD_CLASS_TIMES_SUCCESS, ANYBODY_LOAD_CLASS_TIMES_FAILURE, RESET_ANYBODY_LOAD_CLASS_TIMES,
    MENTO_LOAD_CLASS_TIME_MODEL, MENTO_LOAD_CLASS_TIME_MODEL_SUCCESS, MENTO_LOAD_CLASS_TIME_MODEL_FAILURE, RESET_MENTO_LOAD_CLASS_TIME_MODEL,
    MENTO_CREATE_CLASS_TIME, MENTO_CREATE_CLASS_TIME_SUCCESS, MENTO_CREATE_CLASS_TIME_FAILURE,
    MENTO_UPDATE_CLASS_TIME, MENTO_UPDATE_CLASS_TIME_SUCCESS, MENTO_UPDATE_CLASS_TIME_FAILURE, RESET_MENTO_SAVE_CLASS_TIME,
    MENTO_DELETE_CLASS_TIMES, MENTO_DELETE_CLASS_TIMES_SUCCESS, MENTO_DELETE_CLASS_TIMES_FAILURE, RESET_MENTO_DELETE_CLASS_TIMES
} from "../action/action_class_time";

const INITIAL_STATE = {
    classTimes : {
        times : [], loading: false, error: null
    },
    timeModel : {
        model : null, loading : false, error : null
    },
    saveStatus : {
        message : null, loading : false, error : null
    },
    deleteStatus : {
        message : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case ANYBODY_LOAD_CLASS_TIMES :
            return { ...state, classTimes : { times : [], loading : true, error : null }};
        case ANYBODY_LOAD_CLASS_TIMES_SUCCESS :
            return { ...state, classTimes : { times : action.payload, loading : false, error : null }};
        case ANYBODY_LOAD_CLASS_TIMES_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, classTimes : { times : [], loading : false, error : error }};
        case RESET_ANYBODY_LOAD_CLASS_TIMES :
            return { ...state, classTimes : { times : [], loading: false, error: null }};

        case MENTO_LOAD_CLASS_TIME_MODEL :
            return { ...state, timeModel : { model : null, loading : true, error : null }};
        case MENTO_LOAD_CLASS_TIME_MODEL_SUCCESS :
            return { ...state, timeModel : { model : action.payload, loading : false, error : null }};
        case MENTO_LOAD_CLASS_TIME_MODEL_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, timeModel : { model : null, loading : false, error : error }};
        case RESET_MENTO_LOAD_CLASS_TIME_MODEL :
            return { ...state, timeModel : { model : null, loading : false, error : null }};

        case MENTO_CREATE_CLASS_TIME :
        case MENTO_UPDATE_CLASS_TIME :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case MENTO_CREATE_CLASS_TIME_SUCCESS :
        case MENTO_UPDATE_CLASS_TIME_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case MENTO_CREATE_CLASS_TIME_FAILURE :
        case MENTO_UPDATE_CLASS_TIME_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_MENTO_SAVE_CLASS_TIME :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        case MENTO_DELETE_CLASS_TIMES :
            return { ...state, deleteStatus : { message : null, loading : true, error : null }};
        case MENTO_DELETE_CLASS_TIMES_SUCCESS :
            return { ...state, deleteStatus : { message : action.payload, loading : false, error : null }};
        case MENTO_DELETE_CLASS_TIMES_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, deleteStatus : { message : null, loading : false, error : error }};
        case RESET_MENTO_DELETE_CLASS_TIMES :
            return { ...state, deleteStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}