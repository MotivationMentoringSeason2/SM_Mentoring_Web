import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import ReactHintFactory from 'react-hint'
import 'react-hint/css/index.css'
import AssignmentIcon from '@material-ui/icons/AssignmentTurnedIn';
import axios from "axios";
import {MultiTimetable} from "../timetable_component";
import {ACCOUNT_URL, MENTO_URL} from "../../action/distribute_urls";

const ReactHint = ReactHintFactory(React);

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

const ROOT_URL = `${MENTO_URL}/report/excel`;

class ReportListView extends Component {
    constructor(props){
        super(props);
        const { data } = props.mentoringToken;
        this.state = { token : data, realName : null };
    }

    componentWillMount(){
        const { match } = this.props;
        this.props.fetchMentoringToken(match.params.id);
    }

    componentWillReceiveProps(nextProps){
        const { token } = this.state;
        if(nextProps.mentoringToken.data !== null && token !== nextProps.mentoringToken.data){
            const { data } = nextProps.mentoringToken;
            this.setState({
                token : data
            });
            axios.get(`${ACCOUNT_URL}/resource/account/name/${data.mento}`).then(response => this.setState({ realName : response.data }));
            this.props.fetchReportList(data.id);
            this.props.fetchMentoringPerson(data.id);
        }
    }

    componentWillUnmount(){
        this.props.resetFetchMentoringPerson();
        this.props.resetFetchReportList();
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
        const { token, realName } = this.state;
        const { classes } = this.props;
        const { reports, activity } = this.props.reportList;
        const { people } = this.props.mentoringPeople;

        let reportTr = reports.length > 0 ?
            reports.map((report, idx) => (
                <tr key={`report_identity_${idx}`}>
                    <td>{idx + 1} 회차</td>
                    <td>{report.classSubject}</td>
                    <td>{report.classDate} {report.startTime}~{report.endTime}</td>
                    <td className={report.status === 'LOADING' ? '' : report.status === 'PERMIT' ? 'w3-pale-green' : 'w3-pale-red'}>
                        {report.status === 'LOADING' ? '심사 필요' :
                            report.status === 'REJECT' ?
                                <button className="w3-small w3-button w3-round-large w3-red" data-rh={report.message} data-rh-at="top">반려</button>
                                : '인정'}
                    </td>
                    <td>
                        <Link to={`/admin/report/${token && token.id}/confirm/${report && report.id}`}>
                            <button className="w3-small w3-button w3-round-large w3-indigo">
                                보고서 확인
                            </button>
                        </Link>
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
                            <AssignmentIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>{token && token.name}</h3>
                        <h3>관리자 멘토링 보고서 확인</h3>
                        <p>멘토가 올린 보고서를 관리자가 최종 확인을 진행하셔야 됩니다.</p>
                        <p>최종 확인이 완료된 인정 보고서 들에 대하여 팀 단위로 다운로드 받을 수 있습니다.</p>
                    </div>
                    <br/>
                    <Link to="/admin/report/checking">
                        <button className="w3-small w3-button w3-round-large w3-orange">멘토링 팀 목록으로</button>
                    </Link>
                    <br/><br/>
                    {
                        reports.filter(report => report.status === 'PERMIT').length > 0 ?
                            <button className="w3-small w3-button w3-round-large w3-green" onClick={() => this.handleClickReportsDownload()}>엑셀 보고서 다운로드</button>
                            : null
                    }
                    <br/><br/>

                    <h3>{realName} 멘토가 현재 작성한 보고서 목록 입니다.</h3>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-gray">
                                <th>진행 회차</th>
                                <th>수업 주제</th>
                                <th>수업 진행 시간</th>
                                <th>수업 결과</th>
                                <th>보고서 확인</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportTr}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <MultiTimetable person={people}/>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(withRouter(ReportListView));