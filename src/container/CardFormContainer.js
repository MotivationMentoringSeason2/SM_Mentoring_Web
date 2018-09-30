import {CardForm} from "../component/card_page";
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        accessAccount : state.account.accessAccount
    };
}

export default connect(mapStateToProps, null)(CardForm);