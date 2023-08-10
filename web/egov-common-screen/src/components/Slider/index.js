import $ from 'jquery';
import React from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
import slideone from '../../img/pmidcgurughar.jpg';
import slidetwo from '../../img/property_tax.png';
const styles = (theme) => ({
  /*   root: {
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
    listStyle: {}, */
  });

class Message extends React.Component {
  state = {
    backgroundUrl: "",
    logoUrl: "",
  };
  

  componentDidMount() {
    
  };
  render() {
   
    return (
      <div>
          <div id="bannerimage">
        {/* <!-- <img src="images/pmidcgurughar.jpg" alt="..." style="max-width: 100%; max-height: 100%; width: inherit;"> --> */}
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
              </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={slideone} alt="First slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={slidetwo} alt="Second slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={slideone} alt="Third slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={slidetwo} alt="Forth slide" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
    
    </div>
        </div> 
    );
  }
}
export default withStyles(styles)(Message);
