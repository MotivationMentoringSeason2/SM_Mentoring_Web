import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import SingleTimeBlock from "./SingleTimeBlock";
class SingleTimetable extends Component{
    constructor(props){
        super(props);
        this.state = { day : 'MON', timetable : props.timetable, name : props.name };
    }

    componentWillReceiveProps(nextProps){
        const { timetable } = this.state;
        if(timetable !== nextProps.timetable){
            this.setState({
                timetable : nextProps.timetable
            });
        }
    }

    handleClick(event){
        this.setState({
            day : event.target.id
        });
    }

    render(){
        const { name, day, timetable } = this.state;
        let hanjaAndColor;
        switch(day){
            case 'MON' :
                hanjaAndColor = {
                    ch : '月', color : 'red'
                };
                break;
            case 'TUE' :
                hanjaAndColor = {
                    ch : '火', color : 'orange'
                };
                break;
            case 'WED' :
                hanjaAndColor = {
                    ch : '水', color : 'yellow'
                };
                break;
            case 'THU' :
                hanjaAndColor = {
                    ch : '木', color : 'green'
                };
                break;
            case 'FRI' :
                hanjaAndColor = {
                    ch : '金', color : 'blue'
                };
                break;
        }
        return(
            <Grid align="center">
                <h4>{name} 님의 요일 별 가능한 시간표 입니다.</h4>
                <h5>신청 하기 전에 다시 한 번 확인 바랍니다.</h5>
                <br/>
                <span className={`w3-badge w3-xxlarge w3-padding w3-${hanjaAndColor && hanjaAndColor.color}`}>{ hanjaAndColor && hanjaAndColor.ch }</span>
                <br/>
                <div className="w3-padding-16">
                    <button id="MON" type="button" className="w3-button w3-round-large w3-red" onClick={this.handleClick.bind(this)}>월요일</button>
                    <button id="TUE" type="button" className="w3-button w3-round-large w3-orange" onClick={this.handleClick.bind(this)}>화요일</button>
                    <button id="WED" type="button" className="w3-button w3-round-large w3-yellow" onClick={this.handleClick.bind(this)}>수요일</button>
                    <button id="THU" type="button" className="w3-button w3-round-large w3-green" onClick={this.handleClick.bind(this)}>목요일</button>
                    <button id="FRI" type="button" className="w3-button w3-round-large w3-blue" onClick={this.handleClick.bind(this)}>금요일</button>
                </div>
                <br/>
                <div className="w3-centered">
                    <SingleTimeBlock times={timetable.filter(t => t.day === day)} />
                </div>
            </Grid>
        )
    }
}

export default SingleTimetable;