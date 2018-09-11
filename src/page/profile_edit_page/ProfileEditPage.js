import React from 'react';
import {ProfileEditFormContainer} from "../../container";
import SKHUImage from '../../resource_image/skhu_photo.png';

const ProfileEditPage = () => (
    <div>
        <img src={SKHUImage} width="100%" className="w3-round-large" />
        <br/><br/>
        <ProfileEditFormContainer />
    </div>
)

export default ProfileEditPage;