import {FindIdentityForm} from "../component/find_identity_page";
import {connect} from 'react-redux';
import {resetGuestFindIdentity} from "../action/action_account";

function mapStateToProps(state){
    return {
        findStatus : state.account.findStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetFindIdentity : () => dispatch(resetGuestFindIdentity())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindIdentityForm);