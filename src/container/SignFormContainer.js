import {SignForm} from "../component/sign_page";
import {connect} from 'react-redux';
import {anybodyLoadDepartments, anybodyLoadDepartmentsSuccess, anybodyLoadDepartmentsFailure, resetAnybodyLoadDepartments} from "../action/action_department";
import {resetGuestCreateAccount} from "../action/action_account";
function mapStateToProps(state) {
    return {
        departmentList : state.department.departmentList,
        signStatus : state.account.signStatus,
        signForm : state.form.signForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDepartments : () => dispatch(anybodyLoadDepartments()).then((response) => {
            if(!response.error){
                dispatch(anybodyLoadDepartmentsSuccess(response.payload));
            }else{
                dispatch(anybodyLoadDepartmentsFailure(response.payload));
            }
        }),
        resetFetchDepartments : () => dispatch(resetAnybodyLoadDepartments()),
        resetCreateAccount : () => dispatch(resetGuestCreateAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);