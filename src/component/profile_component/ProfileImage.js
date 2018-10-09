import React, {Component} from 'react';
import defaultProfile from '../../resource_image/default_profile.png';
import axios from "axios";
import {ACCOUNT_URL} from "../../action/distribute_urls";

const RESOURCE_ROOT_URL = `${ACCOUNT_URL}/resource`;

class ProfileImage extends Component{
    constructor(props){
        super(props);
        this.state = { status : 0 };
    }

    componentWillReceiveProps(nextProps){
        if (this.props.identity !== nextProps.identity) {
            this.propsUpdating(nextProps.identity);
        }
    }

    propsUpdating(identity){
        let self = this;
        axios.get(`${RESOURCE_ROOT_URL}/profile/${identity}`)
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
            axios.get(`${RESOURCE_ROOT_URL}/profile/${this.props.identity}`)
                .then(response =>
                    self.setState({ status : response.status })
                );
    }

    render(){
        return (
            <img src={(this.state.status === 200) ? `${RESOURCE_ROOT_URL}/profile/${this.props.identity}` : defaultProfile} alt=""
                 style={{
                     width : '100%',
                     height : 'auto'
                 }}
                 className="w3-image w3-round-large"
            />
        )
    }
}
export default ProfileImage;