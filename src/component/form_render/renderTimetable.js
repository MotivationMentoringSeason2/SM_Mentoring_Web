import React from 'react';
import {Field} from 'redux-form';
import renderTextField from './renderTextField';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import {renderSelectField} from "./index";

const dayArray = [
    { label : '월요일', value : 'MON' },
    { label : '화요일', value : 'TUE' },
    { label : '수요일', value : 'WED' },
    { label : '목요일', value : 'THU' },
    { label : '금요일', value : 'FRI' },
    { label : '토요일', value : 'SAT' },
    { label : '일요일', value : 'SUN' },
]

const renderTimetable = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <div style={{width : window.innerWidth >= 420 ? '50%' : '90%', backgroundColor : '#D0EEFB'}} className="w3-round-large">
            <div className="w3-center">
                {submitFailed && error && <span className="w3-text-pink">{error}</span>}&nbsp;&nbsp;
                <br/>
                <button type="button" className="w3-button w3-blue w3-round-large" onClick={() => fields.push({})}>
                    <PlusOneIcon /> 시간 추가
                </button>
                &nbsp;
                <button type="button" className="w3-button w3-yellow w3-round-large" onClick={() => {
                    fields.splice(0, fields.length);
                    fields.push({})
                }}>
                    <RefreshIcon /> 초기화
                </button>
            </div>
            <hr style={{width : window.innerWidth >= 420 ? '50%' : '70%', border : '1px solid #000000'}} />
            {fields.map((timetable, idx) => (
                <div key={idx}>
                    <div style={{width : window.innerWidth >= 420 ? '50%' : '70%'}}>
                        <h5 className="w3-text-gray">{idx + 1} 구간 시작 시각</h5>
                        <Field
                            name={`${timetable}.startTime`}
                            type="time"
                            component={renderTextField}
                        />
                    </div>
                    <br/>

                    <div style={{width : window.innerWidth >= 420 ? '50%' : '70%'}}>
                        <h5 className="w3-text-gray">{idx + 1} 구간 종료 시각</h5>
                        <Field
                            name={`${timetable}.endTime`}
                            type="time"
                            component={renderTextField}
                        />
                    </div>
                    <br/>

                    <div className="w3-center">
                        {submitFailed && error && <span className="w3-text-pink">{error}</span>}&nbsp;&nbsp;
                        {
                            fields.length > 1 ?
                                <button
                                    type="button"
                                    onClick={() => fields.remove(idx)}
                                    className="w3-button w3-red w3-round-large"
                                >
                                    <DeleteIcon /> 시간 삭제
                                </button> :
                                <button type="button" className="w3-button w3-yellow w3-round-large" onClick={() => {
                                    fields.splice(0, fields.length);
                                    fields.push({})
                                }}>
                                    <RefreshIcon /> 초기화
                                </button>
                        }
                        &nbsp;&nbsp;
                        <button type="button" className="w3-button w3-blue w3-round-large" onClick={() => fields.insert(idx + 1, {})}>
                            <PlusOneIcon /> 시간 추가
                        </button>
                    </div>
                    <br/>
                </div>
            ))}
        </div>
    );
}
export default renderTimetable;