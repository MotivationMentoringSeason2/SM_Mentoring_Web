import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {IndexPage} from "../page/index_page";
import ScrollToTop from './ScrollToTop';

const UserRouter = () => (
    <div>
        <ScrollToTop>
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route exact path="/" component={IndexPage} />
        </ScrollToTop>
    </div>
);

export default UserRouter;