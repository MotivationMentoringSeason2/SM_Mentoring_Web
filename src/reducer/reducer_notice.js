import {
    ANYBODY_LOAD_POST_LIST, ANYBODY_LOAD_POST_LIST_SUCCESS, ANYBODY_LOAD_POST_LIST_FAILURE, RESET_ANYBODY_LOAD_POST_LIST,
    ANYBODY_LOAD_POST_MODEL, ANYBODY_LOAD_POST_MODEL_SUCCESS, ANYBODY_LOAD_POST_MODEL_FAILURE, RESET_ANYBODY_LOAD_POST_MODEL,
    ANYBODY_SAVE_EDITED_POST, ANYBODY_SAVE_EDITED_POST_SUCCESS, ANYBODY_SAVE_EDITED_POST_FAILURE, RESET_ANYBODY_SAVE_EDITED_POST
} from "../action/action_notice";

const INITIAL_STATE = {
    postList : {
        posts : [], pagination : null, loading : false, error : null
    },
    postModel : {
        model : null, loading : false, error : null
    },
    saveStatus : {
        post : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type){
        case ANYBODY_LOAD_POST_LIST :
            return { ...state, postList : { posts : [], pagination : null, loading : true, error : null }};
        case ANYBODY_LOAD_POST_LIST_SUCCESS :
            const { posts, pagination } = action.payload;
            return { ...state, postList : { posts : posts, pagination : pagination, loading : false, error : null }};
        case ANYBODY_LOAD_POST_LIST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, postList : { posts : [], pagination : null, loading : false, error : error }};
        case RESET_ANYBODY_LOAD_POST_LIST :
            return { ...state, postList : { posts : [], pagination : null, loading : false, error : null }};

        case ANYBODY_LOAD_POST_MODEL :
            return { ...state, postModel : { model : null, loading : true, error : null }};
        case ANYBODY_LOAD_POST_MODEL_SUCCESS :
            return { ...state, postModel : { model : action.payload, loading : false, error : null }};
        case ANYBODY_LOAD_POST_MODEL_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, postModel : { model : null, loading : false, error : error }};
        case RESET_ANYBODY_LOAD_POST_MODEL :
            return { ...state, postModel : { model : null, loading : false, error : null }};

        case ANYBODY_SAVE_EDITED_POST :
            return { ...state, saveStatus : { post : null, loading : true, error : null }};
        case ANYBODY_SAVE_EDITED_POST_SUCCESS :
            return { ...state, saveStatus : { post : action.payload, loading : false, error : null }};
        case ANYBODY_SAVE_EDITED_POST_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, saveStatus : { post : null, loading : false, error : error }};
        case RESET_ANYBODY_SAVE_EDITED_POST :
            return { ...state, saveStatus : { post : null, loading : false, error : null }};

        default :
            return state;
    }
}