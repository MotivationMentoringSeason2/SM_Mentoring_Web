import React from 'react';
import MentoApplicationFormContainer from '../../container/MentoApplicationFormContainer';
import SKHUImage from '../../resource_image/skhu_photo.png';
const MentoApplicationPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <MentoApplicationFormContainer />
    </div>
)

export default MentoApplicationPage;