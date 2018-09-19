import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";

import {IndexPage} from "../page/index_page";
import {SignUpdatePage} from "../page/sign_update_page";
import {TimetableEditPage} from "../page/timetable_edit_page";
import {AccountListPage} from "../page/account_list_page";
import {AccountViewPage} from "../page/account_view_page";
import {AccountExcelUploadPage} from "../page/account_excel_upload_page";
import {ProfileEditPage} from "../page/profile_edit_page";
import {NoticePage} from "../page/notice_page";
import {IntroViewPage} from "../page/intro_view_page";
import {IntroEditPage} from "../page/intro_edit_page";
import {DetailEditPage} from "../page/intro_detail_edit_page";

const AdminRouter = () => (
    <div>
        <ScrollToTop>
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route exact path="/" component={IndexPage} />
            <Route path="/notice/:id/list" component={NoticePage} />
            <Route path="/notice/:id/list/_move" render={({ match, location }) => {
                window.location.href = `/notice/${match.params.id}/list${location.search}`
                return <Redirect to={`/notice/${match.params.id}/list${location.search}`}/>
            }} />
            <Route exact path="/intro/view" component={IntroViewPage} />
            <Route exact path="/intro/edit" component={IntroEditPage} />
            <Route exact path="/intro/edit/_refresh" render={() => <Redirect to="/intro/edit" />} />
            <Route exact path="/intro/:id/detail/edit" component={DetailEditPage} />
            <Route exact path="/account/sign/edit" component={SignUpdatePage} />
            <Route exact path="/account/timetable/edit" component={TimetableEditPage} />
            <Route exact path="/account/profile/edit" component={ProfileEditPage} />
            <Route exact path="/admin/accounts/list" component={AccountListPage} />
            <Route exact path="/admin/accounts/view" component={AccountViewPage} />
            <Route exact path="/admin/excel_upload" component={AccountExcelUploadPage} />
            <Route exact path="/admin/excel_upload/_refresh" render={() => <Redirect to="/admin/excel_upload" />} />
        </ScrollToTop>
    </div>
);

export default AdminRouter;