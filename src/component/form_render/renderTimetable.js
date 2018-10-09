import React from 'react';
import {Field} from 'redux-form';
import renderTextField from './renderTextField';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';

const renderTimetable = ({ fields }) => {
    return (
        <div style={{width : window.innerWidth >= 420 ? '50%' : '90%', backgroundColor : '#D0EEFB'}} className="w3-round-large">
            <div className="w3-center">
                <br/>
                    {
                        fields.length < 4 && fields.length > 0 ?
                            <button type="button" className="w3-button w3-blue w3-round-large" onClick={() => fields.push({})}>
                                <PlusOneIcon /> 시간 추가
                            </button> : ''
                    }
                    { fields.length < 4 ? " " : "" }
                    {
                        fields.length > 0 ?
                            <button type="button" className="w3-button w3-pink w3-round-large" onClick={() => fields.splice(0, fields.length)}>
                                <TimerOffIcon /> 비활성
                            </button> :
                            <button type="button" className="w3-button w3-green w3-round-large" onClick={() => fields.push({})}>
                                <TimerIcon /> 활성
                            </button>
                    }
            </div>
            { fields.length > 0 ? <hr style={{width : window.innerWidth >= 420 ? '50%' : '70%', border : '1px solid #000000'}} /> : '' }
            {fields.map((timetable, idx) => (
                <div key={idx}>
                    <div style={{width : window.innerWidth >= 420 ? '50%' : '70%'}}>
                        <h5 className="w3-text-gray">{idx !== 3 ? idx + 1 : '마지막'} 구간 시작 시각</h5>
                        <Field
                            name={`${timetable}.startTime`}
                            type="time"
                            component={renderTextField}
                        />
                    </div>
                    <br/>

                    <div style={{width : window.innerWidth >= 420 ? '50%' : '70%'}}>
                        <h5 className="w3-text-gray">{idx !== 3 ? idx + 1 : '마지막'} 구간 종료 시각</h5>
                        <Field
                            name={`${timetable}.endTime`}
                            type="time"
                            component={renderTextField}
                        />
                    </div>
                    <br/>

                    <div className="w3-center">
                        {
                            fields.length > 1 ?
                                <button
                                    type="button"
                                    onClick={() => fields.remove(idx)}
                                    className="w3-button w3-red w3-round-large"
                                >
                                    <DeleteIcon /> 시간 삭제
                                </button> : ''

                        }
                        { fields.length > 1 ? " " : "" }
                        {
                            idx === fields.length - 1 && fields.length !== 1 ?
                                <button type="button" className="w3-button w3-yellow w3-round-large" onClick={() => {
                                    fields.splice(0, fields.length);
                                    fields.push({});
                                }}>
                                    <RefreshIcon /> 초기화
                                </button> : ''
                        }
                        { fields.length - 1 === idx && fields.length !== 1 ? " " : "" }
                        { fields.length < 4 ?
                            <button type="button" className="w3-button w3-blue w3-round-large" onClick={() => fields.insert(idx + 1, {})}>
                                <PlusOneIcon /> 시간 추가
                            </button> : ''
                        }
                        { fields.length < 4 ? " " : "" }
                        {
                            idx === fields.length - 1 ?
                                    <button type="button" className="w3-button w3-pink w3-round-large" onClick={() => fields.splice(0, fields.length)}>
                                        <TimerOffIcon /> 비활성
                                    </button> : ''
                        }
                    </div>
                    <br/>
                </div>
            ))}
            <br/>
        </div>
    );
}
export default renderTimetable;