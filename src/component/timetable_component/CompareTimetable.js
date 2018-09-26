import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import MultiTimeBlock from "./MultiTimeBlock";
import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/resource'

class CompareTimetable extends Component{
    constructor(props){
        super(props);
        this.state = {
            day : 'MON',
            myName : props.myName,
            myTimetable : props.myTimetable,
            anotherTimetable : [],
            anotherIdentity : props.anotherIdentity,
            anotherName : null
        };
    }

    componentWillReceiveProps(nextProps){
        const { myName, myTimetable, anotherIdentity } = this.state;
        if(myName !== nextProps.myName){
            this.setState({
                myName : nextProps.myName
            })
        }
        if(myTimetable !== nextProps.myTimetable){
            this.setState({
                myTimetable : nextProps.myTimetable
            });
        }
        if(anotherIdentity !== nextProps.anotherIdentity){
            this.setState({
                anotherIdentity : nextProps.anotherIdentity
            });
            this.fetchingTimetableInfoAndUser(nextProps.anotherIdentity);
        }
    }

    componentDidMount() {
        const { anotherIdentity } = this.state;
        this.fetchingTimetableInfoAndUser(anotherIdentity);
    }

    fetchingTimetableInfoAndUser(anotherIdentity){
        if (anotherIdentity !== null) {
            axios.get(`${ROOT_URL}/available_times/${anotherIdentity}`).then(response => {
                this.setState({
                    anotherTimetable: response.data
                });
            });
            axios.get(`${ROOT_URL}/account/name/${anotherIdentity}`).then(response => {
                this.setState({
                    anotherName : response.data
                });
            });
        }
    }

    handleClick(event){
        this.setState({
            day : event.target.id
        });
    }

    render(){
        const { myName, anotherName, day, myTimetable, anotherTimetable } = this.state;
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
        const myDayTimes = {
            name : myName,
            availableTimes : myTimetable
                .filter(t => t.day === day)
                .map(t => ({
                        startTime : t.startTime,
                        endTime : t.endTime
                    })
                )
        };
        const anotherDayTimes = {
            name : anotherName,
            availableTimes : anotherTimetable
                .filter(t => t.day === day)
                .map(t => ({
                        startTime : t.startTime,
                        endTime : t.endTime
                    })
                )
        };
        return(
            <Grid align="center">
                <h4>{myName} 님과 {anotherName} 님의 가능한 시간을 분석 해 드립니다.</h4>
                <h5>시간표의 초록 배경은 가능한 시간, 노란 배경은 혼자만 가능한 시간 입니다.</h5>
                <br/>
                <span className={`w3-badge w3-xxlarge w3-padding w3-${hanjaAndColor && hanjaAndColor.color}`}>{ hanjaAndColor && hanjaAndColor.ch }</span>
                <br/><br/>
                <div className="w3-padding-16">
                    <button id="MON" type="button" className="w3-button w3-round-large w3-red" onClick={this.handleClick.bind(this)}>월요일</button>
                    <button id="TUE" type="button" className="w3-button w3-round-large w3-orange" onClick={this.handleClick.bind(this)}>화요일</button>
                    <button id="WED" type="button" className="w3-button w3-round-large w3-yellow" onClick={this.handleClick.bind(this)}>수요일</button>
                    <button id="THU" type="button" className="w3-button w3-round-large w3-green" onClick={this.handleClick.bind(this)}>목요일</button>
                    <button id="FRI" type="button" className="w3-button w3-round-large w3-blue" onClick={this.handleClick.bind(this)}>금요일</button>
                </div>
                <br/>
                <div className="w3-centered">
                    <MultiTimeBlock times={[myDayTimes, anotherDayTimes]} />
                </div>
            </Grid>
        )
    }
}

export default CompareTimetable;