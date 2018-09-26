import {
    STUDENT_LOAD_TEAM_LIST, STUDENT_LOAD_TEAM_LIST_SUCCESS, STUDENT_LOAD_TEAM_LIST_FAILURE, RESET_STUDENT_LOAD_TEAM_LIST,
    STUDENT_APPLY_MENTI, STUDENT_APPLY_MENTI_SUCCESS, STUDENT_APPLY_MENTI_FAILURE, RESET_STUDENT_APPLY_MENTI,
    STUDENT_RELEASE_CURRENT_MENTI, STUDENT_RELEASE_CURRENT_MENTI_SUCCESS, STUDENT_RELEASE_CURRENT_MENTI_FAILURE, RESET_STUDENT_RELEASE_CURRENT_MENTI
} from "../action/action_menti";

const INITIAL_STATE = {
    teamList : {
        teams : [], loading : false, error : null
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
        case STUDENT_LOAD_TEAM_LIST :
            return { ...state, teamList : { teams: [], loading: true, error: null }};
        case STUDENT_LOAD_TEAM_LIST_SUCCESS :
            return { ...state, teamList : { teams: action.payload, loading: false, error: null }};
        case STUDENT_LOAD_TEAM_LIST_FAILURE :
            error = action.payload.data || { message: action.payload.data };
            return { ...state, teamList : { teams: [], loading: false, error: error }};
        case RESET_STUDENT_LOAD_TEAM_LIST :
            return { ...state, teamList : { teams: [], loading: false, error: null }};

        case STUDENT_APPLY_MENTI :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case STUDENT_APPLY_MENTI_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case STUDENT_APPLY_MENTI_FAILURE :
            error = action.payload.data || { message: action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_STUDENT_APPLY_MENTI :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        case STUDENT_RELEASE_CURRENT_MENTI :
            return { ...state, deleteStatus : { message : null, loading : true, error : null }};
        case STUDENT_RELEASE_CURRENT_MENTI_SUCCESS :
            return { ...state, deleteStatus : { message : action.payload, loading : false, error : null }};
        case STUDENT_RELEASE_CURRENT_MENTI_FAILURE :
            error = action.payload.data || { message: action.payload.data };
            return { ...state, deleteStatus : { message : null, loading : false, error : error }};
        case RESET_STUDENT_RELEASE_CURRENT_MENTI :
            return { ...state, deleteStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}