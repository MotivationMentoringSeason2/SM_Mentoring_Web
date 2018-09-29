import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

import TimeIcon from '@material-ui/icons/Timeline';

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class ClassScheduleEdit extends Component {
    constructor(props){
        super(props);
        const { data } = props.mentoringToken;
        this.state = { token : data, ids : [], counts : [] };
    }

    componentWillMount(){
        const { principal } = this.props.accessAccount;
        this.props.fetchMentoringToken(principal.identity);
    }

    handleClickCheck(id, count){
        const { ids, counts } = this.state;
        let tmpIds = ids.slice();
        let tmpCounts = counts.slice();
        tmpIds.push(id);
        tmpCounts.push(count);
        this.setState({
            ids : tmpIds,
            counts : tmpCounts
        })
    }

    handleClickRelease(count){
        const { ids, counts } = this.state;
        let tmpIds = ids.slice();
        let tmpCounts = counts.slice();
        let idx = -1;
        for(var i=0;i<tmpIds.length;i++){
            if(count === tmpCounts[i]){
                idx = i;
                break;
            }
        }
        if(idx !== -1){
            tmpIds.splice(idx, 1);
            tmpCounts.splice(idx, 1);
        }
        this.setState({
            ids : tmpIds,
            counts : tmpCounts
        });
    }

    handleClickDelete(){
        const { ids } = this.state;
        let confDelete = window.confirm("선택하신 시간 일정들을 삭제합니다. 계속 진행 하시겠습니까?");
        if(confDelete){
            this.props.executeDeleteClassTimes(ids);
        }
    }

    componentWillReceiveProps(nextProps){
        const { token } = this.state;
        if(nextProps.mentoringToken.data !== null && token !== nextProps.mentoringToken.data){
            const { data } = nextProps.mentoringToken;
            this.setState({
                token : data
            });
            this.props.fetchClassTimes(data.id);
        }
    }

    componentWillUnmount(){
        this.props.resetDeleteClassTimes();
        this.props.resetFetchClassTimes();
        this.props.resetFetchMentoringToken();
    }

    render(){
        const { counts, token } = this.state;
        const { classes } = this.props;
        const { times } = this.props.classTimes;
        const { message, error } = this.props.deleteStatus;

        if(message){
            alert(message);
            this.props.history.push("/mento/class/edit/_refresh");
        } else if(error) {
            alert("멘토링 수업 시간 삭제 작업 중 오류가 발생 하였습니다. 이전으로 이동합니다.");
            this.props.history.push("/mento/class/edit/_refresh");
        }

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
                    <td>
                        &nbsp;
                        {
                            counts.includes(idx + 1) ?
                                <button className="w3-small w3-button w3-round-large w3-pale-red" onClick={() => this.handleClickRelease(idx + 1)}>해제</button>
                                :
                                <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickCheck(time.id, idx + 1)}>선택</button>
                        }
                        &nbsp;
                        {
                            time.status !== 'PERMIT' ?
                                <Link to={`/mento/class/update?id=${time.id}`}><button className="w3-small w3-button w3-round-large w3-purple">수업 내역 수정</button></Link> : null
                        }
                    </td>
                </tr>
            ) : <tr><td colSpan="5">현재까지 진행한 수업 내역이 없습니다.</td></tr>
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
                        <h3>멘토링 수업 시간 관리</h3>
                        <p>멘토링 수업을 진행하기 전에 수업 시간을 등록하셔야 됩니다.</p>
                        <p>수업 시간을 등록 하셔야 이에 대한 보고서를 작성하실 수 있습니다.</p>
                    </div>
                    <br/>
                    <Link to="/mento/class/create">
                        <button className="w3-small w3-button w3-round-large w3-blue">수업 시간 등록</button>
                    </Link>
                    <br/><br/>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-light-blue">
                                <th>진행 회차</th>
                                <th>수업 방식</th>
                                <th>수업 진행 시간</th>
                                <th>수업 결과</th>
                                <th>내용 수정</th>
                            </tr>
                            </thead>
                            <tbody>
                            {timeTr}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    {
                        counts.length > 0 ?
                            <div className="w3-center" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                                <h3>선택하신 다음과 같은 수업 시간 회차가 삭제 됩니다.</h3>
                                <ul className="w3-ul w3-border">
                                    {
                                        counts.map((id) => <li key={`context_${id}`}>{id} 회차</li>)
                                    }
                                </ul>
                                <br/>
                                <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickDelete()}>삭제 진행하기</button>
                                <br/>
                            </div> : ''
                    }
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(withRouter(ClassScheduleEdit));