import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import FileIcon from '@material-ui/icons/FileCopy';
import axios from "axios/index";

const ReactHint = ReactHintFactory(React);

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

const ROOT_URL = 'http://127.0.0.1:8082/MentoAPI/report/excel';

class ReportEditList extends Component {
    constructor(props){
        super(props);
        const { data } = props.mentoringToken;
        this.state = { token : data, ids : [], counts : [], realName : null };
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
        let confDelete = window.confirm("선택하신 보고서를 삭제합니다. 계속 진행 하시겠습니까?");
        if(confDelete){
            this.props.executeDeleteReports(ids);
        }
    }

    componentWillReceiveProps(nextProps){
        const { token } = this.state;
        if(nextProps.mentoringToken.data !== null && token !== nextProps.mentoringToken.data){
            const { data } = nextProps.mentoringToken;
            this.setState({
                token : data
            });
            axios.get(`http://127.0.0.1:8081/AccountAPI/resource/account/name/${data.mento}`).then(response => this.setState({ realName : response.data }));
            this.props.fetchClassTimes(data.id);
            this.props.fetchReportList(data.id);
        }
    }

    componentWillUnmount(){
        this.props.resetDeleteReports();
        this.props.resetFetchReportList();
        this.props.resetFetchClassTimes();
        this.props.resetFetchMentoringToken();
    }

    handleClickReportsDownload(){
        const { realName, token } = this.state;
        if(token !== null && realName !== null) {
            axios({
                url: `${ROOT_URL}/${token.id}/${realName}`,
                method: 'get',
                responseType: 'blob'
            }).then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${token.name} 보고서 목록.xlsx`);
                document.body.appendChild(link);
                link.click();
            });
        }
    }

    render(){
        const { counts, token } = this.state;
        const { classes } = this.props;
        const { reports, activity } = this.props.reportList;
        const { times } = this.props.classTimes;
        const { message, error } = this.props.deleteStatus;

        if(message){
            alert(message);
            this.props.history.push("/mento/report/edit/_refresh");
        } else if(error) {
            alert("보고서 삭제 작업 중 오류가 발생 하였습니다. 이전으로 이동합니다.");
            this.props.history.push("/mento/report/edit/_refresh");
        }

        let reportIds = reports.map(report => report.scheduleId);

        let timeTr = times.filter(time => !reportIds.includes(time.id)).length > 0 ?
            times.map((time, idx) => {
                if (!reportIds.includes(time.id)) {
                    return (
                        <tr key={`time_identity_${idx}`}>
                            <td>{idx + 1} 회차</td>
                            <td>{time.classType}</td>
                            <td>{time.classDate} {time.startTime}~{time.endTime}</td>
                            <td>
                                <Link to={`/mento/report/create?sId=${time.id}`}>
                                    <button className="w3-small w3-button w3-round-large w3-blue">보고서 등록
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    )
                }
            }) : <tr><td colSpan="4">현재까지 작성하신 수업 시간의 보고서가 전부 작성 되었습니다.</td></tr>

        let reportTr = reports.length > 0 ?
            reports.map((report, idx) => (
                <tr key={`report_identity_${idx}`}>
                    <td>{idx + 1} 회차</td>
                    <td>{report.classSubject}</td>
                    <td>{report.classDate} {report.startTime}~{report.endTime}</td>
                    <td className={report.status === 'LOADING' ? '' : report.status === 'PERMIT' ? 'w3-pale-green' : 'w3-pale-red'}>
                        {report.status === 'LOADING' ? '심사 중' :
                            report.status === 'REJECT' ?
                                <button className="w3-small w3-button w3-round-large w3-red" data-rh={report.message} data-rh-at="top">반려</button>
                                : '인정'}
                    </td>
                    <td>
                        &nbsp;
                        {
                            report.status !== 'PERMIT' ?
                                counts.includes(idx + 1) ?
                                <button className="w3-small w3-button w3-round-large w3-pale-red"
                                        onClick={() => this.handleClickRelease(idx + 1)}>해제</button>
                                :
                                <button className="w3-small w3-button w3-round-large w3-red"
                                        onClick={() => this.handleClickCheck(report.id, idx + 1)}>선택</button> : null
                        }
                        &nbsp;
                        {
                            report.status !== 'PERMIT' ?
                                <Link to={`/mento/report/update?rId=${report.id}&sId=${report.scheduleId}`}>
                                    <button className="w3-small w3-button w3-round-large w3-purple">보고서 수정
                                    </button>
                                </Link> : null
                        }
                    </td>
                </tr>
            )) : <tr><td colSpan="5">현재까지 등록한 보고서 내역이 없습니다.</td></tr>
        return(
            <div>
                <ReactHint autoPosition events delay={100} />
                <hr/>
                <div className="w3-light-grey w3-round-large">
                    <div className="w3-blue w3-right-align w3-round-large" style={{width : `${activity && ((activity.diffSeconds) / 720 || 0)}%`}}>{activity && ((activity.diffSeconds) / 720 + "%" || 0)}</div>
                </div>
                <div className="w3-right-align">
                    <p>{activity && activity.count} 회차, {activity && (activity.diffSeconds) / 3600} 시간 / 20 시간</p>
                </div>
                <Grid align="center">
                    <br/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <FileIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>{token && token.name}</h3>
                        <h3>멘토링 보고서 작성 및 수정</h3>
                        <p>멘토링 수업을 완료한 후에는 등록하신 시간 별로 보고서를 작성하셔야 됩니다.</p>
                        <p>보고서 쓰는 양식을 지키지 않거나 안 쓰는 경우에는 활동 인정이 되기 어렵습니다.</p>
                    </div>
                    <br/>
                    <Link to="/mento/class/edit">
                        <button className="w3-small w3-button w3-round-large w3-orange">수업 시간 관리하러 가기</button>
                    </Link>
                    <br/><br/>
                    {
                        reports.filter(report => report.status === 'PERMIT').length > 0 ?
                            <button className="w3-small w3-button w3-round-large w3-green" onClick={() => this.handleClickReportsDownload()}>엑셀 보고서 다운로드</button>
                             : null
                    }
                    <br/><br/>
                    <h3>작성할 멘토링 시간 선택</h3>
                    <br/>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-deep-orange">
                                <th>진행 회차</th>
                                <th>수업 방식</th>
                                <th>수업 진행 시간</th>
                                <th>내용 수정</th>
                            </tr>
                            </thead>
                            <tbody>
                            {timeTr}
                            </tbody>
                        </table>
                    </div>
                    <br/>

                    <h3>수정할 보고서 선택</h3>
                    <br/>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-deep-orange">
                                <th>진행 회차</th>
                                <th>수업 주제</th>
                                <th>수업 진행 시간</th>
                                <th>수업 결과</th>
                                <th>내용 수정</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportTr}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    {
                        counts.length > 0 ?
                            <div className="w3-center" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                                <h3>선택하신 다음과 같은 보고서 회차가 삭제 됩니다.</h3>
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
export default withStyles(styles)(withRouter(ReportEditList));