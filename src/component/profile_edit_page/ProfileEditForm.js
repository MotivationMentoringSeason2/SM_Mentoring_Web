import React, {Component} from 'react';
import axios from "axios";

import {reduxForm, Field} from 'redux-form';
import {withRouter} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles/index';

import PhotoIcon from '@material-ui/icons/Photo';

import {renderDropzoneInput} from "../form_render";
import {
    userSaveProfile, userSaveProfileSuccess, userSaveProfileFailure
} from "../../action/action_profile";

const RESOURCE_ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/resource';

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

function validate(values){
    var errors = {};
    var hasErrors = false;

    if (!values.profile_photo) {
        errors.profile_photo = '파일을 업로드를 진행해 주시길 바랍니다.';
        hasErrors = true;
    } else if (values.profile_photo.length === 0) {
        errors.profile_photo = '파일 확장자는 png, jpg, jpeg 파일만 가능합니다.';
        hasErrors = true;
    }

    return hasErrors && errors;
}

const validateAndSubmitProfile = (values, dispatch) => {
    const fileArray = values.profile_photo;
    let resultCount = fileArray === undefined ? 0 : fileArray.length;
    let accessToken = localStorage.getItem('jwtToken');
    if(!accessToken || accessToken === '') return;
    if(resultCount >= 1){
        fileArray.map((file) => {
            dispatch(userSaveProfile(accessToken, file)).then((response) => {
                if (response.payload && response.payload.status !== 200) {
                    dispatch(userSaveProfileFailure(response.payload.data));
                }
                dispatch(userSaveProfileSuccess(response.payload));
            }).catch(reason => dispatch(userSaveProfileFailure("데이터베이스 측에서 오류가 발생했습니다...")))
        });
    }
}

class ProfileEditForm extends Component {
    constructor(props){
        super(props);
        this.state = { status : 0 };
    }
    componentWillMount(){
        const {principal} = this.props.accessAccount;
        if(principal !== null){
            axios.get(`${RESOURCE_ROOT_URL}/profile/${principal.identity}`)
                .then(response =>
                    this.setState({ status : response.status })
                );
        }
    }
    componentWillUnmount(){
        this.props.resetSaveProfile();
        this.props.resetReleaseProfile();
    }
    handleClickReleasing(){
        const isRelease = window.confirm('현재 회원의 프로필을 해제합니다. 계속 진행하시겠습니까?');
        if(isRelease){
            this.props.executeReleaseProfile();
        }
    }
    render(){
        const {classes, handleSubmit, saveStatus, releaseStatus} = this.props;
        const {status} = this.state;
        if(saveStatus.message){
            alert(saveStatus.message);
            this.props.history.push("/");
        } else if(saveStatus.error){
            alert(saveStatus.error);
            this.props.history.push("/");
        }

        if(releaseStatus.message){
            alert(releaseStatus.message);
            this.props.history.push("/");
        } else if(releaseStatus.error){
            alert(releaseStatus.error);
            this.props.history.push("/");
        }

        return(
            <div>
                <form onSubmit={handleSubmit(validateAndSubmitProfile)} className={classes.form}>
                    <Grid align="center">
                        <hr/>
                        <div>
                            <Avatar className={classes.avatar}>
                                <PhotoIcon />
                            </Avatar>
                        </div>
                        <div>
                            <h3>프로필 사진 설정</h3>
                            <p>SKHU Mentoring 회원은 현재 계정에 프로필 사진을 설정할 수 있습니다.</p>
                            <p>멘토를 하고 싶은 학생은 프로필 사진을 설정해두면 멘티들이 쉽게 다가갈 수 있습니다.</p>
                            <p>프로필 사진 설정은 필수는 아닙니다.</p>
                        </div>
                        <Field
                            name="profile_photo"
                            component={renderDropzoneInput}
                            accept={"image/jpeg, image/png, image/jpg"}
                        />
                        <br/>
                        <button type="submit" className="w3-button w3-round-large w3-blue">프로필 설정</button>
                        <br/><br/>
                        {
                            status === 200 ? <button type="button" className="w3-button w3-round-large w3-pink" onClick={() => this.handleClickReleasing()}>프로필 해제</button> : null
                        }
                        <br/>
                    </Grid>
                </form>
            </div>
        )
    }
}
export default reduxForm({
    form : 'profileForm',
    validate
})(withStyles(styles)(withRouter(ProfileEditForm)));