import React from 'react';
import MentiApplicationViewContainer from '../../container/MentiApplicationViewContainer';
import SKHUImage from '../../resource_image/skhu_photo.png';
const MentiApplicationPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <MentiApplicationViewContainer />
    </div>
);

export default MentiApplicationPage;