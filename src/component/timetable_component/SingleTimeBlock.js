import React, {Component} from 'react';
import moment from 'moment';

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const minutes = [0, 15, 30, 45];

class SingleTimeBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            dayTimes : props.times
        }
    }

    componentWillReceiveProps(nextProps){
        const { dayTimes } = this.state;
        if(dayTimes !== nextProps.times){
            this.setState({
                dayTimes : nextProps.times
            })
        }
    }

    render(){
        const {dayTimes} = this.state;
        let eachTimetable = {};
        for(var a=0;a<dayTimes.length;a++) {
            const {startTime, endTime} = dayTimes[a];
            let tmpStart = moment(startTime, "HH:mm");
            let tmpEnd = moment(endTime, "HH:mm");
            let tmpTimes = tmpStart;
            while(tmpTimes.isBefore(tmpEnd)){
                eachTimetable = {
                    ...eachTimetable,
                    [`time_${tmpTimes.hours()}_${tmpTimes.minute()}`] : true
                }
                tmpTimes.add('m', 15);
            }
        }
        return(
            <table className="w3-table w3-bordered w3-centered" style={{ width : '60%'}}>
                <thead>
                <tr>
                    <th>시</th>
                    <th>00~15분</th>
                    <th>16~30분</th>
                    <th>31~45분</th>
                    <th>46~59분</th>
                </tr>
                </thead>
                <tbody>
                {
                    hours.map(h => {
                        return (
                            <tr key={`hour_${h}`}>
                                <td>{h}시</td>
                                {
                                    minutes.map(mi => {
                                        return (
                                            <td key={`time_${h}_${mi}`} className={eachTimetable[`time_${h}_${mi}`] ? 'w3-orange' : '' }>

                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}
export default SingleTimeBlock;