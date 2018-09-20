import {
    ANYBODY_LOAD_INTRO_ACCORDION, ANYBODY_LOAD_INTRO_ACCORDION_SUCCESS, ANYBODY_LOAD_INTRO_ACCORDION_FAILURE, RESET_ANYBODY_LOAD_INTRO_ACCORDION,
    ADMIN_LOAD_INTRO_TITLES, ADMIN_LOAD_INTRO_TITLES_SUCCESS, ADMIN_LOAD_INTRO_TITLES_FAILURE, RESET_ADMIN_LOAD_INTRO_TITLES,
    ADMIN_CREATE_INTRO_TITLE, ADMIN_CREATE_INTRO_TITLE_SUCCESS, ADMIN_CREATE_INTRO_TITLE_FAILURE,
    ADMIN_UPDATE_INTRO_TITLE, ADMIN_UPDATE_INTRO_TITLE_SUCCESS, ADMIN_UPDATE_INTRO_TITLE_FAILURE, RESET_ADMIN_SAVE_INTRO_TITLE,
    ADMIN_REMOVE_INTRO_TITLE_MULTI, ADMIN_REMOVE_INTRO_TITLE_MULTI_SUCCESS, ADMIN_REMOVE_INTRO_TITLE_MULTI_FAILURE, RESET_ADMIN_REMOVE_INTRO_TITLE,
    ADMIN_LOAD_DETAIL_LIST, ADMIN_LOAD_DETAIL_LIST_SUCCESS, ADMIN_LOAD_DETAIL_LIST_FAILURE, RESET_ADMIN_LOAD_DETAIL_LIST,
    ADMIN_UPDATE_DETAIL_CONTEXT, ADMIN_UPDATE_DETAIL_CONTEXT_SUCCESS, ADMIN_UPDATE_DETAIL_CONTEXT_FAILURE,
    ADMIN_CREATE_DETAIL_CONTEXT, ADMIN_CREATE_DETAIL_CONTEXT_SUCCESS, ADMIN_CREATE_DETAIL_CONTEXT_FAILURE, RESET_ADMIN_SAVE_DETAIL_CONTEXT,
    ADMIN_REMOVE_DETAIL_MULTI, ADMIN_REMOVE_DETAIL_MULTI_SUCCESS, ADMIN_REMOVE_DETAIL_MULTI_FAILURE, RESET_ADMIN_REMOVE_DETAIL_MULTI
} from "../action/action_intro";

const INITIAL_STATE = {
    accordionStatus : {
       result : [], loading : false, error : null
    },
    introList : {
        intros : [], loading : false, error : null
    },
    detailList : {
        details : [], loading : false, error : null
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
        case ADMIN_CREATE_DETAIL_CONTEXT :
        case ADMIN_UPDATE_DETAIL_CONTEXT :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case ADMIN_CREATE_INTRO_TITLE_SUCCESS :
        case ADMIN_UPDATE_INTRO_TITLE_SUCCESS :
        case ADMIN_CREATE_DETAIL_CONTEXT_SUCCESS :
        case ADMIN_UPDATE_DETAIL_CONTEXT_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case ADMIN_CREATE_INTRO_TITLE_FAILURE :
        case ADMIN_UPDATE_INTRO_TITLE_FAILURE :
        case ADMIN_CREATE_DETAIL_CONTEXT_FAILURE :
        case ADMIN_UPDATE_DETAIL_CONTEXT_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_ADMIN_SAVE_INTRO_TITLE :
        case RESET_ADMIN_SAVE_DETAIL_CONTEXT :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        case ADMIN_REMOVE_INTRO_TITLE_MULTI :
        case ADMIN_REMOVE_DETAIL_MULTI :
            return { ...state, deleteStatus : { message : null, loading : true, error : null }};
        case ADMIN_REMOVE_INTRO_TITLE_MULTI_SUCCESS :
        case ADMIN_REMOVE_DETAIL_MULTI_SUCCESS :
            return { ...state, deleteStatus : { message : action.payload, loading : false, error : null }};
        case ADMIN_REMOVE_INTRO_TITLE_MULTI_FAILURE :
        case ADMIN_REMOVE_DETAIL_MULTI_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, deleteStatus : { message : null, loading : false, error : error }};
        case RESET_ADMIN_REMOVE_INTRO_TITLE :
        case RESET_ADMIN_REMOVE_DETAIL_MULTI :
            return { ...state, deleteStatus : { message : null, loading : false, error : null }};

        case ADMIN_LOAD_DETAIL_LIST :
            return { ...state, detailList : { details : [], loading : true, error : null }};
        case ADMIN_LOAD_DETAIL_LIST_SUCCESS :
            return { ...state, detailList : { details : action.payload, loading : false, error : null }};
        case ADMIN_LOAD_DETAIL_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, detailList : { details : [], loading : false, error : error }};
        case RESET_ADMIN_LOAD_DETAIL_LIST :
            return { ...state, detailList : { details : [], loading : false, error : null }};

        default :
            return state;
    }
}