import React, {Component} from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {ProfileImage} from "../profile_component";

import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import ChildIcon from '@material-ui/icons/ChildCare';

import {CompareTimetable} from "../timetable_component";

const ACCOUNT_RESOURCE_URL = 'http://127.0.0.1:8081/AccountAPI/resource';
const RESOURCE_URL = 'http://127.0.0.1:8082/MentoAPI';

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    }
});

class NamePara extends Component{
    constructor(props){
        super(props);
        this.state = { name : '', identity : props.identity };
    }
    componentDidMount(){
        const { identity } = this.state;
        axios.get(`${ACCOUNT_RESOURCE_URL}/account/name/${identity}`).then(response => {
            this.setState({
                name : response.data
            });
        });
    }
    componentWillReceiveProps(nextProps){
        const { identity } = this.state;
        if(identity !== nextProps.identity){
            this.setState({
                identity : nextProps.identity
            })
        }
    }
    render(){
        const { name } = this.state;
        return (
            <h4>팀장 : { name }</h4>
        )
    }
}

class MentiApplicationView extends Component{
    constructor(props){
        super(props);
        this.state = { semester : null, selectMentiId : null };
    }

    componentWillMount(){
        const { principal } = this.props.accessAccount;
        this.props.fetchMentoApply(principal.identity);
        this.props.fetchTimetable(principal.identity);
        this.props.fetchTeamList(principal.identity);
    }

    componentDidMount(){
        axios.get(`${RESOURCE_URL}/semester/current`).then(response => this.setState({ semester : response.data }));
        axios.get(`${RESOURCE_URL}/subjects`).then(response => this.setState({ subjects : response.data }));
    }

    componentWillUnmount(){
        this.props.resetFetchTeamList();
        this.props.resetFetchTimetable();
        this.props.resetFetchMentoApply();
        this.props.resetExecuteApplyMenti();
        this.props.resetExecuteReleaseMenti();
    }

    handleClickApply(teamId, teamName){
        const { principal } = this.props.accessAccount;
        let confirm = window.confirm(`${teamName} 의 멘티를 신청합니다. 계속 진행 하시겠습니까?`);
        if(confirm){
            this.props.executeApplyMenti({
                menti : principal.identity,
                teamId : teamId
            });
        }
    }

    handleClickRelease(teamId, teamName){
        const { principal } = this.props.accessAccount;
        let confirm = window.confirm(`${teamName} 의 멘티를 취소합니다. 계속 진행 하시겠습니까?`);
        if(confirm){
            this.props.executeReleaseMenti({
                menti : principal.identity,
                teamId : teamId
            });
        }
    }

    handleClickSelectChange(mentoIdentity){
        this.setState({
            selectMentiId : mentoIdentity
        });
    }

    render(){
        const { classes, saveStatus, deleteStatus } = this.props;
        const { semester, selectMentiId } = this.state;
        const { principal } = this.props.accessAccount;
        const { timetableElements } = this.props.accountTimetable;
        const { model } = this.props.applyModel;

        if(timetableElements.length <= 0){
            alert("시간표를 설정하지 않았습니다. 시간표 설정 페이지로 넘어갑니다.");
            this.props.history.push("/account/timetable/edit");
        }

        if(model && model !== ''){
            alert("멘토는 멘티를 동시에 진행할 수 없습니다. 이미 멘토를 신청한 이력이 있으니 참고하시길 바랍니다.");
            this.props.history.push("/application/confirm");
        }

        if(saveStatus.message){
            alert(`${saveStatus.message} 멘토링 신청 내역 확인 페이지로 넘어 갑니다.`);
            this.props.history.push("/application/confirm");
        } else if(saveStatus.error){
            alert(saveStatus.error);
            this.props.history.push("/application/menti/_refresh");
        }

        if(deleteStatus.message){
            alert(deleteStatus.message);
            this.props.history.push("/application/menti/_refresh");
        } else if(deleteStatus.error){
            alert(deleteStatus.error);
            this.props.history.push("/application/menti/_refresh");
        }

        let teamCards;
        const { teams } = this.props.teamList;

        teamCards = teams.map(team => (
            <div key={`team_${team.id}`} className={`w3-third w3-round-large w3-dark-grey w3-border w3-border-black ${team.hasApplicated ? 'w3-pale-blue' : 'w3-pale-yellow'}`}>
                <ProfileImage identity={team && team.mento}/>
                <div className="w3-container w3-center">
                    <h4>{team.name}</h4>
                    <NamePara identity={team.mento} />
                    <h5>신청 인원 : { team.appPerson } / { team.limPerson }</h5>
                    { team.subjects.map(subject =>
                            <span className="w3-tag w3-orange w3-round-large w3-border w3-border-red">{subject.name}</span>
                    )}
                </div>
                <div className="w3-center w3-padding-16">
                    {
                        team.hasApplicated ?
                            <button className="w3-button w3-round-large w3-red" onClick={() => this.handleClickRelease(team.id, team.name)}>취소하기</button> :
                            team.appPerson < team.limPerson ?
                                <button className="w3-button w3-round-large w3-blue" onClick={() => this.handleClickApply(team.id, team.name)}>신청하기</button>
                                : null
                    }
                    <br/>
                    <Link to={`/application/mento_view/${team.id}`}><button className="w3-button w3-round-large w3-purple">정보 조회</button></Link>
                    <br/>
                    <button className="w3-button w3-round-large w3-teal" onClick={() => this.handleClickSelectChange(team.mento)}>시간표 분석</button>
                </div>
            </div>
        ));

        return (
            <Grid align="center">
                <hr/>
                <div>
                    <Avatar className={classes.avatar}>
                        <ChildIcon />
                    </Avatar>
                </div>

                <div>
                    <h3>{semester && semester.name} SM 멘티 신청</h3>
                    <p>멘티를 신청할 수 있는 페이지 입니다.</p>
                    <p>멘티 신청을 완료한다면 현재 신청된 팀의 색상이 파란색으로 나옵니다.</p>
                    <p>멘토를 신청하신 분은 멘티를 동시에 신청할 수 없습니다. 이 점 양해 바랍니다.</p>
                </div>
                <br/>

                <div className="w3-row" style={{ width : window.innerWidth >= 420 ? '60%' : '95%'}}>
                    {teamCards}
                </div>
                <br/>

                {
                    selectMentiId !== null ?
                    <CompareTimetable myTimetable={timetableElements} myName={principal.name} anotherIdentity={selectMentiId} /> : null
                }
            </Grid>
        )
    }
}
export default withStyles(styles)(withRouter(MentiApplicationView));