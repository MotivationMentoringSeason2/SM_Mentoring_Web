import React from 'react';
import ChalkImage from '../../resource_image/chalk_photo.png';
import MentoringCareerViewContainer from '../../container/MentoringCareerViewContainer';

const MentoringCareerViewPage = () => (
    <div>
        <div>
            <img src={ChalkImage} width="100%" className="w3-round-large" />
            <br/><br/>
            <MentoringCareerViewContainer />
        </div>
    </div>
);

export default MentoringCareerViewPage;