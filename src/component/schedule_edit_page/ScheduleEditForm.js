import React, {Component} from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import ScheduleIcon from '@material-ui/icons/Schedule';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class ScheduleEditForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            calendars : []
        };
    }

    componentWillMount(){
        this.props.fetchCalendarList();
    }

    componentWillUnmount(){
        this.props.resetExecuteUpdateSchedule();
        this.props.resetFetchCalendarList();
    }

    componentWillReceiveProps(nextProps){
        const { calendars } = this.props.calendarList;
        if(calendars !== nextProps.calendarList.calendars){
            this.calendarInitialize(nextProps.calendarList.calendars);
        }
    }

    calendarInitialize(calendars){
        let tmpCalendars = calendars.map((c) => ({
            id : c.id,
            writer : c.writer,
            context : c.context,
            startDate : c.startDate,
            endDate : c.endDate
        }));
        this.setState({
            calendars : tmpCalendars
        })
    }

    handleChange(event){
        const {calendars} = this.state;
        let tmpCalendars = calendars.slice();
        const id = event.target.id.replace(/[^0-9]/g, '') * 1;
        const alp = event.target.id.replace(/[^a-z]/g, '');
        tmpCalendars[id] = {
            ...tmpCalendars[id],
            startDate : (alp === 's') ? event.target.value : tmpCalendars[id].startDate,
            endDate : (alp === 'e') ? event.target.value : tmpCalendars[id].endDate
        }
        this.setState({
            calendars : tmpCalendars
        });
    }

    handleUpdateCalendar(id, startDate, endDate){
        const { principal } = this.props.accessAccount;
        const current = new Date();
        const sd = moment(startDate, "YYYY-MM-DD");
        const ed = moment(endDate, "YYYY-MM-DD");
        if(sd.year() < current.getFullYear()){
            alert(`입력 날짜를 올해로 입력하세요. 현재 년도는 ${current.getFullYear()} 년 입니다.`);
        } else if(sd.isAfter(ed)){
            alert("시작 날짜와 종료 날짜의 입력이 올바르지 않습니다. 순서를 바꾸어 작성하시길 바랍니다.");
        } else {
            this.props.executeUpdateSchedule({
                id : id,
                startDate : startDate,
                endDate : endDate
            }, principal.identity);
        }
    }

    render(){
        const { classes } = this.props;
        const { calendars } = this.state;
        if(this.props.saveStatus.message){
            alert(this.props.saveStatus.message);
            this.props.history.push('/schedule/edit/_refresh');
        } else if(this.props.saveStatus.error){
            alert(this.props.saveStatus.error);
            this.props.history.push('/schedule/edit/_refresh');
        }
        return(
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <ScheduleIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>스케쥴 조정</h3>
                        <p>이번 학기의 스케쥴을 수정합니다.</p>
                        <p>SM 사업의 스케쥴 형식이 바뀌게 되면 개발자에게 연락 바랍니다.</p>
                    </div>
                    <div className="w3-container" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        {
                            calendars.map((c, idx) =>
                                <div key={`calendar_${idx}`} className="w3-margin w3-padding-16 w3-round-large w3-border w3-border-brown">
                                    <p><span className="w3-round-medium w3-tag w3-blue-grey">{c.context}</span></p>
                                    <label>시작 기간</label>
                                    <input className="w3-input" style={{ width : '50%' }} type="date" id={`s${idx}`} onChange={this.handleChange.bind(this)} value={c.startDate} />
                                    <br/>
                                    <label>종료 기간</label>
                                    <input className="w3-input" style={{ width : '50%' }} type="date" id={`e${idx}`} onChange={this.handleChange.bind(this)} value={c.endDate} />
                                    <p>작성자 : {c.writer}</p>
                                    <button className="w3-small w3-button w3-round-large w3-blue" onClick={() => this.handleUpdateCalendar(c.id, c.startDate, c.endDate)}>수정 일정 저장</button>
                                </div>
                            )
                        }
                    </div>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(ScheduleEditForm));