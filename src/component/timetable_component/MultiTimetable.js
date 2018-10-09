import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import MultiTimeBlock from "./MultiTimeBlock";
import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8081/AccountAPI/resource'

class MultiTimetable extends Component{
    constructor(props){
        super(props);
        this.state = {
            day : 'MON',
            personIdentity : props.person,
            mentoringTimes : null
        };
    }

    componentWillReceiveProps(nextProps){
        const { personIdentity } = this.state;
        if(personIdentity !== nextProps.person){
            this.setState({
                personIdentity : nextProps.person
            })
            this.fetchingTimetableInfoAndUser(nextProps.person);
        }
    }

    componentDidMount() {
        const { personIdentity } = this.state;
        this.fetchingTimetableInfoAndUser(personIdentity);
    }

    fetchingTimetableInfoAndUser(personIdentity){
        if (personIdentity && personIdentity !== '') {
            let userToken = localStorage.getItem('jwtToken');
            if(userToken !== null) {
                axios({
                    url: `${ROOT_URL}/available_times`,
                    data: personIdentity,
                    method: 'post',
                    headers:
                        {
                            'Authorization': `Bearer ${userToken}`
                        }
                }).then(response => {
                    this.setState({
                        mentoringTimes: response.data
                    });
                });
            }
        }
    }

    handleClick(event){
        this.setState({
            day : event.target.id
        });
    }

    render(){
        const { day, mentoringTimes } = this.state;
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
        let names = [];
        if(mentoringTimes !== null)
            names = Object.keys(mentoringTimes);
        let times = [];
        for(var k=0;k<names.length;k++){
            times.push({
                name : names[k],
                availableTimes : mentoringTimes[names[k]]
                                    .filter(t => t.day === day)
                                    .map(t => ({
                                            startTime : t.startTime,
                                            endTime : t.endTime
                                        })
                                    )
            });
        }
        return(
            <Grid align="center">
                <h4>현재 멘토링 팀이 가능한 시간을 분석 해 드립니다.</h4>
                <h5>시간표의 초록 배경은 모두가 가능한 시간, 노란 배경은 반 이상이 가능한 시간대 입니다.</h5>
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
                    <MultiTimeBlock times={times} />
                </div>
            </Grid>
        )
    }
}

export default MultiTimetable;