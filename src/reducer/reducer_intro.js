import {
    ANYBODY_LOAD_INTRO_ACCORDION, ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS, ANYBODY_LOAD_INTRO_ACCORDION_FAILURE, RESET_ANYBODY_LOAD_INTRO_ACCORDION
} from "../action/action_intro";

const INITIAL_STATE = {
    accordionStatus : {
       result : [], loading : false, error : null
    }
}


export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type){
        case ANYBODY_LOAD_INTRO_ACCORDION :
            return { ...state, accordionStatus : { result : [], loading : true, error : null }};
        case ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS :
            return { ...state, accordionStatus : { result : action.payload, loading : false, error : null }};
        case ANYBODY_LOAD_INTRO_ACCORDION_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, accordionStatus : { result : [], loading : false, error : error }};
        case RESET_ANYBODY_LOAD_INTRO_ACCORDION :
            return { ...state, accordionStatus : { result : [], loading : false, error : null }};

        default :
            return state;
    }
}