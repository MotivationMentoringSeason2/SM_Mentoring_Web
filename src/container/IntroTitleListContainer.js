import {IntroTitleList} from "../component/intro_edit_page";
import {connect} from 'react-redux';
import {
    adminLoadIntroTitles, adminLoadIntroTitlesSuccess, adminLoadIntroTitlesFailure, resetAdminLoadIntroTitles,
    adminUpdateIntroTitle, adminUpdateIntroTitleSuccess, adminUpdateIntroTitleFailure, resetAdminUpdateIntroTitle
} from "../action/action_intro";

function mapStateToProps(state){
    return {
        introList : state.intro.introList,
        saveStatus : state.intro.saveStatus,
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
        resetExecuteUpdateTitle : () => dispatch(resetAdminUpdateIntroTitle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroTitleList);