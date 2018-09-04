import React, {Component} from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import KeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import {renderTextField} from "../form_render";

import { guestLoginProcess, guestLoginSuccess, guestLoginFailure } from "../../action/action_account";

function validate(values){
    var errors = {};
    var hasErrors = false;
    if(!values.identity || values.identity.trim() === ''){
        errors.identity = '사용자 아이디를 입력하세요.';
        hasErrors = true;
    }
    if(!values.password || values.password.trim() === ''){
        errors.password = '비밀번호를 입력하세요.';
        hasErrors = true;
    }
    return hasErrors && errors;
}

const validateAndAccountLogin = (values, dispatch) => {
    return dispatch(guestLoginProcess(values)).then((response) => {
        if(response.payload && response.payload.status !== 200){
            dispatch(guestLoginFailure(response.payload));
            throw new SubmissionError(response.payload.data);
        }
        localStorage.setItem('jwtToken', response.payload.data);
        dispatch(guestLoginSuccess(response.payload.data));
    }).catch((reason) => {
        console.log(reason.message);
        console.log(reason);
    })
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

class LoginForm extends Component{
    render(){
        const { handleSubmit, classes } = this.props;
        const { loading, error } = this.props.accessAccount;
        let loginResult = null;
        if(error){
            loginResult =
                <div className="w3-panel w3-pale-red w3-round-large">
                    <h3><ReportProblemIcon /> {error}</h3>
                </div>
        }
        return(
            <form onSubmit={handleSubmit(validateAndAccountLogin)} className={classes.form}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                    </div>
                    <div>
                        <Field name="identity" className={classes.textField} type="text" component={renderTextField} label="사용자 ID" placeholder="ID를 입력하세요." />
                    </div>
                    <br/>
                    <div>
                        <Field name="password" className={classes.textField} type="password" component={renderTextField} label="사용자 비밀번호" placeholder="비밀번호를 입력하세요." />
                    </div>
                    <br/>
                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <KeyIcon className={classes.leftIcon} /> 로그인
                        </Button>
                    </div>
                    <hr/>
                    {
                        error !== null ? loginResult : ''
                    }
                </Grid>
            </form>
        )
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'loginForm',
    validate
})(withStyles(styles)(LoginForm));