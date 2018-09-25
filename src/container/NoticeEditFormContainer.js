import {NoticeEditForm} from "../component/notice_edit_page";
import {connect} from 'react-redux';
import {
    anybodyLoadPostModel, anybodyLoadPostModelFailure, anybodyLoadPostModelSuccess,
    resetAnybodySaveEditedPost, resetAnybodyLoadPostModel
} from "../action/action_notice";
import {resetAnybodyUploadPostFiles, resetAnybodyUploadPostImages} from "../action/action_integrate_file";

function mapStateToProps(state){
    const { model } = state.notice.postModel;
    let formUpdater = {
        title : model && (model.title || ''),
        context : model && (model.context || '')
    };
    return {
        initialValues : formUpdater,
        accessAccount : state.account.accessAccount,
        postModel : state.notice.postModel,
        fileUploadStatus : state.integrateFile.fileUploadStatus,
        imageUploadStatus : state.integrateFile.imageUploadStatus,
        saveStatus : state.notice.saveStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetSavePost : () => dispatch(resetAnybodySaveEditedPost()),
        resetUploadFiles : () => dispatch(resetAnybodyUploadPostFiles()),
        resetUploadImages : () => dispatch(resetAnybodyUploadPostImages()),
        resetFetchPostModel : () => dispatch(resetAnybodyLoadPostModel()),
        fetchPostModel : (id) => dispatch(anybodyLoadPostModel(id)).then(response => {
            if(!response.error && response.payload.status === 200)
                dispatch(anybodyLoadPostModelSuccess(response.payload));
            else
                dispatch(anybodyLoadPostModelFailure(response.payload));
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeEditForm);