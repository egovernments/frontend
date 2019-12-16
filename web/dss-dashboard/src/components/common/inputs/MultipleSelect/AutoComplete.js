import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import _ from 'lodash';
import SVG from 'react-inlinesvg';
import districts_icon from '../../../../images/icon-districts.svg';
import ulbs_icon from '../../../../images/icon-ul-bs.svg';
import styles from './Styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import variables from '../../../../styles/variables';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" style={{ color: 'grey' }} />;

const inputStyle = {
    color: 'black',
};

const theme = createMuiTheme({
   overrides: {
      typography: {
        useNextVariants: true,
        fontFamily: variables.primaryFont
      },
      MuiMenu: {
        paper: {
          backgroundColor: 'white',
          fontFamily: variables.primaryFont,
          // minWidth: '100%',
          height: 'auto',
          color: variables.black
        }
      }
    }
  });

class CheckboxesTags extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            label: "All " + this.props.target,
            name: this.props.defaultValue || [],
            search: '',
            localItems: this.props.item || [],
            options: [
                {
                    text: "USA",
                    value: "1"
                },
                {
                    text: "Germany",
                    value: "2"
                },
                {
                    text: "France",
                    value: "3"
                },
                {
                    text: "Poland",
                    value: "4"
                },
                {
                    text: "Japan",
                    value: "5"
                }
            ]
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                name: nextProps.defaultValue
            });
        }
    }

    handleChange = (event, values) => {
        if (values && Array.isArray(values) && values.length > 0) {
            this.setState({
                label: ''
            })
        }

        if (values && Array.isArray(values) && values.length <= 0) {
            this.setState({
                label: 'All ' + this.props.target
            })
        }
        let { target } = this.props;
        let newVals = _.compact(values);
        if (newVals.length > 0) {
            this.setState({ name: newVals });
            this.props.handleSelected(false, target, newVals)
        } else {
            this.setState({ name: [] });
            this.props.handleSelected(false, target, [])
        }
        this.props.handleClear()
    };

    render() {
        const { innerRef, name, classes, logo, target, } = this.props;
        let svgicon;
        if (logo === "DDRs") {
            svgicon = districts_icon;
        } else if (logo === "ULBS") {
            svgicon = ulbs_icon;
        }

        return (
            <MuiThemeProvider theme={theme}>

                <div className={classes.root}>

                    <FormControl className={classes.formControl} >
                        {/* <InputLabel htmlFor="select-multiple-checkbox">{label || 'Select'}</InputLabel> */}
                        <div className={classes.list}>
                            <SVG src={svgicon} className={classes.CloseButton} >

                            </SVG>
                            <Autocomplete
                                disableUnderline={true}
                                onChange={this.handleChange.bind(this)}
                                multiple
                                id="checkboxes-tags-demo"
                                options={this.state.localItems}
                                disableCloseOnSelect

                                // renderTags={(value, getTag) =>
                                //     (
                                //         <span>{value.length + " Selected"}</span>
                                //     )
                                // }


                                getOptionLabel={option => option}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                    </React.Fragment>
                                )}
                                style={{ minWidth: '200px' }}
                                renderInput={params => (
                                    <div className={classes.searchinput} style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                                        <TextField
                                            {...params}
                                            placeholder={this.state.label}
                                            fullWidth
                                            style={{ color: 'rgba(0, 0, 0, 0.87)' }}
                                        /></div>
                                )}
                            />
                        </div>
                    </FormControl>

                </div>
            </MuiThemeProvider>

        );
    }

}

CheckboxesTags.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CheckboxesTags);


