import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import 'date-fns';
import { addDays ,addMonths } from 'date-fns';
import moment from 'moment';
import React from 'react';
import { createStaticRanges, DateRangePicker, defaultStaticRanges } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import getFinancialYearObj from '../../../actions/getFinancialYearObj';
import style from './style';
import { get } from 'lodash';

const year = (new Date()).getFullYear();
let fYearObj = getFinancialYearObj('', true)
class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      fromDate: '',
      toDate: '',
      value: null,
      default: 5,
      title: this.props.title1,
      fYearObj: fYearObj,
      dateRanges: Array.from(new Array(20), (x, i) => i + year - 10),
      buttons: [{ key: "1", value: "Today" },
      { key: "2", value: "This Week" },
      { key: "3", value: "This Month" },
      { key: "4", value: "This Quarter" },
      { key: "5", value: fYearObj[0].title },
      { key: "6", value: fYearObj[1].title },
      { key: "7", value: "Custom" },
      ],
      range: [{
        startDate: new Date(Number(`${get(fYearObj[1],'value.startDate',0)}000`)),
        endDate: new Date(Number(`${get(fYearObj[1],'value.endDate',0)}000`)),
        interval: get(fYearObj[1],'value.interval',""),
        label:get(fYearObj[1],'title',""),
        key: 'selection'
      }],
      staticRanges:[],dateRanges:[]
    }
  }
  handleCancel = () => {
    this.props.onClose();
  };
componentDidMount(){
  this.setDateRanges();
}
getTitle=(range=[])=>{
let title=range&&Array.isArray(range)&&range.length>0&&range[0].label||"CUSTOM";
if(title!="CUSTOM"){
  const dateRanges=this.state.dateRanges;
  let customTitle=false;
  dateRanges.map(dateRange=>{
    console.log(dateRange.range().startDate,range[0].startDate);
  if(title==dateRange.label&&this.getDate(dateRange.range().startDate,true)==this.getDate(range[0].startDate,true)&&this.getDate(dateRange.range().endDate)==this.getDate(range[0].endDate)){
    customTitle=true
  }
  })
  if(!customTitle){
    title='CUSTOM';
  }
}

return title;


}

