import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import {renderTextField, renderRadioGroup, renderSelectField, renderCheckBox } from "../form_render";
import {
    userUpdateSignForm, userUpdateSignFormSuccess, userUpdateSignFormFailure
} from "../../action/action_account";

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import {ACCOUNT_URL} from "../../action/distribute_urls";

const COMMON_ROOT_URL = `${ACCOUNT_URL}/common`;

function validate(values){
    var errors = {};
    var hasErrors = false;

    var passwordPattern = /^[A-Za-z0-9]{6,12}$/;

    if(values.confirm === null){
        errors.before_password = '이전 비밀번호를 확인하셔야 수정이 가능합니다.';
        hasErrors = true;
    } else if(values.confirm === false){
        errors.before_password = '이전 비밀번호가 틀립니다. 다시 입력 바랍니다.';
        hasErrors = true;
    }

    if(!values.main_password || values.main_password.trim() === ''){
        errors.main_password = '새로운 비밀번호를 입력하세요.';
        hasErrors = true;
    } else if(!values.main_password.match(passwordPattern)){
        errors.main_password = '새로운 비밀번호도 영어 대-소문자, 숫자를 포함한 6~12자로 입력하세요.';
        hasErrors = true;
    }

    if(!values.sub_password || values.sub_password.trim() === ''){
        errors.sub_password = '새로운 비밀번호 확인을 부탁 드립니다.';
        hasErrors = true;
    } else if(values.sub_password !== values.main_password){
        errors.sub_password = '새로운 비밀번호 확인이 일치하지 않습니다.';
        hasErrors = true;
    }

    var emailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,4}$/;
    if(!values.email || values.email.trim() === ''){
        errors.email = '이메일을 입력하세요.';
        hasErrors = true;
    } else if(!values.email.match(emailExp)){
        errors.email = '이메일 형식을 확인하세요.';
        hasErrors = true;
    }

    var phoneExp = /^01([0|1|6|7|8|9]?)?([0-9]{7,8})$/;

    if(!values.phone || values.phone.trim() === ''){
        errors.phone = '휴대폰 번호를 입력하세요.';
        hasErrors = true;
    } else if(!values.phone.match(phoneExp)){
        errors.phone = '휴대폰 번호 형식을 확인하세요.';
        hasErrors = true;
    }

    if(!values.gender){
        errors.gender = '성별을 선택하세요.';
        hasErrors = true;
    }

    if(values.type === 'STUDENT'){
        if(!values.grade){
            errors.grade = '학년을 선택하세요.';
            hasErrors = true;
        }
    }

    if(values.type === 'STUDENT' || values.type === 'PROFESSOR')
        if(!values.departmentId || values.departmentId == 0){
            errors.departmentId = values.type ? '전공 학과를 선택하세요.' : '주 담당 학과를 선택하세요.';
            hasErrors = true;
        }

    if(values.type === 'EMPLOYEE' || values.type === 'PROFESSOR'){
        if(!values.officePlace || values.officePlace.trim() === ''){
            errors.officePlace = '사무실 위치를 입력하세요.';
            hasErrors = true;
        }

        var officePhoneExp = /^[0-9]+$/;

        if(!values.officePhone || values.officePhone.trim() === ''){
            errors.officePhone = '사무실 전화번호를 입력하세요.';
            hasErrors = true;
        } else if(!values.officePhone.match(officePhoneExp)){
            errors.officePhone = '전화 번호 형식을 확인하세요.';
            hasErrors = true;
        }
    }

    if(values.type === 'EMPLOYEE'){
        let selectDepts = Object.keys(values).filter(key => key.startsWith('muldept_', 0));
        if(selectDepts.length === 0){
            errors.muldept_1 = '담당 학과를 선택하세요.';
            hasErrors = true;
        }
    }

    return hasErrors && errors;
}

