import {FindPasswordForm} from "../component/find_password_page";
import {connect} from 'react-redux';
import {resetGuestFindPassword} from "../action/action_account";

function mapStateToProps(state){
    return {
        findStatus : state.account.findStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetFindPassword : () => dispatch(resetGuestFindPassword())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPasswordForm);