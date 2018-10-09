import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import RemoveIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';

import queryString from 'query-string';
import {withRouter, Link} from 'react-router-dom';

import axios from 'axios';
import './card.css';
import {ACCOUNT_URL, NOTICE_URL} from "../../action/distribute_urls";
import ProfileImage from "../profile_component/ProfileImage";

const styles = theme => ({
  card: {
    width: window.innerWidth * 0.9,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent:{
    width : window.innerWidth * 0.9,
  },
  gridList: {
    width: window.innerWidth * 0.85,
    height: 450,
  }
});

const RESOURCE_URL = `${ACCOUNT_URL}/resource`;

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  constructor(props) {
    super(props);
    this.state = {
      title: "제목",context: "내용", identity : "아이디", writer: "작성자", views: "조회수", writtenDate: "작성일", files : [], images : []
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidMount() {
    const {id} = queryString.parse(this.props.location.search);
    axios.get(`${NOTICE_URL}/notice/post/${id}`)
    .then(response => {
      const { data } = response;
      this.setState({
        title : data && data.title,
        context : data && data.context,
        identity : data && data.writer,
        views : data && data.views,
        writtenDate : data && data.writtenDate
      });
      if(data) {
        axios.get(`${RESOURCE_URL}/account/name/${data.writer}`).then(response => {
          this.setState({writer: response.data})
        });
      }
    });
    axios.get(`${NOTICE_URL}/notice/files/${id}`).then(response => {
      this.setState({
        files : response.data
      })
    });
    axios.get(`${NOTICE_URL}/notice/images/${id}`).then(response => {
      this.setState({
        images : response.data
      })
    })
  }

  handleClickDelete(id){
    const isDelete = window.confirm("선택하신 파일을 삭제합니다. 계속 진행 하시겠습니까?");
    if(isDelete){
      axios({
        url: `${NOTICE_URL}/notice/file/${id}`,
        method: 'delete'
      }).then(response => {
        alert(response.data);
        window.location.reload(true);
      });
    }
  }

  handleClickFileDownload(fileId, fileName){
    axios({
      url: `${NOTICE_URL}/notice/file/${fileId}`,
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

  handleClickFileDelete(){
    const {id} = queryString.parse(this.props.location.search);
    const isDelete = window.confirm("현재 게시물에 존재하는 파일들을 모두 삭제합니다. 계속 진행 하시겠습니까?");
    if(isDelete){
      axios({
        url: `${NOTICE_URL}/notice/files/post/${id}`,
        method: 'delete'
      }).then(response => {
        alert(response.data);
        window.location.reload(true);
      });
    }
  }

  handleClickImageDelete(){
    const {id} = queryString.parse(this.props.location.search);
    const isDelete = window.confirm("현재 게시물에 존재하는 이미지를 모두 삭제합니다. 계속 진행 하시겠습니까?");
    if(isDelete){
      axios({
        url: `${NOTICE_URL}/notice/images/post/${id}`,
        method: 'delete'
      }).then(response => {
        alert(response.data);
        window.location.reload(true);
      });
    }
  }

  handleClickPostDelete(){
    const query = queryString.parse(this.props.location.search);
    const isDelete = window.confirm("현재 게시물을 삭제합니다. 계속 진행 하시겠습니까?");
    if(isDelete){
      axios({
          url: `${NOTICE_URL}/notice/post/${query && query.id}`,
          method: 'delete'
      }).then(response => {
          alert(response.data);
          window.location.href = `/notice/${query && query.tid}/list${this.props.location.search}`;
      });
    }
  }

  render() {
    const { classes, viewer } = this.props;
    const { writtenDate, views, identity, writer, files, images } = this.state;
    const queryModel = queryString.parse(this.props.location.search);
    const filesTr = files.length > 0 ?
      files.map(file => (
        <tr key={`file_${file.id}`}>
          <td>{file.fileName}</td>
          <td>{Math.ceil(file.fileSize / 1024)} KB</td>
          <td>{file.uploadDate}</td>
          <td>
              <button className="w3-small w3-button w3-round-large w3-blue" onClick={() => this.handleClickFileDownload(file.id, file.fileName)}>파일 다운로드</button>
              {identity === viewer ? <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickDelete(file.id)}>파일 삭제</button> : null}
          </td>
        </tr>
      )) :
        <tr>
          <td colSpan="4">이 글에 첨부한 파일이 없습니다.</td>
        </tr>;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <div style={{ width : "60px"}}>
              <ProfileImage identity={identity}/>
            </div>
          }
          action={
            <IconButton>
             {views}
            </IconButton>
          }
          title={this.state.title}
          subheader={new Date(writtenDate).toLocaleDateString() + new Date(writtenDate).toLocaleTimeString() + " / 작성자 : " + writer}
        />

        <CardContent className="cardContent">
          <div
              dangerouslySetInnerHTML={ {__html: (this.state.context === null || this.state.context) } }
              style={{ minHeight : '400px' }}
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="이전으로 이동 ">
            <Link to={`/notice/${queryModel && queryModel.tid}/list${this.props.location.search}`}>
              <BackIcon />
            </Link>
          </IconButton>
          {
            viewer === identity ?
              <Link to={`/notice/update?tid=${queryModel && queryModel.tid}&pid=${queryModel && queryModel.id}`}>
                <IconButton aria-label="게시물을 수정합니다.">
                  <EditIcon />
                </IconButton>
              </Link> : null
          }
          {
            viewer === identity ?
              <div onClick={() => this.handleClickPostDelete()}>
                <IconButton aria-label="게시물을 삭제합니다.">
                  <RemoveIcon />
                </IconButton>
              </div> : null
          }
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              <SaveIcon /> 첨부 파일
            </Typography>
            <table className="w3-table w3-bordered w3-centered">
              <thead>
              <tr>
                <th>파일 이름</th>
                <th>용량</th>
                <th>업로드 날짜</th>
                <th>다운로드 / 삭제</th>
              </tr>
              </thead>
              <tbody>
              {filesTr}
              </tbody>
            </table>
            <br/>
              {identity === viewer && files.length > 0 ?
                <div className="w3-center">
                    <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickFileDelete()}>모든 파일 삭제</button>
                </div>
                : null
              }
            <Typography paragraph variant="body2">
              <ImageIcon/> 첨부 이미지
            </Typography>
            {identity === viewer && images.length > 0 ?
              <div className="w3-center">
                  <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickImageDelete()}>모든 이미지 삭제</button>
              </div>
              : null
            }
            <br/>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {images.map((image, idx) => (
                  <GridListTile key={`image_${image}`} cols={(idx + 1) % 3}>
                    <img src={`${NOTICE_URL}/notice/image/${image}`} alt={`첨부이미지_${image}`} />
                  </GridListTile>
                ))}
            </GridList>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(RecipeReviewCard));