import {MentoringMemoForm} from "../component/mentoring_memo";
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentoringMemoForm);