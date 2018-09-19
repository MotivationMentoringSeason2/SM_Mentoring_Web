import React from 'react';
import SKHUImage from '../../resource_image/skhu_photo.png';
import IntroTitleListContainer from '../../container/IntroTitleListContainer';

const IntroEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <IntroTitleListContainer />
    </div>
)

export default IntroEditPage;