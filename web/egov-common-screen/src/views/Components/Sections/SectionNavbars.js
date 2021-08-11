import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
//import Email from "@material-ui/icons/Email";
//import Face from "@material-ui/icons/Face";
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";

// core components
//import Card from "components/Card/Card.js";
//import CardBody from "components/Card/CardBody.js";
import Header from "components/Header/Header.js";
//import CardHeader from "components/Card/CardHeader.js";
//import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//import Button from "components/CustomButtons/Button.js";
import image from "assets/img/bg.jpg";
import leftImage from "assets/img/stateLogo.png";
import rightImage from "assets/img/logo.png";
//import propertyTaxImage from "assets/img/property_tax.png"
import  "./index.scss"


import styles from "assets/jss/material-ui-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionNavbars() {
  const classes = useStyles();
  return (
    <div className={classes.section}> 
       
      
      <div id="navbar" className={classes.navbar}>
{/*       <div> 
    <div style={{float:"left"}}><a
              href="/employee/user/login"
              className={classes.navLink}
              //onClick={(e) => e.preventDefault()}
              color="transparent"
            >
              <b>EmployeeLogin</b>
            </a>
            </div> 
            <div style={{float:"right"}}><a
              href="/employee/user/login"
              className={classes.navLink}
              //onClick={(e) => e.preventDefault()}
              color="transparent"
            >
              <b>EmployeeLogin</b>
            </a>
            </div> 
        </div> */}
        <div
          className={classes.navigation}
          style={{ backgroundImage: "url(" + image + ")" ,
          backgroundSize: "100% 76%",
          backgroundRepeat: "no-repeat"}}
        >
          <Header
            //brand="UKD LOGO"
            leftLinks={
              <img
              src={leftImage}
              alt="..."
               /* style={{
               height:"43px",
               marginLeft: "-182px"
              }} */
              id = "leftImage"
            />
            }
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <a
                    href="/employee/user/login"
                    className={classes.navLink}
                    //onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    <b>EmployeeLogin</b>
                  </a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    <b>English</b>
                  </a>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <img
                  src={rightImage}
                  alt="..."
                  style={{
                  height:"43px",
                  marginRight: "-99px"
                  }}
                />
                </ListItem>
              </List>
            }
          />
        </div>
      </div>
    </div>
  );
}
