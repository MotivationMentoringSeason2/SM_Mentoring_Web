import React from 'react';
import {LoginForm} from "../../component/login_page";
import SKHUImage from '../../resource_image/skhu_photo.png';
const LoginPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <LoginForm />
    </div>
);
export default LoginPage;