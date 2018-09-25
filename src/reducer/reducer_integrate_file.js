import {
    ANYBODY_UPLOAD_POST_FILES, ANYBODY_UPLOAD_POST_FILES_SUCCESS, ANYBODY_UPLOAD_POST_FILES_FAILURE, RESET_ANYBODY_UPLOAD_POST_FILES,
    ANYBODY_UPLOAD_POST_IMAGES, ANYBODY_UPLOAD_POST_IMAGES_SUCCESS, ANYBODY_UPLOAD_POST_IMAGES_FAILURE, RESET_ANYBODY_UPLOAD_POST_IMAGES
} from "../action/action_integrate_file";

const INITIAL_STATE = {
    fileUploadStatus : {
        message : null, loading : false, error : null
    },
    imageUploadStatus : {
        message : null, loading : false, error : null
    }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type){
        case ANYBODY_UPLOAD_POST_FILES :
            return { ...state, fileUploadStatus : { message : null, loading : true, error : null }};
        case ANYBODY_UPLOAD_POST_FILES_SUCCESS :
            return { ...state, fileUploadStatus : { message : action.payload, loading : false, error : null }};
        case ANYBODY_UPLOAD_POST_FILES_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, fileUploadStatus : { message : null, loading : false, error : error }};
        case RESET_ANYBODY_UPLOAD_POST_FILES :
            return { ...state, fileUploadStatus : { message : null, loading : false, error : null }};

        case ANYBODY_UPLOAD_POST_IMAGES :
            return { ...state, imageUploadStatus : { message : null, loading : true, error : null }};
        case ANYBODY_UPLOAD_POST_IMAGES_SUCCESS :
            return { ...state, imageUploadStatus : { message : action.payload, loading : false, error : null }};
        case ANYBODY_UPLOAD_POST_IMAGES_FAILURE :
            error = action.payload.data || { message : action.payload.data };
            return { ...state, imageUploadStatus : { message : null, loading : false, error : error }};
        case RESET_ANYBODY_UPLOAD_POST_IMAGES :
            return { ...state, imageUploadStatus : { message : null, loading : false, error : null }};

        default :
            return state;
    }
}