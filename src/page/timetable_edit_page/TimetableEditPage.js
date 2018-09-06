import React from 'react';
import ChalkImage from '../../resource_image/chalk_photo.png';
import {TimetableEditFormContainer} from '../../container';

const TimetableEditPage = () => (
    <div>
        <img src={ChalkImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <TimetableEditFormContainer />
    </div>
);

export default TimetableEditPage;