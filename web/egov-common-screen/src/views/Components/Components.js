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
import rightImage from "assets/img/logo.png";
import bannerImage from "assets/img/banner.png";
//import GridContainer from "components/Grid/GridContainer.js";
//import GridItem from "components/Grid/GridItem.js";
//import Button from "components/CustomButtons/Button.js";
//import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import leftImage from "assets/img/stateLogo.png";
// sections for this page
import TeamSection from "../LandingPage/Sections/TeamSection";
//import SectionBasics from "./Sections/SectionBasics.js";
//import SectionNavbars from "./Sections/SectionNavbars.js";
import SelectCards from "./Sections/SelectCards.js";
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

//import styles from "assets/jss/material-ui-react/views/components.js";

//const useStyles = makeStyles(styles);

export default function Components() {
  //const classes = useStyles();
  return (
    <div style={{backgroundColor: "#f3f4f5 !important"}}>
    <div id="flex-container">
    <div style={{width: "30%", float:"left", marginLeft: "9%"}}><img
                      src={leftImage}
                      alt="..."
                      style={{
                        width: "54px",
                        height: "51px",
                        left: "130px",
                        top: "7px",
                      
                      }}
                    /></div>

  <div style={{width: "70%", float:"right", marginRight: "5%",}}>
    <div id = "links" ><h4    id ="empheading" style={{fontWeight:"500",color: "#F47738",}}>
      <a href="/employee/user/login"  >Employee Login </a></h4>
      </div>
      <img
                      src={rightImage}
                      alt="..."
                      style={{  width: "210px",
                        height: "34px",
                        right: "110px",
                      
                      }}
                /></div>
</div>
            <div id="bannerimage">
            <img
                      src={bannerImage}
                      alt="..."
                      style={{ maxWidth: "100%",
                      maxHeight: "100%", width: "inherit"}}                        
                />
</div>
      <div id="homepagecards"> <SelectCards /> </div>
            <Card  id="message" >                   
                <CardBody  style={{padding: "0.375rem 0.875rem"}}>
                <center><h4 style={{fontWeight: "400", color: "#F47738 !important"}}>Pay your Property Tax Dues before 31st March and get 10% rebate</h4></center>
              
                </CardBody>               
              </Card>
              <div  id="faqheader" style ={{marginTop: "100px",fontWeight: "bold"}}>                   
              <center ><b><h3  style ={{fontWeight: "bold", fontSize: "36px"}}>Frequently Asked Questions</h3></b>
                </center>
                <div  
              style={{marginLeft: "45%",
                marginRight: "45%", borderBottom: "5px solid #f48952"}}>     
                </div>              
                        
              </div>                   
              <div  style={{marginTop: "10px"}}>     </div>  
                      
          <div id="faqs"><SectionFAQs /> </div>
          <div  id="citizenheader" >                   
                <center ><b><h3 style ={{fontWeight: "bold", fontSize: "36px", fontFamily:"Roboto",fontStyle:"normal",color: "rgba(0, 0, 0, 0.87)",}}>User Testimonials</h3></b>
                </center>
                <div  
                style={{marginLeft: "45%",
                  marginRight: "45%", borderBottom: "5px solid #f48952"}}>     </div>              
                          
                </div>                  
      <div  style={{marginTop: "10px"}}>     </div>  
      <div id="testimonials"><TeamSection /></div>
      <Footer />
    </div>
  );
}