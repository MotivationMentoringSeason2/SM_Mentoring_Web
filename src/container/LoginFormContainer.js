import {LoginForm} from "../component/login_page";
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        accessAccount : state.account.accessAccount
    };
}

export default connect(mapStateToProps, null)(LoginForm);