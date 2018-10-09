import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import {renderTextField, renderRadioGroup, renderSelectField, renderCheckBox } from "../form_render";

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';

import {guestCreateAccount, guestCreateAccountSuccess, guestCreateAccountFailure} from "../../action/action_account";
import {ACCOUNT_URL} from "../../action/distribute_urls";

const RESOURCE_ROOT_URL = `${ACCOUNT_URL}/resource`;

function validate(values){
    var errors = {};
    var hasErrors = false;

    var studentNumEmp = /^20([0-9]{7})$/;

    if(!values.identity || values.identity.trim() === ''){
        errors.identity = '아이디를 입력 바랍니다.';
        hasErrors = true;
    } else if(values.type === 'STUDENT' && !values.identity.match(studentNumEmp)){
        errors.identity = '학생 아이디는 학번입니다.';
        hasErrors = true;
    } else if(values.confirm === null){
        errors.identity = '아이디 확인 진행 바랍니다.';
        hasErrors = true;
    } else if(values.confirm === false){
        errors.identity = '이미 존재하는 아이디입니다.';
        hasErrors = true;
    }

    var passwordPattern = /^[A-Za-z0-9]{6,12}$/;

    if(!values.main_password || values.main_password.trim() === ''){
        errors.main_password = '비밀번호를 입력하세요.';
        hasErrors = true;
    } else if(!values.main_password.match(passwordPattern)){
        errors.main_password = '비밀번호도 영어 대-소문자, 숫자를 포함한 6~12자로 입력하세요.';
        hasErrors = true;
    }

    if(!values.sub_password || values.sub_password.trim() === ''){
        errors.sub_password = '비밀번호 확인을 부탁 드립니다.';
        hasErrors = true;
    } else if(values.sub_password !== values.main_password){
        errors.sub_password = '비밀번호 확인이 일치하지 않습니다.';
        hasErrors = true;
    }

    if(!values.name || values.name.trim() === ''){
        errors.name = '이름을 입력하세요.';
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
    let signForm = {};
    let type = '';
    let selectDepts = Object.keys(value).filter(key => key.startsWith('muldept_', 0));
    switch(value.type){
        case 'STUDENT' :
            signForm = {
                identity : value.identity,
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
                identity : value.identity,
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
                identity : value.identity,
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
    return dispatch(guestCreateAccount(type, signForm)).then(
        (response) => {
            if(response.payload && response.payload.status !== 201){
                dispatch(guestCreateAccountFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(guestCreateAccountSuccess(response.payload));
        }
    ).catch(reason => {
        dispatch(guestCreateAccountFailure("회원의 이름과 이메일이 중복된 회원이 있거나 서버 측에서 회원 가입 오류입니다. 다시 시도 바랍니다."));
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

class SignForm extends Component {
    constructor(props){
        super(props);
        this.state = { type : 'STUDENT', confirm : null }
    }

    componentWillMount(){
        this.props.fetchDepartments();
    }

    componentWillUnmount(){
        this.props.resetFetchDepartments();
        this.props.resetCreateAccount();
    }

    handleChangeType(anotherType){
        this.setState({
            type : anotherType,
            confirm : null
        });
        this.props.reset();
    }

    handleClickConfirm(){
        const { signForm } = this.props;
        var studentNumEmp = /^20([0-9]{7})$/;
        if(signForm.values && signForm.values.identity !== undefined){
            if((signForm.values.type === 'STUDENT' && signForm.values.identity.match(studentNumEmp)) || signForm.values.type === 'EMPLOYEE' || signForm.values.type === 'PROFESSOR')
                axios.get(`${RESOURCE_ROOT_URL}/exist_account/${signForm.values.identity}`).then(response => {
                    this.setState({
                        confirm : !response.data
                    });
                }).catch(reason => this.setState({ confirm : null }));
        } else {
            alert("아이디를 입력 해 주세요! 학생은 학번입니다.");
        }
    }

    render(){
        const { type, confirm } = this.state;
        const { classes, handleSubmit, signForm } = this.props;
        const { departments } = this.props.departmentList;
        const { message, error } = this.props.signStatus;

        if(message){
            alert(message);
            this.props.history.push("/login");
        } else if(error){
            alert(error);
            this.props.history.push("/");
        }

        this.props.change('type', type);
        this.props.change('confirm', confirm);

        return(
            <form onSubmit={handleSubmit(validateAndSubmitSign)} className={classes.form}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <PersonAddIcon />
                        </Avatar>
                    </div>

                    <div>
                        <h3>SKHU Mentoring 회원 가입</h3>
                        <p>회원 유형을 선택하고 진행하시면 됩니다.</p>
                        <p>임의의 값을 입력한다면 관리자에 의해 삭제된다는 점 알아두시길 바랍니다.</p>
                    </div>
                    <br/>

                    <div>
                        <button type="button" className={`w3-button w3-round-large ${type === 'STUDENT' ? 'w3-blue' : 'w3-yellow'}`} onClick={() => this.handleChangeType("STUDENT")}>학생</button>
                        &nbsp;
                        <button type="button" className={`w3-button w3-round-large ${type === 'PROFESSOR' ? 'w3-blue' : 'w3-yellow'}`} onClick={() => this.handleChangeType("PROFESSOR")}>교수</button>
                        &nbsp;
                        <button type="button" className={`w3-button w3-round-large ${type === 'EMPLOYEE' ? 'w3-blue' : 'w3-yellow'}`} onClick={() => this.handleChangeType("EMPLOYEE")}>직원</button>
                    </div>
                    <br/>

                    <div>
                        <Field name="identity" className={classes.textField} type="text" component={renderTextField} label="사용자 ID" placeholder="이용할 ID를 입력하세요." readOnly={confirm ? true : false} />
                    </div>
                    <br/>

                    <button type="button" className={`w3-button w3-round-large ${confirm === null ? 'w3-blue' : confirm && signForm.syncErrors && !signForm.syncErrors.identity ? 'w3-green' : 'w3-red'}`} onClick={() => this.handleClickConfirm()}>
                        { confirm === null  ? '중복 확인' : confirm && signForm.syncErrors && !signForm.syncErrors.identity ? '확인 되었습니다.' : '다시 시도' }
                    </button>
                    <br/>

                    <div>
                        <Field name="main_password" className={classes.textField} type="password" component={renderTextField} label="사용자 비밀번호" placeholder="이용할 비밀번호를 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="sub_password" className={classes.textField} type="password" component={renderTextField} label="비밀번호 확인" placeholder="이용할 비밀번호를 다시 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="name" className={classes.textField} type="text" component={renderTextField} label="이름" placeholder="이름을 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="email" className={classes.textField} type="text" component={renderTextField} label="E-Mail" placeholder="E-Mail를 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <Field name="phone" className={classes.textField} type="text" component={renderTextField} label="휴대폰 번호" placeholder="휴대폰 번호를 입력하세요." />
                    </div>
                    <br/>

                    {
                        type === 'PROFESSOR' || type === 'EMPLOYEE' ?
                            <div>
                                <Field name="officePhone" className={classes.textField} type="text" component={renderTextField} label="사무실 전화번호" placeholder="사무실 전화번호를 입력하세요." />
                                <br/><br/>
                            </div> : ''
                    }

                    {
                        type === 'PROFESSOR' || type === 'EMPLOYEE' ?
                            <div>
                                <Field name="officePlace" className={classes.textField} type="text" component={renderTextField} label="사무실 위치" placeholder="사무실 위치를 입력하세요." />
                                <br/><br/>
                            </div> : ''
                    }

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
                                <h7>{ signForm && signForm.syncErrors !== undefined ? signForm.syncErrors.gender : '' }</h7>
                            </div>
                        </Field>
                    </div>
                    <br/>

                    {
                        type === 'PROFESSOR' ?
                            <div>
                                <Field name="hasChairman" label="학과장 여부" component={ renderCheckBox } />
                                <br/>
                            </div> : ''
                    }

                    {
                        type === 'STUDENT' || type === 'PROFESSOR' ?
                        <div>
                            <Field name="departmentId" label={ type === 'STUDENT' ? '전공 학과' : '주 담당 학과'} component={ renderSelectField } children={
                                departments.map((department) => <option key={`dept_${department.id}`} value={department.id}>{department.name}</option>)
                            } />
                            <br/>
                        </div> : ''
                    }

                    {
                        type === 'STUDENT' ?
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
                                <h7>{ signForm && signForm.syncErrors ? signForm.syncErrors.grade : '' }</h7>
                            </div>
                            <br/>
                        </div> : ''
                    }

                    <div>
                        <FormLabel component="legend">{ type === 'STUDENT' ? '복수전공 / 부전공' : type === 'PROFESSOR' ? '타 담당 학과' : '담당 학과'}</FormLabel>
                        {
                            departments
                                .filter(department => {
                                    return department.id != (signForm && signForm.values !== undefined ? signForm.values.departmentId : -1)
                                })
                                .map(department => <Field key={`muldept${department.id}`} name={`muldept_${department.id}`} label={department.name} component={ renderCheckBox } />)
                        }
                        <div className="w3-text-pink">
                            <h7>{ signForm && signForm.syncErrors ? signForm.syncErrors.muldept_1 : '' }</h7>
                        </div>
                    </div>
                    <br/>

                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon} /> 가입 진행
                        </Button>
                    </div>
                </Grid>
            </form>
        )
    }
}

SignForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'signForm',
    validate
})(withStyles(styles)(withRouter(SignForm)));