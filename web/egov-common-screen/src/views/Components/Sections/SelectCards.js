import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
//import Email from "@material-ui/icons/Email";
//import Face from "@material-ui/icons/Face";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//import Header from "components/Header/Header.js";
//import CardHeader from "components/Card/CardHeader.js";
//import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//import Button from "components/CustomButtons/Button.js";
//import image from "assets/img/bg.jpg";
//import leftImage from "assets/img/stateLogo.png";
//import rightImage from "assets/img/logo.png";
import propertyTaxImage from "assets/img/property_tax.png"
import roadCuttingImage from "assets/img/roadcutting.png"
import tradelicenceImage from "assets/img/tradelicence.png"

import  "./index.scss"


import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionNavbars() {
  const classes = useStyles();
  return (
    <div className={classes.section}>     
         
          <GridContainer id="container">
            <GridItem xs={12} sm={6} md={4} id="griditem" >
              <Card id="card1" 
                   >
                     
                  <h4 id="cardheadings">Property Tax</h4>
                    <div id="icon"></div>{<img
              src={propertyTaxImage}
              alt="..."              
              id="iconimg"
              
            /> }
                <CardBody style={{  marginLeft: "34px"}}>
                  <p className={classes.description} style={{marginTop: "-36px"}}><br />
                  Property Tax or House Tax is a local tax levied by municipal authorities for maintaining civic amenities in your area and is paid by occupier of that property                    
                  <br />
                    <b><a href="/citizen/withoutAuth/pt-mutation/public-search">Pay Property Tax Without Login </a></b> <br /> 
                    <a href="/citizen/user/login">Pay Property Tax With Login </a><br /> 
                    <a href="https://bills.pe/37IYY">Pay Property Tax (BBPS) </a><br />
                    <a href="/citizen/user/login">Register Property </a> / 
                    <a href="/citizen/user/login">Apply for Ownership Transfer </a><br />
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4} id="griditem" >
              <Card id="card2"  >
              <h4 id="cardheadings">Trade Licence</h4>
              <div id="icon"></div>
                   <img
              src={tradelicenceImage}
              alt="..."              
              id="iconimg"/>
                <CardBody style={{  marginLeft: "34px"}}>
                  <p className={classes.description} style={{marginTop: "-36px"}} ><br />
                  A Trade License is permission issued by an Urban Local Body (ULB) to conduct specific trade or business according to the relevant rules, standards and safety guidelines on premises for which it has been issued
                    <br />
                    <a href="/citizen/user/login">New Application</a> <br /> 
                    <a href="/citizen/user/login">Renewal of Licence </a><br />
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4} id="griditem" >
              <Card   id="card3">
              <h4 id="cardheadings">Road Cutting</h4>
              <div id="icon"></div>
                  <img
              src={roadCuttingImage}
              alt="..."              
              id="iconimg" />
                <CardBody style={{  marginLeft: "34px"}}>
                <p className={classes.description} style={{marginTop: "-36px"}}><br />
                Road Cutting charges are levied by ULBs to recover cost for maintaining roads when they are cut for laying pipes, installing electricity lines, internet lines etc
                    <br />
                    <a href="http://enagarsewa.uk.gov.in/" target="_blank" rel="noreferrer">Apply</a> <br /> 
                  </p>
                </CardBody>               
              </Card>
            </GridItem>
          </GridContainer>
        </div>     
  );
}
