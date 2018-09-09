import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";

import {IndexPage} from "../page/index_page";
import {SignUpdatePage} from "../page/sign_update_page";
import {TimetableEditPage} from "../page/timetable_edit_page";
import {AccountListPage} from "../page/account_list_page";
import {AccountViewPage} from "../page/account_view_page";

const AdminRouter = () => (
    <div>
        <ScrollToTop>
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/account/sign/edit" component={SignUpdatePage} />
            <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
            <Route exact path="/admin/accounts/list" component={AccountListPage} />
            <Route exact path="/admin/accounts/view" component={AccountViewPage} />
        </ScrollToTop>
    </div>
);

export default AdminRouter;