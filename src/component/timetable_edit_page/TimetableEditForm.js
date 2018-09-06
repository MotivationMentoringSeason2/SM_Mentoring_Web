import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {reduxForm, FieldArray} from "redux-form";
import {renderTimetable} from "../form_render";


function validate(values){

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

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-orange">火</span>
                        <h3>화요일</h3>
                        <FieldArray name="tueAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-yellow">水</span>
                        <h3>수요일</h3>
                        <FieldArray name="wedAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-green">木</span>
                        <h3>목요일</h3>
                        <FieldArray name="thuAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>

                    <div>
                        <span className="w3-badge w3-xxlarge w3-padding w3-blue">金</span>
                        <h3>금요일</h3>
                        <FieldArray name="friAvailable" textFieldClass={classes.textField} component={renderTimetable} />
                    </div>
                    <br/>

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