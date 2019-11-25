import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './ActionButtonsStyles';
import { Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import MoreVertIcon  from '@material-ui/icons/MoreVert';
import CloudDownloadSharp from '@material-ui/icons/CloudDownloadSharp';

class ActionButton extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillReceiveProps(nextProps) {

    }

    handleClick(event) {
        this.props.handleClick(this.props.value, this.props.target, event)
    }

    // hasPermission() {
    //     const { RoleKey, RoleAction } = this.props;
    //     return hasPermission(RoleKey, RoleAction);
    // }

    // renderButton() {
    //     const { classes } = this.props;
    //     return (
    //         <Tooltip title="Remove" classes={{ tooltip: classes.lightTooltip }}>
    //             <div>
    //                 <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
    //                     <SVG src={removeIcon} className={classes.Actionmenus}> Remove </SVG>
    //                 </Button>
    //             </div>
    //         </Tooltip>
    //     );
    // }

    renderInfoButton() {
        const { classes, text } = this.props;
        return (
            <Tooltip title= {text ? text : "info"} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
                        <MoreVertIcon    className={classes.Actionmenus}> {text} </MoreVertIcon >
                    </Button>
                </div>
            </Tooltip>
        );
    }
    // renderDetailsButton() {
    //     const { classes } = this.props;
    //     return (
    //         <Tooltip title="Details" classes={{ tooltip: classes.lightTooltip }}>
    //             <div>
    //                 <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
    //                     <SVG src={detailsIcon} className={classes.Actionmenus}> Details </SVG>
    //                 </Button>
    //             </div>
    //         </Tooltip>
    //     );
    // }

    renderDefaultButton() {
        const { classes, text, disabled, clas } = this.props;
        return (
            <Tooltip title= {text ? text : "info"} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={`${classes.actionButton} ${clas}`} onClick={this.handleClick.bind(this)}>
                        {text}
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderSmallButton() {
        const { classes, text, disabled, value, checked } = this.props;
        return (
            <ToggleButton
                key={value}
                value={value}
                aria-label="bold"
                disabled={disabled}
                disableRipple
                selected={checked}
                className={classes.actionButton_small}
                onClick={this.handleClick.bind(this)}>
                {text}
            </ToggleButton>
        )
    }
    renderBigButton() {
        const { classes, text, disabled, value, checked } = this.props;
        return (
            <ToggleButton
                key={value}
                value={value}
                aria-label="bold"
                disabled={disabled}
                disableRipple
                selected={checked}
                className={classes.actionButton_big}
                onClick={this.handleClick.bind(this)}>
                {text}
            </ToggleButton>
        )
    }
    renderDownloadButton() {
        const { classes, text } = this.props;
        return (
            <Tooltip title= {text ? text : "info"} classes={{ tooltip: classes.lightTooltip }}>
                <div className={`${classes.actionButton} ${classes.download}`} onClick={this.handleClick.bind(this)}>
                    {/* <Fab aria-label="download" > */}
                        <CloudDownloadSharp />
                    {/* </Fab> */}
                    {/* <Button disabled={disabled} className={`${classes.actionButton} ${clas}`} >
                        {text}
                    </Button> */}
                </div>
            </Tooltip>
        );
    }
    rederSwitch() {
        const { buttonType } = this.props;
        switch (buttonType) {
            case "default":
                return this.renderDefaultButton()
            case 'small':
                return this.renderSmallButton()
            case 'normal':
                return this.renderBigButton()
            case 'download':
                return this.renderDownloadButton()
                case 'info':
                    return this.renderInfoButton()
            default:
                return "na";
            // break;
        }
    }
    render() {
        return (
            this.rederSwitch()
        )
    }
}

export default withStyles(styles)(ActionButton);