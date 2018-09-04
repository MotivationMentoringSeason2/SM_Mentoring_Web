import {MenuProfile} from "../component/profile_component";
import {connect} from 'react-redux';
import {userLogoutProcess} from "../action/action_account";
function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutFromServer : () => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userLogoutProcess(accessToken));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuProfile);