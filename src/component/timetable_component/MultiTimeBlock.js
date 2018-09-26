import React, {Component} from 'react';
import moment from 'moment';
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const minutes = [0, 15, 30, 45];
const color = ['indigo', 'green', 'orange', 'blue', 'purple', 'brown', 'lime', 'pink', 'amber', 'cyan', 'yellow', 'red'];

class MultiTimeBlock extends Component {
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
        const { dayTimes } = this.state;
        let eachTimetable = {};
        for(var a=0;a<dayTimes.length;a++) {
            const {name, availableTimes} = dayTimes[a];
            for(var j=0;j<availableTimes.length;j++){
                let tmpStart = moment(availableTimes[j].startTime, "HH:mm");
                let tmpEnd = moment(availableTimes[j].endTime, "HH:mm");
                var countTimes = tmpStart;
                while(countTimes.isBefore(tmpEnd)){
                    let currentTable = eachTimetable[`time_${countTimes.hours()}_${countTimes.minute()}`] === undefined ? [] : eachTimetable[`time_${countTimes.hours()}_${countTimes.minute()}`].slice();
                    currentTable.push({
                        name : name,
                        origIdx : a
                    });
                    eachTimetable = {
                        ...eachTimetable,
                        [`time_${countTimes.hours()}_${countTimes.minute()}`] : currentTable
                    }
                    countTimes.add('m', 15);
                }
            }
        }
        return(
            <table className="w3-table w3-bordered w3-centered" style={{ width : '60%'}}>
                <tr>
                    <td>시</td>
                    <td>00~15분</td>
                    <td>16~30분</td>
                    <td>31~45분</td>
                    <td>46~59분</td>
                </tr>
                {
                    hours.map(h => {
                        return (
                            <tr key={`hour_${h}`}>
                                <td>{h}시</td>
                                {
                                    minutes.map(mi => {
                                        const member = eachTimetable[`time_${h}_${mi}`];
                                        return (
                                            <td key={`time_${h}_${mi}`} className={member === undefined ? '' : member.length === dayTimes.length ? 'w3-pale-green' : member.length >= dayTimes.length / 2 ? 'w3-pale-yellow' : '' }>
                                                <div className="w3-padding">
                                                    {
                                                        member === undefined ? '' : member.map((m) => <div key={`member_m${m.origIdx}`} className={`w3-tag w3-round-medium w3-${color[m.origIdx]}`}>{m.name}</div>)
                                                    }
                                                </div>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </table>
        )
    }
}
export default MultiTimeBlock;