getDate=(date,isStart=false)=>{
return isStart?moment(date || new Date(), "DD/MM/YYYY").endOf('day').unix():moment(date || new Date(), "DD/MM/YYYY").startOf('day').unix();
}
  handleOk = () => {
    let { handleSelectedOk } = this.props;
    const {range=[]}=this.state;
    this.setState({title:this.getTitle(range)});
    handleSelectedOk(false, 'duration', this.getDateFilter(range&&Array.isArray(range)&&range.length>0?range[0]:{}))
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

  getDateFilter(selectionObj) {
    console.log("========>selectionObj", selectionObj)
    let duration1 = this.getDuration(moment(selectionObj.startDate || new Date(), "DD/MM/YYYY"), moment(selectionObj.endDate || new Date(), "DD/MM/YYYY"))

    return {
      title: this.getTitle([selectionObj])||"CUSTOM",
      value: {
        startDate: moment(selectionObj.startDate || new Date(), "DD/MM/YYYY").startOf('day').unix(),
        endDate: moment(selectionObj.endDate || new Date(), "DD/MM/YYYY").endOf('day').unix(),
        interval: duration1
      }
    }

  }

  // getDateFilter(value) {
  //   switch (_.toUpper(value)) {
  //     case 'TODAY':

  //       return {
  //         title: "TODAY",
  //         value: {
  //           startDate: moment().startOf('day').unix(),
  //           endDate: moment().endOf('day').unix(),
  //           interval: 'day'
  //         }
  //       }
  //     case 'THIS WEEK':

  //       return {
  //         title: "WEEK",
  //         value: {
  //           startDate: moment().startOf('week').unix(),
  //           endDate: moment().endOf('week').unix(),
  //           interval: 'week'
  //         }
  //       }
  //     case 'THIS MONTH':
  //       return {
  //         title: "MONTH",
  //         value: {
  //           startDate: moment().startOf('month').unix(),
  //           endDate: moment().endOf('month').unix(),
  //           interval: 'week'
  //         }
  //       }
  //     case 'THIS QUARTER':
  //       return {
  //         title: "QUARTER",
  //         value: {
  //           startDate: moment().startOf('quarter').unix(),
  //           endDate: moment().endOf('quarter').unix(),
  //           interval: 'week'
  //         }
  //       }
  //     case 'THIS YEAR':
  //       return {
  //         title: "YEAR",
  //         value: {
  //           startDate: moment().startOf('year').unix(),
  //           endDate: moment().endOf('year').unix(),
  //           interval: 'month'
  //         }
  //       }
  //     case 'CUSTOM':
  //       let duration1 = this.getDuration(moment(this.state.from || new Date(), "DD/MM/YYYY"), moment(this.state.to || new Date(), "DD/MM/YYYY"))

  //       return {
  //         title: "CUSTOM",
  //         value: {
  //           startDate: moment(this.state.from || new Date(), "DD/MM/YYYY").startOf('day').unix(),
  //           endDate: moment(this.state.to || new Date(), "DD/MM/YYYY").endOf('day').unix(),
  //           interval: duration1
  //         }
  //       }

  //     default:
  //       return this.getFinancialYearObj(value)
  //   }
  // }

  getFinancialYearObj(value) {
    let fYearObj = this.state.fYearObj, returnObj;
    for (var i = 0; i < fYearObj.length; i++) {
      if (fYearObj[i] && fYearObj[i].title == value) {
        returnObj = fYearObj[i];
        break;
      }
    }
    return returnObj;
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
  }

  svgWrapper = ({ dangerouslySetInnerHTML, className }) => {
    return (
      <span
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

setDateRanges=()=>{
  let financialYears = this.state.fYearObj.map(fy => {

    return createStaticRanges([
      {
        label: fy.title,
        range: () => ({
          startDate: new Date(Number(`${fy.value.startDate}000`)),
          endDate: new Date(Number(`${fy.value.endDate}000`)),
          interval: fy.value.interval,
          label:fy.title
        })
      }
    ])[0]
  })
let dateRanges=[ {
  label: 'Today',
  range: () => ({
    startDate: new Date(Number(`${moment().startOf('day').unix()}000`)),
    endDate: new Date(Number(`${moment().endOf('day').unix()}000`)),
    interval: 'day',
    label:'Today'
  })
},
{
  label: 'This Week',
  range: () => ({
    startDate: new Date(Number(`${moment().startOf('week').unix()}000`)),
    endDate: new Date(Number(`${moment().endOf('week').unix()}000`)),
    interval: 'week',
    label:'This Week'
  })
},
{
  label: 'This Month',
  range: () => ({
    startDate: new Date(Number(`${moment().startOf('month').unix()}000`)),
    endDate: new Date(Number(`${moment().endOf('month').unix()}000`)),
    interval: 'week',
    label:'This Month'
  })
},
{
  label: 'This Quarter',
  range: () => ({
    startDate: new Date(Number(`${moment().startOf('quarter').unix()}000`)),
    endDate: new Date(Number(`${moment().endOf('quarter').unix()}000`)),
    interval: 'month',
    label:'This Quarter'
  })
},...financialYears]

  const staticRanges = [
     ...createStaticRanges([
     ...dateRanges
    ]),
    // ...financialYears
  ];
  this.setState({staticRanges,dateRanges})
        // {
      //   label: 'Last Quarter',
      //   range: () => ({
      //     startDate: new Date(Number(`${moment(addMonths(new Date(Number(`${moment().startOf('quarter').unix()}000`)), -3), "DD/MM/YYYY").startOf('day').unix()}000`)),
      //     endDate: new Date(Number(`${moment(addMonths(new Date(Number(`${moment().endOf('quarter').unix()}000`)), -3), "DD/MM/YYYY").startOf('day').unix()}000`)),
      //     interval: 'month',
      //     label:'Last Quarter'
      //   })
      // },
}
  onChange = (item) => {
    console.log("=======>", item)
    this.setState({
      range: [item.selection]
    })

    // let { handleSelectedOk } = this.props;
    // handleSelectedOk(false, 'duration', this.getDateFilter(item.selection))
    // console.log("======getDateFilter", this.getDateFilter(item.selection))
    // this.props.onClose();

    // if (target) {
    //   this.setState({
    //     [target]: value,
    //   })
    // }
  }
  render() {
    let { classes, open } = this.props;
/*     let financialYears = this.state.fYearObj.map(fy => {

      return createStaticRanges([
        {
          label: fy.title,
          range: () => ({
            startDate: new Date(Number(`${fy.value.startDate}000`)),
            endDate: new Date(Number(`${fy.value.endDate}000`)),
            interval: fy.value.interval,
            label:fy.title
          })
        }
      ])[0]
    })

    const staticRanges = [
       ...createStaticRanges([
        {
          label: 'Today',
          range: () => ({
            startDate: new Date(Number(`${moment().startOf('day').unix()}000`)),
            endDate: new Date(Number(`${moment().endOf('day').unix()}000`)),
            interval: 'day',
            label:'Today'
          })
        },
        {
          label: 'This Week',
          range: () => ({
            startDate: new Date(Number(`${moment().startOf('week').unix()}000`)),
            endDate: new Date(Number(`${moment().endOf('week').unix()}000`)),
            interval: 'week',
            label:'This Week'
          })
        },
        {
          label: 'This Month',
          range: () => ({
            startDate: new Date(Number(`${moment().startOf('month').unix()}000`)),
            endDate: new Date(Number(`${moment().endOf('month').unix()}000`)),
            interval: 'week',
            label:'This Month'
          })
        },
        {
          label: 'This Quarter',
          range: () => ({
            startDate: new Date(Number(`${moment().startOf('quarter').unix()}000`)),
            endDate: new Date(Number(`${moment().endOf('quarter').unix()}000`)),
            interval: 'month',
            label:'This Quarter'
          })
        },
        // {
        //   label: 'Last Quarter',
        //   range: () => ({
        //     startDate: new Date(Number(`${moment(addMonths(new Date(Number(`${moment().startOf('quarter').unix()}000`)), -3), "DD/MM/YYYY").startOf('day').unix()}000`)),
        //     endDate: new Date(Number(`${moment(addMonths(new Date(Number(`${moment().endOf('quarter').unix()}000`)), -3), "DD/MM/YYYY").startOf('day').unix()}000`)),
        //     interval: 'month',
        //     label:'Last Quarter'
        //   })
        // },
        
      ]),
      ...financialYears
    ]; */
    const staticRanges=this.state.staticRanges;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="date-range"
        open={open}

        classes={{ paper: classes.root }}
      >
        <DialogTitle style={{ fontFamily: 'Roboto', fontSize: '10px', color: '#fe7a51' }}>
          {this.state.title}
        </DialogTitle>
        <DialogContent dividers>
          {/* <div className={classes.fils}>
            <SwitchButton
              data={this.state.buttons}
              selected={this.state.value ||  this.state.buttons[this.state.default].value}
              type="normal" target={"duration"} 
              handleSelected={this.handleChanges.bind(this)}>
            </SwitchButton>
          </div> 
          {
            this.state.value === 'Custom' &&
            <div className={classes.calanderDisplay}>
              <div className={classes.calanderclass}>
                  <CustomCalendar key="from" position="from" selectCDate={this.selectCDate.bind(this, 'from')} /> 
              </div>
              <div className={classes.to}>
                <span>to</span>
              </div>
              <div className={classes.calanderclass}>
                 <CustomCalendar key="to" position="to" selectCDate={this.selectCDate.bind(this, 'to')} />  
              </div>
            </div>
          } */}
          <DateRangePicker
            onChange={this.onChange}
            showSelectionPreview={true}

            staticRanges={staticRanges}
            moveRangeOnFirstSelection={false}
            months={2}
            showMonthAndYearPickers={true}
            ranges={this.state.range}
            direction="horizontal"
          />;

        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button className={classes.cancelbtn} onClick={this.handleCancel.bind(this)}>
            {this.props.cancelBtn}
          </Button>
          <Button className={classes.okbtn} variant="contained" elevation={1} onMouseLeave={() => { this.setState({ buttonHovered: false }) }} onMouseEnter={() => { this.setState({ buttonHovered: true }) }} onClick={this.handleOk.bind(this)}>
            {this.props.selectBtn}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}
export default withStyles(style)(DateRange)