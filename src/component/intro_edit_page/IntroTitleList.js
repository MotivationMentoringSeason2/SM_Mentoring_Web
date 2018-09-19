import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

import MessageIcon from '@material-ui/icons/Message';

import IntroEditModal from "./IntroEditModal";

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class IntroTitleList extends Component{
    constructor(props){
        super(props);
        this.state = { activeEditData : null };
    }

    componentWillMount(){
        this.props.fetchIntroTitles();
    }

    componentWillUnmount(){
        this.props.resetFetchIntroTitles();
        this.props.resetExecuteUpdateTitle();
    }

    handleClickUpdate(id, context){
        this.setState({
            activeEditData : {
                id : id,
                context : context
            }
        });
    }

    handleClickCancelUpdate(){
        this.setState({
            activeEditData : null
        })
    }

    render(){
        const { classes } = this.props;
        const { intros } = this.props.introList;
        const { principal } = this.props.accessAccount;
        const { activeEditData } = this.state;
        let introTr;
        let renderModal;
        if(intros.length > 0){
            introTr =
                intros.map(intro =>
                    <tr className="w3-hover-text-red">
                        <td>{intro.id}</td>
                        <td>{intro.context}</td>
                        <td>{intro.writer}</td>
                        <td>
                            <button className="w3-small w3-button w3-round-large w3-blue" onClick={() => this.handleClickUpdate(intro.id, intro.context)}>수정</button>
                            &nbsp;
                            <button className="w3-small w3-button w3-round-large w3-red">삭제</button>
                            &nbsp;
                            <Link to={`/intro/detail/${intro.id}`}><button className="w3-small w3-button w3-round-large w3-purple">상세내용 조회</button></Link>
                        </td>
                    </tr>
                );
        }

        if(activeEditData !== null){
            renderModal = <IntroEditModal data={activeEditData} writer={principal.identity} cancel={this.handleClickCancelUpdate.bind(this)} updating={this.props.executeUpdateTitle.bind(this)}/>
        }

        if(this.props.saveStatus.message){
            alert(this.props.saveStatus.message);
            this.props.history.push('/intro/edit/_refresh');
        }

        return(
            <div>
                <Grid align="center">
                    <hr/>
                    <div>
                        <Avatar className={classes.avatar}>
                            <MessageIcon />
                        </Avatar>
                    </div>
                    <div>
                        <h3>관리자 소개문 수정</h3>
                        <p>관리자는 소개문의 일부를 수정할 수 있습니다.</p>
                    </div>
                    <br/>
                    <div className={`w3-responsive ${ window.innerWidth <= 425 ? 'w3-small' : 'w3-large'}`} style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                        <table className="w3-table-all w3-centered">
                            <thead>
                            <tr className="w3-sand">
                                <th>No.</th>
                                <th>소개문 제목</th>
                                <th>작성자</th>
                                <th>수정/삭제</th>
                            </tr>
                            </thead>
                            {introTr}
                        </table>
                    </div>
                    {renderModal}
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(withRouter(IntroTitleList));