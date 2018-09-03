import {ApplicationRouter} from '../router';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        accessAccount : state.account.accessAccount
    }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, null)(ApplicationRouter);