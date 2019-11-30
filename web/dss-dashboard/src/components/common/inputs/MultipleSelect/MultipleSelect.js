import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import SVG from 'react-inlinesvg';
import districts_icon from '../../../../images/icon-districts.svg';
import ulbs_icon from '../../../../images/icon-ul-bs.svg';
import styles from './Styles';
import FormControl from '@material-ui/core/FormControl';
import _ from 'lodash'

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

class MultipleSelects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.defaultValue || [],
      search: '',
      localItems: this.props.item || [],
    }
  }
  // handleChange = event => {
  //   let { target } = this.props;
  //   let newVals = _.compact(event.target.value);
  //   if (newVals.length > 0) {
  //     this.setState({ name: newVals });
  //     this.props.handleSelected(false, target, newVals)
  //   } else {
  //     this.setState({ name: [] });
  //     this.props.handleSelected(false, target, [])
  //   }
  //   this.props.handleClear()
  // };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.defaultValue !== this.props.defaultValue || !nextProps.defaultValue) {
    //   this.setState({
    //     name: nextProps.defaultValue || []
    //   });
    // }
  }
  getUpdated(event, value) {
    let { target } = this.props;
    let newVals = _.compact(value);
    if (newVals.length > 0) {
      this.setState({ name: newVals }, this.props.handleSelected(false, target, newVals));

    } else {
      this.setState({ name: [] });
      this.props.handleSelected(false, target, [])
    }
    // this.props.handleClear()

  }
  
  render() {
    const { classes, logo, target } = this.props;
    let pls = "All " + target;
    let svgicon;
    if (logo === "DDRs") {
      svgicon = districts_icon;
    } else if (logo === "ULBS") {
      svgicon = ulbs_icon;
    }

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} >
          <div className={classes.list}>
            <SVG src={svgicon} className={classes.CloseButton} >
            </SVG>
            <Autocomplete
              // fullWidth
              ref={`autocomplete`}
              multiple
              id="checkboxes-tags-demo"
              clearOnEscape
              options={this.state.localItems}
              disableCloseOnSelect
              defaultValue={this.props.clear ? [] : this.state.name}
              onChange={this.getUpdated.bind(this)}
              disableunderline="true"
              filterSelectedOptions={true}
              classes={{ root: classes.select, option: classes.menuItem }}
              getOptionLabel={option => option}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  {option}
                  {/* <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ right: 2 }}
                    checked={this.state.name.indexOf(option) > -1}
                  /> */}

                </React.Fragment>
              )}
              style={{ minWidth: 134 }}
              // renderTags={params => {
              //   return (
              //     <div>{params && params.length > 0 ? params.length + 'Selected' : 'All' + target}</div>
              //   )
              // }}
              renderInput={params => {
                return (

                  <TextField
                    {...params}
                    // placeholder={pls}
                    inputProps={{
                      // disableUnderline: true,
                      ...params.inputProps,

                      autoComplete: 'disabled', // disable autocomplete and autofill
                      classes: {
                        root: classes.bootstrapRoot,
                        input: classes.bootstrapInput
                      }
                    }}
                    placeholder={this.state.name.length > 0 ? '' : pls}
                    // label="Checkboxes"
                    fullWidth
                  />
                )
              }}
            />
          </div>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(MultipleSelects);

