import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import propertyTaxImage from "../../img/property_tax.png"
import roadCuttingImage from "../../img/roadcutting.png"
import tradelicenceImage from "../../img/tradelicence.png"
import "./index.css";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:"10%",
    marginRight:"10%"

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} >
       
        <Grid item xs={12} md = {4}>
        <Card id="card1" 
                   >
                     
                  <p id="cardheadings">Property Tax</p>
                    <img
              src={propertyTaxImage}
              alt="..."              
              id = ""
              style = {{height: "50px",
              width: "50px",
              marginTop: "-53px",
              marginLeft: "5px"}}
            />
                <CardContent style={{  marginLeft: "49px"}}>
                  <p id="carddescription" style={{marginTop: "-51px",color: "rgba(0, 0, 0, 0.6)"}}><br />
                  Property Tax or House Tax is a local tax levied by municipal authorities for maintaining civic amenities in your area and is paid by occupier of that property                    
                  <br />
                    <b><a href="/citizen/withoutAuth/pt-mutation/public-search">Pay</a></b> <br /> 
                    <a href="/citizen/user/login">Apply</a> / 
                  </p>
                </CardContent>
              </Card>        </Grid>
        <Grid item xs={12} md = {4}>
        <Card id="card2"  >
                  <p id="cardheadings">Trade Licence</p>
                   <img
              src={tradelicenceImage}
              alt="..."              
              id = ""
              style = {{height: "50px",
              width: "50px",
              marginTop: "-53px",
              marginLeft: "5px"}} />
                <CardContent style={{  marginLeft: "49px"}}>
                  <p   id="carddescription" style={{marginTop: "-51px",color: "rgba(0, 0, 0, 0.6)"}} ><br />
                  A Trade License is permission issued by an Urban Local Body (ULB) to conduct specific trade or business according to the relevant rules, standards and safety guidelines on premises for which it has been issued
                    <br />
                    <a href="/citizen/user/login">Apply</a> <br /> 
                    <a href="/citizen/user/login">Renew </a><br />
                  </p>
                </CardContent>
              </Card>
        </Grid>
        <Grid item xs={12} md = {4}>
        <Card   id="card3">
                  <p id="cardheadings">Road Cutting</p>
                  <img
              src={roadCuttingImage}
              alt="..."              
              id = ""
              style = {{height: "50px",
              width: "50px",
              marginTop: "-53px",
              marginLeft: "5px"}} />
                <CardContent style={{  marginLeft: "49px"}}>
                <p id ="carddescription" style={{marginTop: "-51px",color: "rgba(0, 0, 0, 0.6)"}}><br />
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
