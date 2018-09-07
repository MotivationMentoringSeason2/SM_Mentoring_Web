import {LoginForm} from "../component/login_page";
import {connect} from 'react-redux';
import {resetGuestLogin} from "../action/action_account";

function mapStateToProps(state) {
    return {
        loginStatus : state.account.loginStatus
    };
}

function mapDispatchToProps(dispatch){
    return {
        resetLoginStatus : () => dispatch(resetGuestLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);