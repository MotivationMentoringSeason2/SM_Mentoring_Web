import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

import MessageIcon from '@material-ui/icons/Message';
import DetailEditModal from "./DetailEditModal";

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class DetailTitleList extends Component{
    constructor(props){
        super(props);
        this.state = {
            creatable : false, contexts : [], ids : [], selectDetails : []
        };
    }

    componentWillMount(){
        const { match } = this.props;
        this.props.fetchDetailList(match.params.id);
    }

    componentWillReceiveProps(nextProps){
        const { details } = this.props.detailList;
        if(details !== nextProps.detailList.details){
            this.contextInitialize(nextProps.detailList.details);
        }
    }

    contextInitialize(contexts){
        let tmpContexts = contexts.map((c) => ({
            id : c.id,
            context : c.context,
            writer : c.writer
        }));
        this.setState({
            contexts : tmpContexts
        })
    }

    handleChange(event){
        const {contexts} = this.state;
        let tmpContexts = contexts.slice();
        tmpContexts[event.target.id] = {
            ...tmpContexts[event.target.id], context : event.target.value
        }
        this.setState({
            contexts : tmpContexts
        });
    }

    componentWillUmmount(){
        this.props.resetFetchDetailList();
    }

    handleClickCheck(id, context){
        const { ids, selectDetails } = this.state;
        let tmpIds = ids.slice();
        let tmpDetails = selectDetails.slice();
        tmpIds.push(id);
        tmpDetails.push(context);
        this.setState({
            ids : tmpIds,
            selectDetails : tmpDetails
        })
    }

    handleClickRelease(id){
        const { ids, selectDetails } = this.state;
        let tmpIds = ids.slice();
        let tmpDetails = selectDetails.slice();
        let idx = -1;
        for(var i=0;i<tmpIds.length;i++){
            if(id === tmpIds[i]){
                idx = i;
                break;
            }
        }
        if(idx !== -1){
            tmpIds.splice(idx, 1);
            tmpDetails.splice(idx, 1);
        }
        this.setState({
            ids : tmpIds,
            selectDetails : tmpDetails
        });
    }

    handleSave(id, context){
        const { principal } = this.props.accessAccount;
        if(context.trim() === '') {
            alert("세부 내용은 공백이 존재할 수 없습니다. 다시 입력하세요.");
        }
        else{
            let beUpdate = window.confirm("세부 내용을 저장합니다. 계속 하시겠습니까?");
            if(beUpdate) {
                console.log(id);
                console.log(context);
                console.log(principal.identity);
            }
        }
    }

    handleClickCreate(){
        this.setState({
            creatable : true
        })
    }

    handleClickCancelCreate(){
        this.setState({
            creatable : false
        })
    }

    handleClickRemove(){
        const { ids } = this.state;
        let beRemoving = window.confirm("현재 선택하신 세부 문장들을 삭제합니다. 계속 하시겠습니까?");
        if(beRemoving)
            console.log(ids);
    }

    render(){
        const { classes } = this.props;
        const { ids, contexts, selectDetails, creatable } = this.state;
        const { principal } = this.props.accessAccount;
        let renderModal;
        if(creatable){
            renderModal = <DetailEditModal creatable={creatable} writer={principal.identity} cancel={this.handleClickCancelCreate.bind(this)} />
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
                        <h3>세부문 수정</h3>
                        <p>소개문 내부의 세부 문장을 수정합니다.</p>
                    </div>
                    <br/>
                    <button className="w3-small w3-button w3-round-large w3-blue" onClick={() => this.handleClickCreate()}>세부 문장 추가하기</button>
                    &nbsp;
                    <Link to="/intro/edit"><button className="w3-small w3-button w3-round-large w3-yellow">이전으로</button></Link>
                    <br/><br/>
                    <div className="w3-container" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                    {
                        contexts.map((c, idx) =>
                            <div className="w3-margin w3-padding-16 w3-round-large w3-border w3-border-light-green">
                                <input className="w3-input w3-animate-input" type="text" id={`${idx}`} onChange={this.handleChange.bind(this)} placeholder={'수정할 세부 내용을 입력하세요.'} value={c.context} />
                                <p>작성자 : {c.writer}</p>
                                <button className="w3-small w3-button w3-round-large w3-blue" onClick={() => this.handleSave(c.id, c.context)}>수정 내용 저장</button>
                                &nbsp;
                                {
                                    ids.includes(c.id) ?
                                        <button className="w3-small w3-button w3-round-large w3-pale-red" onClick={() => this.handleClickRelease(c.id)}>해제</button>
                                        :
                                        <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickCheck(c.id, c.context)}>선택</button>
                                }
                            </div>
                        )
                    }
                    {
                        selectDetails.length > 0 ?
                            <div className="w3-center" style={{ width : window.innerWidth <= 425 ? '95%' : '60%'}}>
                                <h3>선택하신 다음과 같은 세부문이 삭제 됩니다.</h3>
                                <ul className="w3-ul w3-border">
                                    {
                                        selectDetails.map((context, idx) => <li key={`context_${idx}`}>{context}</li>)
                                    }
                                </ul>
                                <br/>
                                <button className="w3-small w3-button w3-round-large w3-red" onClick={() => this.handleClickRemove()}>삭제 진행하기</button>
                                <br/>
                            </div> : ''
                    }
                    {renderModal}
                    </div>
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(withRouter(DetailTitleList));