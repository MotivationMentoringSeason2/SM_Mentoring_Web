import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import FaceIcon from '@material-ui/icons/Face';
import ChildIcon from '@material-ui/icons/ChildCare';
import HowToIcon from '@material-ui/icons/HowToReg';
import ActivityIcon from '@material-ui/icons/AccessibilityNew';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetDividers(props) {
  const { classes, schedules } = props;
  return (
      <div className={classes.root}>
          <List>
          {
              schedules.map((schedule, idx) => {
                  let icon;
                  switch(idx){
                      case 0 :
                          icon = <FaceIcon />;
                          break;
                      case 1 :
                          icon = <ChildIcon />;
                          break;
                      case 2 :
                          icon = <HowToIcon />;
                          break;
                      case 3 :
                      case 5 :
                          icon = <ActivityIcon />;
                          break;
                      case 4 :
                      case 7 :
                          icon = <PaymentIcon />;
                          break;
                      default :
                          icon = <ReceiptIcon />;
                          break;
                  }
                  return (
                      <div>
                          <ListItem>
                              <Avatar>
                                  {icon}
                              </Avatar>
                              <ListItemText primary={schedule.context} secondary={`${schedule.startDate} 에서 ${schedule.endDate} 까지`} />
                          </ListItem>
                          <Divider inset component="li" />
                      </div>
                  )
              })
          }
          </List>
      </div>
  );
}

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);