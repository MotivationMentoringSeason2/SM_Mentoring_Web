import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import {MentoringFormContainer} from "../../container";

const MentoringPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <MentoringFormContainer />
    </div>
);
export default MentoringPage;