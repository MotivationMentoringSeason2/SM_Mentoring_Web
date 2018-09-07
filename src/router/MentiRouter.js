import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";

import {IndexPage} from "../page/index_page";
import {SignUpdatePage} from "../page/sign_update_page";
import {TimetableEditPage} from "../page/timetable_edit_page";

const MentiRouter = (props) => {
    return (
        <div>
            <ScrollToTop>
                <Route exact path="/login" render={() => <Redirect to="/" />} />
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/account/sign/edit" component={SignUpdatePage} />
                <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
            </ScrollToTop>
        </div>
    );
}

export default MentiRouter;