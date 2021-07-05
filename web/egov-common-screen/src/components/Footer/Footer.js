/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
      <div className={classes.container} id="container" >
      <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock} id="footer1" >
             <h5>
                <b>Contact Details</b>
              </h5>
              <p>
                Office Address: <br />
                Near Doon Hopstital , New road<br />
                Dehradun District , Dehradun<br />
                Uttarakhand-248001<br />
                </p>
                <p>
                Call Us<br />
                +91 99999999999<br />             
                </p><p>
                Email Us<br />
                nagarnigam.ddn@gmail.com<br />             
                </p> 
                <a
                href="https://www.facebook.com"
                //className={classes.block}
                target="_blank"
              >
                <p className={classes.socialIcons + " fab fa-facebook"} />
              </a>
                <a
                href="https://www.twitter.com"  
                //className={classes.block}

                target="_blank"
              >          
                <p className={classes.socialIcons + " fab fa-twitter"} />
                </a> 

            </ListItem>
            <ListItem className={classes.inlineBlock} id="footer2">
            <p              >
                <h5>Other Departments</h5>
              </p>
              <a
                href="#"
                //className={classes.block}
                target="_blank"
              >
                Link
              </a>
              <a
                href="#"
                //className={classes.block}
                target="_blank"
              >
                Link
              </a>
              <a
                href="#"
                //className={classes.block}
                target="_blank"
              >
                Link
              </a>
              <a
                href="#"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Link
              </a>
              <a
                href="#"
                //className={classes.block}
                target="_blank"
              >
                Link
              </a>

            </ListItem>
            <ListItem className={classes.inlineBlock} id = "footer3">
               <p              >
                <h5>Citizen Details</h5>
              </p>       
              <a
                href="http://blog.creative-tim.com/?ref=mkr-footer"
                //className={classes.block}
                target="_blank"
              >
                Property Tax
              </a>
              <a
                href="http://blog.creative-tim.com/?ref=mkr-footer"
                //className={classes.block}
                target="_blank"
              >
                Trade Licence
              </a>
              <a
                href="http://blog.creative-tim.com/?ref=mkr-footer"
                //className={classes.block}
                target="_blank"
              >
                Right way of Road Cutting/Road digging
              </a>
              <a
                href="http://blog.creative-tim.com/?ref=mkr-footer"
                //className={classes.block}
                target="_blank"
              >
                Complaints
              </a>
              <a
                href="http://blog.creative-tim.com/?ref=mkr-footer"
                //className={classes.block}
                target="_blank"
              >
                Apply for Dog Licence
              </a>
              
            </ListItem>
            <ListItem className={classes.inlineBlock} id="footer4">
              <p  >
                <b>About Us</b>
              </p>
              <p >
                Nagar Nigam
              </p>
              <p >
                About Nagarsewa
              </p>
            </ListItem>
          </List>
      </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
