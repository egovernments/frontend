import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
//import Email from "@material-ui/icons/Email";
//import Face from "@material-ui/icons/Face";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Header from "components/Header/Header.js";
import CardHeader from "components/Card/CardHeader.js";
//import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import image from "assets/img/bg.jpg";
import image2 from "assets/img/stateLogo.png";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionNavbars() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div id="navbar" className={classes.navbar}>
        <div
          className={classes.navigation}
          style={{ backgroundImage: "url(" + image + ")" }}
        >
          <Header
            //brand="UKD LOGO"
            leftLinks={
              <img
              src={image2}
              alt="..."
              style={{
               height:"43px"
              }}
            />
            }
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    English
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    EmployeeLogin
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.registerNavLink}
                    onClick={(e) => e.preventDefault()}
                    color="rose"
                    round
                  >
                    Register
                  </Button>
                </ListItem>
              </List>
            }
          />
          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>PropetyTax</h4>
                </CardHeader>
                <CardBody>
                  <p className={classes.description}>
                    somesomesomesomesomesome
                    <br />
                    <a href="#pablo">links</a>
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>TradeLicence</h4>
                </CardHeader>
                <CardBody>
                  <p className={classes.description}>
                    somesomesomesomesomesome
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Road Cutting</h4>
                </CardHeader>
                <CardBody>
                  <p className={classes.description}>
                    somesomesomesomesomesome
                  </p>
                </CardBody>
                <CardBody>
                  <p className={classes.description}>
                    somesomesomesomesomesome
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
