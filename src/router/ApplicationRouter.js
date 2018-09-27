import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link, BrowserRouter as Router} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {FooterContext} from "../component/footer_component";
import {adminItems, introDefaultItems, introAdminItems, noticeItems, applicationItems, guestItems, mentiItems, mentoItems} from "../component/left_menu/MenuData";
import {GuestRouter, UserRouter, MentiRouter, MentoRouter, AdminRouter} from ".";
import {MenuProfileContainer} from "../container";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        minHeight : '100vh'
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

class ApplicationRouter extends Component{
    state = {
        open: false,
        anchor : null
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMenu = event => {
        this.setState({ anchor : event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchor : null });
    };

    componentWillMount = () => {
        this.props.fetchPrincipalFromServer();
    }

    componentWillUnmount = () => {
        this.props.resetFetchPrincipalFromServer();
    }

    render(){
        const { classes } = this.props;
        const { open } = this.state;
        const { anchor } = this.state;
        const accountOpen = Boolean(anchor);

        let router;
        const { principal, error } = this.props.accessAccount;

        if(error) {
            alert(error);
            window.location.href = "/";
        }
        if(principal === null){
            router = <GuestRouter />;
        } else {
            let type = principal.type;
            switch(type) {
                case 'PROFESSOR' :
                case 'EMPLOYEE' :
                    router = <AdminRouter />;
                    break;
                case 'STUDENT' :
                    switch (principal.studentStatus) {
                        case 'MENTO' :
                            router = <MentoRouter isChairman={false} />;
                            break;
                        case 'CHAIRMAN_MENTO' :
                            router = <MentoRouter isChairman={true} />;
                            break;
                        case 'MENTI' :
                            router = <MentiRouter isChairman={false} />;
                            break;
                        case 'CHAIRMAN_MENTI' :
                            router = <MentiRouter isChairman={true} />;
                            break;
                        case 'CHAIRMAN_NORMAL' :
                            router = <AdminRouter isStudent={true} />;
                            break;
                        default :
                            router = <UserRouter />
                            break;
                    }
                    break;
                default :
                    router = <UserRouter />;
                    break;
            }
        }
        const drawer = (
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                {
                    (principal !== null) ? <MenuProfileContainer /> : ''
                }
                <List>{noticeItems}</List>
                <Divider />
                {
                    (principal !== null && (principal.type === 'PROFESSOR' || principal.type === 'EMPLOYEE' || principal.studentStatus === 'CHAIRMAN_MENTO' || principal.studentStatus === 'CHAIRMAN_MENTI' || principal.studentStatus === 'CHAIRMAN_NORMAL')) ?
                        <div>
                            <List>{introAdminItems}</List>
                            <Divider />
                        </div>
                        : <div>
                            <List>{introDefaultItems}</List>
                            <Divider />
                        </div>
                }
                {
                    (principal !== null && principal.type === 'STUDENT' && (principal.studentStatus === 'NORMAL' || principal.studentStatus === 'CHAIRMAN_NORMAL')) ?
                        <div>
                            <List>{applicationItems}</List>
                            <Divider />
                        </div>
                        : ''
                }
                {
                    (principal !== null && ( principal.studentStatus === 'MENTI' || principal.studentStatus === 'CHAIRMAN_MENTI' )) ?
                        <div>
                            <List>{mentiItems}</List>
                            <Divider />
                        </div>
                        : ''
                }
                {
                    (principal !== null && ( principal.studentStatus === 'MENTO' || principal.studentStatus === 'CHAIRMAN_MENTO' )) ?
                        <div>
                            <List>{mentoItems}</List>
                            <Divider />
                        </div>
                        : ''
                }
                {
                    (principal === null) ?
                        <div>
                            <List>{guestItems}</List>
                            <Divider />
                        </div>
                        : ''
                }
                {
                    (principal !== null && (principal.type === 'PROFESSOR' || principal.type === 'EMPLOYEE' || principal.studentStatus === 'CHAIRMAN_MENTO' || principal.studentStatus === 'CHAIRMAN_MENTI' || principal.studentStatus === 'CHAIRMAN_NORMAL')) ?
                        <div>
                            <List>{adminItems}</List>
                            <Divider />
                        </div>
                        : ''
                }
            </Drawer>
        );

        return(
            <Router onChange={() => window.scrollTo(0, 0)}>
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <AppBar
                            className={classNames(classes.appBar, {
                                [classes.appBarShift]: open,
                                [classes["appBarShift-left"]]: open,
                            })}
                            color="primary"
                        >
                            <Toolbar disableGutters={!open}>
                                <IconButton
                                    color="inherit"
                                    aria-label="메뉴 개방"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="홈으로 이동"
                                    className={classNames(classes.menuButton)}
                                    component={Link}
                                    to="/"
                                >
                                    <HomeIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" noWrap>
                                    SKHU Mentoring
                                </Typography>
                                {principal && (
                                    <div>
                                        <IconButton
                                            aria-owns={accountOpen ? 'menu-appbar' : null}
                                            aria-haspopup="true"
                                            onClick={this.handleMenu}
                                            color="inherit"
                                        >
                                            <AccountCircleIcon />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchor}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            open={accountOpen}
                                            onClose={this.handleClose}
                                        >
                                            <Link to="/account/sign/edit" style={{ textDecoration: 'none' }}>
                                                <MenuItem onClick={this.handleClose}>회원 정보 변경</MenuItem>
                                            </Link>
                                            <Link to="/account/timetable/edit" style={{ textDecoration: 'none' }}>
                                                <MenuItem onClick={this.handleClose}>{principal.type === 'STUDENT' ? '멘토링 가능한 시간 설정' : '멘토링 상담 가능 시간 설정'}</MenuItem>
                                            </Link>
                                            <Link to="/account/profile/edit" style={{ textDecoration: 'none' }}>
                                                <MenuItem onClick={this.handleClose}>프로필 설정</MenuItem>
                                            </Link>
                                            {
                                                principal.type === 'STUDENT' ?
                                                    <Link to="/application/confirm" style={{ textDecoration: 'none' }}>
                                                        <MenuItem onClick={this.handleClose}>멘토링 신청 내역</MenuItem>
                                                    </Link> : null
                                            }
                                        </Menu>
                                    </div>
                                )}
                            </Toolbar>
                        </AppBar>
                        {drawer}
                        <main
                            className={classNames(classes.content, classes["content-left"], {
                                [classes.contentShift]: open,
                                [classes["contentShift-left"]]: open,
                            })}
                        >
                            <div className={classes.drawerHeader}>

                            </div>
                            { router }
                            <hr/>
                            <FooterContext />
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

ApplicationRouter.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ApplicationRouter);