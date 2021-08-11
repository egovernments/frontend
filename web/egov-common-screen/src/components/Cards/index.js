import React from "react";
import "./index.css";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

import propertyTaxImage from "../../img/property_tax.png"
import roadCuttingImage from "../../img/roadcutting.png"
import tradelicenceImage from "../../img/tradelicence.png"

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Cards extends React.Component {
  state = {
    backgroundUrl: "",
    logoUrl: "",
  };

  componentDidMount() {
    
  };
  render() {
    const { classes } = this.props;
   
    return (
      <div>
          <Grid Container id="container" className={classes.root}>
            <Grid item xs={3} sm={3} md={6}  id="griditem" >
              <Card id="card1" 
                   >
                     
                  <h4 id="cardheadings">Property Tax</h4>
                    <img
              src={propertyTaxImage}
              alt="..."              
              id = ""
              style = {{height: "50px",
              width: "50px",
              marginTop: "-53px",
              marginLeft: "5px"}}
            />
                <CardContent style={{  marginLeft: "34px"}}>
                  <p style={{marginTop: "-20px",color: "rgba(0, 0, 0, 0.6)"}}><br />
                  Property Tax or House Tax is a local tax levied by municipal authorities for maintaining civic amenities in your area and is paid by occupier of that property                    
                  <br />
                    <b><a href="/citizen/withoutAuth/pt-mutation/public-search">Pay Property Tax Without Login </a></b> <br /> 
                    <a href="/citizen/user/login">Pay Property Tax With Login </a><br /> 
                    <a href="https://bills.pe/37IYY">Pay Property Tax (BBPS) </a><br />
                    <a href="/citizen/user/login">Register Property </a> / 
                    <a href="/citizen/user/login">Apply for Ownership Transfer </a><br />
                  </p>
                </CardContent>
              </Card>
              </Grid>

            <Grid item xs={3} sm={3} md={6}  id="griditem" >
              <Card id="card2"  >
                  <h4 id="cardheadings">Trade Licence</h4>
                   <img
              src={tradelicenceImage}
              alt="..."              
              id = ""
              style = {{height: "50px",
              width: "50px",
              marginTop: "-53px",
              marginLeft: "5px"}} />
                <CardContent style={{  marginLeft: "34px"}}>
                  <p  style={{marginTop: "-20px",color: "rgba(0, 0, 0, 0.6)"}} ><br />
                  A Trade License is permission issued by an Urban Local Body (ULB) to conduct specific trade or business according to the relevant rules, standards and safety guidelines on premises for which it has been issued
                    <br />
                    <a href="/citizen/user/login">New Application</a> <br /> 
                    <a href="/citizen/user/login">Renewal of Licence </a><br />
                  </p>
                </CardContent>
              </Card>
              </Grid>

            <Grid item xs={3} sm={3} md={6}  id="griditem" >
              <Card   id="card3">
                  <h4 id="cardheadings">Road Cutting</h4>
                  <img
              src={roadCuttingImage}
              alt="..."              
              id = ""
              style = {{height: "50px",
              width: "50px",
              marginTop: "-53px",
              marginLeft: "5px"}} />
                <CardContent style={{  marginLeft: "34px"}}>
                <p style={{marginTop: "-20px",color: "rgba(0, 0, 0, 0.6)"}}><br />
                Road Cutting charges are levied by ULBs to recover cost for maintaining roads when they are cut for laying pipes, installing electricity lines, internet lines etc
                    <br />
                    <a href="http://enagarsewa.uk.gov.in/" target="_blank" rel="noreferrer">Apply</a> <br /> 
                  </p>
                </CardContent>               
              </Card>
            </Grid>
          </Grid>
        </div> 
    );
  }
}
Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Cards);
