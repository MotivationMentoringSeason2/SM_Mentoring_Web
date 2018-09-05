import React from 'react';
import {SignFormContainer} from "../../container";
import SKHUImage from '../../resource_image/skhu_photo.png';
const SignPage = () => {
    return(
        <div>
            <img src={SKHUImage} width="100%" className="w3-round-large" />
            <br/><br/>
            <SignFormContainer />
        </div>
    )
}

export default SignPage;