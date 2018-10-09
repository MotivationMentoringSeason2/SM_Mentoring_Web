import React, {Component} from 'react';
import queryString from 'query-string';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import { withRouter } from 'react-router-dom';
import { renderDropzoneInput, renderQuill, renderTextField } from "../form_render";
import {
    anybodySaveEditedPost, anybodySaveEditedPostSuccess, anybodySaveEditedPostFailure
} from "../../action/action_notice";
import {
    anybodyUploadPostFiles, anybodyUploadPostFilesSuccess, anybodyUploadPostFilesFailure,
    anybodyUploadPostImages, anybodyUploadPostImagesSuccess, anybodyUploadPostImagesFailure,
} from "../../action/action_integrate_file";

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import ArtIcon from '@material-ui/icons/ArtTrack';
import CheckIcon from '@material-ui/icons/Check';
import RefreshIcon from '@material-ui/icons/Refresh';

import '../intro_edit_page/modal.css';
import {NOTICE_URL} from "../../action/distribute_urls";

const RESOURCE_URL = NOTICE_URL;

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

function validate(values){
    var errors = {};
    var hasErrors = false;
    if(!values.title || values.title.trim() === ''){
        errors.title = '게시물 제목을 입력하세요.';
        hasErrors = true;
    }

    if(!values.context || values.context.trim() === ''){
        errors.context = '게시물 내용을 입력하세요.';
        hasErrors = true;
    }

    if(values.noticeFiles && values.noticeFiles.length >= 1){
        const files = values.noticeFiles;
        let totalSize = files.reduce((a, b) => a + b.size, 0);
        if(totalSize > 1048576 * 7.5) {
            errors.noticeFiles = '모든 파일은 7.5MB 이하로 첨부하시길 바랍니다.';
            hasErrors = true;
        }
    }

    if(values.noticeImages && values.noticeImages.length >= 1){
        const files = values.noticeImages;
        let totalSize = files.reduce((a, b) => a + b.size, 0);
        if(totalSize > 1048576 * 7.5) {
            errors.noticeImages = '모든 이미지 파일은 7.5MB 이하로 첨부하시길 바랍니다.';
            hasErrors = true;
        }
    }

    return hasErrors && errors;
}

const validateAndSavePost = (values, dispatch) => {
    let postModel = {
        typeId : values && values.typeId,
        title : values && values.title,
        context : values && values.context
    }
    dispatch(anybodySaveEditedPost(postModel, values.postId, values.writer)).then((response) => {
        if (response.payload && response.payload.status !== 200) {
            dispatch(anybodySaveEditedPostFailure(response.payload));
            throw new SubmissionError(response.payload.data);
        }
        const { id } = response.payload.data;
        if(id !== null){
            if(values.noticeFiles && values.noticeFiles.length > 0){
                dispatch(anybodyUploadPostFiles(id, values.noticeFiles)).then((response) => {
                    if (response.payload && response.payload.status !== 200) {
                        dispatch(anybodyUploadPostFilesFailure(response.payload));
                        throw new SubmissionError(response.payload.data);
                    }
                    dispatch(anybodyUploadPostFilesSuccess(response.payload));
                });
            }
            if(values.noticeImages && values.noticeImages.length > 0){
                dispatch(anybodyUploadPostImages(id, values.noticeImages)).then((response) => {
                    if (response.payload && response.payload.status !== 200) {
                        dispatch(anybodyUploadPostImagesFailure(response.payload));
                        throw new SubmissionError(response.payload.data);
                    }
                    dispatch(anybodyUploadPostImagesSuccess(response.payload));
                });
            }
            dispatch(anybodySaveEditedPostSuccess(response.payload));
        }
    });
}

class NoticeEditForm extends Component {
    constructor(props){
        super(props);
        this.state = { type : null, postId : 0 };
    }

    componentWillMount(){
        let pagination = queryString.parse(this.props.location.search);
        axios.get(`${RESOURCE_URL}/notice/type/${pagination.tid}`).then(response => {
            this.setState({
                type : response.data,
                postId : pagination.pid || 0
            });
        });
    }

    componentDidMount(){
        let pagination = queryString.parse(this.props.location.search);
        if(pagination && pagination.pid){
            this.props.fetchPostModel(pagination.pid);
        }
    }

    componentWillUnmount(){
        this.props.resetFetchPostModel();
        this.props.resetSavePost();
        this.props.resetUploadFiles();
        this.props.resetUploadImages();
    }

