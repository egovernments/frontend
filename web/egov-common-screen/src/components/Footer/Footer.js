/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";
import  "./index.scss"


const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div  id="footercontainer" >
      <div className={classes.left}>
          <List className={classes.list}>
          <GridContainer>
          <GridItem xs={12} sm={6} md={3} id="fgrid">
          <ListItem className={classes.inlineBlock} >

             <h5>
                <b>Contact Details</b>
              </h5>
              <p>
                Office Address: <br />
                Urban Development Directorate <br />
                31/62 Rajpur Road,<br />
                Dehradun,<br />
                Uttarakhand - 248001<br />
                </p>
                <p>
                Call Us<br />
                +91 (0135) 2741541<br />             
                </p><p>
                Email Us<br />
                < a href="mailto:enagarsewauk@gmail.com">enagarsewauk@gmail.com</a>
                <br />             
                </p> 
               
                
                </ListItem>
                </GridItem>
                
          <GridItem xs={12} sm={6} md={3} id="fgrid">
          <ListItem className={classes.inlineBlock} >
            <p>
                <h5><b>Other Departments</b></h5>
              </p>
              <a
                href="https://uk.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Uttarakhand State Government
              </a>
              <a
                href="https://udd.uk.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Urban Development Directorate
              </a>
              <a
                href="http://mohua.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                MoHUA
              </a>
              <a
                href="https://lgdirectory.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Local Government Directory
              </a>
              <a
                href="http://smartcitydehradun.uk.gov.in/"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
                Dehradun Smart City
              </a>
              </ListItem>
            </GridItem>
            <GridItem xs={12} sm={6} md={3} id="fgrid">
            <ListItem className={classes.inlineBlock} >
               <p              >
                <h5><b>Citizen Services</b></h5>
              </p>       
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Property Tax
              </a>
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Trade Licence
              </a>
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Right way of <br/>Road Cutting/Road digging
              </a>
            {/*   <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Complaints
              </a>
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Apply for Dog Licence
              </a> */}
              </ListItem>
              </GridItem>
            <GridItem xs={12} sm={6} md={3} id="fgrid">
            <ListItem className={classes.inlineBlock} >
              <p>
                <h5><b>About Us</b></h5>
              </p>              
              <a
                href="https://udd.uk.gov.in/pages/display/2-about-us"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
              About UDD
              </a>
              <a
                href="https://smartnet.niua.org/nuis"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
              About NUIS
              </a>
              <a
                href=" http://egov.org.in/"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
              About eGov Foundation
              </a>
              </ListItem>
              </GridItem>
              </GridContainer>
          </List>
          <center><p>Last Updated July 2020</p></center>
      </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
