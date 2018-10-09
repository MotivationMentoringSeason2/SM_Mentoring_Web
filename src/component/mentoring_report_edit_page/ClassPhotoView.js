import React, {Component} from 'react';
import defaultProfile from '../../resource_image/default_profile.png';
import axios from "axios";
import {MENTO_URL} from "../../action/distribute_urls";

const REPORT_ROOT_URL = `${MENTO_URL}/report/photo`;

class ClassPhotoView extends Component{
    constructor(props){
        super(props);
        this.state = { status : 0 };
    }

    componentWillReceiveProps(nextProps){
        if (this.props.photoId !== nextProps.photoId) {
            this.propsUpdating(nextProps.photoId);
        }
    }

    propsUpdating(photoId){
        let self = this;
        axios.get(`${REPORT_ROOT_URL}/${photoId}`)
            .then(response =>
                self.setState({ status : response.status })
            );
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.status !== nextState.status || nextProps.identity !== this.props.identity;
    }

    componentDidMount(){
        let self = this;
        if(this.props.identity !== '')
            axios.get(`${REPORT_ROOT_URL}/${this.props.photoId}`)
                .then(response =>
                    self.setState({ status : response.status })
                );
    }

    render(){
        return (
            <img src={(this.state.status === 200) ? `${REPORT_ROOT_URL}/${this.props.photoId}` : defaultProfile} alt=""
                style={{ width : window.innerWidth <= 425 ? '85%' : '45%'}}
                className="w3-image w3-round-large"
            />
        )
    }
}
export default ClassPhotoView;