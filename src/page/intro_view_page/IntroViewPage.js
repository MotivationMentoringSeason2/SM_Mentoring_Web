import React from 'react';
import {IntroAccordionContainer} from "../../container";
import SKHUImage from '../../resource_image/skhu_photo.png';

const IntroViewPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <IntroAccordionContainer />
    </div>
);

export default IntroViewPage;
