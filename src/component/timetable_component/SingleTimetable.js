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
        return(
            <Grid align="center">
                <h4>{name} 님의 요일 별 가능한 시간표 입니다.</h4>
                <h5>신청 하기 전에 다시 한 번 확인 바랍니다.</h5>
                <br/>
                <div className="w3-centered">
                    <SingleTimeBlock times={timetable.filter(t => t.day === day)} />
                </div>
                <br/>
                <div className="w3-padding-16">
                    <button id="MON" className="w3-button w3-round-large w3-red" onClick={this.handleClick.bind(this)}>월요일</button>
                    <button id="TUE" className="w3-button w3-round-large w3-orange" onClick={this.handleClick.bind(this)}>화요일</button>
                    <button id="WED" className="w3-button w3-round-large w3-yellow" onClick={this.handleClick.bind(this)}>수요일</button>
                    <button id="THU" className="w3-button w3-round-large w3-green" onClick={this.handleClick.bind(this)}>목요일</button>
                    <button id="FRI" className="w3-button w3-round-large w3-blue" onClick={this.handleClick.bind(this)}>금요일</button>
                </div>
            </Grid>
        )
    }
}

export default SingleTimetable;