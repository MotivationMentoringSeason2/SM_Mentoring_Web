import {MentoringMemoForm} from "../component/mentoring_memo";
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        findStatus : state.account.findStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentoringMemoForm);