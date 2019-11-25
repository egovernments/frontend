import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import styles from './styles';

class SwitchButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    // handleFormat = (event, newFormats) => {
    //     // setFormats(newFormats);
    // };

    handleAlignment = (event, newValue) => {
        this.setState({
            value: newValue
        })
        this.props.clickFromTab(newValue);
    };

    componentDidMount() {
        this.setState({
            value: "boundary"
        })
    }
    render() {
        let { classes, chartParent } = this.props;
        let switchLabel = ["Boundary", "Usage"];
        return (
            <ToggleButtonGroup
                value={this.state.value}
                exclusive
                onChange={this.handleAlignment}
                aria-label="text alignment"
            >
                {chartParent.map((d, i) =>
                    <ToggleButton className={classes.toggleButton} value={d.id} aria-label="left aligned" >{switchLabel[i]}</ToggleButton>
                )}
            </ToggleButtonGroup>
        );
    }
}

export default withStyles(styles)(SwitchButton);
