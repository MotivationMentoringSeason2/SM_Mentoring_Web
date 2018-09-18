import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import MessageIcon from '@material-ui/icons/Message';
import FullIcon from '@material-ui/icons/Fullscreen';
import FullReleaseIcon from '@material-ui/icons/FullscreenExit';

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

class IntroAccordion extends Component{
    constructor(props){
        super(props);
        this.state = { opened : {} };
    }

    componentWillMount(){
        this.props.fetchIntroAccordion();
    }

    componentWillReceiveProps(nextProps){
        const { result } = this.props.accordionStatus;
        if(result !== nextProps.accordionStatus.result){
            this.openStatusInitialize(nextProps.accordionStatus.result);
        }
    }

    componentWillUnmount(){
        this.props.resetFetchIntroAccordion();
    }

    openStatusInitialize(result){
        const { opened } = this.state;
        result.map(intro => {
            opened[`intro_${intro.introId}`] = false;
            this.setState({
                opened : opened
            });
        });
    }

    handleClickStatusChange(event){
        const { opened } = this.state;
        opened[event.target.id] = !opened[event.target.id]
        this.setState({
            opened : opened
        });
    }

    handleClickStatusAll(value){
        const { opened } = this.state;
        const keys = Object.keys(opened);
        keys.map(k => {
            opened[k] = value
        });
        this.setState({
            opened : opened
        });
    }

    render(){
        const { classes } = this.props;
        const { opened } = this.state;
        const { result } = this.props.accordionStatus;
        let accordion;
        if(result.length > 0){
            accordion =
                result.map(intro =>
                    <div key={`intro_acc_${intro.introId}`} style={{
                        width : window.innerWidth >= 450 ? "70%" : "95%"
                    }}>
                        <button id={`intro_${intro.introId}`} onClick={this.handleClickStatusChange.bind(this)} className="w3-button w3-block w3-round-large w3-border w3-border-blue w3-light-blue w3-left-align">
                            {intro.introContext}
                            <span className="w3-right w3-margin-right">
                                { !opened[`intro_${intro.introId}`] ? <FullIcon /> : <FullReleaseIcon /> }
                            </span>
                        </button>
                        <div className={`${ opened[`intro_${intro.introId}`] ? "w3-show" : "w3-hide" } w3-animate-opacity w3-round-large w3-border w3-border-light-blue`}>
                            <ul className="w3-block w3-left-align">
                                {
                                    intro.detailContext.map((detail, idx) => (
                                        <li key={`detail_${intro.introId}_${idx}`}>
                                            {detail}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                );
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
                        <h3>SKHU Mentoring 소개</h3>
                        <p>성공회대학교 Software Mentoring 사업을 소개합니다.</p>
                        <p>사업 소개문의 내용 일부는 언제든지 변경될 수 있습니다.</p>
                    </div>
                    <div>
                        <button className="w3-button w3-round-large w3-light-green" onClick={() => this.handleClickStatusAll(true)}><FullIcon /> 전체 펼치기</button>
                    </div>
                    <br/>
                    <div>
                        <button className="w3-button w3-round-large w3-yellow" onClick={() => this.handleClickStatusAll(false)}><FullReleaseIcon /> 전체 접기</button>
                    </div>
                    <br/>
                    {accordion}
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(IntroAccordion);