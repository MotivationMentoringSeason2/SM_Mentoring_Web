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
        this.state = { activeEditData : null, ids : [], contexts : [] };
    }

    componentWillMount(){
        this.props.fetchIntroTitles();
    }

    componentWillUnmount(){
        this.props.resetFetchIntroTitles();
        this.props.resetExecuteSaveTitle();
        this.props.resetExecuteRemoveTitle();
    }

    handleClickSave(id, context){
        this.setState({
            activeEditData : {
                id : id,
                context : context
            }
        });
    }

    handleClickCancelSave(){
        this.setState({
            activeEditData : null
        })
    }

    handleClickCheck(id, context){
        const { ids, contexts } = this.state;
        let tmpIds = ids.slice();
        let tmpContexts = contexts.slice();
        tmpIds.push(id);
        tmpContexts.push(context);
        this.setState({
            ids : tmpIds,
            contexts : tmpContexts
        })
    }

    handleClickRelease(id){
        const { ids, contexts } = this.state;
        let tmpIds = ids.slice();
        let tmpContexts = contexts.slice();
        let idx = -1;
        for(var i=0;i<tmpIds.length;i++){
            if(id === tmpIds[i]){
                idx = i;
                break;
            }
        }
        if(idx !== -1){
            tmpIds.splice(idx, 1);
            tmpContexts.splice(idx, 1);
        }
        this.setState({
            ids : tmpIds,
            contexts : tmpContexts
        });
    }

    handleClickRemove(){
        const { ids } = this.state;
        let beRemoving = window.confirm("현재 선택하신 제목들을 삭제합니다. 계속 하시겠습니까?");
        if(beRemoving)
            this.props.executeRemoveTitles(ids);
    }

    render(){
        const { ids, contexts } = this.state;
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
                            <button className="w3-small w3-button w3-round-large w3-blue" onClick={() => this.handleClickSave(intro.id, intro.context)}>수정</button>
                            &nbsp;
                            {
                                ids.includes(intro.id) ?
                                    <button className="w3-small w3-button w3-round-large w3-pale-red" onClick={() => this.handleClickRelease(intro.id)}>해제</button>
                                    :
                                    <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickCheck(intro.id, intro.context)}>선택</button>
                            }
                            &nbsp;
                            <Link to={`/intro/${intro.id}/detail/edit`}><button className="w3-small w3-button w3-round-large w3-purple">상세내용 조회</button></Link>
                        </td>
                    </tr>
                );
        }

        if(activeEditData !== null){
            renderModal = <IntroEditModal data={activeEditData} writer={principal.identity} cancel={this.handleClickCancelSave.bind(this)} updating={this.props.executeUpdateTitle.bind(this)} creating={this.props.executeCreateTitle.bind(this)} />
        }

        if(this.props.saveStatus.message){
            alert(this.props.saveStatus.message);
            this.props.history.push('/intro/edit/_refresh');
        } else if(this.props.saveStatus.error){
            alert(this.props.saveStatus.error);
            this.props.history.push('/intro/edit/_refresh');
        }

        if(this.props.deleteStatus.message){
            alert(this.props.deleteStatus.message);
            this.props.history.push('/intro/edit/_refresh');
        } else if(this.props.deleteStatus.error){
            alert(this.props.deleteStatus.error);
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
                    <button className="w3-small w3-button w3-round-large w3-blue" onClick={() => this.handleClickSave(0, '')}>제목 추가하기</button>
                    <br/><br/>
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
                    <br/>
                    {
                        contexts.length > 0 ?
                            <div className="w3-center" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                                <h3>선택하신 다음과 같은 제목들이 삭제 됩니다.</h3>
                                <ul className="w3-ul w3-border">
                                    {
                                        contexts.map((context, idx) => <li key={`context_${idx}`}>{context}</li>)
                                    }
                                </ul>
                                <br/>
                                <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickRemove()}>삭제 진행하기</button>
                                <br/>
                            </div> : ''
                    }
                    {renderModal}
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(withRouter(IntroTitleList));