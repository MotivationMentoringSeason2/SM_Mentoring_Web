import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {IndexPage} from "../page/index_page";
import ScrollToTop from "./ScrollToTop";
import {TimetableEditPage} from "../page/timetable_edit_page";

const MentoRouter = (props) => {
    return(
        <div>
            <ScrollToTop>
                <Route exact path="/login" render={() => <Redirect to="/" />} />
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
            </ScrollToTop>
        </div>
    );
};

export default MentoRouter;