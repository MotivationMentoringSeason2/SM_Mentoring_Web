import {
    ADMIN_LOAD_SEMESTER_LIST, ADMIN_LOAD_SEMESTER_LIST_SUCCESS, ADMIN_LOAD_SEMESTER_LIST_FAILURE, RESET_ADMIN_LOAD_SEMESTER_LIST,
    ADMIN_CREATE_SEMESTER, ADMIN_CREATE_SEMESTER_SUCCESS, ADMIN_CREATE_SEMESTER_FAILURE, RESET_ADMIN_SAVE_SEMESTER
} from "../action/action_semester";

const INITIAL_STATE = {
    semesterList: {
        semesters: [], loading: false, error: null
    },
    saveStatus: {
        message: null, loading: false, error: null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case ADMIN_LOAD_SEMESTER_LIST :
            return { ...state, semesterList : { semesters : [], loading : true, error : null }};
        case ADMIN_LOAD_SEMESTER_LIST_SUCCESS :
            return { ...state, semesterList : { semesters : action.payload, loading : false, error : null }};
        case ADMIN_LOAD_SEMESTER_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, semesterList : { semesters : [], loading : false, error : error }};
        case RESET_ADMIN_LOAD_SEMESTER_LIST :
            return { ...state, semesterList : { semesters : [], loading : false, error : null }};

        case ADMIN_CREATE_SEMESTER :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case ADMIN_CREATE_SEMESTER_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case ADMIN_CREATE_SEMESTER_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_ADMIN_SAVE_SEMESTER :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}