import {SignForm} from "../component/sign_page";
import {connect} from 'react-redux';
import {anybodyLoadDepartments, anybodyLoadDepartmentsSuccess, anybodyLoadDepartmentsFailure, resetAnybodyLoadDepartments} from "../action/action_department";
function mapStateToProps(state) {
    return {
        departmentList : state.department.departmentList,
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
        resetFetchDepartments : () => dispatch(resetAnybodyLoadDepartments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);