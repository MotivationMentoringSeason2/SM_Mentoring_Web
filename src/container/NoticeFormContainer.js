import {NoticeForm} from "../component/notice_page";
import {connect} from 'react-redux';
import {anybodyLoadPostList, anybodyLoadPostListSuccess, anybodyLoadPostListFailure, resetAnybodyLoadPostList} from "../action/action_notice";

function mapStateToProps(state) {
    const { pagination } = state.account.accountList;
    let formUpdater = {
        sb : pagination && (pagination.sb || 0),
        ob : pagination && (pagination.ob || 0),
        st : pagination && (pagination.st || '')
    };
    return {
        initialValues : formUpdater,
        postList : state.notice.postList,
        searchForm : state.form.searchForm
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