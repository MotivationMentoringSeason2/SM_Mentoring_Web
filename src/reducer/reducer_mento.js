import {
    STUDENT_LOAD_APPLY_MODEL, STUDENT_LOAD_APPLY_MODEL_SUCCESS, STUDENT_LOAD_APPLY_MODEL_FAILURE, RESET_STUDENT_LOAD_APPLY_MODEL,
    STUDENT_APPLY_MENTO, STUDENT_APPLY_MENTO_SUCCESS, STUDENT_APPLY_MENTO_FAILURE, RESET_STUDENT_APPLY_MENTO
} from "../action/action_mento";

const INITIAL_STATE = {
    applyModel : {
        model : null, loading : false, error : null
    },
    saveStatus : {
        message : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type){
        case STUDENT_LOAD_APPLY_MODEL :
            return { ...state, applyModel : { model : null, loading : true, error : null }};
        case STUDENT_LOAD_APPLY_MODEL_SUCCESS :
            return { ...state, applyModel : { model : action.payload, loading : false, error : null }};
        case STUDENT_LOAD_APPLY_MODEL_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, applyModel : { model : null, loading : false, error : error }};
        case RESET_STUDENT_LOAD_APPLY_MODEL :
            return { ...state, applyModel : { model : null, loading : false, error : null }};

        case STUDENT_APPLY_MENTO :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case STUDENT_APPLY_MENTO_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case STUDENT_APPLY_MENTO_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_STUDENT_APPLY_MENTO :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};
        default :
            return state;
    }
}