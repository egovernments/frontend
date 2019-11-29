import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { changeTheName } from '../src/actions/firstAction';
import { bindActionCreators } from 'redux';
import { updateLanguage } from './actions/languageChange';
import variables from './styles/variables';
import Layout from './utils/Layout';
import _ from 'lodash';

const theme = createMuiTheme({

  // props:{
  //   MuiSelect:{
  //     color: 'black',
  //     IconComponent:{
  //       color: 'red'
  //     }
  //   }
  // },

  // palette: {
  //   type: 'dark', // Switching the dark mode on is a single property value change.
  //   primary: { main: variables.black, light: variables.black },
  //   secondary: { main: variables.black },
  // },

  overrides: {
    typography: {
      useNextVariants: true,
      fontFamily: variables.primaryFont
    },
    //   MuiTouchRipple: {
    //     // root: {
    //     //   color
    //     // }
    //   },
    //   MuiInputBase: {
    //     root: {
    //       color: variables.black,
    //       fontFamily: variables.primaryFont,
    //     },

    //   },
    //   MuiIconButton: {
    //     colorPrimary: variables.black
    //   },

    //   MuiTypography: {
    //     root: {
    //       fontFamily: variables.primaryFont
    //     }
    //   },
    //   MuiCardHeader: {
    //     content: {
    //       fontFamily: variables.primaryFont,
    //     },
    //     root: {
    //       fontFamily: variables.primaryFont,
    //     },
    //     title: {
    //       fontFamily: variables.primaryFont,
    //     },

    //   },
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


// let dataL = {
//   "en": {
//     "DSS_TOTAL_COLLECTION": "Total Collection",
//     "DSS_TARGET_COLLECTION": "Target Collection",
//     "DSS_TARGET_ACHIEVED": "Target Achievement",
//     "DSS_TOTAL_CUMULATIVE_COLLECTION": "Total Cumulative Collection",
//     "DSS_TOP_PERFORMING_ULBS": "Top 3 Performing ULBs",
//     "DSS_BOTTOM_PERFORMING_ULBS": "Bottom 3 Performing ULBs",
//     "DSS_TOTAL_CUMULATIVE_COLLECTION:_DEPARTMENT_WISE": "Total Cumulative Collection: Service Wise",
//     "DSS_TOTAL_APPLICATION": "Total Applications",
//     "DSS_CLOSED_APPLICATION": "Closed Applications",
//     "DSS_SLA_ACHIEVED": "SLA Achievement",
//     "DSS_CITIZEN_REGISTERED": "Citizen Registered",
//     "DSS_TOTAL_APPLICATION_&_CLOSED_APPLICATION": "Total Applications & Closed Applications",
//     "DSS_TOTAL_APPLICATIONS:_DEPARTMENT_WISE": "Total Applications: Service Wise",
//     "DSS_PT_TOP_3_PERFORMING_ULBS": "Top 3 Performing ULBs",
//     "DSS_PT_BOTTOM_3_PERFORMING_ULBS": "Bottom 3 Performing ULBs",
//     "DSS_PT_COLLECTION_BY_USAGE_TYPE": "Collection by Usage type",
//     "DSS_PT_DEMAND_&_COLLECTION_INDEX": "Key Performance Indicator",
//     "DSS_PT_TOTAL_PROPERTIES_ASSESSED": "Total Properties Assessed",
//     "DSS_PT_TOTAL_ASSESSMENTS": "Total Assessments",
//     "DSS_PT_TOTAL_ACTIVE_ULBS": "Total Active ULBs",
//     "DSS_PT_TOTAL_ACTIVE_ULBS": "Total Active ULBs",
//     "DSS_PT_PROPERTIES_BY_USAGE_TYPE": "Properties by Usage Type",
//     "DSS_PT_CUMULATIVE_PROPERTIES_ASSESSED": "Total Cumulative Properties Assessed",
//     "DSS_PT_DEMAND_COLLECTION_BOUNDARY": "Boundary",
//     "DSS_PT_DEMAND_COLLECTION_USAGETYPE": "Usage Type",
//     "DSS_PT_DEMAND_COLLECTION": "Key Performance Indicator",
//     "DSS_TL_LICENSE_ISSUED": "Total License Issued",
//     "DSS_TL_CUMULATIVE_LICENSE_ISSUED": "Total Cumulative License Issued",
//     "DSS_TL_LICENSE_BY_TYPE": "License by Type",
//     "DSS_TL_LICENSE_BY_STATUS": "Trade License by Status",
//     "DSS_COMPLETION_RATE":"Completion Rate",
//     "DSS_REVENUE": "Revenue",
//     "DSS_SERVICE": "Service"
//   }
// }

let strings;
class App extends React.Component {
  constructor(props) {
    super(props);
    // localStorage.setItem("lang", JSON.stringify(dataL));
    this.changeTheName = this.changeTheName.bind(this);
    this.state = {
      language: 'en'
    }
    // this.handleLanguageChange = this.handleLanguageChange.bind(this);

    // this.props.loadDashboardConfigData(); removed by Amit 24-10
  }
  // handleLanguageChange(e) {
  //   let { strings } = this.props;
  //   e.preventDefault();
  //   let lang = e.target.value;
  //   this.setState(prevState => ({
  //     language: lang
  //   }), strings.setLanguage(lang))
  // }

  componentWillMount() {
    let language = localStorage.getItem("Employee.locale");
    let data =  _.chain(JSON.parse(localStorage.getItem(`localization_${language}`))).map(i=>{return{ [i.code]: i.message  }}).value();
    let dataL = {
      'en': data
    }
    this.props.updateLanguage(dataL);
  }

  componentDidMount() {
    // let { strings } = this.props;
    document.title = "DSS Dashboard";
  }
  changeTheName = (e) => {
    this.props.changeTheName();
  }

  render() {

    let { classes, strings } = this.props;
    // strings.setLanguage(this.state.language);

    return (
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>


      //   <AppRouter>
      //     <div className={`App ${classes.root}`}>
      //       <div>
      //         Change Language: <select onChange={this.handleLanguageChange}>
      //           <option value="en">En- English</option>
      //           <option value="hi">hi- Hindi</option>
      //         </select>
      //       </div>
      //       <NavBar />
      //       <div className={classes.appContainer}>
      //         {/* <div className="row"> */}
      //         <Spinner />
      //         {!isMobile && <SideBar isLoaded={this.props.isLoaded} />}
      //         <main role="main" style={{ backgroundColor: '#f4f7fb' }} className={classes.main}>
      //           {/* <Route exact path="/propertytax/">
      //               <PropertyTax isLoaded={this.props.isLoaded} dashboardConfigData={this.props.dashboardConfigData} />
      //               </Route>
      //             <Route exact path="/">
      //               <Dashboard isLoaded={this.props.isLoaded} /></Route> */}
      //           <AppRouter />
      //         </main>
      //         {/* </div> */}
      //       </div>

      //     </div>
      //  </AppRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  // name: state.firstReducer.name,
  // dashboardConfigData: state.firstReducer.dashboardConfigData,
  isLoaded: state.firstReducer.isLoaded,
  apistatus: state.apistatus,
  strings: state.lang

});


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeTheName: changeTheName,
    updateLanguage: updateLanguage
  }, dispatch)
}

// const mapDispatchToProps = (dispatch) => ({
//   changeTheName: () => dispatch(changeTheName()),
//   updateLanguage: () => dispatch(updateLanguage())
//   // loadDashboardConfigData: () => dispatch(loadDashboardConfigData())
// });

export default connect(mapStateToProps, mapDispatchToProps)(App);
