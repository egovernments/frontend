import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/KKshukla.jpg";
import team2 from "assets/img/faces/munikireti.jpg";
import team3 from "assets/img/faces/kendall.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card plain style = {{background: "#ffffff", width :"91%"}}>
              <GridItem xs={3} sm={3} md={3} className={classes.itemGrid}>
                <img src={team1} style={{marginTop: "-50px", marginLeft: "-17px"}} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
              KKshukla
                <br />
                <small className={classes.smallTitle}>GroupB-Gazetted officer</small>
              </h4>
              <CardBody>
                <p className={classes.description} style={{height:"250px"}}>
                It was a good experience with the newly launched portal.
                It is user friendly interface and a common people can use and pay his or her property tax while sitting in the home.
                In this way time and energy is saved . Money transactions are safe and receipt generated through the portal is nice feature of this portal.
                I wish this team all the best.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card plain style = {{background: "#ffffff", width :"91%"}}>
              <GridItem xs={3} sm={3} md={3} className={classes.itemGrid}>
                <img src={team2} style={{marginTop: "-50px", marginLeft: "-17px"}} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
              MunikiReti
                <br />
                <small className={classes.smallTitle}>ULB</small>
              </h4>
              <CardBody>
              <p className={classes.description} style={{height:"250px"}}>
                नगर सेवा के पोर्टल से नगर पालिका परिषद मुनिकीरेती को काफी सुगमता हो रही है इससे नगर पालिका डिजिटल की ओर बढ़ रहा है एवम इससे पालिका को सभी करो को एकत्रित करने में काफी सुगमता मिल रही है इसके साथ ही सभी करो के कलेक्शन को single window सिस्टम के माध्यम से हो रहा है इससे सभी को समय की बचत भी हो रही ह
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card plain style = {{background: "#ffffff", width :"91%"}}>
              <GridItem xs={3} sm={3} md={3} className={classes.itemGrid}>
                <img src={team3} style={{marginTop: "-50px", marginLeft: "-17px"}} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Christian Louboutin
                <br />
                <small className={classes.smallTitle}>Designer</small>
              </h4>
              <CardBody>
              <p className={classes.description} style={{height:"250px"}}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card plain style = {{background: "#ffffff", width :"91%"}}>
              <GridItem xs={3} sm={3} md={3} className={classes.itemGrid}>
                <img src={team3} style={{marginTop: "-50px"}} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Kendall Jenner
                <br />
                <small className={classes.smallTitle}>Model</small>
              </h4>
              <CardBody>
              <p className={classes.description} style={{height:"250px"}}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
