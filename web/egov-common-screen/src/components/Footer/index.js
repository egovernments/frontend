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
import axios from "axios";

const styles = (theme) => ({
  root: {
    paddingTop: "0px",
    overflow: "visible",
    height: "100%",
  },
  btn: {
    padding: "2.5% 5% ",
    width: "20%",
    borderRadius: 4,
    fontSize: "15px",
    background: "#EA784E",
    color: "white",
    textDecoration: "none",
    textAlign: "center",
    // marginTop: "42px",
  },
  text: {
    padding: "12px",
    fontSize: "22px",
    fontWeight: "680",
    lineHeight: 2,
  },
  listStyle: {},
});

class Footer extends React.Component {
  state = {
    backgroundUrl: "",
    logoUrl: "",
  };

  componentDidMount() {
  
  };
  render() {
   
    return (
      <div >
              <div  id="footercontainer" >
      <div >
          <List >
          <Grid Container>
          <Grid item xs={12} sm={6} md={3} id="fgrid">
          <ListItem  >

             <h5 style={{fontSize: "1rem"}}>
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
                < a href="https://www.facebook.com/profile.php?id=100070957113985"><i className={"fab fa-facebook"} style={{color: "white"}}/></a>
                

                < a href="https://twitter.com/NagarsewaU"> <i className={" fab fa-twitter"} style={{color: "white"}} />
</a>           
                </p> 
               
                
                </ListItem>
                </Grid>
                
          <Grid item xs={12} sm={6} md={3} id="fgrid">
          <ListItem  >
            <p>
                <h5 style={{fontSize: "1rem" , marginTop: "-5px"}}><b>Other Departments</b></h5>
              </p>
              <a
                href="https://uk.gov.in/"
                id ="flink"
                target="_blank"
              >
                Uttarakhand State Government
              </a>
              <a
                href="https://udd.uk.gov.in/"
                id ="flink"
                target="_blank"
              >
                Urban Development Directorate
              </a>
              <a
                href="http://mohua.gov.in/"
                id ="flink"
                target="_blank"
              >
                MoHUA
              </a>
              <a
                href="https://lgdirectory.gov.in/"
                id ="flink"
                target="_blank"
              >
                Local Government Directory
              </a>
              <a
                href="http://smartcitydehradun.uk.gov.in/"
                target="_blank"
                id ="flink"
              >
                Dehradun Smart City
              </a>
              <a
                href="https://serviceonline.gov.in/"
                target="_blank"
                id ="flink"
              >
                NIC ServicePlus
              </a>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={3} id="fgrid">
            <ListItem  >
               <p              >
                <h5 style={{fontSize: "1rem", marginTop: "-5px"}}><b>User Manuals</b></h5>
              </p>       
              <a
                href="/ukd-assets/PT_English_UserManual_Citizen.pdf"
                target="_blank"
                id ="flink"

              >
                Property Tax
              </a>
              <a
                href="https://udd.uk.gov.in/pages/display/147-property-tax"
                target="_blank"
                id ="flink"

              >
                Property Tax Demand Registers
              </a>
              <a
                href="/ukd-assets/TL_English_UserManual_Citizen.pdf"
                target="_blank"
                id ="flink"

              >
                Trade Licence
              </a>
              
                Road Cutting
              
              <a
                href="https://www.youtube.com/channel/UCnRHcTjQ1ylEBR8nV6re1ZA"
                target="_blank"
                id ="flink"

              >
                NagarSewa YouTube Channel
              </a>
           
              </ListItem>
              </Grid>
            <Grid item xs={12} sm={6} md={3} id="fgrid">
            <ListItem  >
              <p>
                <h5 style={{fontSize: "1rem", marginTop: "-5px"}}><b>About Us</b></h5>
              </p>              
              <a
                href="https://udd.uk.gov.in/pages/display/2-about-us"
                target="_blank"
                id ="flink"
              >
              About UDD
              </a>
              <a
                href="https://smartnet.niua.org/nuis"
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
              </Grid>
              </Grid>
          </List>
          <center><p style={{textAlign: "center"}}>Last Updated July 2021</p></center>
      </div>
      </div>

      </div>
    );
  }
}
export default withStyles(styles)(Footer);
