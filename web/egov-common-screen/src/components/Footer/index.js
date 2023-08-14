import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import "./index.css";

import facebook from "../../img/facebook.png";
import twitter from "../../img/twitter.png";
import chrome from "../../img/chrome.png";
import edge from "../../img/edge.png";
import mozilla from "../../img/mozilla.png";
import wz from "../../img/w3c.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    backgroundColor:"#f47738"

  },
  container :
  {    
  marginLeft:"10%",
  marginRight:"10%",
  marginTop:"10%",
  paddingRight:"18%",
  paddingTop: "50px"

  },
  header :
  {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color : "#FFFFFF"

  },
  paragraph :
  {
    color : "#FFFFFF",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "20px"

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const dateyear = new Date();
  let currentyear = dateyear.getFullYear();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}  className={classes.container}>
       
        <Grid item xs={12} sm={6} md={3}>    
        <p>   
        <h5 className={classes.header}  style={{fontSize: "1rem", marginTop: "-5px"}}>
                <b>Contact Details</b>
              </h5></p>
              <p className={classes.paragraph} >
                Office Address: <br />
                Punjab Municipal Bhawan,<br /> 3, Dakshin Marg, 35A,<br />
                Chandigarh, 160022 <br />
                </p>
                <p className={classes.paragraph} >
                Call Us:<br />
                1800 1800 0172<br />             
                </p>
                <p className={classes.paragraph} >
                Email Us:<br />
                < a href="mailto:pgrs.lg@punjab.gov.in">pgrs.lg@punjab.gov.in</a>
                <br />  
                <a href="https://www.facebook.com/pmidc1/" target='_blank'>                
                <img src={facebook}   style={{width: "6%", marginRight: "6%"}}   /></a>
                <a href="https://twitter.com/pmidcpunjab" target='_blank'>                                 
                <img src={twitter}   style={{width: "6%"}}   /></a>           
                </p> 
                   </Grid>
        <Grid item xs={12} sm={6} md={3}>
       
        <p>
                <h5 className={classes.header} style={{fontSize: "1rem" , marginTop: "-5px"}}><b>Other Departments</b></h5>
              </p>
              <a
                href="https://mseva.lgpunjab.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Local Government Punjab
              </a><br />
              <a
                href="https://pmidc.punjab.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                PMIDC
              </a><br />
               
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        
        <p              >
                <h5 className={classes.header} style={{fontSize: "1rem", marginTop: "-5px"}}><b>User Manuals</b></h5>
              </p>       
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Property Tax
              </a><br />
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Property Tax Demand Registers
              </a><br />
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Trade Licence
              </a><br />

              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                Road Cutting
              </a><br />  
              <a
                href="https://www.youtube.com/@eSewaPunjabDOLGPunjab"
                //className={classes.block}
                target="_blank"
                id ="flink"

              >
                mSewa YouTube Channel
              </a><br />
                 
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        
        <p>
                <h5 className={classes.header} style={{fontSize: "1rem", marginTop: "-5px"}}><b>About Us</b></h5>
              </p>              
              <a
                href="#"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
              About mSewa
              </a><br />
              
              <a
                href=" http://egov.org.in/"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
              About eGov Foundation
              </a> <br />


            </Grid>

      </Grid><br />
      <center style={{color:"#ffffff"}}>Information provided online is update and no physical visit is required</center> <br />    
      {/* <center style={{color:"#ffffff"}}>Last Updated July 2021</center> <br />     */}
      <center style={{color:"#ffffff"}}><span style={{color:"red"}}>*</span>Supported browser versions</center> <br />    
      <center ><table >
      <tr >
          <td style={{color:"#ffffff", width: "100px"}}><center> <img src={chrome}     /></center></td>
          {/* <td style={{color:"#ffffff", width: "100px"}}> <center><img src={edge}   /></center></td> */}
          <td style={{color:"#ffffff", width: "100px"}}> <center><img src={mozilla}   /></center></td>
          </tr>
        <tr >
          <td style={{color:"#ffffff", width: "100px"}}><center> &gt;V-81</center></td>
          {/* <td style={{color:"#ffffff", width: "100px"}}> <center>&gt;V-84</center></td> */}
          <td style={{color:"#ffffff", width: "100px"}}> <center>&gt;V-79</center></td>
          </tr>
          
          </table>     </center>
          <div class="footerchange">
          <div class="container">
          <div className="row ">
      
      <div className="col-sm-12 col-md-6">
        <p>© {currentyear} PMIDC, GOVERNMENT OF PUNJAB. All Rights Reserved by PMIDC</p>
        </div>
        <div className="col-sm-12 col-md-6">
        <p>Last updated on : 2023-08-10 | This site is best viewed in Mozilla Firefox and Google Chrome <img src={wz} className="wz"/></p>
        </div>
        </div>
        </div>
        </div>
    </div>
    
  );
}
