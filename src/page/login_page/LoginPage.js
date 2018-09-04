import React from 'react';
import {LoginFormContainer} from "../../container";
import SKHUImage from '../../resource_image/skhu_photo.png';
const LoginPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <LoginFormContainer />
    </div>
);
export default LoginPage;