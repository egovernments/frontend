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
          <Card  id="message" >                   
                <center><p style={{fontWeight: "400", color: "#F47738 !important",              
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "16px",
              lineHeight: "19px",
}}>Pay your Property Tax Dues before 31st March and get 10% rebate</p></center>
              
              </Card>
        </div> 
    );
  }
}
export default withStyles(styles)(Message);
