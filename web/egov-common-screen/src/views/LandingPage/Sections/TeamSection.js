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
import team3 from "assets/img/faces/MaheshChandraPandey.jpeg";
import team4 from "assets/img/faces/SPRawat.jpeg";


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
              Shri Mahesh Chandra Pandey
                <br />
                <small className={classes.smallTitle}>Hotel Owner</small>
              </h4>
              <CardBody>
              <p className={classes.description} style={{height:"250px"}}>
              It was a good experience. As earlier we have to come to Nigam for Trade License but with this newly launched website, we can pay fees by sitting at home which is a very useful feature in this time of pandemic.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card plain style = {{background: "#ffffff", width :"91%"}}>
              <GridItem xs={3} sm={3} md={3} className={classes.itemGrid}>
                <img src={team4} style={{marginTop: "-50px"}} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
              Shri S P Rawat
                <br />
                <small className={classes.smallTitle}>Senior Officer (Retd.), ONGC</small>
              </h4>
              <CardBody>
              <p className={classes.description} style={{height:"250px"}}>
              It was a good experience, as initially I got some problem in depositing house tax online but with the support of their helpdesk, I have deposited my tax successfully. I pay sincere thanks to their helpdesk for their dedication and Valuable Support provided to me and I wish them success in this initiative.
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
