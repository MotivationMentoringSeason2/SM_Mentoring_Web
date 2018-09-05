import React from 'react';
import './selectField.css';

const renderSelectField = ({input, label, children, meta: { touched, error }}) => {
    return (
        <div className="w3-input formControl">
            <label className="w3-text-gray">{label}</label>
            <div>
                <select className="w3-select" {...input}>
                    <option value="0">-- 해당 사항 선택 --</option>
                    {children}
                </select>
                <div className="w3-text-pink">
                    <h7>{touched && error}</h7>
                </div>
            </div>
        </div>
    )
}

export default renderSelectField;
