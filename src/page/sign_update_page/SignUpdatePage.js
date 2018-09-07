import React from 'react';

import {SignUpdateFormContainer} from "../../container";
import SKHUImage from '../../resource_image/skhu_photo.png';

const SignUpdatePage = () => {
    return(
        <div>
            <img src={SKHUImage} width="100%" className="w3-round-large" />
            <br/><br/>
            <SignUpdateFormContainer />
        </div>
    )
}

export default SignUpdatePage;