import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {IndexPage} from "../page/index_page";

const AdminRouter = () => (
    <div>
        <Route exact path="/login" render={() => <Redirect to="/" />} />
        <Route exact path="/" component={IndexPage} />
    </div>
);

export default AdminRouter;