const validateAndSubmitSign = (value, dispatch) => {
    let accessToken = localStorage.getItem('jwtToken');
    if(!accessToken || accessToken === '') return;
    let signForm = {};
    let type = '';
    let selectDepts = Object.keys(value).filter(key => key.startsWith('muldept_', 0));
    switch(value.type){
        case 'STUDENT' :
            signForm = {
                identity : '',
                password : value.main_password,
                name : value.name,
                email : value.email,
                phone : value.phone,
                grade : value.grade * 1,
                gender : value.gender,
                departmentId : value.departmentId * 1,
                multiDepartments : selectDepts.length > 0 ? selectDepts.filter(key => value[key] && value.departmentId != key.replace(/[^0-9]/g, '')).map(key => key.replace(/[^0-9]/g, '') * 1) : []
            };
            type = 'student';
            break;
        case 'PROFESSOR' :
            signForm = {
                identity : '',
                password : value.main_password,
                name : value.name,
                email : value.email,
                phone : value.phone,
                gender : value.gender,
                officePhone : value.officePhone,
                officePlace : value.officePlace,
                hasChairman : value.hasChairman === undefined ? false : value.hasChairman,
                departmentId : value.departmentId * 1,
                multiDepartments : selectDepts.length > 0 ? selectDepts.filter(key => value[key] && value.departmentId != key.replace(/[^0-9]/g, '')).map(key => key.replace(/[^0-9]/g, '') * 1) : []
            }
            type = 'professor';
            break;
        case 'EMPLOYEE' :
            signForm = {
                identity : '',
                password : value.main_password,
                name : value.name,
                email : value.email,
                phone : value.phone,
                gender : value.gender,
                officePhone : value.officePhone,
                officePlace : value.officePlace,
                departments : selectDepts.length > 0 ? selectDepts.filter(key => value[key]).map(key => key.replace(/[^0-9]/g, '') * 1) : []
            }
            type = 'employee';
            break;
    }
    return dispatch(userUpdateSignForm(accessToken, type, signForm)).then(
        (response) => {
            if(response.payload && response.payload.status !== 200){
                dispatch(userUpdateSignFormFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(userUpdateSignFormSuccess(response.payload));
        }
    ).catch(reason => {
        dispatch(userUpdateSignFormFailure("회원의 이름과 이메일이 중복된 회원이 있거나 서버 측에서 회원 가입 오류입니다. 다시 시도 바랍니다."));
    });
}

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: (window.innerWidth >= 450) ? 420 : 300,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});

class SignUpdateForm extends Component {
    constructor(props){
        super(props);
        this.state = { confirm : null }
    }

    componentWillMount(){
        const {principal} = this.props.accessAccount;
        this.props.fetchDepartments();
        this.props.fetchCurrentSignForm(principal && principal.type);
    }

    componentWillUnmount(){
        this.props.resetFetchDepartments();
        this.props.resetFetchCurrentSignForm();
        this.props.resetSaveStatus();
    }

    handleClickPasswordConfirm(){
        const { signUpdateForm } = this.props;
        if(signUpdateForm.values && signUpdateForm.values.before_password !== undefined){
            let accessToken = localStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            axios({
                url : `${COMMON_ROOT_URL}/password_confirm`,
                headers : {
                    'Authorization' : `Bearer ${accessToken}`
                },
                data : {
                    identity : '',
                    password : signUpdateForm.values.before_password
                },
                method : 'post'
            }).then(response => {
                this.setState({
                    confirm : response.data
                });
            }).catch(reason => this.setState({ confirm : null }));
        } else {
            alert("현재 이용 중인 비밀번호를 입력하세요. 초기 비밀번호는 test123 입니다. 분실 시 관리자에게 연락하여 조치하시길 바랍니다.");
        }
    }

