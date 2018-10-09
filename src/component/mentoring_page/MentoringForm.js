import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { ProfileImage } from "../profile_component";

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import FolderIcon from '@material-ui/icons/FolderShared';
import axios from "axios";
import {ACCOUNT_URL, MENTO_URL} from "../../action/distribute_urls";

const ACCOUNT_RESOURCE_URL = `${ACCOUNT_URL}/resource`;
const RESOURCE_URL = MENTO_URL;

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

class TeamStructure extends Component{
    constructor(props){
        super(props);
        this.state = { people : [], personVO : props.personVO };
    }

    componentWillReceiveProps(nextProps){
        const { personVO } = this.state;
        if(personVO !== nextProps.personVO){
            this.setState({
                personVO : nextProps.personVO
            });
            axios.post(`${ACCOUNT_RESOURCE_URL}/account/brief`, nextProps.personVO).then(response => {
                this.setState({
                    people : response.data
                });
            });
        }
    }

    render(){
        const { people } = this.state;
        return (
            <table className="w3-table w3-bordered">
                <thead>
                    <tr>
                        <th>학번</th>
                        <th>이름</th>
                        <th>학과</th>
                    </tr>
                </thead>
                <tbody>
                {
                    people.map((person, idx) =>
                        <tr key={`mentoring_person${person.id}`} className={(idx === 0) ? 'w3-yellow' : ''}>
                            <td>{person.identity}</td>
                            <td>{person.name}</td>
                            <td>{person.department}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        )
    }
}

class MentoringForm extends Component {
    constructor(props){
        super(props);
        this.state = { semester : null, selectId : -1 };
    }

    componentWillMount(){
        this.props.fetchMentoInfos();
    }

    componentDidMount(){
        axios.get(`${RESOURCE_URL}/semester/current`).then(response => this.setState({ semester : response.data }));
    }

    componentWillUnmount(){
        this.props.resetExecuteAccountGrantting();
        this.props.resetExecuteMentoGrantting();
        this.props.resetFetchMentoInfos();
    }

    handleClickChange(id){
        this.setState({
            selectId : id
        });
    }

    handleClickAdvFileDownload(fileId, fileName){
        axios({
            url: `${RESOURCE_URL}/mentoring/team/advFile/${fileId}`,
            method: 'get',
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        });
    }


    render(){
        const { classes } = this.props;
        const { semester, selectId } = this.state;
        const { teams } = this.props.teamList;
        const { message, error } = this.props.saveStatus;

        if(message){
            alert(message);
            this.props.history.push("/admin/mentoring/confirm/_refresh");
        } else if(error){
            alert(error);
            this.props.history.push("/admin/mentoring/confirm/_refresh");
        }

        let buttonList = teams.map(team => {
            const { mentoVO } = team;
            return (
                <button
                    onClick={() => this.handleClickChange(mentoVO.id)}
                    className={`w3-button w3-small w3-round-large ${ selectId === mentoVO.id ? 'w3-green' : 'w3-yellow'}`}
                >{mentoVO.name}
                </button>
            )
        });

        const mentoInfo = teams.filter(team => team.mentoVO.id === selectId);
        let mentoVO, personVO;
        if(mentoInfo.length === 1){
            mentoVO = mentoInfo[0].mentoVO;
            personVO = mentoInfo[0].personVO;
        }

        const mentoView = (
            <div className="w3-row-padding" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                <div className="w3-third">
                    <div className="w3-round-large w3-card-4 w3-padding">
                        <ProfileImage identity={mentoVO && mentoVO.mento} />
                    </div>
                    <br/>
                    <div className="w3-round-large w3-card-4 w3-padding">
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-indigo">멘토링 팀 이름</h3>
                            <p>{mentoVO && mentoVO.name}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-indigo">멘토링 요구 인원</h3>
                            <p><b>{mentoVO && mentoVO.person}</b></p>
                        </div>
                    </div>
                </div>
                <div className="w3-twothird">
                    <div className="w3-round-large w3-card-4 w3-padding">
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-indigo">멘토링 주제</h3>
                            <p>{mentoVO && mentoVO.subjects.map(subject => <span className="w3-tag w3-green w3-round-large">{subject.name}</span>)}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-indigo">멘토링 소개문</h3>
                            <p>{mentoVO && mentoVO.advertise}</p>
                        </div>
                        <div className="w3-left-align">
                            <h3 className="w3-border-bottom w3-border-indigo">멘토링 자격 증명</h3>
                            <p>{mentoVO && mentoVO.qualify}</p>
                        </div>
                        {
                            mentoVO ?
                            <div className="w3-left-align">
                                <h3 className="w3-border-bottom w3-border-indigo">자격 증명 파일</h3>
                                {mentoVO && mentoVO.advFileName} [ {mentoVO && Math.ceil(mentoVO.advFileSize / 1024)} KB
                                ]&nbsp;
                                {
                                    mentoVO.advFileId ?
                                        <button className="w3-button w3-round-large w3-indigo" onClick={() => this.handleClickAdvFileDownload(mentoVO.advFileId, mentoVO.advFileName)}>증명 파일 다운로드</button>
                                        : null
                                }
                            </div> : null
                        }
                    </div>
                    <br/>
                    <TeamStructure personVO={personVO}/>
                    <br/>
              
                </div>
            </div>
        )
        return (
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <FolderIcon />
                        </Avatar>
                    </div>

                    <div>
                        <h3>{semester && semester.name}</h3>
                        <h3>멘토링 목록</h3>
                        <p>SM Mentoring 사업 신청 목록입니다.</p>
                    </div>
                    <br/>
                    {buttonList}
                    <br/><br/>
                    {mentoView}
                </Grid>
            </div>
        )
    }
}
export default (withStyles(styles))(withRouter(MentoringForm));