import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import KeyboardRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    margin: "16px 8px 0px 8px",
    backgroundColor: theme.palette.background.paper,
  }
});

class PastPayments extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Link to="pastPayments">
          <List component="nav">
            <ListItem button>
              <ListItemText
                primary={
                  <LabelContainer
                    labelKey="Past Payments"
                    labelName="Past Payments"
                    style={{
                      fontSize: 14,
                      color: "rgba(0, 0, 0, 0.8700000047683716)"
                    }}
                  />
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <KeyboardRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(PastPayments);