    render(){
        const { confirm } = this.state;
        const { classes, handleSubmit, signUpdateForm } = this.props;
        const { departments } = this.props.departmentList;
        const { principal } = this.props.accessAccount;
        const { message, error } = this.props.signStatus;

        this.props.change('type', principal && principal.type);
        this.props.change('confirm', confirm);

        if(message){
            alert(message);
            this.props.history.push("/");
        } else if(error){
            alert(error);
            this.props.history.push("/");
        }

        return(
            <form onSubmit={handleSubmit(validateAndSubmitSign)} className={classes.form}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <EditIcon />
                        </Avatar>
                    </div>

                    <div>
                        <h3>SKHU Mentoring 회원 정보 수정</h3>
                        <p>이전 비밀번호를 입력하고 확인 후 수정 작업을 진행할 수 있습니다.</p>
                        <p>참고로 이름은 수정이 불가능합니다. 개명을 하셨으면 관리자에게 연락하여 조치하시길 바랍니다.</p>
                    </div>
                    <br/>

                    <div>
                        <Field name="before_password" type="password" className={classes.textField} component={renderTextField} label="이전 비밀번호" placeholder="이전 비밀번호를 입력하세요." readOnly={confirm ? true : false} />
                    </div>
                    <br/>

                    {
                        !confirm ?
                            <button type="button"
                                className={`w3-button w3-round-large ${confirm === null ? 'w3-blue' : confirm && signUpdateForm.syncErrors && !signUpdateForm.syncErrors.before_password ? 'w3-green' : 'w3-red'}`}
                                onClick={() => this.handleClickPasswordConfirm()}>
                                {confirm === null ? '비밀번호 확인' : confirm && signUpdateForm.syncErrors && !signUpdateForm.syncErrors.before_password ? '확인 되었습니다.' : '다시 시도'}
                            </button> : ''
                    }
                    <br/>

                    <div>
                        <Field name="main_password" className={classes.textField} type="password" component={renderTextField} label="새로운 비밀번호" placeholder="이용할 비밀번호를 입력하세요." readOnly={confirm ? false : true} />
                    </div>
                    <br/>

                    <div>
                        <Field name="sub_password" className={classes.textField} type="password" component={renderTextField} label="새로운 비밀번호 확인" placeholder="이용할 비밀번호를 다시 입력하세요." readOnly={confirm ? false : true} />
                    </div>
                    <br/>

                    <div>
                        <Field name="name" className={classes.textField} type="text" component={renderTextField} label="이름" readOnly={true} placeholder="이름을 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="email" className={classes.textField} type="text" component={renderTextField} label="E-Mail" placeholder="E-Mail를 입력하세요." readOnly={confirm ? false : true} />
                    </div>
                    <br/>

                    <div>
                        <Field name="phone" className={classes.textField} type="text" component={renderTextField} label="휴대폰 번호" placeholder="휴대폰 번호를 입력하세요." readOnly={confirm ? false : true} />
                    </div>
                    <br/>

                    {
                        principal && (principal.type === 'PROFESSOR' || principal.type === 'EMPLOYEE') ?
                            <div>
                                <Field name="officePhone" className={classes.textField} type="text" component={renderTextField} label="사무실 전화번호" placeholder="사무실 전화번호를 입력하세요." readOnly={confirm ? false : true} />
                                <br/><br/>
                            </div> : ''
                    }

                    {
                        principal && (principal.type === 'PROFESSOR' || principal.type === 'EMPLOYEE') ?
                            <div>
                                <Field name="officePlace" className={classes.textField} type="text" component={renderTextField} label="사무실 위치" placeholder="사무실 위치를 입력하세요." readOnly={confirm ? false : true} />
                                <br/><br/>
                            </div> : ''
                    }

                    {
                        confirm ?
                            <div>
                                <Field name="gender" component={ renderRadioGroup }>
                                    <FormLabel component="legend">성별</FormLabel>
                                    <FormControlLabel
                                        value="MALE"
                                        control={<Radio color="primary" />}
                                        label="남"
                                    />
                                    <FormControlLabel
                                        value="FEMALE"
                                        control={<Radio color="secondary" />}
                                        label="여"
                                    />
                                    <div className="w3-text-pink">
                                        <h7>{ signUpdateForm && signUpdateForm.syncErrors !== undefined ? signUpdateForm.syncErrors.gender : '' }</h7>
                                    </div>
                                </Field>
                                <br/>
                            </div> : ''
                    }

                    {
                        confirm && principal && principal.type === 'PROFESSOR' ?
                            <div>
                                <Field name="hasChairman" label="학과장 여부" component={ renderCheckBox } />
                                <br/>
                            </div> : ''
                    }

                    {
                        confirm && principal && (principal.type === 'STUDENT' || principal.type === 'PROFESSOR') ?
                            <div>
                                <Field name="departmentId" label={ principal && principal.type === 'STUDENT' ? '전공 학과' : '주 담당 학과'} component={ renderSelectField } children={
                                    departments.map((department) => <option key={`dept_${department.id}`} value={department.id}>{department.name}</option>)
                                } />
                                <br/>
                            </div> : ''
                    }

                    {
                        confirm && principal && principal.type === 'STUDENT' ?
                            <div>
                                <Field name="grade" component={ renderRadioGroup }>
                                    <FormLabel component="legend">학년</FormLabel>
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio color="primary" />}
                                        label="1"
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio color="primary" />}
                                        label="2"
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={<Radio color="primary" />}
                                        label="3"
                                    />
                                    <FormControlLabel
                                        value="4"
                                        control={<Radio color="primary" />}
                                        label="4"
                                    />
                                </Field>
                                <div className="w3-text-pink">
                                    <h7>{ signUpdateForm && signUpdateForm.syncErrors ? signUpdateForm.syncErrors.grade : '' }</h7>
                                </div>
                                <br/>
                            </div> : ''
                    }

                    {
                        confirm ?
                            <div>
                                <FormLabel component="legend">{ principal && principal.type === 'STUDENT' ? '복수전공 / 부전공' : principal.type === 'PROFESSOR' ? '타 담당 학과' : '담당 학과'}</FormLabel>
                                {
                                    departments
                                        .filter(department => {
                                            return department.id != (signUpdateForm && signUpdateForm.values !== undefined ? signUpdateForm.values.departmentId : -1)
                                        })
                                        .map(department => <Field key={`muldept${department.id}`} name={`muldept_${department.id}`} label={department.name} component={ renderCheckBox } />)
                                }
                                <div className="w3-text-pink">
                                    <h7>{ signUpdateForm && signUpdateForm.syncErrors ? signUpdateForm.syncErrors.muldept_1 : '' }</h7>
                                </div>
                                <br/>
                            </div> : ''
                    }

                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon} /> 수정 진행
                        </Button>
                    </div>
                </Grid>
            </form>
        );
    }
}

SignUpdateForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form: 'signUpdateForm',
    enableReinitialize : true,
    validate
})(withStyles(styles)(withRouter(SignUpdateForm)));
