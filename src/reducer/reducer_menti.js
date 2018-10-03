import {
    STUDENT_LOAD_TEAM_LIST, STUDENT_LOAD_TEAM_LIST_SUCCESS, STUDENT_LOAD_TEAM_LIST_FAILURE, RESET_STUDENT_LOAD_TEAM_LIST,
    STUDENT_APPLY_MENTI, STUDENT_APPLY_MENTI_SUCCESS, STUDENT_APPLY_MENTI_FAILURE, RESET_STUDENT_APPLY_MENTI,
    STUDENT_RELEASE_CURRENT_MENTI, STUDENT_RELEASE_CURRENT_MENTI_SUCCESS, STUDENT_RELEASE_CURRENT_MENTI_FAILURE, RESET_STUDENT_RELEASE_CURRENT_MENTI,
    RESET_STUDENT_LOAD_MENTI_CAREERS, STUDENT_LOAD_MENTI_CAREERS, STUDENT_LOAD_MENTI_CAREERS_FAILURE,
    STUDENT_LOAD_MENTI_CAREERS_SUCCESS, MENTO_LOAD_MENTI_LIST, MENTO_LOAD_MENTI_LIST_SUCCESS, MENTO_LOAD_MENTI_LIST_FAILURE, RESET_MENTO_LOAD_MENTI_LIST,
    MENTI_LOAD_MENTORING_TOKEN, MENTI_LOAD_MENTORING_TOKEN_SUCCESS, MENTI_LOAD_MENTORING_TOKEN_FAILURE, RESET_MENTI_LOAD_MENTORING_TOKEN
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
    },
    careerList : {
        careers : [], loading : false, error : null
    },
    mentoringPeople : {
        people : null, loading : false, error : null
    },
    mentoringToken : {
        data : null, loading : false, error : null
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

        case STUDENT_LOAD_MENTI_CAREERS :
            return { ...state, careerList : { careers : [], loading : true, error : null }};
        case STUDENT_LOAD_MENTI_CAREERS_SUCCESS :
            return { ...state, careerList : { careers : action.payload, loading : false, error : null }};
        case STUDENT_LOAD_MENTI_CAREERS_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, careerList : { careers : [], loading : false, error : error }};
        case RESET_STUDENT_LOAD_MENTI_CAREERS :
            return { ...state, careerList : { careers : [], loading : false, error : null }};

        case MENTO_LOAD_MENTI_LIST :
            return { ...state, mentoringPeople : { people : null, loading : true, error : null }};
        case MENTO_LOAD_MENTI_LIST_SUCCESS :
            return { ...state, mentoringPeople : { people : action.payload, loading : false, error : null }};
        case MENTO_LOAD_MENTI_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, mentoringPeople : { people : null, loading : false, error : error }};
        case RESET_MENTO_LOAD_MENTI_LIST :
            return { ...state, mentoringPeople : { people : null, loading : false, error : null }};

        case MENTI_LOAD_MENTORING_TOKEN :
            return { ...state, mentoringToken : { data : null, loading : true, error : null }};
        case MENTI_LOAD_MENTORING_TOKEN_SUCCESS :
            return { ...state, mentoringToken : { data : action.payload, loading : false, error : null }};
        case MENTI_LOAD_MENTORING_TOKEN_FAILURE :
            error = action.payload.data || { message: action.payload.data };
            return { ...state, mentoringToken : { data : null, loading : false, error : error }};
        case RESET_MENTI_LOAD_MENTORING_TOKEN :
            return { ...state, mentoringToken : { data : null, loading : false, error : null }};

        default :
            return state;
    }
}