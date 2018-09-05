import React, {Component} from 'react';
import axios from 'axios';
import { reduxForm, Field } from 'redux-form';
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

const RESOURCE_ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/resource';

function validate(values){
    var errors = {};
    var hasErrors = false;

    var pattern = /^[A-Za-z0-9]{6,12}$/;

    if(!values.confirm){
        errors.identity = '아이디 확인 진행 바랍니다.';
        hasErrors = true;
    }

    if(!values.main_password || values.main_password.trim() === ''){
        errors.main_password = '비밀번호를 입력하세요.';
        hasErrors = true;
    } else if(!values.main_password.match(pattern)){
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

    var emailExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
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

    if(values.type === 'STUDENT' || values.type === 'PROFESSOR')
        if(!values.departmentId || values.departmentId === 0){
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
            errors.officePlace = '전화 번호 형식을 확인하세요.';
            hasErrors = true;
        }
    }

    return hasErrors && errors;
}

const validateAndSubmitSign = (value, dispatch) => {
    console.log(value);
}

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
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
        this.state = { type : 'STUDENT', confirm : false }
    }

    componentWillMount(){
        this.props.fetchDepartments();
    }

    componentWillUnmount(){
        this.props.resetFetchDepartments();
    }

    handleChangeType(anotherType){
        this.setState({
            type : anotherType,
            confirm : false
        });
        this.props.reset();
    }

    handleClickConfirm(){
        const { signForm } = this.props;
        if(signForm.values){
            if(signForm.values.identity !== undefined){
                axios.get(`${RESOURCE_ROOT_URL}/exist_account/${signForm.values.identity}`).then(response => {
                    this.setState({
                        confirm : !response.data
                    });
                });
            } else {
                alert("아이디를 입력 해 주세요! 학생은 학번입니다.");
            }
        } else {
            alert("아이디를 입력 해 주세요! 학생은 학번입니다.");
        }
    }

    render(){
        const { type, confirm } = this.state;
        const { classes, handleSubmit, signForm } = this.props;
        const { departments } = this.props.departmentList;
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
                        <Field name="identity" className={classes.textField} type="text" component={renderTextField} label="사용자 ID" placeholder="이용할 ID를 입력하세요." />
                    </div>
                    <br/>

                    <button type="button" className={`w3-button w3-round-large ${confirm ? 'w3-green' : 'w3-red'}`} onClick={() => this.handleClickConfirm()}>
                        { confirm ? '확인 되었습니다.' : '중복 확인' }
                    </button>

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
                    </div>

                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            가입 진행
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
})(withStyles(styles)(SignForm));