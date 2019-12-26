import 'date-fns';
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CustomCalendar from './customCalander/cCalander';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import SwitchButton from '../switchButtons/switchButtons';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import moment from 'moment';
import _ from 'lodash';
// import { MediaQuery } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';


const year = (new Date()).getFullYear();

class DateRange extends React.Component {
  // The first commit of Material-UI


  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      fromDate: '',
      toDate: '',
      value: null,
      title: this.props.title1,
      dateRanges: Array.from(new Array(20), (x, i) => i + year - 10),
      buttons: [{ key: "1", value: "Today" },
      { key: "2", value: "This Week" },
      { key: "3", value: "This Month" },
      { key: "4", value: "This Quarter" },
      { key: "5", value: "FY " + (moment().month(3).startOf('month').format("YY")) + " - " + (moment().month(2).endOf('month').add(1, 'years').format("YY")), },
      { key: "6", value: "Custom" },
      ],
    }
    // const theme = useTheme();

    // this.fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  }
  handleCancel = () => {
    let { onClose } = this.props;

    this.props.onClose();
  };

  handleOk = () => {
    // console.log(this.state);
    let { handleSelectedOk } = this.props;
    handleSelectedOk(false, 'duration', this.getDateFilter(this.state.value))
    // this.props.handleApplyFilter(this.state.value)

  };

  getDuration(startDate, endDate) {
    let noOfDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
    if (noOfDays > 91) {
      return 'month'
    }
    if (noOfDays < 90 && noOfDays >= 14) {
      return 'week'
    }
    if (noOfDays <= 14) {
      return 'day'
    }
  }

  getDateFilter(value) {
    switch (_.toUpper(value)) {
      case 'TODAY':

        return {
          title: "TODAY",
          value: {
            startDate: moment().startOf('day').unix(),
            endDate: moment().endOf('day').unix(),
            interval: 'day'
          }
        }
      case 'THIS WEEK':

        return {
          title: "WEEK",
          value: {
            startDate: moment().startOf('week').unix(),
            endDate: moment().endOf('week').unix(),
            interval: 'week'
          }
        }
      case 'THIS MONTH':
        return {
          title: "MONTH",
          value: {
            startDate: moment().startOf('month').unix(),
            endDate: moment().endOf('month').unix(),
            interval: 'week'
          }
        }
      case 'THIS QUARTER':
        // let duration2 = this.getDuration(moment().startOf('quarter').format('YYYY-MM-DD'), moment().endOf('quarter').format('YYYY-MM-DD'))
        return {
          title: "QUARTER",
          value: {
            startDate: moment().startOf('quarter').unix(),
            endDate: moment().endOf('quarter').unix(),
            interval: 'week'
          }
        }
      case 'THIS YEAR':
        return {
          title: "YEAR",
          value: {
            startDate: moment().startOf('year').unix(),
            endDate: moment().endOf('year').unix(),
            interval: 'month'
          }
        }
      case 'CUSTOM':
        let duration1 = this.getDuration(moment(this.state.from || new Date(), "DD/MM/YYYY"), moment(this.state.to || new Date(), "DD/MM/YYYY"))

        return {
          title: "CUSTOM",
          value: {
            startDate: moment(this.state.from || new Date(), "DD/MM/YYYY").unix(),
            endDate: moment(this.state.to || new Date(), "DD/MM/YYYY").unix(),
            interval: duration1
          }
        }

      default:
        return {
          title: `FY ${moment().month(3).startOf('month').format("YY")}-${moment().month(2).endOf('month').add(1, 'years').format("YY")}`,
          value: {
            startDate: moment().month(3).startOf('month').unix(),
            endDate: moment().month(2).endOf('month').add(1, 'years').unix(),
            interval: 'month'
          }

        }
    }
  }

  /**
   * this is for duration selection
   * @param {open or close state} open 
   * @param {target name} target 
   * @param {selected value} value 
   */
  handleChanges(open, target, value) {
    if (target) {
      this.setState({
        value: value,
        title: value
      })
    }
    // this.props.handleSelected(open, target, this.getDateFilter(value))
  }

  svgWrapper = ({ dangerouslySetInnerHTML, className }) => {
    return (
      <span
        // onClick={(e) => this.back(e)}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        className={className}
      />
    );
  }
  selectCDate(target, value) {
    if (target) {
      this.setState({
        [target]: value,
      })
    }
  }
  render() {
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    let { classes, onClose, selected, value: valueProp, open } = this.props;
    let cardStyle = {}
    return (
      <Dialog
        // fullScreen={}
        disableBackdropClick
        disableEscapeKeyDown
        // invisible={true}
        // maxWidth="xl"
        // onEntering={this.handleEntering}
        aria-labelledby="date-range"
        open={open}
        // style={{ backgroundColor: 'transparent' }}

        classes={{ paper: classes.root }}
      // {...other}
      >
        <DialogTitle style={{ fontFamily: 'Roboto', fontSize: '10px', color: '#000000' }}>
          {/* <h5> */}
          {this.state.title}
          {/* </h5> */}
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.fils}>
            <SwitchButton
              data={this.state.buttons}
              selected={this.state.value || this.state.buttons[4].value}
              type="normal" target={"duration"}
              handleSelected={this.handleChanges.bind(this)}>
            </SwitchButton>
          </div>
          {this.state.value === 'Custom' &&
            <div className={classes.calanderDisplay}>
              <div className={classes.calanderclass}>
                <CustomCalendar key="from" selectCDate={this.selectCDate.bind(this, 'from')} />
              </div>
              <div className={classes.to}>
                <span>to</span>
              </div>
              <div className={classes.calanderclass}>
                <CustomCalendar key="to" selectCDate={this.selectCDate.bind(this, 'to')} />
              </div>
            </div>
          }

        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button className={classes.cancelbtn} onClick={this.handleCancel.bind(this)}>
            { this.props.cancelBtn}
        </Button>
          <Button className={classes.okbtn} onClick={this.handleOk.bind(this)}>
            {this.props.selectBtn}
        </Button>
        </DialogActions>
      </Dialog>
    );
  }

}
export default withStyles(style)(DateRange)