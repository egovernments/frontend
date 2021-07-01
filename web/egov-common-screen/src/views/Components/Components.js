import React from "react";
// nodejs library that concatenates classes
//import classNames from "classnames";
// react components for routing our app without refresh
//import { Link } from "react-router-dom";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
//import Parallax from "components/Parallax/Parallax.js";
//import Card from "components/Card/Card.js";
//import CardBody from "components/Card/CardBody.js";
// sections for this page
import TeamSection from "../LandingPage/Sections/TeamSection";
//import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionFAQs from "./Sections/SectionFAQs.js";
import  "./index.scss"
//import SectionTabs from "./Sections/SectionTabs.js";
//import SectionPills from "./Sections/SectionPills.js";
//import SectionNotifications from "./Sections/SectionNotifications.js";
//import SectionTypography from "./Sections/SectionTypography.js";
//import SectionJavascript from "./Sections/SectionJavascript.js";
//import SectionCarousel from "./Sections/SectionCarousel.js";
//import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
//import SectionExamples from "./Sections/SectionExamples.js";
//import SectionDownload from "./Sections/SectionDownload.js";

//import styles from "assets/jss/material-kit-react/views/components.js";

//const useStyles = makeStyles(styles);

export default function Components() {
  //const classes = useStyles();
  return (
    <div>
      <SectionNavbars />
      <div id="faqs"><SectionFAQs /> </div>
      <TeamSection />
      <Footer />
    </div>
  );
}
