import {IntroTitleList} from "../component/intro_edit_page";
import {connect} from 'react-redux';
import {
    adminLoadIntroTitles, adminLoadIntroTitlesSuccess, adminLoadIntroTitlesFailure, resetAdminLoadIntroTitles,
    adminCreateIntroTitle, adminCreateIntroTitleSuccess, adminCreateIntroTitleFailure,
    adminUpdateIntroTitle, adminUpdateIntroTitleSuccess, adminUpdateIntroTitleFailure, resetAdminSaveIntroTitle,
    adminRemoveIntroTitleMulti, adminRemoveIntroTitleMultiSuccess, adminRemoveIntroTitleMultiFailure, resetAdminRemoveIntroTitle
} from "../action/action_intro";

function mapStateToProps(state){
    return {
        introList : state.intro.introList,
        saveStatus : state.intro.saveStatus,
        deleteStatus : state.intro.deleteStatus,
        accessAccount : state.account.accessAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchIntroTitles : () => dispatch(adminLoadIntroTitles()).then((response) => {
            if(!response.error)
                dispatch(adminLoadIntroTitlesSuccess(response.payload));
            else
                dispatch(adminLoadIntroTitlesFailure(response.payload));
        }),
        resetFetchIntroTitles : () => dispatch(resetAdminLoadIntroTitles()),
        executeUpdateTitle : (introForm, writer) => dispatch(adminUpdateIntroTitle(introForm, writer)).then((response) => {
            if(response.payload && response.payload.status === 200)
                dispatch(adminUpdateIntroTitleSuccess(response.payload));
            else
                dispatch(adminUpdateIntroTitleFailure(response.payload));
        }),
        executeCreateTitle : (introForm, writer) => dispatch(adminCreateIntroTitle(introForm, writer)).then((response) => {
            if(response.payload && response.payload.status === 200)
                dispatch(adminCreateIntroTitleSuccess(response.payload));
            else
                dispatch(adminCreateIntroTitleFailure(response.payload));
        }),
        resetExecuteSaveTitle : () => dispatch(resetAdminSaveIntroTitle()),
        executeRemoveTitles : (ids) => dispatch(adminRemoveIntroTitleMulti(ids)).then((response) => {
            if(response.payload && response.payload.status === 200)
                dispatch(adminRemoveIntroTitleMultiSuccess(response.payload));
            else
                dispatch(adminRemoveIntroTitleMultiFailure(response.payload));
        }),
        resetExecuteRemoveTitle : () => dispatch(resetAdminRemoveIntroTitle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroTitleList);