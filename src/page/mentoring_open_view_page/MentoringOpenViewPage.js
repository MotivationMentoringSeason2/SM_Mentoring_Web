import React from 'react';
import SKHUImage from "../../resource_image/skhu_photo.png";
import MentoringOpenViewContainer from '../../container/MentoringOpenViewContainer';

const MentoringOpenViewPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <MentoringOpenViewContainer />
    </div>
)

export default MentoringOpenViewPage;