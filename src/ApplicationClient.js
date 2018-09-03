import React, {Component} from 'react';
import {ApplicationContainer} from "./container";
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

export default class ApplicationClient extends Component{
    render(){
        return(
            <Provider store={store}>
                <ApplicationContainer />
            </Provider>
        )
    }
}