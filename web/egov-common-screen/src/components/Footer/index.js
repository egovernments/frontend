import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:"#0B4B66",
    maxWidth:"100%",
    marginTop:"5%",
    color:"#FFFFFF"

      },
      a:{
        color:"#FFFF"
      }, 
  demo: {
    //backgroundColor: theme.palette.background.paper,
  },
  container :
  {
        margin: theme.spacing(1, 0, 0),

  },
  title: {
    //margin: theme.spacing(1, 0, 2),
    fontSize:"1rem",
    marginLeft: "14px"
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function InteractiveList() {
  const classes = useStyles();


  return (
    <div className={classes.root}>

      <Grid container className={classes.container} spacing={2} >
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h5" className={classes.title}>
                <b>Contact Details</b>
          </Typography>
          <div className={classes.demo}>
            <List>
              
                <ListItem>
                  <ListItemText
                    
                  />
              
                Office Address: <br />
                Urban Development Directorate <br />
                31/62 Rajpur Road,<br />
                Dehradun,<br />
                Uttarakhand - 248001<br />
                            

                </ListItem>
                <ListItem>
             
                Call Us
                
                </ListItem>
                <ListItem>
                +91 (0135) 2741541            
        
                </ListItem>

                <ListItem>

                   Email Us
                   
                </ListItem>
                <ListItem>
                < a href="mailto:enagarsewauk@gmail.com">enagarsewauk@gmail.com</a>
                </ListItem>
                <ListItem>
                < a href="https://www.facebook.com/profile.php?id=100070957113985"><i className={"fab fa-facebook"} style={{color: "white"}}/></a>
    
                </ListItem>
                <ListItem>
                < a href="https://twitter.com/NagarsewaU"> <i className={" fab fa-twitter"} style={{color: "white"}} />
</a>       
                </ListItem>

              
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h5" className={classes.title}>
          <b>Other Departments</b>        </Typography>
          <div className={classes.demo}>
            <List >
            <ListItem>

              <a
                href="https://uk.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Uttarakhand State Government
              </a>
              </ListItem>
                <ListItem>
              <a
                href="https://udd.uk.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Urban Development Directorate
              </a>


             
              
                </ListItem>
                <ListItem>
                <a
                href="http://mohua.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                MoHUA
              </a>  
                </ListItem>
                <ListItem>
                <a
                href="https://lgdirectory.gov.in/"
                id ="flink"
                //className={classes.block}
                target="_blank"
              >
                Local Government Directory
              </a>     
                </ListItem>
                <ListItem>
                <a
                href="http://smartcitydehradun.uk.gov.in/"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
                Dehradun Smart City
              </a>                      
                </ListItem>
                <ListItem>
                <a
                href="https://serviceonline.gov.in/"
                //className={classes.block}
                target="_blank"
                id ="flink"
              >
                NIC ServicePlus
              </a>               
                  
                </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
            Text only
          </Typography>
          <div className={classes.demo}>
            <List >
            <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />


                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />   
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />      
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />                        
                </ListItem>,
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />                 
                  
                </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
            Text only
          </Typography>
          <div className={classes.demo}>
            <List >
            <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />
                 

                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />   
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />      
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />                        
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />                 
                  
                </ListItem>
            </List>
          </div>
        </Grid>
        
      </Grid>
      
    </div>
  );
}