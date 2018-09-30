import React from 'react';
import {CardFormContainer} from "../../container";

import SKHUImage from '../../resource_image/skhu_photo.png';
const CardPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <CardFormContainer />
    </div>
);
export default CardPage;