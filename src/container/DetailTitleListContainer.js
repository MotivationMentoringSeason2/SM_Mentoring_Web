import {DetailTitleList} from "../component/intro_detail_edit_page";
import {connect} from 'react-redux';
import {
    adminLoadDetailList, adminLoadDetailListSuccess, adminLoadDetailListFailure, resetAdminLoadDetailList,
    adminUpdateDetailContext, adminCreateDetailContextFailure, resetAdminSaveDetailContext, resetAdminRemoveDetailMulti,
    adminRemoveDetailMultiFailure, adminUpdateDetailContextSuccess, adminCreateDetailContext,
    adminUpdateDetailContextFailure, adminCreateDetailContextSuccess, adminRemoveDetailMulti,
    adminRemoveDetailMultiSuccess
} from "../action/action_intro";

function mapStateToProps(state){
    return {
        detailList : state.intro.detailList,
        saveStatus : state.intro.saveStatus,
        deleteStatus : state.intro.deleteStatus,
        accessAccount : state.account.accessAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailList : (id) => dispatch(adminLoadDetailList(id)).then((response) => {
            if(!response.error)
                dispatch(adminLoadDetailListSuccess(response.payload));
            else
                dispatch(adminLoadDetailListFailure(response.payload));
        }),
        resetFetchDetailList : () => dispatch(resetAdminLoadDetailList()),
        executeUpdateDetail : (detailForm, writer) => dispatch(adminUpdateDetailContext(detailForm, writer)).then((response) => {
            if(response.payload && response.payload.status === 200)
                dispatch(adminUpdateDetailContextSuccess(response.payload));
            else
                dispatch(adminUpdateDetailContextFailure(response.payload));
        }),
        executeCreateDetail : (detailForm, introId, writer) => dispatch(adminCreateDetailContext(detailForm, introId, writer)).then((response) => {
            if(response.payload && response.payload.status === 200)
                dispatch(adminCreateDetailContextSuccess(response.payload));
            else
                dispatch(adminCreateDetailContextFailure(response.payload));
        }),
        resetExecuteSaveDetail : () => dispatch(resetAdminSaveDetailContext()),
        executeRemoveDetails : (ids) => dispatch(adminRemoveDetailMulti(ids)).then((response) => {
            if(response.payload && response.payload.status === 200)
                dispatch(adminRemoveDetailMultiSuccess(response.payload));
            else
                dispatch(adminRemoveDetailMultiFailure(response.payload));
        }),
        resetExecuteRemoveDetails : () => dispatch(resetAdminRemoveDetailMulti())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTitleList);