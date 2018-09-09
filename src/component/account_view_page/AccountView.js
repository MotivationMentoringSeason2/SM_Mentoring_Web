import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import PersonIcon from '@material-ui/icons/Person';

import queryString from "query-string";

import {ProfileImage} from "../profile_component";

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

class AccountView extends Component{
    componentWillMount(){
        let pagination = queryString.parse(this.props.location.search);
        this.props.fetchAccountView(pagination.id);
    }
    componentWillUnmount(){
        this.props.resetFetchAccountView();
    }
    handleClickBack(){
        let pagination = queryString.parse(this.props.location.search);
        let newPaginationModel = {
            pg : pagination && (pagination.pg || 1),
            sb : pagination && (pagination.sb || 0),
            ob : pagination && (pagination.ob || 0),
            tb : pagination && (pagination.tb || 0),
            sz : pagination && (pagination.sz || 10),
            st : pagination && (pagination.st || ''),
        };

        this.props.history.push({
            pathname: '/admin/accounts/list',
            search: "?" + queryString.stringify(newPaginationModel)
        });
    }
    render(){
        const {classes} = this.props;
        const {account, error} = this.props.accountView;
        const {principal} = this.props.accessAccount;
        if(error){
            alert(error);
            this.handleClickBack();
        }

        return(
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <PersonIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>회원 정보 조회</h3>
                        <p>클릭하신 현재 회원의 정보를 조회할 수 있습니다.</p>
                        <p>그리고 학생 회장 설정은 교수, 직원만 진행할 수 있습니다.</p>
                    </div>
                    <br/>
                    <div className="w3-row-padding" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <div className="w3-third">
                            <div className="w3-round-large w3-card-4 w3-padding">
                                <ProfileImage identity={account && account.identity} />
                            </div>
                            <br/>
                            <div className="w3-round-large w3-card-4 w3-padding">
                                <div className="w3-left-align">
                                    <h3 className="w3-border-bottom w3-border-indigo">{account && account.status !== undefined ? '학번' : '회원 아이디'}</h3>
                                    <p>{account && account.identity}</p>
                                </div>
                                <div className="w3-left-align">
                                    <h3 className="w3-border-bottom w3-border-indigo">{account && account.status !== undefined ? '학생 이름' : '교직원 이름'}</h3>
                                    <p><b>{account && account.name}</b></p>
                                </div>
                                {
                                    account && account.status !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">학생 상태 여부</h3>
                                            <p>{account && account.status}</p>
                                        </div> : ''
                                }
                            </div>
                        </div>
                        <div className="w3-twothird">
                            <div className="w3-round-large w3-card-4 w3-padding">
                                <div className="w3-left-align">
                                    <h3 className="w3-border-bottom w3-border-indigo">성별</h3>
                                    <p>{account && account.gender === 'MALE' ? "남성" : "여성"}</p>
                                </div>
                                <div className="w3-left-align">
                                    <h3 className="w3-border-bottom w3-border-indigo">연락처(휴대폰)</h3>
                                    <p>{account && account.phone}</p>
                                </div>
                                <div className="w3-left-align">
                                    <h3 className="w3-border-bottom w3-border-indigo">E-Mail</h3>
                                    <p>{account && account.email}</p>
                                </div>
                                {
                                    account && account.department !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">{account && account.status !== undefined ? '소속 학과' : '주 담당 학과'}</h3>
                                            <p>{account && account.department}</p>
                                        </div> : ''
                                }
                                {
                                    account && account.departments !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">담당 학과</h3>
                                            <p>{account && account.departments}</p>
                                        </div> : ''
                                }
                                {
                                    account && account.multiDepartments !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">{account && account.status !== undefined ? '복수 전공 학과' : '타 담당 학과'}</h3>
                                            <p>{account && account.multiDepartments}</p>
                                        </div> : ''
                                }
                                {
                                    account && account.grade !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">학년</h3>
                                            <p>{account && account.grade} 학년</p>
                                        </div> : ''
                                }
                                {
                                    account && account.hasChairman !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">{ account && account.status !== undefined ? '학생 회장 여부' : '학과장 여부' }</h3>
                                            <p>{account && account.hasChairman ? 'O' : 'X'}</p>
                                        </div> : ''
                                }
                                {
                                    account && account.officePlace !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">사무실 위치</h3>
                                            <p>{account && account.officePlace}</p>
                                        </div> : ''
                                }
                                {
                                    account && account.officePhone !== undefined ?
                                        <div className="w3-left-align">
                                            <h3 className="w3-border-bottom w3-border-indigo">사무실 연락처</h3>
                                            <p>{account && account.officePhone}</p>
                                        </div> : ''
                                }
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="w3-center" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <div className="w3-bar">
                            <div className="w3-bar-item">
                                <button className="w3-button w3-round-large w3-teal" onClick={() => this.handleClickBack()}>회원 목록으로</button>
                            </div>
                            {
                                ( principal.type === 'PROFESSOR' || principal.type ==='EMPLOYEE' ) ?
                                    (account && account.hasChairman !== undefined) ?
                                        account.hasChairman ?
                                            <div className="w3-bar-item">
                                                <button className={`w3-button w3-round-large w3-red`}>{ account && account.status !== undefined ? '학생 회장 해지' : '학과장 해지'}</button>
                                            </div> :
                                            <div className="w3-bar-item">
                                                <button className={`w3-button w3-round-large w3-blue`}>{ account && account.status !== undefined ? '학생 회장 임명' : '학과장 임명'}</button>
                                            </div>
                                        : ''
                                    : ''
                            }
                        </div>
                    </div>

                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(withRouter(AccountView));