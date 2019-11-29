import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import styles from './Style';

class Dialogs extends Component {

    render() {
        let classes = this.props.classes;
        return (
            <Dialog open={this.props.IsOpen} className={classes.rootDialogue}>
                <h3 className={classes.dialogueHeading}>{this.props.title}</h3>
                <DialogContent className={classes.innerContainer}>
                    {this.props.children}
                </DialogContent>
                {/* test */}
            </Dialog>
        );
    }
}

export default withStyles(styles)(Dialogs);