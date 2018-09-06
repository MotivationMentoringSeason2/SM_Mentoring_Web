import {LoginForm} from "../component/login_page";
import {connect} from 'react-redux';
import {resetUserFetchPrincipal} from "../action/action_account";

function mapStateToProps(state) {
    return {
        accessAccount : state.account.accessAccount
    };
}

function mapDispatchToProps(dispatch){
    return {
        resetLoginStatus : () => dispatch(resetUserFetchPrincipal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);