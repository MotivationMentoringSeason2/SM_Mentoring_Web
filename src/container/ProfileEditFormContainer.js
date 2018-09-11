import {ProfileEditForm} from "../component/profile_edit_page";
import {connect} from 'react-redux';
import {
    resetUserSaveProfile, userReleaseProfile, userReleaseProfileSuccess, userSaveProfileFailure, resetUserReleaseProfile
} from "../action/action_profile";

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,
        saveStatus : state.profile.saveStatus,
        releaseStatus : state.profile.releaseStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetSaveProfile : () => dispatch(resetUserSaveProfile()),
        executeReleaseProfile : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userReleaseProfile(accessToken)).then((response) => {
                if(!response.error){
                    dispatch(userReleaseProfileSuccess(response.payload));
                }else{
                    dispatch(userSaveProfileFailure(response.payload));
                }
            })
        },
        resetReleaseProfile : () => dispatch(resetUserReleaseProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm);