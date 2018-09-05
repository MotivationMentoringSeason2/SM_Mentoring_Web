import React, {Component} from 'react';
import {renderTextField} from "../form_render";

import {reduxForm, Field, SubmissionError} from 'redux-form';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import CheckIcon from '@material-ui/icons/Check';
import FindIcon from '@material-ui/icons/FindInPage';

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

const validateAndFindIdentity = (values, dispatch) => {
    console.log(values);
}

class FindIdentityForm extends Component {
    render(){
        const {classes, handleSubmit} = this.props;
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
                        <h3>아이디 찾기</h3>
                        <p>학생 아이디는 학번입니다.</p>
                        <p>아이디를 조회하기 위해 이름과 E-Mail, 휴대폰 번호를 입력하세요.</p>
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
                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon} /> 조회하기
                        </Button>
                    </div>
                </Grid>
            </form>
        )
    }
}

FindIdentityForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'findIdentityForm'
})(withStyles(styles)(FindIdentityForm));