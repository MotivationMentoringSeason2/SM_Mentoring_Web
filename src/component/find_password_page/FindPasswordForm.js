import React, {Component} from 'react';
import {renderTextField} from "../form_render";
import {
    guestFindIdentity, guestFindIdentitySuccess, guestFindIdentityFailure
} from "../../action/action_account";

import {reduxForm, Field, SubmissionError} from 'redux-form';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import CheckIcon from '@material-ui/icons/Check';
import FindIcon from '@material-ui/icons/FindInPage';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

function validate(values){
    var errors = {};
    var hasErrors = false;

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
    return hasErrors && errors;
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

const validateAndFindIdentity = (values, dispatch) => {
    return dispatch(guestFindIdentity(values)).then((response) => {
        if(response.payload && response.payload.status !== 200){
            dispatch(guestFindIdentityFailure(response.payload));
            throw new SubmissionError(response.payload.data);
        }
        dispatch(guestFindIdentitySuccess(response.payload));
    })
}

class FindPasswordForm extends Component {
    componentWillUnmount(){
        this.props.resetFindIdentity();
    }
    render(){
        let findResult;
        const {classes, handleSubmit} = this.props;
        const { message, error } = this.props.findStatus;
        if(message){
            findResult = (
                <div className="w3-panel w3-card-4 w3-pale-green w3-round-large" style={{ width : window.innerWidth >= 450 ? '60%' : '90%' }}>
                    { (window.innerWidth >= 450) ? <h3><DoneOutlineIcon /> 회원 아이디 조회를 성공하였습니다.</h3> : <h4><DoneOutlineIcon /> 회원 아이디 조회를 성공하였습니다.</h4> }
                    <p>{message}</p>
                </div>
            );
        } else if(error){
            findResult = (
                <div className="w3-panel w3-card-4 w3-pale-red w3-round-large" style={{ width : window.innerWidth >= 450 ? '60%' : '90%' }}>
                    { (window.innerWidth >= 450) ? <h3><ReportProblemIcon /> 회원 아이디 조회에 문제 발생!</h3> : <h4><ReportProblemIcon /> 회원 아이디 조회에 문제 발생!</h4> }
                    <p>{error}</p>
                </div>
            )
        }
        return(
            <form onSubmit={handleSubmit(validateAndFindIdentity)} className={classes.form}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <FindIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>비밀번호 찾기</h3>
                        <p>학생 아이디는 학번입니다.</p>
                        <p>비밀번호를 조회하기 위해 아이디와 E-Mail을 입력하세요.</p>
                    </div>
                    <br/>
                    <div>
                        <Field name="name" className={classes.textField} type="text" component={renderTextField} label="아이디" placeholder="아이디을 입력하세요." />
                    </div>
                    <br/>
                    <div>
                        <Field name="email" className={classes.textField} type="text" component={renderTextField} label="E-Mail" placeholder="E-Mail를 입력하세요." />
                    </div>
                    <br/>
  
                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon} /> 조회하기
                        </Button>
                    </div>
                    <br/>
                    {findResult}
                </Grid>
            </form>
        )
    }
}

FindPasswordForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'identityFindForm',
    validate
})(withStyles(styles)(FindPasswordForm));