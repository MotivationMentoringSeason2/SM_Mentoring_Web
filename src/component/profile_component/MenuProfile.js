import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ClearIcon from '@material-ui/icons/Clear';
import ProfileImage from "./ProfileImage";
class MenuProfile extends Component{
    render(){
        const {principal} = this.props.accessAccount;
        let student, type;

        switch(principal && principal.type){
            case 'STUDENT' :
                type = '학생';
                break;
            case 'PROFESSOR' :
                type = '교수';
                break;
            case 'EMPLOYEE' :
                type = '직원';
                break;
            default :
                type = '불러오는 중입니다...';
                break;
        }

        switch(principal && principal.studentStatus){
            case 'NORMAL' :
                student = '일반학생';
                break;
            case 'MENTO' :
                student = '멘토학생';
                break;
            case 'MENTI' :
                student = '멘티학생';
                break;
            case 'CHAIRMAN_MENTO' :
                student = '학생회장 겸 멘토학생';
                break;
            case 'CHAIRMAN_MENTI' :
                student = '학생회장 겸 멘티학생';
                break;
            case 'CHAIRMAN_NORMAL' :
                student = '학생회장';
                break;
            default :
                student = '불러오는 중입니다...';
                break;
        }
        return(
            <div className="w3-card">
                <div className="w3-container">
                    <br/>
                    <ProfileImage identity={principal && principal.identity}/>
                    <br/>
                    <h4 className="w3-center"><b>{principal.name}</b> 님, 환영합니다.</h4>
                    <p><DirectionsRunIcon /> { type } { principal && principal.type === 'STUDENT' ? `(${student})` : '' }</p>
                    <p><AccessTimeIcon /> {new Date(principal && principal.loginTime).toLocaleTimeString()}</p>
                    <p className="w3-center">
                        <Link to="/account/logout" style={{ textDecoration: 'none' }}>
                            <button className="w3-button w3-round-large w3-pink" onClick={() => this.props.logoutFromServer()}><ClearIcon /> 로그아웃</button>
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}
export default MenuProfile;