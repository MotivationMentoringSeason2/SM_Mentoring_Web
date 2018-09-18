import {NoticeForm} from "../component/notice_page";
import {connect} from 'react-redux';
import {anybodyLoadPostList, anybodyLoadPostListSuccess, anybodyLoadPostListFailure, resetAnybodyLoadPostList} from "../action/action_notice";

function mapStateToProps(state) {
    return {
        postList : state.notice.postList
    };
}

function mapDispatchToProps(dispatch){
    return {
        fetchPostList : (queryString) => dispatch(anybodyLoadPostList(queryString)).then((response) => {
            if(!response.error){
                dispatch(anybodyLoadPostListSuccess(response.payload));
            }else{
                dispatch(anybodyLoadPostListFailure(response.payload));
            }
        }),
        resetFetchPostList : () => dispatch(resetAnybodyLoadPostList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeForm);