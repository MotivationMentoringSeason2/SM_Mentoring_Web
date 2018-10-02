import {
    STUDENT_LOAD_APPLY_MODEL, STUDENT_LOAD_APPLY_MODEL_SUCCESS, STUDENT_LOAD_APPLY_MODEL_FAILURE, RESET_STUDENT_LOAD_APPLY_MODEL,
    STUDENT_APPLY_MENTO, STUDENT_APPLY_MENTO_SUCCESS, STUDENT_APPLY_MENTO_FAILURE, RESET_STUDENT_APPLY_MENTO,
    STUDENT_LOAD_MENTO_CAREERS, STUDENT_LOAD_MENTO_CAREERS_SUCCESS, STUDENT_LOAD_MENTO_CAREERS_FAILURE, RESET_STUDENT_LOAD_MENTO_CAREERS,
    STUDENT_UPDATE_MENTO_INFO, STUDENT_UPDATE_MENTO_INFO_SUCCESS, STUDENT_UPDATE_MENTO_INFO_FAILURE, RESET_STUDENT_UPDATE_MENTO_INFO,
    STUDENT_DELETE_MENTO_INFO, STUDENT_DELETE_MENTO_INFO_SUCCESS, STUDENT_DELETE_MENTO_INFO_FAILURE, RESET_STUDENT_DELETE_MENTO_INFO,
    STUDENT_LOAD_CURRENT_MENTO_TOKEN, STUDENT_LOAD_CURRENT_MENTO_TOKEN_SUCCESS, STUDENT_LOAD_CURRENT_MENTO_TOKEN_FAILURE, RESET_STUDENT_LOAD_CURRENT_MENTO_TOKEN,
    ADMIN_LOAD_MENTO_INFOS, ADMIN_LOAD_MENTO_INFOS_SUCCESS, ADMIN_LOAD_MENTO_INFOS_FAILURE, RESET_ADMIN_LOAD_MENTO_INFOS,
    ADMIN_GRANT_MENTORING_TEAM, ADMIN_GRANT_MENTORING_TEAM_SUCCESS, ADMIN_GRANT_MENTORING_TEAM_FAILURE, RESET_ADMIN_GRANT_MENTORING_TEAM,
    ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER, ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER_SUCCESS, ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER_FAILURE, RESET_ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER,
    ADMIN_LOAD_MENTO_TOKEN, ADMIN_LOAD_MENTO_TOKEN_SUCCESS, ADMIN_LOAD_MENTO_TOKEN_FAILURE, RESET_ADMIN_LOAD_MENTO_TOKEN
} from "../action/action_mento";

const INITIAL_STATE = {
    applyModel : {
        model : null, loading : false, error : null
    },
    saveStatus : {
        message : null, loading : false, error : null
    },
    careerList : {
        careers : [], loading : false, error : null
    },
    saveStatus : {
        message : null, loading : false, error : null
    },
    deleteStatus : {
        message : null, loading : false, error : null
    },
    mentoringToken : {
        data : null, loading : false, error : null
    },
    teamList : {
        teams : [], loading : false, error : null
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
        case STUDENT_UPDATE_MENTO_INFO :
        case ADMIN_GRANT_MENTORING_TEAM :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case STUDENT_APPLY_MENTO_SUCCESS :
        case STUDENT_UPDATE_MENTO_INFO_SUCCESS :
        case ADMIN_GRANT_MENTORING_TEAM_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case STUDENT_APPLY_MENTO_FAILURE :
        case STUDENT_UPDATE_MENTO_INFO_FAILURE :
        case ADMIN_GRANT_MENTORING_TEAM_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_STUDENT_APPLY_MENTO :
        case RESET_STUDENT_UPDATE_MENTO_INFO :
        case RESET_ADMIN_GRANT_MENTORING_TEAM :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        case STUDENT_LOAD_MENTO_CAREERS :
            return { ...state, careerList : { careers : [], loading : true, error : null }};
        case STUDENT_LOAD_MENTO_CAREERS_SUCCESS :
            return { ...state, careerList : { careers : action.payload, loading : false, error : null }};
        case STUDENT_LOAD_MENTO_CAREERS_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, careerList : { careers : [], loading : false, error : error }};
        case RESET_STUDENT_LOAD_MENTO_CAREERS :
            return { ...state, careerList : { careers : [], loading : false, error : null }};

        case STUDENT_DELETE_MENTO_INFO :
            return { ...state, deleteStatus : { message : null, loading : true, error : null }};
        case STUDENT_DELETE_MENTO_INFO_SUCCESS :
            return { ...state, deleteStatus : { message : action.payload, loading : false, error : null }};
        case STUDENT_DELETE_MENTO_INFO_FAILURE :
            error = action.payload.data || { message: action.payload.data };
            return { ...state, deleteStatus : { message : null, loading : false, error : error }};
        case RESET_STUDENT_DELETE_MENTO_INFO :
            return { ...state, deleteStatus : { message : null, loading : false, error : null }};

        case STUDENT_LOAD_CURRENT_MENTO_TOKEN :
        case ADMIN_LOAD_MENTO_TOKEN :
            return { ...state, mentoringToken : { data : null, loading : true, error : null }};
        case STUDENT_LOAD_CURRENT_MENTO_TOKEN_SUCCESS :
        case ADMIN_LOAD_MENTO_TOKEN_SUCCESS :
            return { ...state, mentoringToken : { data : action.payload, loading : false, error : null }};
        case STUDENT_LOAD_CURRENT_MENTO_TOKEN_FAILURE :
        case ADMIN_LOAD_MENTO_TOKEN_FAILURE :
            error = action.payload.data || { message: action.payload.data };
            return { ...state, mentoringToken : { data : null, loading : false, error : error }};
        case RESET_STUDENT_LOAD_CURRENT_MENTO_TOKEN :
        case RESET_ADMIN_LOAD_MENTO_TOKEN :
            return { ...state, mentoringToken : { data : null, loading : false, error : null }};

        case ADMIN_LOAD_MENTO_INFOS :
        case ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER :
            return { ...state, teamList : { teams : [], loading : true, error : null }};
        case ADMIN_LOAD_MENTO_INFOS_SUCCESS :
        case ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER_SUCCESS :
            return { ...state, teamList : { teams : action.payload, loading : false, error : null }};
        case ADMIN_LOAD_MENTO_INFOS_FAILURE :
        case ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER_FAILURE :
            return { ...state, teamList : { teams : [], loading : false, error : null }};
        case RESET_ADMIN_LOAD_MENTO_INFOS :
        case RESET_ADMIN_LOAD_MENTO_TEAMS_BY_SEMESTER :
            return { ...state, teamLIst : { teams : [], loading : false, error : null }};

        default :
            return state;
    }
}