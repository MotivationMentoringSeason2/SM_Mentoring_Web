import {SignUpdateForm} from "../component/sign_update_page";
import {connect} from 'react-redux';
import {
    userFetchSignForm, userFetchSignFormSuccess, userFetchSignFormFailure, resetUserFetchSignForm
} from "../action/action_account";
import {
    anybodyLoadDepartments, anybodyLoadDepartmentsFailure, anybodyLoadDepartmentsSuccess, resetAnybodyLoadDepartments
} from "../action/action_department";

function mapStateToProps(state){
    let signModel = {};
    const { model } = state.account.accessSignForm;
    const { principal } = state.account.accessAccount;
    if(principal){
        switch(principal.type){
            case 'STUDENT' :
                signModel =
                    {
                        name : model && (model.name || ''),
                        email : model && (model.email || ''),
                        phone : model && (model.phone || ''),
                        grade : model && (model.grade + '' || 1),
                        gender : model && (model.gender || 'MALE'),
                        departmentId : model && (model.departmentId || 0)
                    };
                if(model && model.multiDepartments){
                    for(var k=0;k<model.multiDepartments.length;k++){
                        signModel[`muldept_${model.multiDepartments[k]}`] = true;
                    }
                }
                break;
            case 'PROFESSOR' :
                signModel =
                    {
                        name : model && (model.name || ''),
                        email : model && (model.email || ''),
                        phone : model && (model.phone || ''),
                        gender : model && (model.gender || 'MALE'),
                        departmentId : model && (model.departmentId || 0),
                        hasChairman : model && (model.hasChairman || false),
                        officePhone : model && (model.officePhone || ''),
                        officePlace : model && (model.officePlace || '')
                    };
                if(model && model.multiDepartments){
                    for(var l=0;l<model.multiDepartments.length;l++){
                        signModel[`muldept_${model.multiDepartments[l]}`] = true;
                    }
                }
                break;
            case 'EMPLOYEE' :
                signModel =
                    {
                        name : model && (model.name || ''),
                        email : model && (model.email || ''),
                        phone : model && (model.phone || ''),
                        gender : model && (model.gender || 'MALE'),
                        officePhone : model && (model.officePhone || ''),
                        officePlace : model && (model.officePlace || '')
                    };
                if(model && model.departments){
                    for(var m=0;m<model.departments.length;m++){
                        signModel[`muldept_${model.departments[m]}`] = true;
                    }
                }
                break;
        }
    }
    return {
        initialValues : signModel,
        accessAccount : state.account.accessAccount,
        signUpdateForm : state.form.signUpdateForm,
        departmentList : state.department.departmentList
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
        fetchCurrentSignForm : (type) => {
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(userFetchSignForm(accessToken, type)).then(response => {
                if(!response.error){
                    dispatch(userFetchSignFormSuccess(response.payload));
                }else{
                    dispatch(userFetchSignFormFailure(response.payload));
                }
            })
        },
        resetFetchDepartments : () => dispatch(resetAnybodyLoadDepartments()),
        resetFetchCurrentSignForm : () => dispatch(resetUserFetchSignForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpdateForm);