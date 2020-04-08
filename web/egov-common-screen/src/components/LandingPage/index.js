import React from 'react';
import './index.css';
import { Grid, Card, CardActions, CardContent, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    btn: {
        padding: "2.5% 5%",
        width: "20%",
        borderRadius: 4,
        fontSize: "15px",
        background: "#EA784E",
        color: "white",
        textDecoration: "none",
        textAlign: "center"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 300,
    },
    text: {
        padding: "12px",
        fontSize: "22px",
        fontWeight: "680",
        lineHeight: 2
    },
    listStyle: {
        padding:"15px 0"
    }
});
class LandingPage extends React.Component {
   
   
      constructor(props) {
        super(props);
        this.state = {value: '',
        backgroundUrl: "",
        logoUrl: "",
        tenantInfo: [],
        Redirectlink: ""
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        console.log("select city"+this.state.value);
        if(this.state.value==="Select your City"){
            window.open("/"); 
        }
        else{
            window.open("https://portal.mseva.bihar.gov.in/" + this.state.value, "_self");
            event.preventDefault();
        }
        
      }
      
    componentDidMount() {
        let tenantIdFromPath = ""
        tenantIdFromPath = document.location.search ? document.location.search.split('=')[1] : "bh";
        console.log(tenantIdFromPath, "tenant")
        const RequestInfo = {
            RequestInfo: {
                "apiId": "Rainmaker",
                "ver": ".01",
                "ts": "",
                "action": "_search",
                "did": "1",
                "key": "",
                "msgId": "20170310130900|en_IN",
                "authToken": null
            },
            MdmsCriteria: {
                "tenantId": tenantIdFromPath,
                "moduleDetails": [
                    {
                        "moduleName": "common-masters",
                        "masterDetails": [

                            {
                                "name": "StateInfo"
                            }
                        ]
                    },
                    {
                        "moduleName": "tenant",
                        "masterDetails": [

                            {
                                "name": "tenants"
                            }
                        ]
                    }
                ]
            }
        }
        axios.post(`${document.location.origin}/egov-mdms-service/v1/_search?tenantId=${tenantIdFromPath}`, RequestInfo)
            .then(response => {
                console.log("ResponseInfo", response.data);
                this.setValuestoState("tenantId", tenantIdFromPath);
                this.setValuestoState("backgroundUrl", response.data.MdmsRes["common-masters"].StateInfo[0].bannerUrl);
                this.setValuestoState("logoUrl", response.data.MdmsRes["common-masters"].StateInfo[0].logoUrl);
                this.setValuestoState("tenantInfo", response.data.MdmsRes["tenant"].tenants);
            })
            .catch(err => { console.log(err, "error"); })
    }
    setValuestoState = (property, value) => {
        this.setState({
            [property]: value
        })
    };

    render() {
        const { classes } = this.props;
        const { backgroundUrl, logoUrl, tenantInfo } = this.state;
        console.log("=====tenantInfo=====", tenantInfo);

        //console.log("tenanat=====",tenantInfo.code);

        return (
            <div
                className="common-background"
                style={{
                    height: '100%',
                    background: `url(${backgroundUrl}) no-repeat center`,
                }}>
                <Grid container className={classes.root} id="common-container">
                    <div className={classes.root}>
                        <Card className={classes.paper} style={{ textAlign: "left", marginTop: "150px", padding: "40px" }}>

                            <Grid container spacing={2} >
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <div style={{ textAlign: "center", margin:"10px 20px" }}>
                                            <img class="img-responsive mseva-logo employee-login-logo" src="https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb.testing/mSeva_Bihar.png"></img>
                                        </div>
                                        <form onSubmit={this.handleSubmit}>
                                            <label>City <span>*</span></label><br/>
                                            
                                            
                                            {/* <select type="text" value={this.state.value} onChange={this.handleChange} style={{width:"100%", 
                                            border: "none", 
                                             background: "#fff",
                                             borderBottom: "1px solid gray",
                                             fontize: "20px",
                                             padding: "20px 0 5px"
                                             }} >
                                            {tenantInfo.length > 0 && tenantInfo.map(option => (
                                                    <option key={option.value} value={option.name} href={option.ulbPortalLink}>
                                                        {option.name}
                                                    </option>

                                                ))}
                                            
                                            </select><br/> */}


                                            <TextField
                                                id="standard-select-currency-native"
                                                select
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.listStyle,
                                                    },
                                                }}
                                                style={{width:"100%"}} >
                                            >
                                                <option className="Dropdownvalues">Select your City</option>
                                                {tenantInfo.length > 0 && tenantInfo.map(option => (
                                                    <option className="Dropdownvalues" key={option.value} value={option.name} >
                                                        {option.name}
                                                    </option>

                                                ))}
                                            </TextField>
                                            <Button variant="contained" type="submit" style={{ backgroundColor: "rgb(254, 122, 81)", color: "#FFF", fontWeight: "600", fontSize: "14px", width: "90%", marginTop: "50px", height: "45px", width: "100%" }}>CONTINUE</Button>
                                            {/* <input type="submit" value="Continue" style={{
                                                margin: "15px 0",
                                                height: "40px",
                                                border: "none",
                                                width: "100%",
                                                background: "rgb(254, 122, 81)",
                                                color: "white",
                                                borderRradius: "3px",
                                                fontWeight: "600",
                                                textTransform: "uppercase",
                                            }}/> */}
                                        </form>
                                        <p style={{color:"red", fontSize:"12px"}}>*Please select city from dropdown before continuing</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(LandingPage);