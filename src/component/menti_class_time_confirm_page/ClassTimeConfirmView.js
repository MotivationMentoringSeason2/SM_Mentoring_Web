import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

import TimeIcon from '@material-ui/icons/Timeline';
import {MultiTimetable} from "../timetable_component";

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class ClassTimeConfirmView extends Component {
    constructor(props){
        super(props);
        const { data } = props.mentoringToken;
        this.state = { token : data };
    }

    componentWillMount(){
        const { principal } = this.props.accessAccount;
        this.props.fetchMentoringToken(principal.identity);
    }

    componentWillReceiveProps(nextProps){
        const { token } = this.state;
        if(nextProps.mentoringToken.data !== null && token !== nextProps.mentoringToken.data){
            const { data } = nextProps.mentoringToken;
            this.setState({
                token : data
            });
            this.props.fetchClassTimes(data.id);
            this.props.fetchMentoringPerson(data.id);
        }
    }

    componentWillUnmount(){
        this.props.resetFetchMentoringPerson();
        this.props.resetFetchClassTimes();
        this.props.resetFetchMentoringToken();
    }

    render(){
        const { token } = this.state;
        const { classes } = this.props;
        const { times } = this.props.classTimes;
        const { people } = this.props.mentoringPeople;
        let timeTr = times.length > 0 ?
            times.map((time, idx) =>
                <tr key={`time_identity_${idx}`}>
                    <td>{idx + 1} 회차</td>
                    <td>{ time.classType }</td>
                    <td>{ time.classDate } {time.startTime}~{time.endTime}</td>
                    <td className={time.status === 'LOADING' ? '' : time.status === 'PERMIT' ? 'w3-pale-green' : 'w3-pale-red'}>
                        { time.status === 'LOADING' ? '심사 중' :
                            time.status === 'REJECT' ? '반려' : '인정' }
                    </td>
                </tr>
            ) : <tr><td colSpan="4">현재까지 진행한 수업 내역이 없습니다.</td></tr>
        return(
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <TimeIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>{token && token.name}</h3>
                        <h3>멘토링 수업 진행 결과</h3>
                        <p>멘토링 수업을 진행하면서 현재 동안 인정 받은 시간들입니다.</p>
                        <p>멘토링이 가능한 시간은 아래 시간표를 참고하셔서 멘토와 상의하시길 바랍니다.</p>
                    </div>
                    <br/><br/>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-light-blue">
                                <th>진행 회차</th>
                                <th>수업 방식</th>
                                <th>수업 진행 시간</th>
                                <th>수업 결과</th>
                            </tr>
                            </thead>
                            <tbody>
                            {timeTr}
                            </tbody>
                        </table>
                    </div>
                    <br/><br/>
                    <MultiTimetable person={people}/>
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(withRouter(ClassTimeConfirmView));