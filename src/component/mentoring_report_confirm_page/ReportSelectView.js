import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import AssignmentIcon from '@material-ui/icons/AssignmentTurnedIn';
import {ProfileImage} from "../profile_component";

const ACCOUNT_RESOURCE_URL = 'http://127.0.0.1:8081/AccountAPI/resource';
const ROOT_URL = 'http://127.0.0.1:8082/MentoAPI';

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
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
            <p>팀장 : { name }</p>
        )
    }
}

class ReportSelectView extends Component {
    constructor(props){
        super(props);
        this.state = { semesterId : 0, semesterList : [] };
    }

    handleChangeSemester(event){
        this.setState({
            semesterId : event.target.value
        });
        this.props.resetFetchMentoListBySemester();
        this.props.fetchMentoListBySemester(event.target.value);
    }

    componentDidMount(){
        axios.get(`${ROOT_URL}/semesters`).then(response => this.setState({semesterList : response.data}));
    }

    componentWillUnmount(){
        this.props.resetFetchMentoListBySemester();
    }

    render(){
        const { classes } = this.props;
        const { semesterId, semesterList } = this.state;
        const { teams } = this.props.teamList;
        let viewTeams = teams.filter(team => team.status === 'PERMIT');
        return (
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <AssignmentIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>보고서 확인</h3>
                        <p>보고서 확인 작업을 진행할 수 있는 메뉴입니다.</p>
                        <p>학기 별 멘토링 보고서를 조회하고 난 이후 Excel 파일로 다운로드 받을 수 있습니다.</p>
                    </div>
                    <br/>
                    <select style={{ width : window.innerWidth > 420 ? '65%' : '90%' }} className="w3-input" value={semesterId} onChange={this.handleChangeSemester.bind(this)}>
                        <option value="0">-- 학기 선택 --</option>
                        { semesterList.map(semester => <option key={`semester_${semester.id}`} value={semester.id}>{semester.name}</option>) }
                    </select>
                    <br/>
                    <ul style={{ width : window.innerWidth > 420 ? '65%' : '90%' }} className="w3-ul w3-card-4">
                        {
                            viewTeams.length > 0 ?
                                viewTeams.map(team =>
                                    <li className="w3-bar">
                                        <div className="w3-bar-item" style={{width : '100px'}}>
                                            <ProfileImage identity={team.mento}/>
                                        </div>
                                        <div className="w3-bar-item">
                                            <span className="w3-large">{team.name}</span><br/>
                                            {team.subjects.map(subject => <span className="w3-tag w3-green w3-round-large">{subject.name}</span> )}<br/>
                                            <NamePara identity={team.mento} />
                                        </div>
                                        <div className="w3-bar-item w3-right">
                                            <Link to={`/admin/report/list/${team.id}`}>
                                                <button className="w3-button w3-round-large w3-blue">보고서 조회하기</button>
                                            </Link>
                                        </div>
                                    </li>
                                ) :
                                <li className="w3-bar">
                                    <div className="w3-bar-item">
                                        <span className="w3-large">선택하신 학기에 존재하는 멘토링 팀이 없습니다.</span><br/>
                                        <span>이전 학기를 선택하셔서 조치를 취하시길 바랍니다.</span>
                                    </div>
                                </li>
                        }
                    </ul>
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(ReportSelectView);