    render(){
        const { principal } = this.props.accessAccount;
        const { type, postId } = this.state;
        const { classes, handleSubmit, fileUploadStatus, imageUploadStatus } = this.props;
        const { model } = this.props.postModel;
        const { post, loading } = this.props.saveStatus;

        if(type && model && (model.writer !== principal.identity)){
            alert("게시물 수정의 권한이 없습니다. 수정은 본인의 게시물만 가능합니다.");
            this.props.history.push(`/notice/${type.id}/list?pg=1&sz=10`);
        }

        if(type && type.limitWritten){
            if(principal && (principal.type === 'STUDENT' && !principal.studentStatus.startsWith('CHAIRMAN'))) {
                alert(`${type.name} 은(는) 학생 중 회장만 올릴 수 있습니다.`);
                this.props.history.push(`/notice/${type.id}/list?pg=1&sz=10`);
            }
        }

        this.props.change('writer', principal.identity);
        this.props.change('typeId', type && (type.id || 0));
        this.props.change('postId', postId);

        let loadModal;

        if(loading){
            loadModal =
                <div className="modal display-block w3-animate-opacity">
                    <section className="modal-main-comment w3-round-large">
                        <div className="w3-container w3-sand w3-round-large">
                            <h2 className="w3-text-black">파일 업로드를 진행합니다.</h2>
                        </div>
                        <div className="w3-container">
                            <span className="w3-xxxlarge w3-spin">
                                <RefreshIcon />
                            </span>
                            <h5>{fileUploadStatus.message || '파일을 업로딩하는 중 입니다...'}</h5>
                            <h5>{imageUploadStatus.message || '이미지를 업로딩하는 중 입니다...'}</h5>
                        </div>
                    </section>
                </div>;
        }

        if(post !== null){
            alert(`게시물 ${(postId === 0) ? "추가" : "수정"} 작업이 완료 되었습니다. 원래 게시판 목록으로 이동합니다.`);
            this.props.history.push(`/notice/${type.id}/list?pg=1&sz=10`);
        }


        return (
            <form className={classes.form} onSubmit={handleSubmit(validateAndSavePost)}>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <ArtIcon />
                        </Avatar>
                    </div>

                    <div>
                        <h3>{type && type.name} 게시글 { postId === 0 ? '추가' : '수정'}</h3>
                        <p>{type && type.name} 게시판에 글을 { postId === 0 ? '추가' : '수정'} 합니다.</p>
                        <p>아래 파일을 가져와서 업로드도 가능합니다. 파일 삭제는 게시물 열람에서 진행하시길 바랍니다.</p>
                        <p>여기서는 파일, 이미지를 새로 업로드하는 작업(게시물 등록, 수정 상관 없이)만 가능합니다.</p>
                    </div>
                    <br/>

                    <div>
                        <Field name="title" className={classes.textField} type="text"
                               component={renderTextField} label="게시물 제목" placeholder="게시물의 제목을 입력하세요." />
                    </div>
                    <br/>

                    <div>
                        <label>추가할 게시물 첨부 파일</label>
                        <p>오피스 파일(Excel, Word, PPT), 한글(hwp), PDF 파일만 올릴 수 있고, 합쳐서 7.5MB 이하의 파일들만 업로드 가능합니다.</p>
                        <Field
                            name="noticeFiles"
                            component={renderDropzoneInput}
                            accept={"application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, .hwp"}
                            multiple={true}
                        />
                        <br/>
                    </div>
                    <br/>

                    <div>
                        <label>추가할 게시물 이미지</label>
                        <p>이미지 파일(jpg, jpeg, png) 을 업로드 하면 게시물 하단부에 보이게 됩니다.</p>
                        <p>부득이하게 에디터에 이미지 업로드가 안 되어 내용물 중간에 이미지를 추가할 수 없습니다. 이 점 양해 바랍니다.</p>
                        <Field
                            name="noticeImages"
                            component={renderDropzoneInput}
                            accept={"image/jpeg, image/png, image/jpg"}
                            multiple={true}
                        />
                        <br/>
                    </div>
                    <br/>

                    <div>
                        <Field name="context" className={classes.textField} component={renderQuill} size={400} />
                    </div>

                    <br/><br/><br/><br/>
                    <div>
                        <Button variant="contained" type="submit" color="primary">
                            <CheckIcon className={classes.leftIcon}/> 게시물 {(postId === 0) ? "추가" : "수정"}하기
                        </Button>
                    </div>
                    {loadModal}
                </Grid>
            </form>
        )
    }
}
export default reduxForm({
    form : 'noticeForm',
    enableReinitialize : true,
    validate
})(withStyles(styles)(withRouter(NoticeEditForm)));