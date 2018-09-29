import React, {Component} from 'react';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TimeIcon from '@material-ui/icons/Timeline';
import CheckIcon from '@material-ui/icons/Check';

import { renderTextField } from "../form_render";

import MultiTimetable from "../timetable_component/MultiTimetable";

import {
    mentoCreateClassTime, mentoCreateClassTimeSuccess, mentoCreateClassTimeFailure,
    mentoUpdateClassTIme, mentoUpdateClassTimeSuccess, mentoUpdateClassTimeFailure
} from "../../action/action_class_time";

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

const validateAndSubmitScheduleForm = (values, dispatch) => {
    const scheduleForm = {
        method : values && values.method,
        classDate : values && values.classDate,
        startTime : values && values.startTime,
        endTime : values && values.endTime
    }
    if(values.type === 'CREATE'){
        dispatch(mentoCreateClassTime(values.teamId, scheduleForm)).then((response) => {
            if (response.payload && response.payload.status !== 200) {
                dispatch(mentoCreateClassTimeFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(mentoCreateClassTimeSuccess(response.payload));
        });
    } else {
        dispatch(mentoUpdateClassTIme(values.teamId, values.scheduleId, scheduleForm)).then((response) => {
            if (response.payload && response.payload.status !== 200) {
                dispatch(mentoUpdateClassTimeFailure(response.payload));
                throw new SubmissionError(response.payload.data);
            }
            dispatch(mentoUpdateClassTimeSuccess(response.payload));
        });
    }
}

function validate(values){
    var errors = {};
    var hasErrors = false;
    if(!values.method || values.method.trim() === ''){
        errors.method = '수업 진행 방식을 입력하세요.';
        hasErrors = true;
    }

    const current = new Date();
    if(!values.classDate || values.classDate.trim() === ''){
        errors.classDate = `수업 일자를 입력해주세요.`;
        hasErrors = true;
    } else if(values.type === 'CREATE' && moment(values.classDate, "YYYY-MM-DD").isBefore(current)) {
        errors.classDate = `입력 날짜는 오늘 이후로 입력해주시길 바랍니다. 오늘 날짜는 ${current.toLocaleDateString()} 입니다.`;
        hasErrors = true;
    }

    if(!values.startTime || values.startTime.trim() === ''){
        errors.startTime = `수업 시작 시간을 입력해주세요.`;
        hasErrors = true;
    }

    if(!values.endTime || values.endTime.trim() === ''){
        errors.endTime = `수업 시작 시간을 입력해주세요.`;
        hasErrors = true;
    }else if(moment(values.endTime, "HH:mm").isSame(moment(values.startTime, "HH:mm")) || moment(values.endTime, "HH:mm").isBefore(moment(values.startTime, "HH:mm"))) {
        errors.endTime = `수업 시작 시간과 종료 시간의 범위가 유효하지 않습니다.`;
        hasErrors = true;
    }

    return hasErrors && errors;
}

class ClassScheduleForm extends Component {
    constructor(props){
        super(props);
        const { data } = props.mentoringToken;
        this.state = { token : data }
    }

    componentWillMount(){
        const query = queryString.parse(this.props.location.search);
        const { principal } = this.props.accessAccount;
        this.props.fetchMentoringToken(principal.identity);
        if(query && query.id){
            this.props.fetchClassTimeModel(query.id);
        }
    }

    componentWillReceiveProps(nextProps){
        const { token } = this.state;
        if(nextProps.mentoringToken.data !== null && token !== nextProps.mentoringToken.data){
            const { data } = nextProps.mentoringToken;
            this.setState({
                token : data
            });
            this.props.fetchMentoringPeople(data.id);
        }
    }

    componentWillUnmount(){
        const query = queryString.parse(this.props.location.search);
        if(query && query.id){
            this.props.resetFetchClassTimeModel();
        }
        this.props.resetFetchMentoringPeople();
        this.props.resetSaveClassTime();
    }

    render() {
        const { token } = this.state;
        const {classes, handleSubmit} = this.props;
        const query = queryString.parse(this.props.location.search);
        const { people } = this.props.mentoringPeople;
        const { model } = this.props.timeModel;
        const { message, error } = this.props.saveStatus;

        if(token && model && token.id !== model.teamId){
            alert("현재 선택하신 팀은 다른 멘토링 시간 설정대입니다. 이전으로 돌아갑니다.")
            this.props.history.push("/mento/class/edit");
        }

        if(model){
            this.props.change("teamId", model.teamId);
        } else if(token) {
            this.props.change("teamId", token.id);
        }

        if(query && query.id){
            this.props.change("type", "UPDATE");
            this.props.change("scheduleId", query.id);
        } else {
            this.props.change("type", "CREATE");
        }

        if(message){
            alert(message);
            this.props.history.push("/mento/class/edit");
        } else if(error) {
            alert("멘토링 수업 시간 삭제 작업 중 오류가 발생 하였습니다. 홈으로 이동합니다.");
            this.props.history.push("/mento/class/edit");
        }

        return (
            <form className={classes.form} onSubmit={handleSubmit(validateAndSubmitScheduleForm)}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <TimeIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>멘토링 수업 시간 {query && query.id ? "수정" : "등록"}</h3>
                        <p>멘토링 수업 시간에 대하여 {query && query.id ? "수정" : "등록"} 작업을 진행 합니다.</p>
                        <p>수업 시간에 대한 보고서가 통과 되면 수정할 수 없습니다.</p>
                    </div>
                    <br/>

                    <div>
                        <Field name="method" className={classes.textField} type="text"
                               component={renderTextField} label="수업 방식" placeholder="수업 방식을 입력하세요."/>
                    </div>
                    <br/>

                    <div>
                        <label>수업 진행 날짜</label>
                        <Field name="classDate" className={classes.textField} type="date"
                               component={renderTextField} />
                    </div>
                    <br/>

                    <div>
                        <label>수업 시작 시각</label>
                        <Field name="startTime" className={classes.textField} type="time"
                               component={renderTextField} />
                    </div>
                    <br/>

                    <div>
                        <label>수업 종료 시각</label>
                        <Field name="endTime" className={classes.textField} type="time"
                               component={renderTextField} />
                    </div>
                    <br/>

                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon}/> 작성 완료
                        </Button>
                        &nbsp;
                        <Link to="/mento/class/edit"><button type="button" className="w3-button w3-yellow w3-round-large">이전으로</button></Link>
                    </div>
                    <br/>
                    <MultiTimetable person={people} />
                </Grid>
            </form>
        )
    }
}
export default reduxForm({
    form : 'noticeForm',
    enableReinitialize : true,
    validate
})(withStyles(styles)(withRouter(ClassScheduleForm)));