import {
    ANYBODY_LOAD_INTRO_ACCORDION, ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS, ANYBODY_LOAD_INTRO_ACCORDION_FAILURE, RESET_ANYBODY_LOAD_INTRO_ACCORDION,
    ADMIN_LOAD_INTRO_TITLES, ADMIN_LOAD_INTRO_TITLES_SUCCESS, ADMIN_LOAD_INTRO_TITLES_FAILURE, RESET_ADMIN_LOAD_INTRO_TITLES,
    ADMIN_CREATE_INTRO_TITLE, ADMIN_CREATE_INTRO_TITLE_SUCCESS, ADMIN_CREATE_INTRO_TITLE_FAILURE,
    ADMIN_UPDATE_INTRO_TITLE, ADMIN_UPDATE_INTRO_TITLE_SUCCESS, ADMIN_UPDATE_INTRO_TITLE_FAILURE, RESET_ADMIN_SAVE_INTRO_TITLE,
    ADMIN_REMOVE_INTRO_TITLE_MULTI, ADMIN_REMOVE_INTRO_TITLE_MULTI_SUCCESS, ADMIN_REMOVE_INTRO_TITLE_MULTI_FAILURE, RESET_ADMIN_REMOVE_INTRO_TITLE
} from "../action/action_intro";

const INITIAL_STATE = {
    accordionStatus : {
       result : [], loading : false, error : null
    },
    introList : {
        intros : [], loading : false, error : null
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

        case ADMIN_LOAD_INTRO_TITLES :
            return { ...state, introList : { intros : [], loading : true, error : null }};
        case ADMIN_LOAD_INTRO_TITLES_SUCCESS :
            return { ...state, introList : { intros : action.payload, loading : false, error : null }};
        case ADMIN_LOAD_INTRO_TITLES_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, introList : { intros : [], loading : false, error : error }};
        case RESET_ADMIN_LOAD_INTRO_TITLES :
            return { ...state, introList : { intros : [], loading : false, error : null }};

        case ADMIN_CREATE_INTRO_TITLE :
        case ADMIN_UPDATE_INTRO_TITLE :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case ADMIN_CREATE_INTRO_TITLE_SUCCESS :
        case ADMIN_UPDATE_INTRO_TITLE_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case ADMIN_CREATE_INTRO_TITLE_FAILURE :
        case ADMIN_UPDATE_INTRO_TITLE_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_ADMIN_SAVE_INTRO_TITLE :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        case ADMIN_REMOVE_INTRO_TITLE_MULTI :
            return { ...state, deleteStatus : { message : null, loading : true, error : null }};
        case ADMIN_REMOVE_INTRO_TITLE_MULTI_SUCCESS :
            return { ...state, deleteStatus : { message : action.payload, loading : false, error : null }};
        case ADMIN_REMOVE_INTRO_TITLE_MULTI_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, deleteStatus : { message : null, loading : false, error : error }};
        case RESET_ADMIN_REMOVE_INTRO_TITLE :
            return { ...state, deleteStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}