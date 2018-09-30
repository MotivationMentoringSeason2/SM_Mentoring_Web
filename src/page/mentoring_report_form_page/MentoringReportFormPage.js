import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import ReportEditFormContainer from '../../container/ReportEditFormContainer';

const MentoringReportFormPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ReportEditFormContainer />
    </div>
);
export default MentoringReportFormPage;