import React from 'react';
import SKHUImage from "../../resource_image/skhu_photo.png";

import {MentoringMemoContainer} from "../../container";

const MentoringMemoPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <MentoringMemoContainer />
    </div>
)

export default MentoringMemoPage;