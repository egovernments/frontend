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
import CustomInfo from '../CustomInfo';
import Grid from '@material-ui/core/Grid';

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
  onEditClick(e) {
    e.stopPropagation();
    //alert("I'm not expanding!");
  }
  renderCards = (classes, chartData, displayName, filters, page,Gfilter,row ) =>{ 
    let rowrender = []
    chartData.map((data, j) =>{
      rowrender.push(
        <ExpansionPanel defaultExpanded={(data.isCollapsible)?true:false} className = {classes.head} style={{ margin: '30px 0px'}}>
          <ExpansionPanelSummary>
          <Grid container>
            <Grid item xs={11}>
              <div style={{textAlign:'left', wordWrap: 'break-word',wordBreak:'break-word'}}>{data.name}  </div>
            </Grid>
            <Grid item xs={1}>
              <div onClick={this.onEditClick}><CustomInfo data={data} /></div>
            </Grid>
          </Grid>
                      
            {/*data.name.replace(/_/g, ' ') */} 
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
