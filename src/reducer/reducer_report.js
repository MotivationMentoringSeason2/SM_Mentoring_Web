import {
    ANYBODY_LOAD_REPORTS, ANYBODY_LOAD_REPORTS_SUCCESS, ANYBODY_LOAD_REPORTS_FAILURE, RESET_ANYBODY_LOAD_REPORTS,
    ANYBODY_LOAD_REPORT_VIEW, ANYBODY_LOAD_REPORT_VIEW_SUCCESS, ANYBODY_LOAD_REPORT_VIEW_FAILURE, RESET_ANYBODY_LOAD_REPORT_VIEW,
    MENTO_LOAD_REPORT_MODEL, MENTO_LOAD_REPORT_MODEL_SUCCESS, MENTO_LOAD_REPORT_MODEL_FAILURE, RESET_MENTO_LOAD_REPORT_MODEL,
    MENTO_CREATE_REPORT, MENTO_CREATE_REPORT_SUCCESS, MENTO_CREATE_REPORT_FAILURE,
    MENTO_UPDATE_REPORT_CONTEXT_ONLY, MENTO_UPDATE_REPORT_CONTEXT_ONLY_SUCCESS, MENTO_UPDATE_REPORT_CONTEXT_ONLY_FAILURE,
    MENTO_UPDATE_REPORT_WITH_PHOTO, MENTO_UPDATE_REPORT_WITH_PHOTO_SUCCESS, MENTO_UPDATE_REPORT_WITH_PHOTO_FAILURE,
    MENTO_DELETE_REPORTS, MENTO_DELETE_REPORTS_SUCCESS, MENTO_DELETE_REPORTS_FAILURE, RESET_MENTO_SAVE_REPORT, RESET_MENTO_DELETE_REPORTS
} from "../action/action_report";

const INITIAL_STATE = {
    reportList : {
        reports : [], activity : null, loading: false, error: null
    },
    reportView : {
        report : null, loading : false, error : null
    },
    reportModel : {
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
        case ANYBODY_LOAD_REPORTS :
            return { ...state, reportList : { reports : [], activity : null, loading: true, error: null }};
        case ANYBODY_LOAD_REPORTS_SUCCESS :
            const { reports, activity } = action.payload;
            return { ...state, reportList : { reports : reports, activity : activity, loading: false, error: null }};
        case ANYBODY_LOAD_REPORTS_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, reportList : { reports : [], activity : null, loading: false, error: error }};
        case RESET_ANYBODY_LOAD_REPORTS :
            return { ...state, reportList : { reports : [], activity : null, loading: false, error: null }};

        case ANYBODY_LOAD_REPORT_VIEW :
            return { ...state, reportView : { report : null, loading : true, error : null }};
        case ANYBODY_LOAD_REPORT_VIEW_SUCCESS :
            return { ...state, reportView : { report : action.payload, loading : false, error : null }};
        case ANYBODY_LOAD_REPORT_VIEW_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, reportView : { report : null, loading : false, error : error }};
        case RESET_ANYBODY_LOAD_REPORT_VIEW :
            return { ...state, reportView : { report : null, loading : false, error : null }};

        case MENTO_LOAD_REPORT_MODEL :
            return { ...state, reportModel : { model : null, loading : true, error : null }};
        case MENTO_LOAD_REPORT_MODEL_SUCCESS :
            return { ...state, reportModel : { model : action.payload, loading : false, error : null }};
        case MENTO_LOAD_REPORT_MODEL_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, reportModel : { model : null, loading : false, error : error }};
        case RESET_MENTO_LOAD_REPORT_MODEL :
            return { ...state, reportModel : { model : null, loading : false, error : null }};

        case MENTO_CREATE_REPORT :
        case MENTO_UPDATE_REPORT_WITH_PHOTO :
        case MENTO_UPDATE_REPORT_CONTEXT_ONLY :
            return { ...state, saveStatus : { message : null, loading : true, error : null }};
        case MENTO_CREATE_REPORT_SUCCESS :
        case MENTO_UPDATE_REPORT_WITH_PHOTO_SUCCESS :
        case MENTO_UPDATE_REPORT_CONTEXT_ONLY_SUCCESS :
            return { ...state, saveStatus : { message : action.payload, loading : false, error : null }};
        case MENTO_CREATE_REPORT_FAILURE :
        case MENTO_UPDATE_REPORT_WITH_PHOTO_FAILURE :
        case MENTO_UPDATE_REPORT_CONTEXT_ONLY_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { message : null, loading : false, error : error }};
        case RESET_MENTO_SAVE_REPORT :
            return { ...state, saveStatus : { message : null, loading : false, error : null }};

        case MENTO_DELETE_REPORTS :
            return { ...state, deleteStatus : { message : null, loading : true, error : null }};
        case MENTO_DELETE_REPORTS_SUCCESS :
            return { ...state, deleteStatus : { message : action.payload, loading : false, error : null }};
        case MENTO_DELETE_REPORTS_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, deleteStatus : { message : null, loading : false, error : error }};
        case RESET_MENTO_DELETE_REPORTS :
            return { ...state, deleteStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}