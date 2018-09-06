import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import {reduxForm, FieldArray} from "redux-form";
import {renderTimetable} from "../form_render";


function validate(values){
    var errors = {};
    var hasErrors = false;

    let valueKeys = Object.keys(values).filter(key => values[key].length > 0);

    if(valueKeys.length === 0){
        errors.totalMessage = '최소 일주일에 한 타임을 입력해주셔야 합니다.';
        hasErrors = true;
    } else {
        for(var i=0;i<valueKeys.length;i++){
            const dayKey = valueKeys[i];
            const dayArray = values[valueKeys[i]];
            const startTimes = [];
            const endTimes = [];
            for(var j=0;j<dayArray.length;j++){
                if(!dayArray[j].startTime || dayArray[j].startTime.trim() === ''){
                    errors[dayKey] = `${j+1} 번째 시작 시간을 입력해주세요.`;
                    hasErrors = true;
                    break;
                } else {
                    if(moment(dayArray[j].startTime, "HH:mm").isBefore(moment("09:00", "HH:mm"))){
                        errors[dayKey] = `${j+1} 번째 시작 시간을 9시 이후로 입력하세요.`;
                        hasErrors = true;
                        break;
                    } else if(moment(dayArray[j].startTime, "HH:mm").minute() % 15 !== 0){
                        errors[dayKey] = `${j+1} 번째 시작 시간 단위는 15분으로 입력하세요.`;
                        hasErrors = true;
                        break;
                    } else {
                        startTimes.push(moment(dayArray[j].startTime, "HH:mm"));
                    }
                }
                if(!dayArray[j].endTime || dayArray[j].endTime.trim() === ''){
                    errors[dayKey] = `${j+1} 번째 종료 시간을 입력해주세요.`;
                    hasErrors = true;
                    break;
                } else if(moment(dayArray[j].endTime, "HH:mm").minute() % 15 !== 0) {
                    errors[dayKey] = `${j + 1} 번째 종료 시간 단위는 15분으로 입력하세요.`;
                    hasErrors = true;
                    break;
                }else {
                    if (moment(dayArray[j].endTime, "HH:mm").isAfter(moment("21:00", "HH:mm"))) {
                        errors[dayKey] = `${j + 1} 번째 시작 시간을 21시 이전으로 입력하세요.`;
                        hasErrors = true;
                        break;
                    } else {
                        endTimes.push(moment(dayArray[j].endTime, "HH:mm"));
                    }
                }
            }
            if(startTimes.length === endTimes.length){
                for(var k=0;k<startTimes.length;k++){
                    var tmpStart = startTimes[k];
                    var tmpEnd = endTimes[k];
                    for(var l=0;l<startTimes.length;l++){
                        if(k !== l){
                            if(tmpStart.isSame(startTimes[l]) || tmpStart.isSame(endTimes[l])) {
                                errors[dayKey] = `${k + 1} 번째 시작 시간과 ${l + 1} 번째 ${tmpStart.isSame(startTimes[l]) ? '시작' : '종료'} 시간이 같습니다.`;
                                hasErrors = true;
                                break;
                            }else if(tmpEnd.isSame(startTimes[l]) || tmpEnd.isSame(endTimes[l])){
                                errors[dayKey] = `${k + 1} 번째 종료 시간과 ${l + 1} 번째 ${tmpEnd.isSame(startTimes[l]) ? '시작' : '종료'} 시간이 같습니다.`;
                                hasErrors = true;
                                break;
                            } else if(tmpStart.isBetween(startTimes[l], endTimes[l]) || tmpEnd.isBetween(startTimes[l], endTimes[l])){
                                errors[dayKey] = `${k + 1} 번째 시간 범위가 겹칩니다.`;
                                hasErrors = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    return hasErrors && errors;
}

const validateAndSubmitTimetable = (value, dispatch) => {
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

class TimetableEditForm extends Component{
    componentWillMount(){
        this.props.fetchCurrentTimetables();
    }

    componentWillUnmount(){
        this.props.resetFetchCurrentTimetables();
    }

    render(){
        const { classes, handleSubmit } = this.props;
        const { timetableForm } = this.props;
        return (
            <form onSubmit={handleSubmit(validateAndSubmitTimetable)} className={classes.form}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <EventAvailableIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>가능한 시간표 설정</h3>
                        <p>학생이 설정하는 시간대는 멘토링이 가능한 시간대입니다.</p>
                        <p>교 / 직원이 설정하는 시간대는 멘토링 관련 상담이 가능한 시간대입니다.</p>
                    </div>
                    <br/>

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-red">月</span>
                        <h3>월요일</h3>
                        <FieldArray name="monAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>
                    {
                        timetableForm && timetableForm.syncErrors ?
                            <div className="w3-text-pink">
                                <h7>{ timetableForm && timetableForm.syncErrors ? timetableForm.syncErrors.monAvailable : '' }</h7>
                                <br/>
                            </div>
                            : ''
                    }

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-orange">火</span>
                        <h3>화요일</h3>
                        <FieldArray name="tueAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>
                    {
                        timetableForm && timetableForm.syncErrors ?
                            <div className="w3-text-pink">
                                <h7>{ timetableForm && timetableForm.syncErrors ? timetableForm.syncErrors.tueAvailable : '' }</h7>
                                <br/>
                            </div>
                            : ''
                    }

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-yellow">水</span>
                        <h3>수요일</h3>
                        <FieldArray name="wedAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>
                    {
                        timetableForm && timetableForm.syncErrors ?
                            <div className="w3-text-pink">
                                <h7>{ timetableForm && timetableForm.syncErrors ? timetableForm.syncErrors.wedAvailable : '' }</h7>
                                <br/>
                            </div>
                            : ''
                    }

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-green">木</span>
                        <h3>목요일</h3>
                        <FieldArray name="thuAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>
                    {
                        timetableForm && timetableForm.syncErrors ?
                            <div className="w3-text-pink">
                                <h7>{ timetableForm && timetableForm.syncErrors ? timetableForm.syncErrors.thuAvailable : '' }</h7>
                                <br/>
                            </div>
                            : ''
                    }

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-blue">金</span>
                        <h3>금요일</h3>
                        <FieldArray name="friAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>
                    {
                        timetableForm && timetableForm.syncErrors ?
                            <div className="w3-text-pink">
                                <h7>{ timetableForm && timetableForm.syncErrors ? timetableForm.syncErrors.friAvailable : '' }</h7>
                                <br/>
                            </div>
                            : ''
                    }


                    {
                        timetableForm && timetableForm.syncErrors ?
                            <div className="w3-text-pink">
                                <h7>{ timetableForm && timetableForm.syncErrors ? timetableForm.syncErrors.totalMessage : '' }</h7>
                            </div>
                            :
                            <div>
                                <Button variant="contained" type="submit" color="primary">
                                    <CheckIcon className={classes.leftIcon} /> 설정하기
                                </Button>
                            </div>
                    }
                </Grid>
            </form>
        );
    }
}

TimetableEditForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default reduxForm({
    form : 'timetableForm',
    enableReinitialize : true,
    validate
})(withStyles(styles)(TimetableEditForm));