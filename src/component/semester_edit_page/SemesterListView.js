import React, {Component} from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import CheckIcon from '@material-ui/icons/Check';
import DNSIcon from '@material-ui/icons/Dns';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {renderTextField} from "../form_render";

import {
    adminCreateSemester, adminCreateSemesterSuccess, adminCreateSemesterFailure
} from "../../action/action_semester";

function validate(values){
    var errors = {};
    var hasErrors = false;

    if(!values.name || values.name.trim() === ''){
        errors.name = '학기 이름을 입력하세요.';
        hasErrors = true;
    }

    if(!values.startDate || values.startDate.trim() === ''){
        errors.startDate = '학기 시작 날짜를 입력하세요.';
        hasErrors = true;
    }

    if(!values.endDate || values.endDate.trim() === ''){
        errors.endDate = '학기 종료 날짜를 입력하세요.';
        hasErrors = true;
    } else {
        const sd = moment(values.startDate, "YYYY-MM-DD");
        const ed = moment(values.endDate, "YYYY-MM-DD");
        if(sd.isSameOrAfter(ed)){
            errors.endDate = '학기 시작 날짜와 종료 날짜가 서로 바뀌었습니다.';
            hasErrors = true;
        }
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

const validateAndSubmitSemesterForm = (values, dispatch) => {
    const semesterModel = {
        name : values && values.name,
        startDate : values && new Date(values.startDate),
        endDate : values && new Date(values.endDate)
    }
    dispatch(adminCreateSemester(semesterModel)).then((response) => {
        if (response.payload && response.payload.status !== 200) {
            dispatch(adminCreateSemesterFailure(response.payload));
            throw new SubmissionError(response.payload.data);
        }
        dispatch(adminCreateSemesterSuccess(response.payload));
    });
}

class SemesterListView extends Component {
    componentWillMount(){
        this.props.fetchSemesterList();
    }

    componentWillUnmount(){
        this.props.resetSaveSemester();
        this.props.resetFetchSemesterList();
    }

    render(){
        const { classes, handleSubmit } = this.props;
        const { semesters } = this.props.semesterList;
        const { message, error } = this.props.saveStatus;

        if(message){
            alert(message);
            this.props.history.push('/admin/semester/edit/_refresh');
        } else if(this.props.saveStatus.error){
            alert(error);
            this.props.history.push('/admin/semester/edit/_refresh');
        }
        return(
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <DNSIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>학기 목록 편집</h3>
                        <p>현재 등록된 학기들을 편집합니다.</p>
                        <p>학기는 대부분 1학기는 3월부터 8월말, 2학기는 9월부터 오는 2월말 까지로 설정합니다.</p>
                    </div>
                    <form className={classes.form} onSubmit={handleSubmit(validateAndSubmitSemesterForm)}>
                        <div>
                            <Field name="name" className={classes.textField} type="text"
                                   component={renderTextField} label="학기 이름" placeholder="수업 방식을 입력하세요."/>
                        </div>
                        <br/>

                        <div>
                            <label>학기 시작 날짜</label>
                            <Field name="startDate" className={classes.textField} type="date"
                                   component={renderTextField} />
                        </div>
                        <br/>

                        <div>
                            <label>학기 종료 날짜</label>
                            <Field name="endDate" className={classes.textField} type="date"
                                   component={renderTextField} />
                        </div>
                        <br/>

                        <div>
                            <Button variant="contained" type="submit" color="primary">
                                <CheckIcon className={classes.leftIcon}/> 작성 완료
                            </Button>
                        </div>
                    </form>
                    <br/>
                    <div className="w3-container" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        {
                            semesters.map((semester, idx) =>
                                <div key={`semester_${idx}`} className="w3-margin w3-padding-16 w3-round-large w3-border w3-border-brown w3-sand">
                                    <p><span className="w3-round-medium w3-tag w3-orange">{semester.name}</span></p>
                                    <h3>학기 시작 기간</h3>
                                    <p>{new Date(semester.startDate).toLocaleDateString()}</p>
                                    <h3>학기 종료 기간</h3>
                                    <p>{new Date(semester.endDate).toLocaleDateString()}</p>
                                </div>
                            )
                        }
                    </div>
                </Grid>
            </div>
        )
    }
}

export default reduxForm({
    form : 'semesterForm',
    validate
})(withStyles(styles)(withRouter(SemesterListView)));