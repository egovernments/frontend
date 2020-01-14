import React from "react";
import PropTypes from "prop-types";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import GenericChart from '../../Charts/genericchart';

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  },
  panelDetail :{
    display: "initial !important",
    padding: "0px !important"
  }
});

class CustomizedExpansionPanels extends React.Component {
  setViewAll = (visualCode) =>{
      this.props.setViewAll(visualCode);
  }
  renderCards = (classes, chartData, displayName, filters, page,Gfilter,row ) =>{ 
    let rowrender = []
    chartData.map((data, j) =>{
      rowrender.push(
        <ExpansionPanel defaultExpanded={(j===0)?true:false} className = {classes.head} style={{ margin: '30px 0px'}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {/*data.name.replace(/_/g, ' ') */}            
            {data.name}            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetail}>
            <GenericChart key={j} gFilter={Gfilter} chartData={data} filters={filters} page={page} setViewAll={this.setViewAll.bind(this)}/> 
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
    return rowrender;
  }
  render() { 
    let { classes, chartData, displayName, filters, page,Gfilter,row } = this.props;   
    return (
      <div style={{padding:'0px 7px'}}>
        { this.renderCards(classes, chartData, displayName, filters, page,Gfilter,row )}
      </div>
    );
  }
}

CustomizedExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedExpansionPanels);
