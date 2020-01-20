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
import { isMobile } from 'react-device-detect';
import Chip from '@material-ui/core/Chip';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" style={{ color: 'grey' }} />;


const theme = createMuiTheme({
    overrides: {
        typography: {
            useNextVariants: true,
            fontFamily: variables.primaryFont
        },
        MuiAutocomplete:{            
            option:{
                fontSize:'0.8rem'
            },
            popupIndicator: {
                float:'right'
            },
            inputRoot:{
                paddingRight:'0px !important', 
                minWidth:'180px',               
                '@media (min-width: 1367px)':{                       
                    minWidth:'180px !important',
                    maxWidth:'180px !important'                    
                },
                '@media (min-width: 1026px) and (max-width:1300px)':{                     
                    minWidth:'150px !important',
                    maxWidth:'150px !important'                    
                }
            },
            endAdornment:{
                bottom:'0px !important',
                top: 'initial !important'
            },
            clearIndicator:{
                display:'none !important'
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

    componentDidUpdate(prevProps){
        console.log('prevProps---',prevProps)
        console.log('Next props---', this.props)
        if(prevProps.item !== this.props.item && this.props.item){
            this.setState({
                localItems: this.props.item
            })
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                name: nextProps.defaultValue
            });
        }
    }

    handleChange = (event, values) => {
        console.log('---handle change----',values)
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
        console.log('-----Target-----', target)
        let newVals = _.compact(values);
        if (newVals.length > 0) {
            console.log('-----newVals-----', newVals)
            this.setState({ name: newVals });
            this.props.handleSelected(false, target, newVals)
        } else {
            console.log('-----newVals2-----', newVals)
            this.setState({ name: [] });
            this.props.handleSelected(false, target, [])
        }
        this.props.handleClear()
    };

    render() {
        const { classes, logo } = this.props;
        console.log(logo)
        let svgicon;
        if (logo === "DDRs") {
            svgicon = districts_icon;
        } else if (logo === "ULBS" || "Wards") {
            svgicon = ulbs_icon;
        }

        return (
            <MuiThemeProvider theme={theme}>

                <div className={classes.root}>

                    <FormControl className={classes.formControl} >
                        {/* <InputLabel htmlFor="select-multiple-checkbox">{label || 'Select'}</InputLabel> */}
                        <div className={classes.list}>
                            <div>
                                <SVG src={svgicon} className={classes.CloseButton} >

                                </SVG>
                            </div>

                            <Autocomplete
                                onChange={this.handleChange.bind(this)}

                                multiple
                                id="checkboxes-tags-demo"
                                options={this.state.localItems}
                                disableCloseOnSelect
                                getOptionLabel={option => option}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ margin: '0px 0px 2px 0px',padding:0,  color:'black' }}
                                            checked={selected}
                                        />
                                        {option}
                                    </React.Fragment>
                                )}

                                renderTags={(value, getTagProps) =>{
                                    console.log('1')
                                    return this.state.localItems && this.state.localItems.length > 0 ? value.map((option, index) => (
                                        <Chip  label={option} {...getTagProps({ index })} />
                                    )) : ''
                                }
                                }
                                
                                style={(isMobile) ? { minWidth: 200 , maxWidth: 200 } : {}}                                
                                renderInput={params => (
                                    <div style={{color:'black'}}>

                                    <TextField
                                        {...params}
                                        variant="standard"
                                        fullWidth
                                        placeholder={this.state.label}
                                        style={{ color: 'black' }}
                                        // InputLabelProps={{
                                        //     style: {
                                            
                                        //     } }}
                                        // // InputLabelProps={{
                                        // //     className: classes.floatingLabelFocusStyle,
                                        // // }}
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


